import { existsSync, mkdirSync, readdirSync, renameSync, rmSync, statSync } from 'node:fs';
import { notFoundPageUrl } from './src/data/routes.js';
import { cityPanelColumns, regions } from './src/data/regions.js';
import {
  contactSections,
  headerPhone,
  socialLinks,
} from './src/data/contacts.js';
import { televisionTariffs } from './src/data/television-tariffs.js';
import { homeVideoSurveillanceTariffs } from './src/data/home-video-surveillance-tariffs.js';
import { instructionSections } from './src/data/instructions.js';
import { privateInternetTariffs } from './src/data/private-internet-tariffs.js';
import {
  mainOfficeAddress,
  officeAddressRows,
  officePhone,
  officeSchedule,
} from './src/data/office.js';
import { dirname, extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import nunjucks from 'nunjucks';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const projectRoot = dirname(fileURLToPath(import.meta.url));
const pagesDir = resolve(projectRoot, 'src/pages');
const templatesDir = resolve(projectRoot, 'src/templates');
const imagesDir = resolve(projectRoot, 'src/assets/images');
const publicDir = resolve(projectRoot, 'public');

const IMAGE_EXTENSIONS = new Set([
  '.avif',
  '.gif',
  '.ico',
  '.jpeg',
  '.jpg',
  '.png',
  '.svg',
  '.webp',
]);

function collectHtmlFiles(directory) {
  try {
    return readdirSync(directory).flatMap((entry) => {
      const entryPath = resolve(directory, entry);
      const entryStat = statSync(entryPath);

      if (entryStat.isDirectory()) {
        return collectHtmlFiles(entryPath);
      }

      return extname(entry) === '.html' ? [entryPath] : [];
    });
  } catch {
    return [];
  }
}

function getHtmlInputs() {
  return collectHtmlFiles(pagesDir).reduce((inputs, filePath) => {
    const pageName = relative(pagesDir, filePath).replace(/\.html$/, '') || 'index';
    const name = `pages/${pageName}`;
    return {
      ...inputs,
      [name]: filePath,
    };
  }, {});
}

function relocateDistDirectory(fromDir, toDir) {
  if (!existsSync(fromDir)) {
    return;
  }

  mkdirSync(toDir, { recursive: true });

  for (const entry of readdirSync(fromDir)) {
    const fromPath = resolve(fromDir, entry);
    const toPath = resolve(toDir, entry);

    if (statSync(fromPath).isDirectory()) {
      relocateDistDirectory(fromPath, toPath);
      continue;
    }

    renameSync(fromPath, toPath);
  }
}

function relocateHtmlOutput() {
  return {
    name: 'relocate-html-output',
    closeBundle() {
      const distDir = resolve(projectRoot, 'dist');
      const srcPagesDir = resolve(distDir, 'src/pages');
      const distPagesDir = resolve(distDir, 'pages');

      relocateDistDirectory(srcPagesDir, distPagesDir);

      const srcDir = resolve(distDir, 'src');
      if (existsSync(srcDir)) {
        rmSync(srcDir, { recursive: true, force: true });
      }
    },
  };
}

function shouldFullReload(file) {
  const normalized = resolve(file);
  const extension = extname(normalized).toLowerCase();

  if (normalized.startsWith(pagesDir) && extension === '.html') {
    return true;
  }

  if (normalized.startsWith(templatesDir) && extension === '.njk') {
    return true;
  }

  if (normalized.startsWith(imagesDir) && IMAGE_EXTENSIONS.has(extension)) {
    return true;
  }

  if (normalized.startsWith(publicDir) && IMAGE_EXTENSIONS.has(extension)) {
    return true;
  }

  return false;
}

function nunjucksHmr() {
  return {
    name: 'nunjucks-hmr',
    configureServer(server) {
      const watchDirs = [pagesDir, templatesDir, imagesDir, publicDir].filter((dir) =>
        existsSync(dir),
      );

      server.watcher.add(watchDirs);

      const reloadPage = (file) => {
        if (!shouldFullReload(file)) {
          return;
        }

        server.ws.send({ type: 'full-reload', path: '*' });
      };

      server.watcher.on('change', reloadPage);
      server.watcher.on('add', reloadPage);
      server.watcher.on('unlink', reloadPage);
    },
  };
}

function mpaDevRoutes() {
  return {
    name: 'mpa-dev-routes',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split('?')[0];
        if (url === '/' || url === '/index.html') {
          req.url = '/src/pages/index.html';
        } else if (url === '/404' || url === '/404.html') {
          req.url = '/src/pages/404.html';
        } else if (url?.startsWith('/pages/') && url.endsWith('.html')) {
          req.url = `/src/pages/${url.slice('/pages/'.length)}`;
        }
        next();
      });
    },
  };
}

function nunjucksHtml() {
  const env = nunjucks.configure(resolve(projectRoot, 'src/templates'), {
    autoescape: true,
    noCache: true,
    trimBlocks: true,
    lstripBlocks: true,
  });

  env.addGlobal('notFoundPageUrl', notFoundPageUrl);
  env.addGlobal('regions', regions);
  env.addGlobal('cityPanelColumns', cityPanelColumns);
  env.addGlobal('officeSchedule', officeSchedule);
  env.addGlobal('officePhone', officePhone);
  env.addGlobal('officeAddressRows', officeAddressRows);
  env.addGlobal('mainOfficeAddress', mainOfficeAddress);
  env.addGlobal('headerPhone', headerPhone);
  env.addGlobal('socialLinks', socialLinks);
  env.addGlobal('contactSections', contactSections);
  env.addGlobal('instructionSections', instructionSections);
  env.addGlobal('privateInternetTariffs', privateInternetTariffs);
  env.addGlobal('homeVideoSurveillanceTariffs', homeVideoSurveillanceTariffs);
  env.addGlobal('televisionTariffs', televisionTariffs);

  return {
    name: 'nunjucks-html',
    transformIndexHtml: {
      order: 'pre',
      handler(html, context) {
        const pagePath = context.filename
          ? relative(projectRoot, context.filename).replaceAll('\\', '/')
          : '';

        return env.renderString(html, {
          isDev: Boolean(context.server),
          pagePath,
        });
      },
    },
  };
}

export default defineConfig({
  plugins: [
    relocateHtmlOutput(),
    nunjucksHtml(),
    nunjucksHmr(),
    createSvgIconsPlugin({
      iconDirs: [resolve(projectRoot, 'src/assets/images/icons')],
      symbolId: 'icon-[name]',
    }),
    ViteImageOptimizer(),
    mpaDevRoutes(),
  ],
  css: {
    devSourcemap: true,
  },
  server: {
    watch: {
      ignored: ['**/dist/**', '**/node_modules/**'],
    },
  },
  build: {
    assetsInlineLimit: 0,
    cssMinify: true,
    emptyOutDir: true,
    minify: 'esbuild',
    outDir: 'dist',
    rollupOptions: {
      input: getHtmlInputs(),
    },
  },
});

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import beautify from 'js-beautify';

const distDir = resolve(process.cwd(), 'dist');

function collectHtmlFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const entryPath = resolve(directory, entry);
    const entryStat = statSync(entryPath);

    if (entryStat.isDirectory()) {
      return collectHtmlFiles(entryPath);
    }

    return entry.endsWith('.html') ? [entryPath] : [];
  });
}

collectHtmlFiles(distDir).forEach((filePath) => {
  const html = readFileSync(filePath, 'utf8');
  const formattedHtml = beautify.html(html, {
    content_unformatted: ['style'],
    indent_size: 2,
    indent_inner_html: true,
    preserve_newlines: true,
    max_preserve_newlines: 1,
    wrap_line_length: 0,
    end_with_newline: true,
  });

  writeFileSync(filePath, formattedHtml);
});

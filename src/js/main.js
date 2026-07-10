import '../assets/scss/main.scss';
import 'virtual:svg-icons-register';

import.meta.glob('../templates/**/*.scss', { eager: true });

const templateModules = import.meta.glob('../templates/**/*.js', { eager: true });

Object.values(templateModules).forEach((module) => {
  module.init?.();
});

import '@/assets/scss/main.scss';
import 'virtual:svg-icons-register';

import { Modal } from './modal/manager';

import.meta.glob('../templates/**/*.scss', { eager: true });
import.meta.glob('../templates/**/*.js', { eager: true });

Modal.init();

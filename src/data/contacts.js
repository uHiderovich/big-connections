import { notFoundPageUrl } from './routes.js';

export const headerPhone = {
  display: '+7 800 444 11 09',
  href: 'tel:+78004441109',
};

export const socialLinks = [
  {
    icon: 'max',
    label: 'Max',
    href: notFoundPageUrl,
  },
  {
    icon: 'vk',
    label: 'ВКонтакте',
    href: notFoundPageUrl,
  },
  {
    icon: 'tg',
    label: 'Telegram',
    href: notFoundPageUrl,
  },
];

export const contactSections = [
  { title: 'Подключиться к интернету', type: 'phone' },
  { title: 'Техподдержка', type: 'phone' },
  { title: 'Связаться с директором компании', type: 'phone' },
  { title: 'Социальные сети', type: 'social' },
];

import { notFoundPageUrl } from './routes.js';

export const instructionSections = [
  {
    title: 'Инструкции',
    links: [
      { label: 'Не работает интернет', href: notFoundPageUrl },
      { label: 'Как оплатить', href: notFoundPageUrl },
      { label: 'Обещанный платёж', href: notFoundPageUrl },
      { label: 'Автоплатёж', href: notFoundPageUrl },
    ],
  },
  {
    title: 'Документы',
    links: [
      { label: 'Правила оказания услуг связи', href: notFoundPageUrl },
      { label: 'Лицензии', href: notFoundPageUrl },
      { label: 'Наши реквизиты', href: notFoundPageUrl },
    ],
  },
];

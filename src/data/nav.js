import { notFoundPageUrl } from './routes.js';

export const headerNavItems = [
  {
    id: 'about',
    label: 'О компании',
    items: [
      { text: 'Деятельность', href: '/pages/activity.html' },
      { text: 'Вакансии', href: '/pages/vacancies.html' },
      { text: 'Инструкции', href: '/pages/instructions.html' },
      { text: 'Новости', href: '/pages/news.html' },
      { text: 'Контакты', href: '/pages/contacts.html' },
    ],
  },
  {
    id: 'tariffs',
    label: 'Тарифы и услуги',
    items: [
      { text: 'Интернет в много-квартирный дом', href: notFoundPageUrl },
      { text: 'Интернет для частного сектора', href: '/pages/private-internet.html' },
      { text: 'Видеонаблюдение', href: '/pages/home-video-surveillance.html' },
      { text: 'Цифровое ТВ', href: '/pages/television.html' },
      { text: 'Радио', href: notFoundPageUrl },
    ],
  },
];

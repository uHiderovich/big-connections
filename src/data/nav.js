import { notFoundPageUrl } from './routes.js';

export const headerNavItems = [
  {
    id: 'about',
    label: 'О компании',
    items: [
      { text: 'Деятельность', href: '/activity.html' },
      { text: 'Вакансии', href: '/vacancies.html' },
      { text: 'Инструкции', href: '/instructions.html' },
      { text: 'Новости', href: '/news.html' },
      { text: 'Контакты', href: '/contacts.html' },
    ],
  },
  {
    id: 'tariffs',
    label: 'Тарифы и услуги',
    items: [
      { text: 'Интернет в много-квартирный дом', href: '/apartment-internet.html' },
      { text: 'Интернет для частного сектора', href: '/private-internet.html' },
      { text: 'Видеонаблюдение', href: '/home-video-surveillance.html' },
      { text: 'Цифровое ТВ', href: '/television.html' },
    ],
  },
];

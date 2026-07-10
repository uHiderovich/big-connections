import Swiper from 'swiper';
import { Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export function initHeroSlider() {
  const slider = document.querySelector('.js-hero-slider');

  if (!slider) {
    return;
  }

  const pagination = slider.querySelector('.hero__pagination');

  new Swiper(slider, {
    modules: [Pagination, EffectFade],
    effect: 'fade',
    pagination: {
      el: pagination,
      clickable: true,
    },
  });
}

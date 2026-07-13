import Swiper from 'swiper';
import { Pagination, EffectFade } from 'swiper/modules';
import { defineComponent } from '@/js/helpers'

import 'swiper/css';
import 'swiper/css/pagination';

function loadSlideImage(swiper, index = swiper.activeIndex) {
  const img = swiper.slides[index]?.querySelector('img[data-src]');
  if (!img) return;
  img.src = img.dataset.src;
  img.removeAttribute('data-src');
}

defineComponent({
  selector: '.js-hero-slider',
  setup(slider) {
    const pagination = slider.querySelector('.hero__pagination');

    new Swiper(slider, {
      modules: [Pagination, EffectFade],
      effect: 'fade',
      pagination: {
        el: pagination,
        clickable: true,
      },
      on: {
        init(swiper) {
          loadSlideImage(swiper);
          loadSlideImage(swiper, swiper.activeIndex + 1); // предзагрузка следующего
        },
        slideChange(swiper) {
          loadSlideImage(swiper);
          loadSlideImage(swiper, swiper.activeIndex + 1);
        },
      },
    });
  },
});

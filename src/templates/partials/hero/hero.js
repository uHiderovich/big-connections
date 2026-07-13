import Swiper from 'swiper';
import { Pagination, EffectFade } from 'swiper/modules';
import { defineComponent } from '@/js/helpers'

import 'swiper/css';
import 'swiper/css/pagination';

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
    });
  },
});

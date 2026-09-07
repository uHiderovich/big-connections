import Swiper from 'swiper';
import { Pagination, EffectFade } from 'swiper/modules';
import { defineComponent } from '@/js/helpers'

import 'swiper/css';
import 'swiper/css/pagination';

function loadSlideImage(swiper, index = swiper.activeIndex) {
  const slide = swiper.slides[index];

  if (!slide) {
    return;
  }

  slide.querySelectorAll('source[data-srcset]').forEach((source) => {
    source.srcset = source.dataset.srcset;
    source.removeAttribute('data-srcset');
  });

  const img = slide.querySelector('img[data-src]');

  if (!img) {
    return;
  }

  if (img.dataset.srcset) {
    img.srcset = img.dataset.srcset;
    img.removeAttribute('data-srcset');
  }

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

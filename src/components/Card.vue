<template>
    <div class="text-center">
    <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="50"
        :navigation = "{prevEl: '.btn-prev', nextEl: '.btn-next'}"
        @swiper="onSwiper"
        @slideNextTransitionStart="onSlideNextTransitionStart"
        @slidePrevTransitionStart="onSlidePrevTransitionStart"
    >
        <swiper-slide v-for="card in cards">
            <div class="row justify-content-sm-center">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Card {{card}}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <button class="btn-prev btn btn-link">Previous</button>
                        <button class="btn-next btn btn-link">Next</button>
                    </div>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="row justify-content-sm-center">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Card nth (5)</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <button class="btn-prev btn btn-link">Previous</button>
                        <button class="btn-next btn btn-link">Next</button>
                    </div>
                </div>
            </div>
        </swiper-slide>
    </swiper>
  </div>
  <br/><br/>
  <div class="container">
      <div class="row justify-content-md-center">
            <div class="col col-lg-4">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" :style="{width: deckProgress() + '%'}" :aria-valuenow="deckProgress()" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
      // import Swiper core and required modules
  import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  import {ref} from 'vue'

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';


  let cards = [1,2,3,4,5]
  let slideNumber = ref(1)
  let slideCount = cards.length + 1
  function deckProgress() {
      return ((slideNumber.value - 1) / (slideCount-1)) * 100
  }
 
  // Import Swiper styles
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideNextTransitionStart = () => {
          slideNumber.value++
      };
      const onSlidePrevTransitionStart = () => {
          slideNumber.value--
      };
      const navigationOptions = () => {
        navigation.nextEl = '.btn-next'
        navigation.prevEl = '.btn-prev' 
      };
      
      return {
        onSwiper,
        onSlideNextTransitionStart,
        onSlidePrevTransitionStart,
        navigationOptions,
        modules: [Navigation, Pagination, Scrollbar, A11y],
        slideNumber,
        slideCount,
        deckProgress,
        cards
      };
    },
  };
</script>
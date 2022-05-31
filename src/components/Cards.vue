<template>
  <div class="container">
        <div class="row justify-content-sm-center">
            <div class="col col-lg-7">
                <p class="text-danger" v-if="cardSizeError">Deck size outside of range, must be between 1 and 52.</p>
                <div class="input-group">
                    <input type="number" class="form-control" v-model="deckSize" @keyup.enter="createDeck()" placeholder="" min="0" max="52" :disabled="inited">
                    <button class="btn btn-outline-primary" @click="createDeck()" v-if="!inited">Start</button>
                    <button class="btn btn-outline-primary" @click="resetDeck()" v-if="inited">Reset</button>
                </div>
            </div>
        </div>
    </div>
    <br>
    <div class="text-center" v-if="inited">
     <div class="container">
        <div class="row justify-content-sm-center">
                <div class="col col-lg-4">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" :style="{width: deckProgress() + '%'}" :aria-valuenow="deckProgress()" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </div>
        <br>
    <div class="container">
    <div class="row justify-content-sm-center">
        <div class="col col-lg-7">
    <swiper
        :modules="modules"
        :slides-per-view="1"
        :navigation = "{prevEl: '.btn-prev', nextEl: '.btn-next'}"
        :fade-effect="{crossFade: true}"
        @swiper="onSwiper"
        @slideNextTransitionStart="onSlideNextTransitionStart"
        @slidePrevTransitionStart="onSlidePrevTransitionStart"
    >
        <swiper-slide>
            <div class="row justify-content-sm-center">
                <div class="card text-bg-light mx-auto" style="width: 20rem;">
                    <img src="https://images.unsplash.com/photo-1529480544878-4e2cc822c103?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Start 0/{{deckSize}}</h5>
                        <p class="card-text">It's Gains O'Clock. Lets go!</p>
                        <button class="btn-next btn btn-outline-dark" >Next</button>
                    </div>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide v-for="card in deckBox">
            <div class="row justify-content-sm-center">
                <div class="card text-bg-light mx-auto" style="width: 20rem;">
                    <div class="card-body">
                        <h5 class="card-title">{{card.card}} of {{card.suite}}
                            <i v-if="card.suite === 'Clubs'" class="bi bi-suit-club-fill"></i>
                            <i v-if="card.suite === 'Spades'" class="bi bi-suit-spade-fill"></i>
                            <i v-if="card.suite === 'Diamonds'" class="bi bi-suit-diamond-fill"></i>
                            <i v-if="card.suite === 'Hearts'" class="bi bi-suit-heart-fill"></i>
                            ({{slideNumber}}/{{deckSize}})
                        </h5>
                        <p class="card-text text-left">
                            <ul>
                                <li v-for="exercise in card.exercises">
                                    {{exercise}}
                                </li>
                            </ul>
                        </p>
                        <div class="row justify-content-sm-center">
                            <div class="col col-lg-6"><button class="btn-prev btn btn-outline-dark">Previous</button></div>
                            <div class="col col-lg-6"><button class="btn-next btn btn-outline-dark">Next</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
             <div class="row justify-content-sm-center">
                <div class="card text-bg-light mx-auto" style="width: 20rem;">
                    <img src="https://images.unsplash.com/photo-1529480384838-c1681c84aca5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Workout Finished</h5>
                        <p class="card-text">Good Job</p>
                        <button class="btn-prev btn btn-outline-dark" onclick="scrollToBottom()">Previous</button>
                    </div>
                </div>
            </div>
        </swiper-slide>
    </swiper>
    </div>
    </div>
    </div>
  
    </div>
</template>

<script type="module">
    import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import {ref} from 'vue'
    import {Deck} from '../js/deck.js'
    

    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import 'swiper/css/scrollbar';

    let inited = ref(false);
    let deckSize = ref(1);
    let deckBox = ref([])
    let cardSizeError = ref(false);
    let slideNumber = ref(0)
    let slideCount
    function deckProgress() {
      return ((slideNumber.value - 1) / (slideCount-1)) * 100
    }

    function createDeck() {
        if (deckSize.value > 0 && deckSize.value < 53) {
            cardSizeError.value = false;
            let box = new Deck(deckSize.value)
            deckBox.value = box.returnDeck()
            console.log(deckBox)
            slideCount = deckSize.value + 1
            inited.value = true;
        } else {
            cardSizeError.value = true;
        }
    }

    function resetDeck() {
        deckBox.value = [];
        inited.value = false;
        slideNumber.value = 0
    }

    export default {
        components: {
            Swiper,
            SwiperSlide
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
                createDeck,
                inited,
                deckSize,
                resetDeck,
                deckBox,
                cardSizeError,
                slideNumber,
                slideCount,
                onSwiper,
                onSlideNextTransitionStart,
                onSlidePrevTransitionStart,
                navigationOptions,
                deckProgress,
                modules: [Navigation, Pagination, Scrollbar, A11y]
            }
        }
    }
</script>

<style scoped>
  .hide {
            display: none;
        }
    .text-left {
        text-align: left;
    }

    li {
        list-style-type: none;
    }
</style>
import {Deck} from './deck.js'
import { swiper, createSwiper, destroySwiper } from './swipe.js';

let deck;

function createDeck(size) {
    let deckObject = new Deck(size)
    deck = deckObject.returnDeck();
    for (let i = 0; i < deck.length; i++) {
        deck[i].id = i + 1
    }
    return deck
}

export default{
    data() {
        return {
            message: 'Cards Workout',
            submessage: 'This program is based off of Jeff Nippard\'s Card Workout',
            deck,
            currentCard: -1,
            deckSize: 0,
            decks: NaN,
            cardSizeError: false,
            newDeck: []
        }
    },
    methods: {
      createDeck() {
        if(this.deckSize > 0 && this.deckSize < 53) {
          this.currentCard = 0
          this.newDeck = createDeck(this.deckSize)
          this.decks = this.deckSize
        } else {
          return this.cardSizeError = true;
        }
        this.cardSizeError = false;
        /*createSwiper()
        swiper.on('slideChange', function() {
          alert("This here")
        });*/
      },
      resetDeck() {
        this.deckSize = 0
        this.decks = NaN
        this.currentCard = -1
        this.newDeck = []
        destroySwiper()
      }
    },
    computed: {
      deckProgress() {
        return ((this.currentCard-1)/this.deckSize)*100
      }
    }
}
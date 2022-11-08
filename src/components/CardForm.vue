<template>
    <div class="container">
        <div class="row justify-content-md-center">
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
    <div v-if="inited">
        
    </div>
</template>

<script type="module">
    import {ref} from 'vue'
    import {Deck} from '../js/deck.js'

    let inited = ref(false);
    let deckSize = ref(1);
    let deckBox = ref([])
    let cardSizeError = ref(false);

    function createDeck() {
        if (deckSize.value > 0 && deckSize.value < 53) {
            cardSizeError.value = false;
            let box = new Deck(deckSize.value)
            deckBox.value = box.returnDeck()
            console.log(deckBox)
            inited.value = true;
        } else {
            cardSizeError.value = true;
        }
    }

    function resetDeck() {
        deckBox.value = [];
        inited.value = false
    }

    export default {
        setup() {
            return {
                createDeck,
                inited,
                deckSize,
                resetDeck,
                deckBox,
                cardSizeError
            }
        }
    }
</script>
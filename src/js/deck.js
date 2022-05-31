import boxFile from './deck.json';
// let boxFile = require('./deck.json')

export class Deck {
    constructor(size) {
        this.size = size;
    }

    shuffle(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck
    }

    returnDeck() {
        this.createDeck()
        return this.deck
    }

    createDeck() {
        let shuffledDeck = this.shuffle(boxFile)
        this.deck = shuffledDeck.slice(0, this.size);

        for (let i = 0; i < this.size; i++) {
            this.deck[i].id = i + 1
        }
    }

}
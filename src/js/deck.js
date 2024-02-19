import { CreateDeck } from "./createdeck";

export class Deck {
    constructor(size) {
        this.size = size;
    }

    returnDeck() {
        this.createDeck()
        return this.deck
    }

    createDeck() {
        this.deck = CreateDeck(this.size);

        for (let i = 0; i < this.size; i++) {
            this.deck[i].id = i + 1
        }
    }

}
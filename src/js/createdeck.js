// @ts-check

/**
 * @type {Array.<string>}
 */
const suites = ["Spades", "Clubs", "Hearts", "Diamonds"]

/**
 * @type {Map<string, Array.<string>>}
 */
const suitesExercises = new Map([
    ["Spades", ["Pushups", "Diamond Pushups", "Incline Pushups", "Decline Pushups"]],
    ["Clubs", ["Table Rows", "Pull Ups", "Deadlifts"]], 
    ["Hearts", ["Military Squats", "Walking Lunges", "Nordic Hamstring Curls"]],
    ["Diamonds", ["Crunches", "Calf Raises", "Mountain Climbers"]]
]);

/**
 * @type {Array.<string>}
 */
const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]

/** 
 * @type {Map<string, number>}
*/
const cardValues = new Map([
    ["2", 5],
    ["3", 6], 
    ["4", 7], 
    ["5", 8],
    ["6", 9],
    ["7", 10],
    ["8", 11],
    ["9", 12],
    ["10", 13],
    ["Jack", 15],
    ["Queen", 18],
    ["King", 20],
    ["Ace", 0]
]);

class Card {
    /**
     * @param {number} id Id of the card for the app
     */
    id = 0;

    /**
     * @param {string} name The name of the card
     * @param {string} suite The suite of the card
     * @param {number} value The value of the card
     * @param {Array.<string>} exercises The exercises associated with the card
     * @param {string} description The name of the card
     */
    constructor(name, suite, value, exercises, description) {
        this.name = name
        this.suite = suite;
        this.value = value;
        this.exercises = exercises;
        this.description = description;
    }
}

/** 
* Returns deck of size deckSize 
* @param {number} deckSize The size of the deck
* @returns {Array.<Card>}
*/
function CreateDeck(deckSize) {
    /** 
    * @type {Array.<Card>} 
    */
    let deck = [];

    for (let i = 0; i < deckSize; i++) {
        let newCardSuite = suites[Math.floor(Math.random()*suites.length)];
        let newCardExercises = suitesExercises.get(newCardSuite);
        if (newCardExercises === undefined) {
            continue;
        }
        let newCardExerciseList = [...newCardExercises];
        let newCardName = cards[Math.floor(Math.random()*cards.length)];
        let newCardValue = cardValues.get(newCardName);
        if (newCardValue === undefined) {
            continue;
        }

        if (newCardValue === 0) {
            newCardExerciseList = ["Rest for one minute"]
        } else {
            for (let j = 0; j < newCardExerciseList.length; j++) {
                newCardExerciseList[j] = newCardValue + " " + newCardExerciseList[j]
            }
        }
        
        let newCard = new Card(
            newCardName,
            newCardSuite, 
            newCardValue,
            newCardExerciseList,
            newCardName + " of " + newCardSuite
        );

        if (deck.find(c => c.value == newCard.value && c.suite == newCard.suite)) {
            i--;
            continue;
        }

        // Prevent back to back resting
        if (deck.length > 1 && deck[deck.length-1].value === 0 && newCard.value === 0) {
            i--;
            continue;
        }

        deck.push(newCard); 
    }

    return deck;
}

export {CreateDeck}
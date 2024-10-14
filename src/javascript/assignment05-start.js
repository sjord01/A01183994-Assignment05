/*
Take note of the comments throughout this page
Follow their directions as to what to code and where
*/


/*
PART 1a
---------------------------------------
DEFINE A Card OBJECT
---------------------------------------
*/

class Card {
    constructor(face, value, suit) {
        this.face = face;
        this.value = value;
        this.suit = suit;
    }

    describeSelf() {
        const cardImagePath = `./src/assets/images/card_images/${this.face.toLowerCase()}_of_${this.suit.toLowerCase()}s.svg`;
        return `<figure class="b-game-card"><div class="b-game-card__cover"><img src="${cardImagePath}" alt="${this.face} of ${this.suit}s. Value: ${this.value}" class="card-image"></div></figure>`;
    }
}


/*
PART 1b
INSTANTIATE A Card OBJECT and 
display the value returned by the describeSelf() function
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Function to create and display a card
    function displayCard( selector, card ) {
        const container = document.querySelector(selector);
        const content = card ? card.describeSelf() : 'Card information unavailable';
        
        container 
            ? container.innerHTML = content
            : console.warn(`Container with selector '${selector}' not found`);
    };

    // Create the card
    const kingOfHearts = new Card("King", 10, "Heart");

    // Display the card
    displayCard('.p1-card-object', kingOfHearts);
});





/*
PART 2a
---------------------------------------
DEFINE A Deck OBJECT
---------------------------------------
Note: Most of the Deck class code should
      not be modified in any way. The only
      Deck code that needs changing is inside the 
      constructor() function. Change nothing else in Deck. 
*/

class Deck {
    constructor() {
        //build a deck of Card objects
        //prepare arrays for all the aspects of a Card
        this.faces = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
        this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
        this.suits = ["Spade", "Club", "Heart", "Diamond"];
        
        //prepare an array to store the Cards in
        this.cards = [];

        //use nested 'for' loops
        //build the Deck of Cards
        //one iteration for each suit
        //one iteration for each face/value pair
        //each time, instantiate a new Card Object
        //add new cards to the using Array.push()       
        for (let suit of this.suits) {
            for (let i = 0; i < this.faces.length; i++) {
                this.cards.push(new Card(this.faces[i], this.values[i], suit));
            }
        }
    }
}  


/*
DEFINING Deck OBJECT FUNCTIONS
no changes need to be made 
in the rest of this Deck class definition.
*/
Deck.prototype.dealCard = function(){
     //remove and return the first item in array
    //and shift the index of remaining items 
    const card = this.cards.shift();
    //if we have run out of cards...
    if(card === undefined){
        return 'No more cards';
    }else{
        //return the next card in the array
        return card;
    }         
}
Deck.prototype.shuffle = function(){
 
    let j, x, i;
    //loop through the entire array
    for (i = this.cards.length - 1; i > 0; i--) {
        //randomly select a card
        j = Math.floor(Math.random() * (i + 1));
        x = this.cards[i];
        //resort cards
        this.cards[i] = this.cards[j];
        this.cards[j] = x;
    }
    //return the randomly sorted array
    return this.cards;       
}
Deck.prototype.describeSelf = function(){
    let description = "";
    description += `This deck of cards has <em><span class="txt-blue">${this.cards.length} card(s)</span></em>  in it`;
    //return the above statement 'description'
    return description;
}
/*
---------------------------------------
end Deck class
---------------------------------------
*/

/*
PART 2b
INVOKE AND DISPLAY Deck OBJECT FUNCTIONS
*/

/*
PART 2b
INVOKE AND DISPLAY Deck OBJECT FUNCTIONS
*/

document.addEventListener('DOMContentLoaded', function() {
    const p2Container = document.querySelector('.p2-card-object');

    if (p2Container) {
        const deck = new Deck();

        //invoke and display the Deck function describeSelf() here...
        let content = '<h3>New Deck Created:</h3>';
        content += `<p>${deck.describeSelf()}</p>`;

        //randomize the cards in the deck using shuffle()
        content += '<h3>Shuffling Deck:</h3>';
        deck.shuffle();
        content += '<p>Deck has been shuffled.</p>';

        //take the next card from the deck using dealCard()
        content += '<h3>Dealing First Card:</h3>';
        const dealtCard1 = deck.dealCard();
        
        //invoke and display the Deck function describeSelf() AGAIN here...
        content += dealtCard1.describeSelf();
        content += `<p>${deck.describeSelf()}</p>`;

        //take the next card from the deck using dealCard()
        content += '<h3>Dealing Second Card:</h3>';
        const dealtCard2 = deck.dealCard();

        //invoke and display the Deck function describeSelf() AGAIN here...
        content += dealtCard2.describeSelf();
        content += `<p>${deck.describeSelf()}</p>`;

        content += '<h3>Dealing Third Card:</h3>';
        const dealtCard3 = deck.dealCard();
        content += dealtCard3.describeSelf();
        content += `<p>${deck.describeSelf()}</p>`;

        p2Container.innerHTML = content;
    } else {
        console.error("Couldn't find or target the container with class 'p2-card-object'");
    }
});


/*
PART 3a
---------------------------------------
DEFINE A Player OBJECT
---------------------------------------
*/

class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    addCardToHand(card) {
        this.hand.push(card);
    }

    describeSelf() {
        const playerImagePath = './src/assets/images/player_images/';
        let description = `<article class="player-profile">
                            <div class="flex">
                            <img class="player-img" src='${playerImagePath}${this.name.toLowerCase()}.webp' alt='player ${this.name}'>
                            <h3>${this.name}'s Hand:</h3>
                            </div>
                            <ul class="card-list">`;
        
        this.hand.forEach(card => {
            if(card instanceof Card) {
                description += `<li>${card.describeSelf()}</li>`;
            } else {
                description += `<li>Unknown Card</li>`;
            }
        });
        
        description += `</ul></article>`;
        return description;
    }
}


/*
PART 3b
Instantiate at least two Player OBJECTs
Instantiate a new Deck and shuffle() it
Deal five Cards to each Player
Display each players hand to the browser
*/

document.addEventListener('DOMContentLoaded', function() {
    const p3Container = document.querySelector('#p3-card-object-person1');

    if (p3Container) {
        // Create players
        const player1 = new Player("Donald");
        const player2 = new Player("Sza");
        const player3 = new Player("Maya")

        // Create and shuffle a new deck
        const deck = new Deck();
        deck.shuffle();

        // Deal 5 cards to each player
        for (let i = 0; i < 5; i++) {
            player1.addCardToHand(deck.dealCard());
            player2.addCardToHand(deck.dealCard());
            player3.addCardToHand(deck.dealCard());
        }

        // Display players' hands
        let content = '<p>Now instantiating a few Player Objects and dealing them five cards each...</p><h3>Players and Their Hands</h3>';
        content += player1.describeSelf();
        content += player2.describeSelf();
        content += player3.describeSelf();

        // Display remaining cards in the deck
        content += `<p>${deck.describeSelf()}</p>`;

        p3Container.innerHTML = content;
    } else {
        console.error("Couldn't find the container with id 'p3-card-object-person1'");
    }
});
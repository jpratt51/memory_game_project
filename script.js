const cards = document.querySelectorAll(".card");

let cardsMatch = 0;
let flippedCards = 0;
let cardOne, cardTwo;
let disableDeck = false;
let header = document.querySelector('h1');
let scoreBoard = document.querySelector('#scoreboard');

//Add click event to all cards
cards.forEach(card => { 
  card.addEventListener("click", flipCard);
});

function flipCard(event) {
  // getting user clicked card
  let clickedCard = event.target; 
  if(clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.remove('greyOut');
    //increment number of cards flipped
    flippedCards ++;
    //set current score display
    scoreBoard.textContent = `Current Score : ${flippedCards}`;

        if (!cardOne) {
          // return the cardOne value to clickedCard
          return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        //compare class Lists of cardOne and cardTwo to see if they're a match
        let cardOneColor = cardOne.classList.value,
        cardTwoColor = cardTwo.classList.value;
        //call match function
        matchCards(cardOneColor, cardTwoColor);
      }
    }

//function to check if cardOne and cardTwo match
function matchCards(cardOneColor, cardTwoColor) {
  if(cardOneColor === cardTwoColor) {
    cardsMatch++; //increment cardsMatch;
    if (cardsMatch === 8) {
        //wait 2 seconds after game complete to shuffle cards
        setTimeout(() => {
            let finalScore = flippedCards;
            //check old record from local storage. If no record found, return empty string
            let oldRecord = JSON.parse(localStorage.getItem('record')) || "";
            let newRecord = finalScore;
            //compare new record to old record from local storage
            //set record to lowest number
            if (newRecord < oldRecord) {
              record = newRecord;
            }
            else if (oldRecord < newRecord) {
              record = oldRecord;
            }
            //store new record to local storage
            localStorage.setItem('record', JSON.stringify(record));
            //display record alongside current score
            scoreBoard.textContent = `Current Score : ${flippedCards} | Record: ${record}`;
            //reset game
            setTimeout (() => {window.location.reload()}, 2500);
    }, 1500); 
}
    //else
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    //resetting cardOne and cardTwo values
    cardOne = cardTwo = ""; 
    return disableDeck = false;
  }
  //if two cards are not matched
  //remove colorFill class and add greyOut class to cardOne
  setTimeout(() => {
    cardOne.classList.add('greyOut');
    cardTwo.classList.add('greyOut');
    //resetting cardOne and cardTwo values
    cardOne = cardTwo = ""; 
    disableDeck = false;
  }, 1500);
}

function shuffleCards() {
    //reset matched pairs
    let cardsMatch = 0;
    //reset flipped cards
    flippedCards = 0;
    let cardOne, cardTwo;
    let colorArr = ['red','blue','green','orange','purple','yellow','pink','teal','red','blue','green','orange','purple','yellow','pink','teal']
    //sort array randomly
    colorArr.sort(() => Math.random() > 0.5 ? 1 : -1) 
    cards.forEach((card, index) => {
        //remove all but the card class from each card
        card.className = "card";
        //add random color class and greyOut class back to each card
        card.classList.add(colorArr[index], 'greyOut')
        //reattach click event listener
        card.addEventListener("click", flipCard);
      })
}

//set header as reset button
header.addEventListener('click', function() {
  window.location.reload()
});

scoreBoard.textContent = `Current Score : ${flippedCards}`;

shuffleCards();
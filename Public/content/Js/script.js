//Challenge 002: Blackjack Game

let blackjackGame = {
    'you': {'scoreSpan': '#player-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-result', 'div': '#dealer-box', 'score': 0},
    'Cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5':5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('content/sounds/hit.mp3');
const winSound = new Audio('content/sounds/win.mp3');
const loseSound = new Audio('content/sounds/lose.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `content/images/blackjackImages/${card}.png`;
        cardImage.style.width = "100px";  
        cardImage.style.padding = '10px';
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    } 
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true ) {
        
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (i=0; i < yourImages.length; i++) {
            yourImages[i].remove(); 
        }

        for (i=0; i < dealerImages.length; i++) {
            dealerImages[i].remove(); 
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#player-result').textContent = 0;
        document.querySelector('#dealer-result').textContent = 0;
        document.querySelector('#player-result').style.color = '#ffffff';
        document.querySelector('#dealer-result').style.color = '#ffffff';

        document.querySelector('#blackjack-result').textContent = "Let's Play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true;
        
        }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['Cards'][randomIndex];
}  

function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
} 

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST'; 
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'; 
    } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep (ms) {
    return new Promise(resolve => setTimeout (resolve, ms));
}

// Dealer Logic

async function dealerLogic () {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
    }   

  //  if (DEALER['score'] > 15) {
        blackjackGame['turnsOver'] = true;
        let winner = computeWinner();
        showResult(winner);
 //   }
}

// Compute Winner and return who just won
// Update the wins, draws and losses

function computeWinner () {
    let winner;

    if (YOU['score'] <= 21) {
        //condition: higher score than dealer or when  dealer busts but  you're 21 or under
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            console.log('You Won!');
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            console.log('You Lost!');
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
            console.log('You drew');
        }

        //condition: when user busts but dealer doesn't
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        console.log('You Lost!');
        winner = DEALER; 

    // condition: when you AND the dealer busts    
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
        console.log('You Drew');
    }

    return winner;
}

function showResult (winner) {
    let message, messageColor;

        if (blackjackGame['turnsOver'] === true) {

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            loseSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            message = 'black';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;

        }
}


//Challenge 003: CountDown

const countdown = () => {
    //Indication of future and present date, and also the gap between them.
    const countDate = new Date('October 20, 2021 23:59:00').getTime();
    const nowDate = new Date().getTime();
    const gap = countDate - nowDate;
    
    //How to define the time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    //Calculations for days
    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);
    console.log(textDay, textHour, textMinute, textSecond);

    //Display on the front
    document.querySelector('.day').textContent = textDay;
    document.querySelector('.hour').textContent = textHour;
    document.querySelector('.minute').textContent = textMinute;    
    document.querySelector('.second').textContent = textSecond;
}

setInterval(countdown, 1000);
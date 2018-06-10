let suits = ["Hearts","Clubs","Diamond","Spades"],

values =["Ace","Two","Three","Four",
            "Five","Six","Seven","Eight",
             "Nine","Ten","Jack","Queen","King"],


loosePhrase = "You Loose!!",
winPhrase = "Yeah!! You Win!!",
deck,
dealerCards,
player1Cards,
dealerDisplay = false,
playerCash = 500,
dealerCash = 500,
tablebet =0,
betValue = 0;
    

//Register click  event to game-button.
let newGameBtn = document.getElementById('new-game-button');
let hitBtn = document.getElementById('hit-button');
let stayBtn = document.getElementById('stay-button');
//let betBtn = document.getElementById('bet-button');

let statusParagraph = document.getElementById("status");
let playerBox = document.getElementById('playerBox');
let dealerBox = document.getElementById('dealerBox');
let betBox = document.getElementById('betBox');
let dealerScore= document.getElementById('Dealerscore');
let dealerTitle = "<br/><b>Dealer Hand:</b>";
let yourTitle = "<br/><b>Your Hand:</b>";
let playerScorePlace = document.getElementById("Playerscore");
let dealerScorePlace = document.getElementById("Dealerscore");

let playerCashPlace = document.getElementById("Playercash");
let dealerCashPlace = document.getElementById("Dealercash");
let betValueplace = document.getElementById('betValueSpan');
//let tableBetPlace = document.getElementById('tableBetValue');
let dealerBet = document.getElementById('dealerBet');
let playerBet = document.getElementById('playerBet');


let bet10Btn = document.getElementById('bet10btn');
let bet25Btn = document.getElementById('bet25btn');
let bet50Btn = document.getElementById('bet50btn');
let betBtn = document.getElementById('bet-button');

hitBtn.addEventListener('click', hitAnotherCard);
stayBtn.addEventListener('click',stayWithMyHand);
//betBtn.addEventListener('click',stayWithMyHand);

function cleanup(){
    playerBet.classList.remove('playerbetanimation');
    playerBet.classList.remove('wonanimation');
    dealerBet.classList.remove('wonanimation');
    dealerBet.classList.remove('lostanimation');
    playerBet.classList.remove('lostanimation');
    playerBet.className += " hide";
    dealerBet.className += " hide";
    dealerBet.classList.remove('dealerbetanimation');
    
    playerBet.classList.remove('bet10');
    playerBet.classList.remove('bet25');
    playerBet.classList.remove('bet50');
    dealerBet.classList.remove('bet10');
    dealerBet.classList.remove('bet25');
    dealerBet.classList.remove('bet50');
    
}

updateCash();

newGameBtn.addEventListener('click',function(){
    clearPlayerCard();
    clearDealerCard();
    cleanup();
    dealerScorePlace.classList.remove("scoreplace");
    dealerScorePlace.innerHTML = " ";
    statusParagraph.innerHTML = " ";
    statusParagraph.classList.remove("status");
    newGameBtn.className += " hide";
    bettingBox();
});

function updateCash(){
    
    playerCashPlace.innerHTML = '$ ' + playerCash;
    dealerCashPlace.innerHTML = '$ ' + dealerCash;
    
}

function bettingBox(){
    betValue = 0;
    betValueplace.innerHTML = "";
    betBox.classList.remove('hide');

    
    
    bet10Btn.addEventListener('click',function(){
        betValue = 10;
        betdisplay(betValue);
    });
    bet25Btn.addEventListener('click',function(){
        betValue = 25;
        betdisplay(betValue);
    });
    bet50Btn.addEventListener('click',function(){
        betValue = 50;
        betdisplay(betValue);
    });
    
 betBtn.onclick=function betting(){

        
        betBox.classList.add('hide');
        playerCash = playerCash - betValue; 
        dealerCash = dealerCash - betValue;
        betingaction(betValue);
        betValue = 2* betValue;
        serveCards();
        updateCash();
        betBtn.classList.add('hide');
//        tableBetPlace.innerHTML = '$ ' + betValue;
    }
    
    
}

function betingaction(bV){  // animation for the bets 
    dealerBet.classList.remove("hide");
    playerBet.classList.remove("hide");
    if (bV == 10){
        dealerBet.className += ' bet10';
        playerBet.className += ' bet10';
    }
    else if (bV == 25){
        dealerBet.className += ' bet25';
        playerBet.className += ' bet25';
    }
    else{
        dealerBet.className += ' bet50';
        playerBet.className += ' bet50';
    }
        
    playerBet.className += " playerbetanimation";
    playerBet.innerHTML = '$ '+betValue;
    dealerBet.className += " dealerbetanimation";
    dealerBet.innerHTML = '$ '+betValue;

}

function betdisplay(betV){ //displays the selected bet inside the betting box
        
        betValueplace.innerHTML = 'Bet: $ '+betV;
        betBtn.classList.remove('hide');
        
}

function createDeck(){
    let deck = [];
    for(let suitsIndex = 0; suitsIndex < 4; suitsIndex++){
        for(let valueIndex = 0; valueIndex < 13; valueIndex++)
        {
                //console.log("Your hand");
            let card= {
                Suit :suits[suitsIndex],
                Value :values[valueIndex]
            }
            deck.push(card);
        }
    }
    return deck;
}
function suffleDeck(deck){
    for(let i = 0; i<deck.length; i++){
        let swapIndex = Math.trunc(Math.random()*deck.length);
      
        let tmp = deck[swapIndex];
        deck[swapIndex]= deck[i];
        deck[i]=tmp;
    }
}
function serveCards(){
//    alert("serving");
    deck=[];
    dealerCards=[];
    player1Cards=[];
    
    deck = createDeck();
    suffleDeck(deck);
    
    manageButton();
    //serve Two Cards for each
    player1Cards.push(getTopCard());
    dealerCards.push(getTopCard());
    dealerBox.appendChild(setCard(getCardString(dealerCards[0])));
    player1Cards.push(getTopCard());
    dealerCards.push(getTopCard());
    dealerBox.appendChild(backCard());
    
    displayCards(player1Cards);
    //displayCards(dealerCards);
    
    bust();
}
function backCard(){
    var newCard = document.createElement('div');
    newCard.className += 'cards';
    newCard.style.backgroundImage= 'url("Cards.gif")';
    newCard.style.backgroundPosition = 0 + "px" + " " + 118 + "px";
    return newCard;
}
function getNumValue(valueString){
    let num =0;
    switch(valueString){
        case 'Ace':
            num = 1;
            break;
        case 'Two':
            num = 2;
            break;            
        case 'Three':
            num = 3;
            break;
        case 'Four':
            num = 4;
            break;
            
        case 'Five':
            num = 5;
            break;
        case 'Six':
            num = 6;
            break;
        case 'Seven':
            num = 7;
            break;
        case 'Eight':
            num = 8;
            break;
        case 'Nine':
            num = 9;
            break;
        case 'Ten':
        case 'Jack':
        case 'Queen':
        case 'King':
            num = 10;
            break;
    }
    
    return num;
    
}

function manageButton(){
    hitBtn.className = 'show';
    stayBtn.className = 'show';
}

function getTopCard(){
    return (deck.shift());
}

function getCardString(card){
    return card.Value + " of " + card.Suit;
}

function getHandSum(cards){
    let sum = 0;
    for(let i =0; i < cards.length; i++){
//          Aces contributes 1 or 11 to sum depending on which benefits us most
//
//        if (cards[i].Value === 'Ace' && sum + 10 <= 21){
//            sum += 10;
//        }
        
        if ( cards[i].Value === 'Ace' ){
            
            let len = (cards.length - 1) 
            var temp = cards[i].Value;
            cards[i].Value = cards[len].Value;
            cards[len].Value = temp;
        }
        sum = sum + getNumValue(cards[i].Value);

        if(cards[i].Value === 'Ace'&& sum + 10 <= 21){
            sum += 10;
        }
        
    }
    return sum;
}

function getXPos(valueCard){
    let x =0;
    switch(valueCard){
        case 'Ace':
            x = 82;
            break;
        case 'Two':
            x = 0;
            break;            
        case 'Three':
            x = -81;
            break;
        case 'Four':
            x = -162;
            break;
            
        case 'Five':
            x = -243;
            break;
        case 'Six':
            x = -323;
            break;
        case 'Seven':
            x = -405;
            break;
        case 'Eight':
            x = -485;
            break;
        case 'Nine':
            x = -566;
            break;
        case 'Ten':
            x = -647;
            break;
        case 'Jack':
            x = -728;
            break;
        case 'Queen':
            x = -809;
            break;
        case 'King':
            x = -891;
            break;
        default:
            x = 0;
    }
    
    return x;
    
}

function getYPos (suitCard){
    var y = 0;
    
    switch(suitCard){
        case 'Hearts':
            y = 0;
            break;
        case 'Diamond':
            y = -118;
            break;
        case 'Clubs':
            y = -235;
            break;
        case 'Spades':
            y = 235;
            break;
        default:
            y = 118;
    }
    return y;
}

function setCard(card){
    var cardName = card.split(" "),
        xpos = getXPos(cardName[0]),
        ypos = getYPos(cardName[2]);   

    var newCard = document.createElement('div');
    newCard.className += 'cards';
    newCard.style.backgroundPosition = xpos + "px" + " " + ypos + "px";
    return newCard;
}

function displayCards(card){
    
    for(let i = 0; i<card.length ;i++){
        show(card,getCardString(card[i])); 
    }
}

function show(whose,card){

    let newCard = setCard(card);

    if (whose == player1Cards){
        playerBox.appendChild(newCard);
    }
    else{
        dealerBox.appendChild(newCard);
    }
    
}

function bust(){
    
    let myHandSum = getHandSum(player1Cards);
    updatePlayerScore(myHandSum);
    if(myHandSum>21){
        writeStatus(loosePhrase);
//        tableBetPlace.classList.add('loseanimation');
        updateDealerScore(getHandSum(dealerCards));
        endGame();
        lostRound();
        dealerCashPlace.className += ' updategrowcash';

    } 
}

function lostRound(){
    playerBet.classList.remove('playerbetanimation');
    dealerBet.classList.remove('dealerbetanimation');

    dealerBet.className += " lostanimation";
    playerBet.className += " lostanimation";
    dealerCash = dealerCash + betValue;
    updateCash();
}

function wonRound(){
    playerBet.classList.remove('playerbetanimation');
    dealerBet.classList.remove('dealerbetanimation');

    dealerBet.className += " wonanimation";
    playerBet.className += " wonanimation";
    playerCash = playerCash + betValue;
    updateCash();

}
function clearPlayerCard(){
    playerBet.classList.remove('playerbetanimation');
    dealerBet.classList.remove('dealerbetanimation');

    while(playerBox.firstChild){
        playerBox.removeChild(playerBox.firstChild);
//        player1Cards.pop();
    }    
}

function clearDealerCard(){
    while(dealerBox.firstChild){
        dealerBox.removeChild(dealerBox.firstChild);
//        dealerCards.pop();
    }    
}
function endGame(){
    clearDealerCard();
    displayCards(dealerCards);
    hitBtn.className = " hide";
    stayBtn.className = " hide";
    newGameBtn.classList.remove("hide");
}


function hitAnotherCard(){
    
    let newCard = getTopCard();
    player1Cards.push(newCard); 
    playerBox.appendChild(setCard(getCardString(newCard)));
    bust();
}

function stayWithMyHand(){
    let skipFlag = 0;
    let myScore = getHandSum(player1Cards);
    let dealerScore = getHandSum(dealerCards);
    
    if (dealerScore < myScore){
        while(dealerScore < myScore){
            dealerCards.push(getTopCard());
            dealerScore = getHandSum(dealerCards);
            if(dealerScore > 21 ){
                writeStatus(winPhrase);
                skipFlag = 1;
//                tableBetPlace.classList.add('winanimation');
//                betValueplace.classList.remove("tableBetSpan");
                endGame();
                updateDealerScore(dealerScore);
                wonRound();
                playerCashPlace.className += ' updategrowcash';

                break;
            }
        }
     if(dealerScore == myScore){
            writeStatus(loosePhrase);
//            tableBetPlace.classList.add('loseanimation');
            endGame();
            updateDealerScore(dealerScore);
            lostRound();
            dealerCashPlace.className += ' updategrowcash';

        }
        if(dealerScore > myScore && skipFlag != 1 ){
            writeStatus(loosePhrase);
            endGame();
            updateDealerScore(dealerScore);
            lostRound();
            dealerCashPlace.className += ' updategrowcash';

        }
    }
    else{
        
        writeStatus(loosePhrase);
        updateDealerScore(dealerScore);
        endGame();
        lostRound();
        dealerCashPlace.className += ' updategrowcash';
    }
    
}
function updatePlayerScore(playerScore){
    //let playerScore = getHandSum(player1Cards);
    playerScorePlace.innerHTML = " ";
    playerScorePlace.innerHTML = playerScore;
    
    
}
function updateDealerScore(dealerScore){
//    let dealerScore = getHandSum(dealerCards);
    dealerScorePlace.classList.add("scoreplace");
    dealerScorePlace.innerHTML = dealerScore;
    

}


function writeStatus(winLossString){
    statusParagraph.className = "status";
    if (winLossString == loosePhrase){
        statusParagraph.classList.add( "loseDecor");
    }
    else{
        statusParagraph.classList.add("winDecor");
    }
    statusParagraph.innerHTML = winLossString;
}
//////////////////////////^^^     SAFE ZONE   ^^^///////////////////////////////////////////

let dealerCount = 0
let dealerAceCount = 0
let playerCount = 0
let playerAceCount = 0
let dealerHidden
let deck = []

/*
* set up deck -> shuffle deck
* Draw a hidden card and a visible card for dealer
* Draw 2 cards for player
* Check for blackjack
* Disable deal button
* Enable hit/stand button
 */
function initiateGame() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < types.length; j++) {
            deck.push(values[i] + "-" + types[j])
        }
    }
    shuffleDeck()

    // Dealer draw 2 cards
    dealerHidden = deck.pop()
    draw(dealerHidden, "Dealer")
    let dealerSecond = deck.pop()
    draw(dealerSecond, "Dealer")
    let cardImg1 = document.createElement("img")
    cardImg1.src = "./Images/Pokercards/" + dealerSecond + ".png"
    document.getElementById("dealer-cards").append(cardImg1)

    // Player draw 2 cards
    let playerFirst = deck.pop()
    draw(playerFirst, "Player")
    let cardImg2 = document.createElement("img")
    cardImg2.src = "./Images/Pokercards/" + playerFirst + ".png"
    document.getElementById("player-cards").append(cardImg2)
    let playerSecond = deck.pop()
    draw(playerSecond, "Player")
    let cardImg3 = document.createElement("img")
    cardImg3.src = "./Images/Pokercards/" + playerSecond + ".png"
    document.getElementById("player-cards").append(cardImg3)

    document.getElementById("hit").style.visibility = "visible"
    document.getElementById("stand").style.visibility = "visible"
    document.getElementById("deal").style.visibility = "hidden"
    checkBlackJack()

}

// Randomize deck array
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

// Check if either user has a blackjack
function checkBlackJack() {
    if ( dealerCount == 21 && playerCount == 21){
        document.getElementById("result").innerText = "Both blackjack! Push!"
        gameFinished()
    }
    if (dealerCount == 21) {
        document.getElementById("result").innerText = "Dealer blackjack! You lose!"
        gameFinished()
    }
    if (playerCount == 21) {
        document.getElementById("result").innerText = "Player blackjack! You win 1.5x!"
        gameFinished()
    }
}

/*
* Player draws card and show on screen
 */
function hit() {
    console.log(playerCount)
    let playerDraw = deck.pop()
    draw(playerDraw, "Player")
    let cardImg = document.createElement("img")
    cardImg.src = "./Images/Pokercards/" + playerDraw + ".png"
    document.getElementById("player-cards").append(cardImg)

    // minus ace count
    if ( playerCount > 21 && playerAceCount > 0){
        playerCount-=10
        playerAceCount--
    }
    // check bust
    if ( playerCount > 21 && playerAceCount == 0){
        document.getElementById("result").innerText = "You busted! You lose!"
        gameFinished()
    }
}

// When game is finished, show reset button and hide the other buttons
// Show dealer hidden card
function gameFinished(){
    document.getElementById("hiddenCard").src = "./Images/Pokercards/" + dealerHidden + ".png"
    document.getElementById("hit").style.visibility = "hidden"
    document.getElementById("stand").style.visibility = "hidden"
    document.getElementById("reset").style.visibility = "visible"
}

/*
* Dealer draw till 17 or draw till it busts player or it bust himself
* Compare point between dealer and player
 */
function stand(){

    while ( dealerCount < 17 ) {
        let dealerDraw = deck.pop()
        draw(dealerDraw, "Dealer")
        let cardImg = document.createElement("img")
        cardImg.src = "./Images/Pokercards/" + dealerDraw + ".png"
        document.getElementById("dealer-cards").append(cardImg)
    }

    if ( dealerCount > 21 && dealerAceCount > 0){
        dealerCount-=10
        dealerAceCount--
        stand()
    }

    else if ( dealerCount > 21 && playerAceCount == 0) {
        document.getElementById("result").innerText = "Dealer busted! You win!"
        gameFinished()
    }

    else if ( dealerCount == playerCount ){
        document.getElementById("result").innerText = "Push!"
        gameFinished()
    }

    else if ( dealerCount > playerCount) {
        document.getElementById("result").innerText = "Dealer beat you! You lose!"
        gameFinished()
    }

    else{
        document.getElementById("result").innerText = "You beat dealer! You win!"
        gameFinished()
    }
}

// Draw card and update user count and user ace count
function draw(card, userType) {
    let data = card.split("-");
    let value = parseInt(data[0]);
    if (isNaN(value)) {
        if (data[0] == "A") {
            if (userType === "Player") {
                playerAceCount++
                playerCount += 11
                return
            }
            if (userType === "Dealer") {
                dealerAceCount++
                dealerCount += 11
                return
            }
        } else {
            if (userType === "Player") {
                playerCount += 10
                return
            }
            if (userType === "Dealer") {
                dealerCount += 10
                return
            }
        }
    }
    if (userType === "Player") {
        playerCount += value
        return
    }
    if (userType === "Dealer") {
        dealerCount += value
        return
    }
}

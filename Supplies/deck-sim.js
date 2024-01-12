// Initialize empty draw and discard piles
let drawPile = [];
let discardPile = [];

// Function to create the deck based on suit counts
function createDeck() {
    drawPile = [];
    
    addSuit('lore');
    addSuit('empathy');
    addSuit('harmony');
    addSuit('grace');
    addSuit('power');
        
    updateDrawPileCount();

    debugger
    const totalSuitCount = parseInt(document.getElementById('lore').value) +
        parseInt(document.getElementById('empathy').value) +
        parseInt(document.getElementById('harmony').value) +
        parseInt(document.getElementById('grace').value) +
        parseInt(document.getElementById('power').value);

    if (totalSuitCount > 25) {
        const buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }

        const errorBox = document.getElementById('error-box');
        errorBox.innerText = 'FUCK';
    }
    else {

        const buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
        }

        const errorBox = document.getElementById('error-box');
        errorBox.innerText = '';
    }
}

function addSuit(suitId) {
    const count = document.getElementById(suitId).value;
    for (let i = 0; i < count; i++) {
        drawPile.push(suitId);
    }
}

// Function to add an injury suit
function addInjurySuit() {
    let count = parseInt(document.getElementById('injury').value);
    count--;

    if (count === 0) {
        alert('No more injuries remaining.');
    }

    discardPile.push('Injury');

    document.getElementById('injury').value = count;

    updateDrawPileCount();
}
function addRelicSuit() {

    const relicCard = 'Relic';
    const existingRelicCard = discardPile.find(card => card.includes('Relic'));
    const existingRelicCardInDrawPile = drawPile.find(card => card.includes('Relic'));

    if (existingRelicCard || existingRelicCardInDrawPile) {
        alert('Your relic has already been used');
        return;
    }

    discardPile.push(relicCard);

    updateDrawPileCount();

}

// Function to treat an injury suit
function treatInjurySuit() {
    const count = parseInt(document.getElementById('injury').value);
    const injuryCard = discardPile.find(card => card.includes('Injury'));
    
    if (injuryCard) {
        discardPile.splice(discardPile.indexOf(injuryCard), 1);
        document.getElementById('injury').value = count + 1;
        updateDrawPileCount();
    } else {
        const injuryCardInDrawPile = drawPile.find(card => card.includes('Injury'));
        if (injuryCardInDrawPile) {
            drawPile.splice(drawPile.indexOf(injuryCardInDrawPile), 1);
            document.getElementById('injury').value = count + 1;
            updateDrawPileCount();
        } else {
            alert('No injury cards in the discard pile or draw pile.');
        }
    }
}


// Function to add a thread suit
function addThreadSuit() {
    const threadInput = document.getElementById('thread-name').value;
    if (threadInput === '') {
        alert('Threads require a name.');
        return;
    }
    
    const threadCard = 'Thread - ' + threadInput;
    discardPile.push(threadCard);
    
    updateDrawPileCount();

    document.getElementById('thread-name').value = '';
}

// Function to add an omen suit
function addOmenSuit() {
    const omenInput = document.getElementById('omen-name').value;
    if (omenInput === '') {
        alert('Omens require a name.');
        return;
    }
    
    const omenCard = 'Omen - ' + omenInput;
    discardPile.push(omenCard);
    
    updateDrawPileCount();

    document.getElementById('omen-name').value = '';;
}
// Function to remove the top card from the discard pile
function removeTopCardFromDiscardPile() {
    if (discardPile.length === 0) {
        alert('No cards in the discard pile.');
        return;
    }
    discardPile.pop();
    const card = discardPile.pop(); // Get the top card from the discard pile

    let imagePath = '';
    let cardTitle = '';

    if (card === 'lore') {
        imagePath = 'lore-image.png';
        cardTitle = 'Lore';
    } else if (card === 'harmony') {
        imagePath = 'harmony-image.png';
        cardTitle = 'Harmony';
    } else if (card === 'empathy') {
        imagePath = 'empathy-image.png';
        cardTitle = 'Empathy';
    } else if (card === 'grace') {
        imagePath = 'grace-image.png';
        cardTitle = 'Grace';
    } else if (card === 'power') {
        imagePath = 'power-image.png';
        cardTitle = 'Power';
    } else if (card.startsWith('Thread')) {
        imagePath = 'thread-image.png';
        cardTitle = card.charAt(0).toUpperCase() + card.slice(1);
    } else if (card.startsWith('Omen')) {
        imagePath = 'omen-image.png';
        cardTitle = card.charAt(0).toUpperCase() + card.slice(1);
    } else if (card.startsWith('Injury')) {
        imagePath = 'injury-image.png';
        cardTitle = card.charAt(0).toUpperCase() + card.slice(1);
    } else if (card == 'Relic') {
        imagePath = 'relic-image.png';
        cardTitle = card.charAt(0).toUpperCase() + card.slice(1);
    } else {
        imagePath = 'empty-image.png';
        cardTitle = card;
    }

    document.getElementById('drawnCard').innerHTML = `<img class="drawn-card-image" src="${imagePath}" alt="${card}"> <h2>${cardTitle}</h2>`;
    updateDrawPileCount();
}

// Function to draw a card
function drawCard() {
    if (drawPile.length === 0) {
        alert('No more cards in the draw pile. Shuffle or reset the deck.');
        return;
    }
    const card = drawPile.pop();
    discardPile.push(card);

    // Map the card value to an image
    let imagePath = '';
    let cardTitle = ''; // Initialize cardTitle variable

    if (card === 'lore') {
        imagePath = 'lore-image.png';
        cardTitle = 'Lore'; // Set cardTitle for 'lore'
    } else if (card === 'harmony') {
        imagePath = 'harmony-image.png';
        cardTitle = 'Harmony'; // Set cardTitle for 'harmony'
    } else if (card === 'empathy') {
        imagePath = 'empathy-image.png';
        cardTitle = 'Empathy'; // Set cardTitle for 'empathy'
    } else if (card === 'grace') {
        imagePath = 'grace-image.png';
        cardTitle = 'Grace'; // Set cardTitle for 'grace'
    } else if (card === 'power') {
        imagePath = 'power-image.png';
        cardTitle = 'Power'; // Set cardTitle for 'power'
    } else if (card.startsWith('Thread')) {
        imagePath = 'thread-image.png';
        cardTitle = card.charAt(0).toUpperCase() + card.slice(1);
    } else if (card.startsWith('Omen')) {
        imagePath = 'omen-image.png';
        cardTitle = cardTitle = card.charAt(0).toUpperCase() + card.slice(1);
    } else if (card.startsWith('Injury')) {
        imagePath = 'injury-image.png';
        cardTitle = cardTitle = card.charAt(0).toUpperCase() + card.slice(1);
    } else {
        imagePath = 'empty-image.png';
        cardTitle = card; // Set cardTitle for other cards
    }

    // Set the drawnCard element to contain the image and card title
    document.getElementById('drawnCard').innerHTML = `<img class="drawn-card-image" src="${imagePath}" alt="${card}"> <h2>${cardTitle}</h2>`;
    updateDrawPileCount();
}

// Function to shuffle the discard pile back into the deck
function shuffleDeck() {
    drawPile = drawPile.concat(discardPile);
    discardPile = [];

    for (let i = drawPile.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [drawPile[i], drawPile[j]] = [drawPile[j], drawPile[i]]; // Swap elements
    }

    document.getElementById('drawnCard').innerHTML = `<img class="drawn-card-image" src="empty-image.png" alt="empty"> <h2>Empty Discard</h2>`;
    updateDrawPileCount();
}

function updateDrawPileCount() {
    const drawPileCount = drawPile.length;
    const drawPileImage = '<img class="progress-card" src="topCardSlice.png" alt="*" />';
    const lastDrawPileImage = '<img class="progress-card" src="topCard.png" alt="*" />';
    let drawPileHTML = '';

    if (drawPileCount === 0) {
        drawPileHTML = '<img class="progress-card" src="emptyTop.png" alt="Empty Pile" />';
    } else {
        for (let i = 0; i < drawPileCount; i++) {
            if (i === drawPileCount - 1) {
                drawPileHTML += lastDrawPileImage;
            } else {
                drawPileHTML += drawPileImage;
            }
        }
    }

    document.getElementById('drawPileCount').innerHTML = drawPileHTML;

    const discardPileCount = discardPile.length;
    const discardPileImage = '<img class="progress-card" src="bottomCardSlice.png" alt="*" />';
    const firstDiscardPileImage = '<img class="progress-card" src="bottomCard.png" alt="*" />';
    let discardPileHTML = '';

    if (discardPileCount === 0) {
        discardPileHTML = '<img class="progress-card" src="emptyBottom.png" alt="Empty Pile" />';
    } else {
        for (let i = 0; i < discardPileCount; i++) {
            if (i === 0) {
                discardPileHTML += firstDiscardPileImage;
            } else {
                discardPileHTML += discardPileImage;
            }
        }
    }

    document.getElementById('discardPileCount').innerHTML = discardPileHTML;
}
// Event listeners

document.getElementById('addInjurySuit').addEventListener('click', addInjurySuit);
document.getElementById('treatInjurySuit').addEventListener('click', treatInjurySuit);
document.getElementById('addThreadSuit').addEventListener('click', addThreadSuit);
document.getElementById('addOmenSuit').addEventListener('click', addOmenSuit);
document.getElementById('drawCard').addEventListener('click', drawCard);
document.getElementById('shuffleDeck').addEventListener('click', shuffleDeck);
document.getElementById('addRelicSuit').addEventListener('click', addRelicSuit);

// Add event listeners to suit inputs
document.getElementById('drawnCard').addEventListener('click', removeTopCardFromDiscardPile);

document.getElementById('lore').addEventListener('change', createDeck);
document.getElementById('empathy').addEventListener('change', createDeck);
document.getElementById('harmony').addEventListener('change', createDeck);
document.getElementById('grace').addEventListener('change', createDeck);
document.getElementById('power').addEventListener('change', createDeck);

// Call createDeck when the page is done loading
window.addEventListener('load', createDeck);


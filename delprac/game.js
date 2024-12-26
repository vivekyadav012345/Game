// Game Elements
const buttons = document.querySelectorAll('.selectable');
const userResults = document.querySelector('#user-results');
const aiResults = document.querySelector('#ai-results');
const wonText = document.querySelector('#won-text');
const resetGame = document.querySelector('#reset');
const rulesButton = document.querySelector('.rules-button');
const rulesPopup = document.querySelector('.rules-popup');
const closeRules = document.querySelector('#close-rules');
const playerScoreDisplay = document.querySelector('#player-score');
const aiScoreDisplay = document.querySelector('#ai-score');

let PLAYER_SCORE = 0;
let AI_SCORE = 0;

// Game Logic
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const userChoice = button.id;
        const aiChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
        
        userResults.textContent = button.textContent;
        aiResults.textContent = aiChoice === 'rock' ? '👊' : aiChoice === 'paper' ? '👋' : '✌️';

        if ((userChoice === 'rock' && aiChoice === 'scissors') ||
            (userChoice === 'paper' && aiChoice === 'rock') ||
            (userChoice === 'scissors' && aiChoice === 'paper')) {
            PLAYER_SCORE++;
            wonText.textContent = 'You Win!';
        } else if (userChoice === aiChoice) {
            wonText.textContent = 'It\'s a Draw!';
        } else {
            AI_SCORE++;
            wonText.textContent = 'You Lose!';
        }

        playerScoreDisplay.textContent = PLAYER_SCORE;
        aiScoreDisplay.textContent = AI_SCORE;

        document.querySelector('.winner-container').classList.remove('hide');
    });
});

// Reset Game
resetGame.addEventListener('click', () => {
    PLAYER_SCORE = 0;
    AI_SCORE = 0;
    playerScoreDisplay.textContent = 0;
    aiScoreDisplay.textContent = 0;
    document.querySelector('.winner-container').classList.add('hide');
});

// Rules Popup
rulesButton.addEventListener('click', () => {
    rulesPopup.classList.toggle('show');
});

closeRules.addEventListener('click', () => {
    rulesPopup.classList.remove('show');
});

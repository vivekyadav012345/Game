const buttons = Array.from(document.getElementsByClassName('selectable'));
const user_results = document.querySelector('#user-results');
const ai_results = document.querySelector('#ai-results');
const won_text = document.querySelector('#won-text');
const the_game = document.querySelector('.game-container');
const display_results = document.querySelector('.winner-container');
const player_score_display = document.querySelector('#player-score');
const ai_score_display = document.querySelector('#ai-score');
const reset_game = document.querySelector('#reset');
const next_button = document.querySelector('#next');
const hurray_container = document.querySelector('.hurray-container');
const play_again_button = document.querySelector('#play-again');

// Rules Modal
const rulesButton = document.querySelector('#rules-button');
const rulesModal = document.querySelector('#rules-modal');
const closeRulesButton = document.querySelector('#close-rules');

// Get scores from localStorage if they exist, otherwise default to 0
let PLAYER_SCORE = localStorage.getItem('playerScore') ? parseInt(localStorage.getItem('playerScore')) : 0;
let AI_SCORE = localStorage.getItem('aiScore') ? parseInt(localStorage.getItem('aiScore')) : 0;

// Update score display based on localStorage values
player_score_display.textContent = PLAYER_SCORE;
ai_score_display.textContent = AI_SCORE;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const userChoice = WINNER_COMBO.find(item => item.selected === button.id);
        calculateWinner(userChoice, ai_selected());
    });
});

function ai_selected() {
    const randomIndex = Math.floor(Math.random() * WINNER_COMBO.length);
    return WINNER_COMBO[randomIndex];
}

function calculateWinner(user, ai) {
    if (user.beats === ai.selected) {
        PLAYER_SCORE++;
        localStorage.setItem('playerScore', PLAYER_SCORE); 
        player_score_display.textContent = PLAYER_SCORE;
        updateUI(user, ai, 'You Win!');
        next_button.classList.remove('hide');
    } else if (user.selected === ai.selected) {
        updateUI(user, ai, 'Draw');
        next_button.classList.add('hide');
    } else {
        AI_SCORE++;
        localStorage.setItem('aiScore', AI_SCORE); 
        ai_score_display.textContent = AI_SCORE;
        updateUI(user, ai, 'You Lose!');
        next_button.classList.add('hide');
    }
}

function updateUI(user, ai, outcome_text) {
    user_results.innerHTML = user.icon;
    ai_results.innerHTML = ai.icon;
    won_text.textContent = outcome_text;
    display_results.classList.remove('hide');
    the_game.classList.add('hide');
}

reset_game.addEventListener('click', () => {
    PLAYER_SCORE = 0;
    AI_SCORE = 0;
    localStorage.removeItem('playerScore');
    localStorage.removeItem('aiScore');
    player_score_display.textContent = '0';
    ai_score_display.textContent = '0';
    display_results.classList.add('hide');
    the_game.classList.remove('hide');
});

next_button.addEventListener('click', () => {
    display_results.classList.add('hide');
    the_game.classList.remove('hide');
});

play_again_button.addEventListener('click', () => {
    hurray_container.classList.add('hide');
    the_game.classList.remove('hide');
    PLAYER_SCORE = 0;
    AI_SCORE = 0;
    localStorage.setItem('playerScore', PLAYER_SCORE);
    localStorage.setItem('aiScore', AI_SCORE);
    player_score_display.textContent = '0';
    ai_score_display.textContent = '0';
});

// Rules Modal functionality
rulesButton.addEventListener('click', () => {
    rulesModal.classList.remove('hide'); 
});

closeRulesButton.addEventListener('click', () => {
    rulesModal.classList.add('hide'); 
});

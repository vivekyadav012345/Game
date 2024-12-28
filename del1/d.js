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
const remhead = document.querySelector('.heading-container');
const rulebtn = document.querySelector('.rule');
const rulebox = document.querySelector('.ruleBox');

//rulebox.classList.add('hide');
const WINNER_COMBO = [
    { selected: 'rock', beats: 'scissors', icon: '👊' },
    { selected: 'paper', beats: 'rock', icon: '👋' },
    { selected: 'scissors', beats: 'paper', icon: '✌️' },
];

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
        localStorage.setItem('playerScore', PLAYER_SCORE); // Save score to localStorage
        player_score_display.textContent = PLAYER_SCORE;
        updateUI(user,  'You Win!',ai);
        next_button.classList.remove('hide'); // Show Next button after win
    } else if (user.selected === ai.selected) {
        updateUI(user,  'Draw', ai);
        next_button.classList.add('hide'); // Hide Next button in case of draw
    } else {
        AI_SCORE++;
        localStorage.setItem('aiScore', AI_SCORE); // Save score to localStorage
        ai_score_display.textContent = AI_SCORE;
        updateUI(user, 'You Lose!',ai);
        next_button.classList.add('hide'); // Hide Next button if player loses
    }
}

function updateUI(user,  outcome_text ,ai) {
    user_results.innerHTML = user.icon;
    user_results.className = `selectable ${user.selected}`;
    
    ai_results.innerHTML = ai.icon;
    ai_results.className = `selectable ${ai.selected}`;
    won_text.textContent = outcome_text;
    the_game.classList.add('hide');
    display_results.classList.remove('hide');
   
}

reset_game.addEventListener('click', () => {
    resetRound();
    display_results.classList.add('hide');
    the_game.classList.remove('hide');
});

next_button.addEventListener('click', () => {
    // Hide the result and show Hurray message when Next is clicked
    remhead.classList.add('hide');
    
    display_results.classList.add('hide');
    hurray_container.classList.remove('hide');
    
});

play_again_button.addEventListener('click', () => {
    resetGame();
    hurray_container.classList.add('hide');
    the_game.classList.remove('hide');
    remhead.classList.remove('hide');
});
rulebtn.addEventListener('click', () => {
    document.getElementById("c21").style.display = "none";

   
});

function resetRound() {
    user_results.className = 'selectable';
    ai_results.className = 'selectable';
    won_text.textContent = '';
}

function resetGame() {
    PLAYER_SCORE = 0;
    AI_SCORE = 0;
    localStorage.setItem('playerScore', PLAYER_SCORE); // Save reset score to localStorage
    localStorage.setItem('aiScore', AI_SCORE); // Save reset score to localStorage
    player_score_display.textContent = PLAYER_SCORE;
    ai_score_display.textContent = AI_SCORE;
    resetRound();
    next_button.classList.add('hide');
}

// Select DOM elements
const choices = document.querySelectorAll('.choice');
const userScoreElement = document.querySelector('.userScore');
const compScoreElement = document.querySelector('.CompScore');
const resultMessage = document.querySelector('.youwin');
const againstPC = document.querySelector('.againstpc');
const playAgainButton = document.querySelector('.playagain');
const tieMessage = document.querySelector('.tie');
const nextButton = document.querySelector('.next'); // Next button for win case
const userChoiceDisplay = document.querySelector('.userwin .choice1#rock');
const pcChoiceDisplay = document.querySelector('.userwin .choice1#scissors');
const ruleButton = document.querySelector('.rule'); // Rule Button
const ruleBox = document.querySelector('.ruleCont'); // Rule Pop-up Box
const closeButton = document.querySelector('.close'); // Close Button for Rule Pop-up

// Scores
let userScore = 0;
let compScore = 0;

// Choices Array
const choicesArray = ['rock', 'paper', 'scissors'];

// Generate Random Computer Choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choicesArray.length);
  return choicesArray[randomIndex];
}

// Determine Winner
function determineWinner(userChoice, computerChoice) {
  // Compare user choice and computer choice to determine the result
  if (userChoice === computerChoice) {
    displayResult('tie', userChoice, computerChoice);
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    userScore++;  // Increment user score on win
    displayResult('win', userChoice, computerChoice);
  } else {
    compScore++;  // Increment computer score on loss
    displayResult('lose', userChoice, computerChoice);
  }
}

// Display Result
function displayResult(result, userChoice, computerChoice) {
  // Display user and computer choices with images
  userChoiceDisplay.innerHTML = `<img src="https://s3-alpha-sig.figma.com/img/e2f5/14e9/7d8f1b87d406a7bced07190e2c368075?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=..." alt="${userChoice}">`;
  pcChoiceDisplay.innerHTML = `<img src="https://s3-alpha-sig.figma.com/img/e2f5/14e9/7d8f1b87d406a7bced07190e2c368075?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=..." alt="${computerChoice}">`;

  // Handle result and show the corresponding message
  if (result === 'win') {
    resultMessage.textContent = 'YOU WIN';
    againstPC.textContent = 'AGAINST PC';
    tieMessage.style.display = 'none'; // Hide tie message
    nextButton.style.display = 'block'; // Show Next button on win
  } else if (result === 'lose') {
    resultMessage.textContent = 'YOU LOST';
    againstPC.textContent = 'AGAINST PC';
    tieMessage.style.display = 'none'; // Hide tie message
    nextButton.style.display = 'none'; // Hide Next button
  } else if (result === 'tie') {
    resultMessage.textContent = 'IT\'S A TIE!';
    againstPC.textContent = ''; // Hide againstPC message
    tieMessage.style.display = 'block'; // Show tie message
    nextButton.style.display = 'none'; // Hide Next button
  }

  // Update the score in the score container
  userScoreElement.textContent = userScore;
  compScoreElement.textContent = compScore;

  // Show Result Page (after round result)
  document.querySelector('.container1').style.display = 'block';
  document.querySelector('.container').style.display = 'none';
}

// Play Again
function resetGame() {
  document.querySelector('.container').style.display = 'block';
  document.querySelector('.container1').style.display = 'none';
  nextButton.style.display = 'none'; // Hide Next button on reset
  tieMessage.style.display = 'none'; // Hide Tie message on reset
  resultMessage.textContent = ''; // Clear previous result message
  userChoiceDisplay.innerHTML = ''; // Clear user choice image
  pcChoiceDisplay.innerHTML = ''; // Clear computer choice image
}

// Event Listeners for Choices
choices.forEach((choice) => {
  choice.addEventListener('click', () => {
    const userChoice = choice.id;
    const computerChoice = getComputerChoice();
    determineWinner(userChoice, computerChoice);
  });
});

// Event Listener for Play Again Button
playAgainButton.addEventListener('click', resetGame);

// Rules Toggle
ruleButton.addEventListener('click', () => {
  ruleBox.classList.add('active'); // Show the rules pop-up
});

closeButton.addEventListener('click', () => {
  ruleBox.classList.remove('active'); // Hide the rules pop-up
});

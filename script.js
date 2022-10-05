//Declared variables -
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const startBtn = document.querySelector('#startBtn');
const scoreText = document.querySelector('#Score');


let timer = document.querySelector("#timer");
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//Questions array
let questions = [ 
    {
        question: "Commonly used data types DO Not Include?",
        choice1: "strings", 
        choice2: "booleans",
        choice3: "alerts",
        choice4: "numbers", 
        answer: "3",
    },
    {
        question: "What does CSS stand for?",
        choice1: "Computer Style Sheets",
        choice2: "Creative Style Sheets",
        choice3: "Colorful Style Sheets",
        choice4: "Cascading Style Sheets", 
        answer: "4",
    },
    {
        question: "Choose the correct HTML element for the largest heading?",
        choice1: "<heading>",
        choice2: "<h1>",
        choice3: "<h6>",
        choice4: "<head>", 
        answer: "2",
    },
    {
        question: "How do you declare a JavaScript variable?",
        choice1: "var carName;", 
        choice2: "variable carName;",
        choice3: "v carName",
        choice4: "c nameCar", 
        answer: "1",
    },
];

const MAX_QUESTIONS = 5;
const SCORE_POINTS = 100;


//Code quiz begins with countdown function being called
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    countdown();
}

// Score tracker
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);

   return window.location.assign("end.html");
} 
    //questions 

    questionCounter++ 

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    // if (questionCounter === questions.length){
    //     return window.location.assign('end.html') 
    // }
    
    choices.forEach(choice => {
        const number = choice.dataset["number"];  
        choice.innerText = currentQuestion["choice" + number]; 
});

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

//multiple choice options
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return; 

        acceptingAnswers = false; 
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : 
        "incorrect"

        if(classToApply === "correct") {
            incrementScore(SCORE_POINTS);
        }
        if (classToApply === "incorrect"){
            secondsLeft = secondsLeft - 5
            timer.textContent = secondsLeft
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

//Timer and seconds tracker
let secondsLeft = 60;

function countdown() {
    
const countdownTimer = setInterval (function() {
secondsLeft--; 
timer.textContent = secondsLeft;

if (secondsLeft === 0) {
    clearInterval(countdownTimer);
    return window.location.assign("end.html");
}
}, 1000);
}
function sendmessage(){
    timer.textContent =  "GameOver";
}

incrementScore = () => {
    score += 25;
    scoreText.innerText = score;
}; 

startGame();

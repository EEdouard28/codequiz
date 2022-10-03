//Group of questions and chouces being stored
const question = document.querySelector('#Question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const startBtn = document.querySelector('#startBtn');
//progress and score section
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#Score');
const progressBarFull = document.querySelector('#progressBarFull');
let timer = document.querySelector("#timer");
//array for current questions
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0 
// let availableQuestions = []
let timeLeft = 60
let questions = [
    //objects with question tabs
    {
        question: 'Commonly used data types DO Not Include?',
        choice1: '1', //add anser options
        choice2: '2',
        choice3: '2',
        choice4: '4', 
        answer: 2,//place answer
    },
    {
        question: 'Question 2',
        choice1: '1', //add anser options
        choice2: '2',
        choice3: '2',
        choice4: '4', 
        answer: 2,//place answer
    },

    {
        question: 'Question 3',
        choice1: '1', //add anser options
        choice2: '2',
        choice3: '2',
        choice4: '4', 
        answer: 2,//place answer
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

setInterval(function(){
    if (timeLeft > 0){
    timeLeft-- 
timer.textContent = timeLeft}
}, 1000)

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

// Score tracker
getNewQuestion = () => {
    // if(availableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS) {
    //     localStorage.setItem('mostRecentScore', score)

    //     return window.location.assign('end.html') //double check location
    // } 
    
  
    questionCounter++ 
   
    // progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    // progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) *100}%`
    //keeping track on which question player is on
    // const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = questions[questionCounter]
    if (questionCounter === questions.length){
        return window.location.assign('end.html') //double check location
    }
    question.innerText = currentQuestion.question

    // choices.forEach(choice => {
    //     const number = choice.dataset[`number`]
    //     choice.innerText = currentQuestion[`choice + number`]
    // })
    // availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener(`click`, e => {
        if(!acceptingAnswers) return 

        acceptingAnswers = false 
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset[`number`]

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 
        `incorrect`

        if(classToApply === `correct`) {
            // incrementScore(SCORE_POINTS)
            score += 1
            scoreText.innerText = score
        }
        if (classToApply === 'incorrect'){
            timeLeft = timeLeft - 10
            timer.textContent = timeLeft
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += 1
    scoreText.innerText = score
}


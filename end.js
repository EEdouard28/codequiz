const username = document.querySelector(`#username`);
const saveScoreBtn = document.querySelector(`#saveScoreBtn`);
saveScoreBtn.addEventListener('click', savemyScores);

const finalScore = document.querySelector("#myfinalScore");
const mostRecentScore = document.querySelector("#mostRecentScore");

const highScores = JSON.parse(localStorage.getItem('highScores')) || []


const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore


username.addEventListener('keyup', () => {
    myScoreBtn.disabled = !username.value;
});

savemyScores = e => {
//const = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore.innerText,
        name: username.value
    };

highScores.push(score)

highScores.sort((a,b) => {
    return b.score - a.score
});

highScores.splice(5) 

localStorage.setItem('highScores', JSON.stringify(highScores))
window.location.assign('./')

};

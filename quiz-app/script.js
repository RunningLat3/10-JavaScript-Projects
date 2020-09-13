
let currentQuestionIndex = 0;
let currentQuestion = {};
let totalScore = 0;
let randomizeQuestions = [];
let totalQuestions = 0;
const quizEl = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const submitAnswerEl = document.getElementById('btnSubmitAnswer');

async function LoadQuizData(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`HTTP-Error: ${response.status}`);
    }
}

const LoadQuestion = () => {
    currentQuestion = randomizeQuestions[currentQuestionIndex];
    questionEl.innerText = currentQuestion.question;
    answersEl.innerHTML = LoadAnswers(currentQuestion.answers);
}

const LoadAnswers = (answers) => {

    let index = 1;
    let elAnswers = '';
    answers.forEach((answer, i) => {
        let id = `radio${i + 1}`
        elAnswers += `<li>
                    <input type="radio" id="${id}" name="answers[]" value="${answer.answer}" />
                    <label for="${id}">${answer.answer}</label>
                </li>`;
    });

    return elAnswers;
}

const LoadScore = () => {
    quizEl.innerHTML = `
    <h2>You answered correctly at ${totalScore}/${totalQuestions} questions.</h2> 
    <button type="button" onclick="location.reload()">Retry</button>
    `;
}

const RandomizeQuestions = (questions) => {
    while (totalQuestions > randomizeQuestions.length) {
        let nextQuestionIndex = Math.floor(Math.random() * totalQuestions);
        let nextQuestion = questions[nextQuestionIndex];
        if (!randomizeQuestions.includes(nextQuestion))
            randomizeQuestions.push(nextQuestion)
    }
}


const SubmitAnswer = (event) => {
    let answer = GetAnswer();
    let correctAnswer = GetCorrectAnswer();
    if (!answer) {
        alert("Please select an answer");
        return false;
    }

    if (answer === correctAnswer)
        totalScore++;

    currentQuestionIndex++;

    if (currentQuestionIndex === totalQuestions) {
        LoadScore();
    } else { LoadQuestion() };
}

const GetAnswer = () => {
    let answer = answersEl.querySelector('input:checked');
    if (answer)
        return answer.value.trim();

    return null;
}

const GetCorrectAnswer = () => {
    let answer = currentQuestion.answers.find(e => e.iscorrect);
    if (answer)
        return answer.answer;

    return null;
}

//Initialize Quiz Data and First Question
LoadQuizData('quiz.json').then(r => {
    randomizeQuestions = [];
    totalQuestions = r.length;
    RandomizeQuestions(r);
    LoadQuestion();
});

// Add event listener for submit button
submitAnswerEl.addEventListener('click', SubmitAnswer);

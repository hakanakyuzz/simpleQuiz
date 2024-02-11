const questions = [
    {
        question : "When was the movie the Titanic released?",
        answers : [
            {text: "1997", correct: true},
            {text: "1998", correct: false},
            {text: "1999", correct: false},
            {text: "2000", correct: false},
        ]
    },
    {
        question : "What element is denoted by the chemical symbol Sn in the periodic table?",
        answers : [
            {text: "Francium", correct: false},
            {text: "Silicon", correct: false},
            {text: "Tin", correct: true},
            {text: "Lawrencium", correct: false},
        ]
    },
    {
        question : "What is the capital of Finland?",
        answers : [
            {text: "Oslo", correct: false},
            {text: "Helsinki", correct: true},
            {text: "Moscow", correct: false},
            {text: "Adana", correct: false},
        ]
    },
    {
        question : "In which European country would you find the Rijksmuseum?",
        answers : [
            {text: "Poland", correct: false},
            {text: "Germany", correct: false},
            {text: "French", correct: false},
            {text: "Netherlands", correct: true},
        ]
    },
    {
        question : "Which country in the world is believed to have the most miles of motorway?",
        answers : [
            {text: "Russia", correct: false},
            {text: "China", correct: true},
            {text: "Turkey", correct: false},
            {text: "USA", correct: false},
        ]
    }
]
const questionElement = document.querySelector(".question-element")
const answerElement = document.querySelector(".btn-container")
const nextButtonElement = document.querySelector(".next-btn")

let currentQuestionIndex = 0
let userScore = 0

function showQuestion() {
    deletePrevious()
    nextButtonElement.style.display = "none"

    let currentQuestion = questions[currentQuestionIndex]
    questionElement.innerHTML = currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerElement.appendChild(button)

        button.dataset.correct = answer.correct

        button.addEventListener("click", (e) => {
            let userAnswer = e.target
            let isCorrect = userAnswer.dataset.correct === "true"
            userAnswer.classList.add((isCorrect ? "" : "in") + "correct")
            if (isCorrect)
                userScore++

            Array.from(answerElement.children).forEach(btn => {
                btn.disabled = true
                if (btn.dataset.correct === "true")
                    btn.classList.add("correct")
            })
            nextButtonElement.style.display = "block"
        })
    })
}
showQuestion()

nextButtonElement.addEventListener("click", () => {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length)
        showQuestion()
    else
        showScore()
})

function showScore() {
    deletePrevious()
    questionElement.innerHTML = `You scored ${userScore*100/5} out of 100 ` + (userScore>=3 ? ":)" : ":\\")
    nextButtonElement.innerHTML = "Play Again"

    userScore = 0
    currentQuestionIndex = -1
}

function deletePrevious() {
    while (answerElement.firstChild){
        answerElement.removeChild(answerElement.firstChild)
    }
}

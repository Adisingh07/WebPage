let currentQuestionIndex = 0;
let questions = [];

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        loadQuestion();
        loadSidebar();
    });

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("questionText").innerText = question.question;
    document.getElementById("explanation").classList.add("hidden");

    document.querySelectorAll(".option").forEach((button, index) => {
        button.innerText = question.options[index];
        button.classList.remove("correct", "wrong");
    });
}

function checkAnswer(index) {
    const question = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll(".option");

    if (index === question.correct) {
        buttons[index].classList.add("correct");
    } else {
        buttons[index].classList.add("wrong");
        buttons[question.correct].classList.add("correct");
    }

    document.getElementById("explanation").innerText = question.explanation;
    document.getElementById("explanation").classList.remove("hidden");
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function loadSidebar() {
    const sidebar = document.getElementById("questionList");
    questions.forEach((_, index) => {
        const btn = document.createElement("button");
        btn.innerText = index + 1;
        btn.onclick = () => {
            currentQuestionIndex = index;
            loadQuestion();
        };
        sidebar.appendChild(btn);
    });
}


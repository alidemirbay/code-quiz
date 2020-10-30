

var timer = document.querySelector("#timer");
var startQuiz = document.querySelector("#startButton");
var startPage = document.querySelector("#startPage");


var questions = [
    {
        questionItem: "In JavaScript, what is a block of code called that is used to perform a specific task?",
        choices: ["Function", "Declaration", "String", "Variable"],
        correctAnswer: "Function"
    },
    {
        questionItem: "What is a JavaScript element that represents either TRUE or FALSE values?",
        choices: ["Boolean", "RegExp", "Condition", "Event"],
        correctAnswer: "Boolean"
    },
    {
        questionItem: "What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?",
        choices: ["Repeater", "Loop", "Debugger", "Clone"],
        correctAnswer: "Loop"
    },
    {
        questionItem: "What is the element used – and hidden – in code that explains things and makes the content more readable?",
        choices: ["Comparisons", "Quotations", "Notes", "Comments"],
        correctAnswer: "Comments"
    },
    {
        questionItem: "What is the format called that is used for storing and transporting data?",
        choices: ["JSON", "HTML", "Syntax", "Font"],
        correctAnswer: "JSON"
    },
    {
        questionItem: "Link element must go inside the ____ section of an HTML document or page.",
        choices: ["Footer", "Body", "Head", "Paragraph"],
        correctAnswer: "Head"
    },
    {
        questionItem: "What is the CSS property that sets the size of the whitespace outside the borders of the content?",
        choices: ["Margin", "Spacer", "Line", "Padding"],
        correctAnswer: "Margin"
    },
    {
        questionItem: "External stylesheets are stored in what type of files?",
        choices: ["HTML", "XML", "CSS", "PHP"],
        correctAnswer: "CSS"
    },
    {
        questionItem: "CSS stands for ____ Style Sheets?",
        choices: ["Cascading", "Concept", "Concave", "Curious"],
        correctAnswer: "Cascading"
    },
    {
        questionItem: "What tag is used to define an unordered list that is bulleted?",
        choices: ["<ul>", "<u>", "<ol>", "<li>"],
        correctAnswer: "<ul>"
    },


];

var remainingTime = 100;
var interval = 0;
var penalty = 10;
var score = 0;
var questionIndex = 0;
var ulEl = document.createElement("ul");


startQuiz.addEventListener("click", function () {

    if (interval === 0) {
        interval = setInterval(function () {
            remainingTime--;
            timer.textContent = "Time: " + remainingTime;
            if (remainingTime <= 0) {
                clearInterval(interval);
                endQuiz();
            }
        }, 1000);
    }
    showQuestions(questionIndex);
});

function showQuestions(questionIndex) {
    startPage.innerHTML = "";
    ulEl.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        startPage.textContent = questions[questionIndex].questionItem;
    }
    questions[questionIndex].choices.forEach(function (nextQ) {
        var liEl = document.createElement("li");
        liEl.textContent = nextQ;
        startPage.appendChild(ulEl);
        ulEl.appendChild(liEl);
        liEl.addEventListener("click", (checkAnswer));
    })
}

function checkAnswer(e) {
    var usersAnswer = e.target;
    if (usersAnswer.matches("li")) {
        var result = document.createElement("div");
        result.setAttribute("id", "result");
        if (usersAnswer.textContent == questions[questionIndex].correctAnswer) {
            score++;
            result.textContent = "Correct!";
        } else {
            remainingTime = remainingTime - penalty;
            result.textContent = "Wrong!"
        }
    }
    questionIndex++;
    if (questionIndex >= questions.length) {
        endQuiz();
        result.textContent = "Number of  correct answer is  " + score;
    } else { showQuestions(questionIndex); }
    startPage.appendChild(result);
}



function endQuiz() {
    startPage.innerHTML = "";
    // currentTime.innerHTML = "";

    // Heading:
    var allDoneEl = document.createElement("h1");
    allDoneEl.setAttribute("id", "allDone");
    allDoneEl.textContent = "All Done!"
    startPage.appendChild(allDoneEl);

    // Paragraph
    var h3El = document.createElement("p");
    h3El.setAttribute("id", "h3El");
    startPage.appendChild(h3El);

    // Calculates time remaining and replaces it with score
    if (remainingTime >= 0) {
        // var timeRemaining = remainingTime;
        var h3El = document.createElement("p");
        clearInterval(interval);
        h3El.textContent = "Your final score is: " + remainingTime + score;
        startPage.appendChild(h3El);
    }

    // Label
    var labelEl = document.createElement("label");
    labelEl.setAttribute("id", "labelEl");
    labelEl.textContent = "Enter your initials: ";
    startPage.appendChild(labelEl);

    // input
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "initials");
    inputEl.textContent = "";
    startPage.appendChild(inputEl);

    // submit
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("id", "Submit");
    submitBtn.textContent = "Submit";
    startPage.appendChild(submitBtn);

    // Event listener to capture initials and local storage for initials and score
    submitBtn.addEventListener("click", function () {
        var initials = inputEl.value;

        if (initials === null) {
            console.log("No value entered!");
        } else {
            var finalScore = {
                initials: initials,
                highscore: finalScore
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var lastScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", lastScore);
            // Travels to final page
            window.location.replace("highscore.html");
        }
    });

}
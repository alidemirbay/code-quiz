

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
        questionItem: "he link element must go inside the ____ section of an HTML document or page.",
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
var holdInterval = 0;
var penalty = 10;
var score = 0;
var questionIndex = 0;
var ulEl = document.createElement("ul");


startQuiz.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            remainingTime--;
            timer.textContent = "Time: " + remainingTime;
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
            }
        }, 1000);
    }
    showQuestions(questionIndex);
});

function showQuestions(questionIndex) {
    // Clears existing data 
    startPage.innerHTML = "";
    ulEl.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        startPage.textContent = questions[questionIndex].questionItem;
    }
    // New for each for question choices
    questions[questionIndex].choices.forEach(function (nextQ) {
        var liEl = document.createElement("li");
        liEl.textContent = nextQ;
        startPage.appendChild(ulEl);
        ulEl.appendChild(liEl);
        liEl.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!";
            // Correct condition 
        } else {
            // Will deduct -10 seconds off secondsLeft for wrong answers
            remainingTime = remainingTime - penalty;
            createDiv.textContent = "Wrong!"
        }
        // Question Index determines number question user is on
        questionIndex++;

        if (questionIndex >= questions.length) {
            // All done will append last page with user stats
            allDone();
            createDiv.textContent = "You got  " + score + "/" + questions.length + " Correct!";
        } else {
            render(questionIndex);
        }
        questionsDiv.appendChild(createDiv);

    }
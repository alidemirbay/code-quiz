var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// clear local storage
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// get data from local storage 
var highScores = localStorage.getItem("highScores");
highScores = JSON.parse(highScores);

if (highScores !== null) {
    for (var i = 0; i < highScores.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = highScores[i].initials + ": " + highScores[i].score;
        highScore.appendChild(liEl);
    }
}
// goes to start page
goBack.addEventListener("click", function () {
    window.location.replace("index.html");
});
/*
*** TODO

stop page from refreshing so doesn't start from scratch, and can't skip questions

*/

var firstNumber = $("#firstNumber");
var secondNumber = $("#secondNumber");
var givenAnswer = $("#givenAnswer");
var okBtn = $("#okBtn");
var nextBtn = $("#nextBtn");
var errorMessage = $("#errorMessage");
var correctAnswerText;
var isCorrectAnswer = false;
var startBtn = $("#startBtn");
var tablesChosen = [];
var selectAll = $("#selectAll");
var allChecked = false;
var quizSection = $("#quiz");
var questionSection = $("#question");
var endSession = $("#endPractice");

(function () {
    HideQuestionSection();
})();

function HideQuestionSection() {
    questionSection.hide();
    endSession.hide();
}

$("#choiceOfTables label").on("click", function () {
    var $this = $(this);
    if (this.htmlFor != "selectAll") {
        if (RemoveIfAlreadyInList(this)) {
            $this.removeClass("chosen");
        } else {
            $this.addClass("chosen");
            AddToList(this);
        }
    }
});

function startPracticing() {
    startBtn.hide();
    questionSection.show();
    newQuestion();
    endSession.show();
}

selectAll.on("click", function () {
    if (allChecked === false) {
        window.tablesChosen = [];
        $("#choiceOfTables label").each(function() {
            if (this.htmlFor != "selectAll") {
                $(this).addClass("chosen");
                AddToList(this);
            }
        });
        allChecked = true;
    } else {
        DeselectAll();
        allChecked = false;
    }
});

function AddToList(buttonClicked) {
    var numToAdd = buttonClicked.innerText;
    window.tablesChosen.push(parseInt(numToAdd));
    document.cookie = "tablesChosen=" + tablesChosen;
}

function RemoveIfAlreadyInList(buttonClicked) {
    for (var i = 0; i < window.tablesChosen.length; i++) {
        var $this = window.tablesChosen[i];
        if ($this === parseInt(buttonClicked.innerText)) {
            window.tablesChosen.splice(i, 1);
            document.cookie = "tablesChosen=" + tablesChosen;
            return true;
        }
    }
    return false;
}

function DeselectAll() {
    $("#choiceOfTables label").each(function() {
        if (this.htmlFor != "selectAll") {
            window.tablesChosen.splice(this, 1);
            document.cookie = "tablesChosen=" + tablesChosen;
            $(this).removeClass("chosen");
        }
    });
}

function newQuestion() {
    givenAnswer.prop("readonly", false);
    setUpForNewInput();
    var num1 = GetNumber1();
    var num2 = parseInt(Math.random() * 12 + 1);
    document.cookie = "numberTwo=" + num2 + ";";
    firstNumber.text(num1);
    secondNumber.text(num2);
    correctAnswerText = num1 * num2;
}

function GetNumber1() {
    var num1;
    if (window.tablesChosen.length > 0) {
        var randomItem = window.tablesChosen[Math.floor(Math.random() * window.tablesChosen.length)];
        num1 = parseInt(randomItem);
    } else {
        num1 = parseInt(Math.random() * 12 + 1);
    }
    document.cookie = "numberOne=" + num1 + ";";
    return num1;
}

function validateAnswer() {
    errorMessage.show();
    errorMessage.text("");
    var answer = givenAnswer.val();
    if (isNaN(answer)) {
        try {
            if (answer === "") {
                throw new Error("Please type in your answer");
            }
            if (isNaN(parseInt(answer))) {
                throw new Error("Sorry that isn't a number");
            }
        } catch (e) {
            errorMessage.text(e.message);
        }
    }
    else {
        if (parseInt(answer) === correctAnswerText) {
            isCorrectAnswer = true;
            errorMessage.append("Well done its correct");
            givenAnswer.prop("readonly", true);
            SetUpNextButton();
        } else {
            errorMessage.append("Sorry thats not right");
        }
    }
}

function ShouldSetUpNewQuestion() {
    if (isCorrectAnswer === false) {
        setUpForNewInput();
    }
}

function setUpForNewInput() {
    isCorrectAnswer = false;
    givenAnswer.val("");
    givenAnswer.prop("readonly", false);
    givenAnswer.focus();
    SetUpOkButton();
    errorMessage.text("");
}

function pressedEnter(e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
        validateAnswer();
    }
}

function SetUpOkButton() {
    nextBtn.prop("disabled", true);
    nextBtn.hide();
    okBtn.prop("disabled", false);
    okBtn.show();
}

function SetUpNextButton() {
    nextBtn.prop("disabled", false);
    nextBtn.show();
    nextBtn.focus();
    okBtn.prop("disabled", true);
    okBtn.hide();
}

function stopPracticing() {
    HideQuestionSection();
    DeselectAll();
    selectAll.prop('checked', false);
    startBtn.show();
}

okBtn.click(validateAnswer);
nextBtn.click(newQuestion);
givenAnswer.keypress(pressedEnter);
givenAnswer.click(ShouldSetUpNewQuestion);




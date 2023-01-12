const hangmanDiv = document.querySelector(".hangman");
const wordDiv = document.querySelector(".word");
let letterDivs;
const keyboardDiv = document.querySelector(".keyboard");

const restartButton = document.querySelector("#restart");

let word;
let wordLetters;
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let hangman = 0;

let isPlaying = true;

restartButton.addEventListener("click", restart);

document.addEventListener("keyup", (ev) => {
    const letter = ev.key.toUpperCase();
    if (alphabet.includes(letter)) {
        testLetter(letter);
    } else if (letter === "BACKSPACE") {
        restart();
    }
});

function initialize() {
    word = words[Math.floor(Math.random() * words.length)].toUpperCase();
    wordLetters = word.split('');
    drawWord(word);
    drawKeyboard();
    hangmanDiv.style.backgroundImage = "url('images/hangman" + hangman + ".png')";
}

function drawWord(word) {
    word.split('').forEach(l => {
        const letterDiv = document.createElement("div");
        letterDiv.className = "letter";
        wordDiv.appendChild(letterDiv);
    });

    letterDivs = wordDiv.querySelectorAll(".letter");

}

function drawKeyboard() {
    alphabet.forEach(k => {
        const keyDiv = document.createElement("div");
        keyDiv.className = "key";
        keyDiv.textContent = k;
        keyDiv.id = k;
        keyDiv.addEventListener("click", (ev) => {
            ev.preventDefault();
            testLetter(k);
        });
        keyboardDiv.appendChild(keyDiv);
    });
}

function testLetter(letter) {
    const letterDiv = document.querySelector("#" + letter);

    if (letterDiv.classList.contains("selected") || !isPlaying) {
        return;
    }

    letterDiv.classList.add("selected");

    let index = 0;
    let isSuccess = false;

    while (wordLetters.indexOf(letter, index) >= 0) {
        const a = wordLetters.indexOf(letter, index);
        letterDivs[a].classList.add("valid");
        letterDivs[a].textContent = letter;
        index = a + 1;
        isSuccess = true;
    }

    if (!isSuccess) {
        hangman++;
        hangmanDiv.style.backgroundImage = "url('images/hangman" + hangman + ".png')";
    }

    if ([...letterDivs].every(ld => ld.classList.contains("valid"))) {
        isPlaying = false;
    }

    if (hangman === 8) {
        isPlaying = false;
    }
}

function restart() {
    wordDiv.innerHTML = "";
    keyboardDiv.innerHTML = "";

    isPlaying = true;
    initialize();
}

initialize();
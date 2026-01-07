let hiraganaData = [];
let currentQuestion = null;

let totalQuestions = 20;
let currentCount = 0;
let score = 0;

const kanaEl = document.getElementById("kana");
const answerEl = document.getElementById("answer");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");
const checkBtn = document.getElementById("checkBtn");

fetch("./json/hiragana.json")
  .then(res => res.json())
  .then(data => {
    hiraganaData = data;
    nextQuestion();
  });

function nextQuestion() {
  if (currentCount >= totalQuestions) {
    endQuiz();
    return;
  }

  currentCount++;
  progressEl.textContent = `Question ${currentCount} / ${totalQuestions}`;

  const index = Math.floor(Math.random() * hiraganaData.length);
  currentQuestion = hiraganaData[index];

  kanaEl.textContent = currentQuestion.kana;
  answerEl.value = "";
  answerEl.focus();
  resultEl.textContent = "";
}

function checkAnswer() {
  const userAnswer = answerEl.value.trim().toLowerCase();
  if (!userAnswer) return;

  if (userAnswer === currentQuestion.romaji) {
    score++;
    resultEl.textContent = "✅ Correct!";
    resultEl.style.color = "green";
  } else {
    resultEl.textContent = `❌ Wrong! Correct: ${currentQuestion.romaji}`;
    resultEl.style.color = "red";
  }

  scoreEl.textContent = `Score: ${score}`;

  setTimeout(nextQuestion, 1000);
}

checkBtn.addEventListener("click", checkAnswer);

answerEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    checkAnswer();
  }
});

function endQuiz() {
  kanaEl.textContent = "🎉 Quiz Finished!";
  resultEl.textContent = `Final Score: ${score} / ${totalQuestions}`;
  resultEl.style.color = "blue";
  progressEl.textContent = "";

  // Hide the choices
  choicesEl.forEach(btn => (btn.style.display = "none"));
  };

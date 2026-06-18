// PAGE TRANSITION //

const links = document.querySelectorAll(".transition-link");
const transition = document.querySelector(".page-transition");

links.forEach(link => {

  link.addEventListener("click", function (e) {

    e.preventDefault();

    const target = this.href;

    transition.classList.add("active");

    setTimeout(() => {
      window.location.href = target;
    }, 400);

  });

});

window.addEventListener("pageshow", () => {
  transition.classList.remove("active");
});



// FADE ANIMATION//

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }

  });

}, {
  threshold: 0.15
});

const hiddenElements = document.querySelectorAll(".fade-left, .zoom-in");

hiddenElements.forEach((el) => observer.observe(el));


// QUIZ SECTION// 
const quizData = [
  {
    question: "What's the estimated population of the Great Hammerhead Sharks?",
    answers: ["10,000", "50,000", "1,000", "500"],
    correct: 0
  },
  {
    question: "Why are some marine life endangered?",
    answers: ["Pollution", "Habitat destruction", "Climate Change", "Overfishing"],
    correct: [0,1,2,3]
  },
  {
    question: "How many marine life animals die from pollution every year?",
    answers: [
      "1M seabirds & 100k marine mammals",
      "100k seabirds & 1M marine mammals",
      "1M+ both seabirds and mammals",
      "500k & 500k"
    ],
    correct: 0
  },
  {
    question: "What is the endangered marine species only found in NZ?",
    answers: ["Great White Shark", "Monk Seals", "Humpback Dolphins", "Maui Dolphins"],
    correct: 3
  },
  {
    question: "What do sea turtles often mistake plastic bags for?",
    answers: ["Ghosts", "Bottles", "Jellyfish", "Sharks"],
    correct: 2
  },
  {
    question: "Climate Change can damage coral reefs?",
    answers: ["False", "True"],
    correct: 1
  },
  {
    question: "Biggest threat to sea turtles?",
    answers: ["The Sun", "Fishing nets and plastic pollution", "Whales", "Sharks"],
    correct: 1
  },
  {
    question: "What does it mean if a marine animal is endangered?",
    answers: [
      "High risk of extinction",
      "Completely fine",
      "Already extinct",
      "Very low risk"
    ],
    correct: 0
  },
  {
    question: "Which helps marine life?",
    answers: ["Pollution", "Overfishing", "Recycling", "Oil spills"],
    correct: 2
  },
  {
    question: "Main greenhouse gas warming oceans?",
    answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const messageEl = document.getElementById("message");

const resultBox = document.getElementById("resultBox");
const finalScore = document.getElementById("finalScore");


// LOAD QUESTION// 

function loadQuestion() {

  if (currentQuestion >= quizData.length) {

    document.querySelector(".quiz-container").style.display = "none";
    resultBox.classList.remove("hidden");

    finalScore.textContent = `You scored ${score} / ${quizData.length}`;

    return;
  }

  const q = quizData[currentQuestion];

  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  messageEl.textContent = "";

  q.answers.forEach((answer, index) => {

    const btn = document.createElement("button");
    btn.classList.add("answer-btn");
    btn.textContent = answer;

    btn.onclick = () => checkAnswer(btn, index, q.correct);

    answersEl.appendChild(btn);

  });

}


// CHECK ANSWER// 

function checkAnswer(btn, index, correct) {

  let isCorrect = false;

  if (Array.isArray(correct)) {
    isCorrect = correct.includes(index);
  } else {
    isCorrect = index === correct;
  }

  if (isCorrect) {
    btn.classList.add("correct");
    messageEl.textContent = "Correct!";
    score++;
  } else {
    btn.classList.add("wrong");
    messageEl.textContent = "Wrong answer!";
  }

  setTimeout(() => {
    currentQuestion++;
  }, 1000);

}


// RESTART QUIZ// 

function restartQuiz() {

  currentQuestion = 0;
  score = 0;

  resultBox.classList.add("hidden");
  document.querySelector(".quiz-container").style.display = "block";

}


// START QUIZ// 

document.addEventListener("DOMContentLoaded", () => {

  const startBtn = document.getElementById("startBtn");

  // Only attach if button exists (prevents errors on other pages)
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      loadQuestion();
    });
  }

});

const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const quizContainer = document.querySelector(".quiz-container");
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


// FADE ANIMATION //
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


// QUIZ QUESTIONS //
let quizData = [
  {
    question: "Whats the estimated population of the Great Hammerhead Sharks?",
    options: ["50,000", "10,000", "500", "1,000"],
    correct: "10,000",
  },
  {
    question: "How many Vaquita Porpoise are left?",
    options: ["7-13", "2", "55", "1025"],
    correct: "7-13",
  },
  {
    question: "How many marine life animals die from pollution every year?",
    options: [
      "100,000 seabirds and 1Million+ marine mammals",
      "1 Million+ marine mammals and 1Million+ seabirds",
      "500,000 seabirds and 500,000 marine mammals",
      "1 Million+ seabirds and 100,000 marine mammals",
    ],
    correct: "1 Million+ seabirds and 100,000 marine mammals",
  },
  {
    question: "What is the endangered marine life species only found in New Zealand?",
    options: ["Great White Shark", "Maui Dolphin", "Monkseal", "Humpback Dolphins"],
    correct: "Maui Dolphin",
  },
  {
    question: "What do sea turtles often mistake plastic bags for?",
    options: ["Bottles", "Jellyfish", "Sharks", "Ghosts"],
    correct: "Jellyfish",
  },
  {
    question: "Why are Vaquita Porpoise endangered?",
    options: ["Gillnets", "Overfishing", "Pollution", "Climate Change"],
    correct: "Gillnets",
  },
  {
    question: "What is the biggest threat to sea turtles?",
    options: ["The Sun", "Fishing nets and plastic pollution", "Whales", "Sharks"],
    correct: "Fishing nets and plastic pollution",
  },
  {
    question: "What does it mean if a marine animal is endangered?",
    options: [
      "Great Pyramid of Giza",
      "Their species are extinct",
      "Their species are at a very low risk of extinction",
      "Their species are at very high risk of extinction",
    ],
    correct: "Their species are at very high risk of extinction",
  },
  {
    question: "Which of these can help keep marine life safe?",
    options: ["Pollution", "Recycling", "Oil spills", "Overfishing"],
    correct: "Recycling",
  },
  {
    question: "What greenhouse gas is most responsible for warming oceans?",
    options: ["Oxygen", "Nitrogen", "Helium", "Carbon Dioxide"],
    correct: "Carbon Dioxide",
  },
];


// QUIZ ELEMENTS //
const quizContainer = document.querySelector(".quiz-container");
const questionEl = document.querySelector(".quiz-container .question");
const optionsEl = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn");

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 10;
let timerInterval;


// QUIZ SHUFFLE //
const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

quizData = shuffleArray(quizData);


const resetLocalStorage = () => {
  for (let i = 0; i < MAX_QUESTIONS; i++) {
    localStorage.removeItem(`userAnswer_${i}`);
  }
};

resetLocalStorage();


// QUIZ CHECK ANSWER //
const checkAnswer = (e) => {
  let userAnswer = e.target.textContent;

  if (userAnswer === quizData[questionNumber].correct) {
    score++;
    e.target.classList.add("correct");
  } else {
    e.target.classList.add("incorrect");
  }

  localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

  document.querySelectorAll(".option").forEach((o) => {
    o.classList.add("disabled");
  });
};


const createQuestion = () => {
  clearInterval(timerInterval);

  let secondsLeft = 9;
  const timerDisplay = document.querySelector(".timer");

  timerDisplay.classList.remove("danger");
  timerDisplay.textContent = `Time Left: 10 seconds`;

  timerInterval = setInterval(() => {
    timerDisplay.textContent = `Time Left: ${secondsLeft
      .toString()
      .padStart(2, "0")} seconds`;

    secondsLeft--;

    if (secondsLeft < 3) {
      timerDisplay.classList.add("danger");
    }

    if (secondsLeft < 0) {
      clearInterval(timerInterval);
      displayNextQuestion();
    }
  }, 1000);

  optionsEl.innerHTML = "";

  questionEl.innerHTML = `<span class="question-number">${questionNumber + 1}/${MAX_QUESTIONS}</span>
  ${quizData[questionNumber].question}`;

  const shuffledOptions = shuffleArray(quizData[questionNumber].options);

  shuffledOptions.forEach((o) => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.textContent = o;

    btn.addEventListener("click", checkAnswer);

    optionsEl.appendChild(btn);
  });
};


// QUIZ NEXT QUESTION //
const displayNextQuestion = () => {
  if (questionNumber >= MAX_QUESTIONS - 1) {
    displayQuizResult();
    return;
  }

  questionNumber++;
  createQuestion();
};

if (nextBtn) {
  nextBtn.addEventListener("click", displayNextQuestion);
}


const retakeQuiz = () => {
  questionNumber = 0;
  score = 0;

  quizData = shuffleArray(quizData);
  resetLocalStorage();

  quizResult.style.display = "none";
  quizContainer.style.display = "block";

  createQuestion();
};


// QUIZ RESULT SCREEN //
const displayQuizResult = () => {
  quizResult.style.display = "flex";
  quizContainer.style.display = "none";
  quizResult.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = `You scored ${score} / ${MAX_QUESTIONS}`;
  quizResult.appendChild(heading);

  for (let i = 0; i < MAX_QUESTIONS; i++) {
    const div = document.createElement("div");
    div.classList.add("question-container");

    const userAnswer = localStorage.getItem(`userAnswer_${i}`);
    const correctAnswer = quizData[i].correct;

    if (userAnswer !== correctAnswer) {
      div.classList.add("incorrect");
    }

    div.innerHTML = `
      <div>Question ${i + 1}: ${quizData[i].question}</div>
      <div>Your answer: ${userAnswer || "Not answered"}</div>
      <div>Correct answer: ${correctAnswer}</div>
    `;

    quizResult.appendChild(div);
  }

  const btn = document.createElement("button");
  btn.textContent = "Retake Quiz";
  btn.classList.add("retake-btn");
  btn.addEventListener("click", retakeQuiz);

  quizResult.appendChild(btn);
};


// QUIZ START BUTTON // 
if (startBtn) {
  startBtn.addEventListener("click", () => {
    startBtnContainer.style.display = "none";
    quizContainer.style.display = "block";
    createQuestion();
  });
}
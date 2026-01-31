/*************************
 TIMER
**************************/
let timeLeft = 2 * 60; // total time in seconds
let timerId;

function startTimer() {
  const timer = document.getElementById("timer");

  timerId = setInterval(() => {
    // Calculate minutes and seconds
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    // Format as MM:SS
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Display timer
    timer.textContent = `Time Left: ${minutes}:${seconds}`;

    // Gradually change color if time < 30s
    if (timeLeft <= 30) {
      const red = 255;
      const green = Math.floor((timeLeft / 30) * 255);
      timer.style.color = `rgb(${red}, ${green}, 0)`;
    }

    // Check if time is up
    if (timeLeft <= 0) {
      clearInterval(timerId);

      // Auto-submit current answer or mark unanswered
      const selected = getSelectedAnswer();
      userAnswers[currentIndex] = selected !== null ? selected : -1;

      // Disable buttons
      document.querySelector(".next-btn").disabled = true;
      document.getElementById("submit-btn").disabled = true;

      showResult();
    }

    timeLeft--; // decrement after rendering
  }, 1000);
}



/*************************
 QUESTION BANK
**************************/
const questionBank = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
    correct: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: 1
  },
  {
    question: "Who wrote the national anthem of India?",
    options: ["Bankim Chandra", "Rabindranath Tagore", "Sarojini Naidu", "Subhash Chandra Bose"],
    correct: 1
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correct: 2
  },
  {
    question: "Who is known as the Father of the Indian Constitution?",
    options: ["Mahatma Gandhi", "Jawaharlal Nehru", "B. R. Ambedkar", "Rajendra Prasad"],
    correct: 2
  },
  {
    question: "Which is the largest planet in our solar system?",
    options: ["Earth", "Saturn", "Jupiter", "Neptune"],
    correct: 2
  },
  {
    question: "What is H2O commonly known as?",
    options: ["Oxygen", "Water", "Hydrogen", "Salt"],
    correct: 1
  },
  {
    question: "Which is the smallest continent?",
    options: ["Asia", "Europe", "Australia", "Antarctica"],
    correct: 2
  },
  {
    question: "Who was the first Prime Minister of India?",
    options: ["Indira Gandhi", "Jawaharlal Nehru", "Rajendra Prasad", "Mahatma Gandhi"],
    correct: 1
  },
  {
    question: "Which animal is known as the Ship of the Desert?",
    options: ["Horse", "Camel", "Elephant", "Donkey"],
    correct: 1
  },

  {
    question: "Which is the longest river in the world?",
    options: ["Amazon", "Ganga", "Nile", "Yangtze"],
    correct: 2
  },
  {
    question: "Which vitamin is produced by sunlight?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    correct: 3
  },
  {
    question: "Which instrument is used to measure temperature?",
    options: ["Barometer", "Thermometer", "Hygrometer", "Anemometer"],
    correct: 1
  },
  {
    question: "Which is the national animal of India?",
    options: ["Lion", "Elephant", "Tiger", "Leopard"],
    correct: 2
  },
  {
    question: "Which organ pumps blood in the human body?",
    options: ["Brain", "Lungs", "Heart", "Kidney"],
    correct: 2
  },
  {
    question: "Which is the fastest land animal?",
    options: ["Horse", "Lion", "Cheetah", "Tiger"],
    correct: 2
  },
  {
    question: "Which planet is closest to the Sun?",
    options: ["Earth", "Venus", "Mercury", "Mars"],
    correct: 2
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yuan", "Won", "Yen", "Dollar"],
    correct: 2
  },
  {
    question: "Which is the hardest natural substance?",
    options: ["Iron", "Gold", "Diamond", "Silver"],
    correct: 2
  },
  {
    question: "Which ocean is the largest?",
    options: ["Indian", "Atlantic", "Pacific", "Arctic"],
    correct: 2
  },

  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "South Korea", "Thailand"],
    correct: 1
  },
  {
    question: "Who discovered gravity?",
    options: ["Einstein", "Newton", "Galileo", "Tesla"],
    correct: 1
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "80°C", "100°C", "120°C"],
    correct: 2
  },
  {
    question: "Which device is used to measure earthquakes?",
    options: ["Barometer", "Thermometer", "Seismograph", "Hygrometer"],
    correct: 2
  },
  {
    question: "Which blood group is the universal donor?",
    options: ["A", "B", "AB", "O"],
    correct: 3
  },
  {
    question: "Which planet has rings?",
    options: ["Mars", "Earth", "Saturn", "Venus"],
    correct: 2
  },
  {
    question: "What does CPU stand for?",
    options: ["Central Power Unit", "Central Processing Unit", "Computer Personal Unit", "Core Processing Utility"],
    correct: 1
  },
  {
    question: "Which metal is liquid at room temperature?",
    options: ["Iron", "Mercury", "Silver", "Copper"],
    correct: 1
  },
  {
    question: "Which is the smallest planet?",
    options: ["Mars", "Venus", "Mercury", "Pluto"],
    correct: 2
  },
  {
    question: "Which sport uses a shuttlecock?",
    options: ["Tennis", "Badminton", "Squash", "Table Tennis"],
    correct: 1
  },

  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
    correct: 2
  },
  {
    question: "Which Indian city is called the Silicon Valley of India?",
    options: ["Pune", "Hyderabad", "Bengaluru", "Chennai"],
    correct: 2
  },
  {
    question: "Which is the national bird of India?",
    options: ["Peacock", "Parrot", "Eagle", "Sparrow"],
    correct: 0
  },
  {
    question: "Which planet is famous for its Great Red Spot?",
    options: ["Mars", "Jupiter", "Saturn", "Neptune"],
    correct: 1
  },
  {
    question: "Who is known as the Missile Man of India?",
    options: ["Vikram Sarabhai", "Homi Bhabha", "A. P. J. Abdul Kalam", "Satish Dhawan"],
    correct: 2
  },
  {
    question: "Which organ helps in breathing?",
    options: ["Heart", "Lungs", "Kidney", "Liver"],
    correct: 1
  },
  {
    question: "Which ocean is the smallest?",
    options: ["Indian", "Pacific", "Atlantic", "Arctic"],
    correct: 3
  },
  {
    question: "Which Indian freedom fighter is known as Netaji?",
    options: ["Bhagat Singh", "Sardar Patel", "Subhash Chandra Bose", "Lala Lajpat Rai"],
    correct: 2
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    options: ["Tiger", "Elephant", "Lion", "Leopard"],
    correct: 2
  },

  {
    question: "Which planet is called Earth’s twin?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    correct: 1
  },
  {
    question: "How many days are there in a leap year?",
    options: ["365", "366", "364", "360"],
    correct: 1
  },
  {
    question: "Which language has the most native speakers?",
    options: ["English", "Hindi", "Spanish", "Mandarin"],
    correct: 3
  },
  {
    question: "Which metal is used to make electric wires?",
    options: ["Iron", "Copper", "Aluminium", "Silver"],
    correct: 1
  },
  {
    question: "Who is known as the Father of Computers?",
    options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"],
    correct: 1
  },
  {
    question: "Which is the largest desert in the world?",
    options: ["Sahara", "Gobi", "Antarctica", "Kalahari"],
    correct: 2
  }
];



/*************************
 SHUFFLING
**************************/
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


function shuffleOptions(question) {
  const optionsWithFlag = question.options.map((opt, i) => ({
    text: opt,
    correct: i === question.correct
  }));

  shuffleArray(optionsWithFlag);

  question.options = optionsWithFlag.map(o => o.text);
  question.correct = optionsWithFlag.findIndex(o => o.correct);

  return question;
}



/*************************
 QUIZ SETUP
**************************/
const TOTAL_QUESTIONS = 10;
let quizQuestions = [];
let currentIndex = 0;
let userAnswers = [];

function startQuiz() {
  const shuffled = shuffleArray([...questionBank]);

  quizQuestions = shuffled
    .slice(0, TOTAL_QUESTIONS)
    .map(q => shuffleOptions({ ...q }));

  loadQuestion();
  startTimer();
}


/*************************
 LOAD QUESTION
**************************/
function loadQuestion() {
  const qText = document.getElementById("questionText");
  const optionsBox = document.getElementById("optionsContainer");

  qText.textContent = quizQuestions[currentIndex].question;
  optionsBox.innerHTML = "";

  quizQuestions[currentIndex].options.forEach((opt, i) => {
    const checked =
      userAnswers[currentIndex] === i ? "checked" : "";

    optionsBox.innerHTML += `
            <label class="option">
                <input type="radio" name="quiz-option" value="${i}" ${checked}>
                <span>${opt}</span>
            </label>
        `;
  });

  document.getElementById("questionNumber").textContent =
    `Q${currentIndex + 1}/${quizQuestions.length}`;
}



/*************************
 ANSWERS
**************************/
function getSelectedAnswer() {
  const options = document.getElementsByName("quiz-option");
  for (let opt of options) {
    if (opt.checked) return Number(opt.value);
  }
  return null;
}

function submitAnswer() {
  const selected = getSelectedAnswer();
  if (selected === null) {
    alert("Please select an option");
    return;
  }

  userAnswers[currentIndex] = selected;
  nextQuestion();
}

function nextQuestion() {
  if (currentIndex < quizQuestions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    clearInterval(timerId);
    showResult();
  }
}


/*************************
 RESULT
**************************/
function showResult() {
  clearInterval(timerId);
  document.querySelector(".quiz-container").style.display = "none";

  let score = 0;
  quizQuestions.forEach((q, i) => {
    if (userAnswers[i] === q.correct) score++;
  });

  const resultBox = document.querySelector(".result");
  const name = localStorage.getItem("username");
  const userClass = localStorage.getItem("userClass");
  const roll = localStorage.getItem("roll");

  resultBox.innerHTML = `
        <div class="result-box">
            <h2>Quiz Completed 🎉</h2>

            <div class="user-info">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Class:</strong> ${userClass}</p>
                <p><strong>Roll:</strong> ${roll}</p>
            </div>

            <div class="score-circle">
                ${score}/${quizQuestions.length}
            </div>

            <div class="stats">
                <div>Total: ${quizQuestions.length}</div>
                <div>Correct: ${score}</div>
                <div>Wrong: ${quizQuestions.length - score}</div>
            </div>

            <div class="result-actions">
                <button class="restart-btn" onclick="restartQuiz()">Restart</button>
                <button class="print-btn" onclick="printResult()">Print</button>
            </div>
        </div>
    `;

  resultBox.classList.add("show");

  localStorage.clear();
}


/*************************
 RESTART & PRINT
**************************/
function restartQuiz() {
  clearInterval(timerId);
  window.location.href = "userdetail.html";
}

function printResult() {
  window.print();
}


/*************************
 START
**************************/
startQuiz();

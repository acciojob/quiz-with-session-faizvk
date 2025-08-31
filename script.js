// Do not change code below this line
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"], // ✅ 4 choices now
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// reference to container
const questionsElement = document.getElementById("questions");
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

function renderQuestions() {
  questionsElement.innerHTML = ""; // ✅ reset before rendering

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    // Question text
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    // Choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");

      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`); // ✅ fix here
      choiceElement.setAttribute("value", choice);

      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      const label = document.createElement("label");
      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));

      questionElement.appendChild(label);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

renderQuestions();

// references
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// load saved progress (if any)
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = ""; // reset

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    // Question text
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    // Options
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const label = document.createElement("label");
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;

      // restore checked from sessionStorage
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // when user selects an answer
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      questionElement.appendChild(label);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// calculate score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}

// handle submit
submitBtn.addEventListener("click", () => {
  const score = calculateScore();
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // save final score in localStorage
  localStorage.setItem("score", score);
});

// if score was previously saved, show it
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// initial render
renderQuestions();

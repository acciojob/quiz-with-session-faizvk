// Get references to all the necessary DOM elements once.
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// The questions array (do not change)
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
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Load the user's progress from session storage.
// If no progress is found, default to an empty array.
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Function to display all the quiz questions on the page.
function renderQuestions() {
  // Clear any existing questions to prevent duplication on re-render.
  questionsElement.innerHTML = "";

  questions.forEach((question, i) => {
    const questionElement = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    // Create radio buttons for each choice.
    question.choices.forEach(choice => {
      const label = document.createElement("label");
      const choiceElement = document.createElement("input");
      
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`; // Groups radio buttons for one question.
      choiceElement.value = choice;

      // If this answer was saved in session storage, check the radio button.
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // When the user selects an answer, save it to session storage.
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      questionElement.appendChild(label);
      questionElement.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionElement);
  });
}

// Function to calculate the final score.
function calculateScore() {
  let score = 0;
  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });
  return score;
}

// Add an event listener to the submit button.
submitBtn.addEventListener("click", () => {
  const score = calculateScore();
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  
  // Save the final score to local storage.
  localStorage.setItem("score", score);
});

// --- Initial Page Load Logic ---

// Check if a score is already saved in local storage and display it.
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Display the questions on the page.
renderQuestions();

const data = [
	{
		id: 1,
		question: 'Which of these fish is actually a fish?',
		answers: [
			{ answer: 'swordfish', isCorrect: true },
			{ answer: 'jellyfish', isCorrect: false },
			{ answer: 'starfish', isCorrect: false },
			{ answer: 'crayfish', isCorrect: false },
		],
	},
	{
		id: 2,
		question: 'A flutter is a group of:',
		answers: [
			{ answer: 'butterflies', isCorrect: true },
			{ answer: 'bees', isCorrect: false },
			{ answer: 'penguins', isCorrect: false },
			{ answer: 'camels', isCorrect: false },
		],
	},
	{
		id: 1,
		question: 'A group of which animals is referred to as a wake?',
		answers: [
			{ answer: 'vultures', isCorrect: true },
			{ answer: 'bats', isCorrect: false },
			{ answer: 'ants', isCorrect: false },
		],
	},
];

const gameScreen = document.querySelector('.game');
const resultScreen = document.querySelector('.result');
const question = document.querySelector('.question');
const answersContainer = document.querySelector('.answers');
const submit = document.querySelector('.submit');
const play = document.querySelector('.play');

let qIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let total = 0;
let selectedAnswer;

const playAgain = () => {
	qIndex = 0;
	correctCount = 0;
	wrongCount = 0;
	total = 0;
	showQuestion(qIndex);
};

play.addEventListener('click', () => {
	playAgain();
	resultScreen.style.display = 'none';
	gameScreen.style.display = 'block';
});

const showResult = () => {
	resultScreen.style.display = 'block';
	gameScreen.style.display = 'none';
	total = (correctCount - wrongCount) * 10;

	resultScreen.querySelector(
		'.correct'
	).textContent = `Correct Answers: ${correctCount}`;

	resultScreen.querySelector(
		'.wrong'
	).textContent = `Wrong Answers: ${wrongCount}`;

	resultScreen.querySelector('.score').textContent = `Score: ${total}`;
};

const showQuestion = (qNumber) => {
	if (qIndex === data.length) return showResult();
	selectedAnswer = null;
	question.textContent = data[qNumber].question;
	answersContainer.innerHTML = data[qNumber].answers
		.map(
			(item, index) =>
				`
        <div class="answer">
        <input
            type="radio"
            name="answer"
            id=${index}
            value=${item.isCorrect}
        />
        <label for="1">${item.answer}</label>
    </div>
    `
		)
		.join('');

	selectAnswer();
};

const selectAnswer = () => {
	answersContainer.querySelectorAll('input').forEach((e) => {
		e.addEventListener('click', (e) => {
			selectedAnswer = e.target.value;
		});
	});
};

const submitAnswer = () => {
	submit.addEventListener('click', () => {
		if (selectedAnswer !== null) {
			selectedAnswer == 'true' ? correctCount++ : wrongCount++;
			showQuestion(++qIndex);
		} else {
			alert('Please select an answer');
		}
	});
};

showQuestion(qIndex);
submitAnswer();

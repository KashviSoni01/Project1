const questions = [
    {
        question: "Which of the following is NOT considered a part of the Puranic literature?",
        options: ["Bhagavata Purana", "Vishnu Purana", "Ramayana", "Shiva Purana"],
        answer: 2,
        media: { type: "text" }
    },
    {
        question: "How many Avatars of Lord Vishnu are mentioned in the Vishnu Purana?",
        options: ["8", "10", "12", "24"],
        answer: 1,
        media: { type: "text" }
    },
    {
        question: "According to the Puranas, who is considered the creator of the universe?",
        options: ["Vishnu", "Shiva", "Brahma", "Indra"],
        answer: 2,
        media: { type: "text" }
    },
    {
        question: "In the Markandeya Purana, which deity is mainly praised in the 'Devi Mahatmya' section?",
        options: ["Durga", "Lakshmi", "Saraswati", "Kali"],
        answer: 0,
        media: { type: "text" }
    },
    {
        question: "The Matsya Purana narrates the story of Lord Vishnu's incarnation as a fish. What was the purpose of this avatar?",
        options: ["To defeat a demon", "To destroy the universe", "To marry Goddess Lakshmi", "To save the Vedas from a demon"],
        answer: 3,
        media: { type: "text" }
    },
    {
        question: "In the Bhagavata Purana, who is the demon king who received salvation from Lord Vishnu in his Narasimha avatar?",
        options: ["Hiranyaksha", "Hiranyakashipu", "Ravana", "Bali"],
        answer: 1,
        media: { type: "text" }
    },
    {
        question: "The story of the Kurma Avatar involves the churning of the ocean. What precious object did the gods and demons obtain during this event?",
        options: ["Amrita (Nectar of Immortality)", "Sudarshan Chakra", "Trishul", "Brahmastra"],
        answer: 0,
        media: { type: "text" }
    },
    {
        question: "What does the Linga Purana primarily describe?",
        options: ["The stories of Lord Krishna", "The creation of the universe", "The significance of the Shiva Linga", "The avatars of Lord Vishnu"],
        answer: 2,
        media: { type: "text" }
    },
    {
        question: "In the Brahma Purana, which famous pilgrimage site is prominently described?",
        options: ["Mathura", "Rameshwaram", "Prayagraj", "Jagannath Puri"],
        answer: 3,
        media: { type: "text" }
    },
    {
        question: "The Puranas are classified into three main groups based on the worship of particular deities. Which of the following is NOT one of those groups?",
        options: ["Dhyana (for Krishna)", "Sattva (for Vishnu)", "Rajas (for Brahma)", "Tamas (for Shiva)"],
        answer: 0,
        media: { type: "text" }
    }
];

const messages = [
    "You’re not just a quiz master, you're a *quiz superhero*! 🦸‍♂️ Keep going, Brainy is watching you crush it! 💥",
    "Woop woop! 🚨 You're on a roll! Keep answering like it's your second job! 💼✨",
    "You might just be the Einstein of quizzes. 🤓 Just don’t invent a time machine yet! ⏳",
    "Is it just me, or do you have a superpower? Is it *quiz answering*? 🦸‍♀️ Keep it up!",
    "I’d give you a 10/10 for effort, but you're already scoring more than that! ⭐️⭐️⭐️⭐️⭐️",
    "Your brain is doing jumping jacks right now... and winning! 💪 Keep it up!",
    "Oh wow, look at you go! If quizzing was an Olympic sport, you’d be wearing gold. 🥇",
    "Brainy says: *You’re a genius in the making*! Just don’t let the fame go to your head. 😎",
    "Another correct answer? You’re like a *quiz wizard*, casting spells of knowledge! 🔮✨",
    "If there was a *coolness meter*, you'd be off the charts right now! 🕶️ Keep it chill, keep it smart!"
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeRemaining = 60;

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const mediaContainer = document.getElementById('video-container');
    const hintVideoContainer = document.getElementById('hint-video-container');
    const nextButton = document.getElementById('next-button');
    const submitButton = document.getElementById('submit-button');
    const finalButtonContainer = document.querySelector('.final-button-container');
    const timerElement = document.getElementById('timer');

    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    mediaContainer.innerHTML = '';
    hintVideoContainer.innerHTML = '';

    // Display hint video
    if (currentQuestion.hint && currentQuestion.hint.type === "image") {
        hintVideoContainer.innerHTML = `<img src="${currentQuestion.hint.src}" alt="Hint image" width="350" />`;
    }

    if (currentQuestion.media.type === "video") {
        mediaContainer.innerHTML = `<video width="250" controls>
            <source src="${currentQuestion.media.src}" type="video/mp4">
            Your browser does not support the video tag.
        </video>`;
    } else if (currentQuestion.media.type === "image") {
        mediaContainer.innerHTML = `<img src="${currentQuestion.media.src}" alt="Question image" width="250" />`;
    } else if (currentQuestion.media.type === "audio") {
        mediaContainer.innerHTML = `<audio controls>
            <source src="${currentQuestion.media.src}" type="audio/mp4">
            Your browser does not support the audio tag.
        </audio>`;
    }

    currentQuestion.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.innerHTML = `<input type="radio" name="option" value="${index}" id="option${index}">
                              <label for="option${index}">${option}</label>`;
        optionsElement.appendChild(optionDiv);
    });

    if (currentQuestionIndex === 0) {
        nextButton.style.display = 'inline-block';
        finalButtonContainer.style.display = 'none';
    } else if (currentQuestionIndex === questions.length - 1) {
        nextButton.style.display = 'none';
        finalButtonContainer.style.display = 'inline-flex';
    } else {
        nextButton.style.display = 'inline-block';
        finalButtonContainer.style.display = 'none';
    }

    resetTimer();
}

document.getElementById('hint-button').onclick = () => {
    const hintVideoContainer = document.getElementById('hint-video-container');
    
    
    if (hintVideoContainer.style.display === 'none' || hintVideoContainer.style.display === '') {
        hintVideoContainer.style.display = 'block';
    } else {
        hintVideoContainer.style.display = 'none';
    }
};
document.getElementById('message-button').onclick = () => {
    const currentMessage = messages[currentQuestionIndex];
    alert(currentMessage); 
};

function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timeRemaining;

    if (timeRemaining === 0) {
        clearInterval(timerInterval); 
        if (currentQuestionIndex === questions.length - 1) {
            submitQuiz();  
        } else {
            nextQuestion();
        }
    } else {
        timeRemaining--; 
    }
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000); 
}

function resetTimer() {
    timeRemaining = 60; 
    clearInterval(timerInterval); 
    startTimer(); 
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    
    if (!selectedOption && timeRemaining > 0) {
        alert("Please select an option before moving to the next question.");
        return;  
    }

    if (selectedOption && parseInt(selectedOption.value) === questions[currentQuestionIndex].answer) {
        score++;  
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion(); 
        document.getElementById('hint-video-container').style.display = 'none'; 
    } else {
        submitQuiz();  
    }
}

function submitQuiz() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption && parseInt(selectedOption.value) === questions[currentQuestionIndex].answer) {
        score++; 
    }

    const questionElement = document.getElementById('question');
    questionElement.innerHTML = `Quiz completed! Your score is ${score} out of ${questions.length}.`;

    document.getElementById('options').innerHTML = ''; 
    document.getElementById('video-container').innerHTML = ''; 
    document.getElementById('next-button').style.display = 'none'; 
    document.getElementById('submit-button').style.display = 'none'; 
    document.querySelector('.final-button-container').style.display = 'none';
    document.querySelector('#timer-container').style.display = 'none';
}

document.getElementById('next-button').onclick = nextQuestion;
document.getElementById('submit-button').onclick = submitQuiz;

loadQuestion(); 

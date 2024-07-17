const chatBox = document.getElementById('chat-box');
const inputBox = document.getElementById('input-box');

let chatFlow = [
    {
        question: "Hi! I'm your library assistant. Do you want to borrow a book?",
        answers: [
            { text: "Yes", next: 1 },
            { text: "No", next: 2 }
        ]
    },
    {
        question: "Great! What type of book are you looking for?",
        answers: [
            { text: "Fiction", next: 3 },
            { text: "Non-Fiction", next: 4 }
        ]
    },
    {
        question: "Okay, let me know if you need any assistance.",
        answers: []
    },
    {
        question: "Fiction is a great choice! Do you have a specific author in mind?",
        answers: [
            { text: "Yes", next: 5 },
            { text: "No", next: 6 }
        ]
    },
    {
        question: "Non-Fiction is very informative! Do you have a specific topic in mind?",
        answers: [
            { text: "Yes", next: 7 },
            { text: "No", next: 8 }
        ]
    },
    {
        question: "Please let me know the author's name and I'll help you find the book.",
        answers: [
            { text: "Return to start", next: 0 }
        ]
    },
    {
        question: "No worries! We have a wide range of fiction books. Feel free to browse.",
        answers: [
            { text: "Return to start", next: 0 }
        ]
    },
    {
        question: "Please let me know the topic you're interested in and I'll help you find the book.",
        answers: [
            { text: "Return to start", next: 0 }
        ]
    },
    {
        question: "No worries! We have a wide range of non-fiction books. Feel free to browse.",
        answers: [
            { text: "Return to start", next: 0 }
        ]
    }
];

function startChat() {
    let currentIndex = 0;
    showMessage(chatFlow[currentIndex].question, 'bot');

    chatFlow[currentIndex].answers.forEach(answer => {
        createButton(answer.text, () => {
            showMessage(answer.text, 'user');
            currentIndex = answer.next;
            nextQuestion(currentIndex);
        });
    });
}

function nextQuestion(index) {
    clearButtons();
    setTimeout(() => {
        showMessage(chatFlow[index].question, 'bot');
        chatFlow[index].answers.forEach(answer => {
            createButton(answer.text, () => {
                showMessage(answer.text, 'user');
                nextQuestion(answer.next);
            });
        });
    }, 500);
}

function showMessage(text, sender) {
    let message = document.createElement('div');
    message.classList.add('message', sender);
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function createButton(text, onClick) {
    let button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    inputBox.appendChild(button);
}

function clearButtons() {
    inputBox.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', startChat);

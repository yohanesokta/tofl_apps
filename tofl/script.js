// === TOEFL TEST PAGE LOGIC ===
import { listening } from "./soal/listening.js";
import { reading } from "./soal/reading.js";
import { structure } from "./soal/structure.js";

if (document.getElementById('test-interface')) {
    // Profile Modal Elements
    const profileModal = document.getElementById('profile-modal-overlay');
    const saveProfileBtn = document.getElementById('save-profile-btn');
    const playerNameInput = document.getElementById('player-name-input');
    const avatarGrid = document.querySelector('.avatar-grid');
    const userProfileDisplay = document.getElementById('user-profile-display');
    const btnFinish = document.getElementById('finish-btn')
    const point_display = document.getElementById('point');
    let selectedAvatarSrc = null;
    let timeString = "";
    // Test Elements
    const questions = { listening, structure, reading };

    let currentSection = 'listening';
    let point = 0;
    let currentQuestionIndex = 0;
    let userAnswers = {};
    const tabButtons = document.querySelectorAll('.tab-btn');
    const testSections = document.querySelectorAll('.test-section');
    const audio_control = document.getElementById("audio-controls");
    const questionTextElements = {
        listening: document.getElementById('listening-question-text'),
        structure: document.getElementById('structure-question-text'),
        reading: document.getElementById('reading-question-text'),
    };
    const answerOptionsContainer = document.getElementById('answer-options');
    const progressIndicator = document.getElementById('progress-indicator');
    const nextBtn = document.getElementById('next-btn');

    // --- PROFILE LOGIC ---
    function displayUserProfile(profile) {
        document.getElementById('user-name').textContent = profile.name;
        document.getElementById('user-avatar').src = profile.avatar;
        userProfileDisplay.classList.remove('hidden');
    }

    avatarGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('avatar-option')) {
            avatarGrid.querySelectorAll('.avatar-option').forEach(img => img.classList.remove('selected'));
            e.target.classList.add('selected');
            selectedAvatarSrc = e.target.src;
        }
    });

    saveProfileBtn.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (!playerName) {
            alert('Please enter your name.');
            return;
        }
        if (!selectedAvatarSrc) {
            alert('Please select an avatar.');
            return;
        }

        const userProfile = {
            name: playerName,
            avatar: selectedAvatarSrc
        };

        localStorage.setItem('toeflUserProfile', JSON.stringify(userProfile));
        profileModal.classList.add('hidden');
        displayUserProfile(userProfile);
    });

    function checkUserProfile() {
        const userProfile = JSON.parse(localStorage.getItem('toeflUserProfile'));
        if (!userProfile) {
            profileModal.classList.remove('hidden');
        } else {
            displayUserProfile(userProfile);
        }
    }

    function switchSection(sectionName) {
        if (nowTrue) {
            point += 1;point_display.textContent = point;nowTrue=false
        }
        currentSection = sectionName;
        currentQuestionIndex = 0;
        tabButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.tab-btn[data-section="${sectionName}"]`).classList.add('active');
        testSections.forEach(sec => sec.classList.remove('active'));
        document.getElementById(`${sectionName}-section`).classList.add('active');
        loadQuestion();
    }

    let nowTrue = false

    function loadQuestion() {

        const questionData = questions[currentSection][currentQuestionIndex];
        console.log(nowTrue)
        if (nowTrue) {
            point += 1;point_display.textContent = point;nowTrue=false
        }

        if (questionData.type == "audio") {
            audio_control.setAttribute("src", "../assets/audio/" + questionData.source)
        } else if (questionData.type == "text") {
            document.getElementById('text-for').textContent = `Passage 1 (Questions ${questionData['reading_text'].for})`
            document.getElementById('text-quest').textContent = questionData['reading_text'].text
        }
        questionTextElements[currentSection].textContent = `${questionData.number ?? currentQuestionIndex + 1}. ${questionData.question}`;
        answerOptionsContainer.innerHTML = '';
        questionData.options.forEach((option, index) => {
            const optionId = `q${currentQuestionIndex}_opt${index}`;
            const isChecked = userAnswers[`${currentSection}-${currentQuestionIndex}`] === index;
            const optionElement = document.createElement('label');
            optionElement.htmlFor = optionId;
            optionElement.innerHTML = `
                    <input type="radio" name="question${currentQuestionIndex}" id="${optionId}" value="${index}" ${isChecked ? 'checked' : ''}>
                    <span class="radio-custom"></span>
                    <span class="option-text">${option}</span>
                `;
            answerOptionsContainer.appendChild(optionElement);
        });
        answerOptionsContainer.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                userAnswers[`${currentSection}-${currentQuestionIndex}`] = parseInt(e.target.value);
                nowTrue = parseInt(e.target.value) == questionData.answer
            });
        });
        updateNavigation();
    }

    function updateNavigation() {
        const totalQuestions = questions[currentSection].length;
        progressIndicator.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
        nextBtn.disabled = currentQuestionIndex === totalQuestions - 1;
    }

    // tabButtons.forEach(btn => {
    //     btn.addEventListener('click', () => switchSection(btn.dataset.section));
    // });

    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < questions[currentSection].length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        }
    });



    btnFinish.addEventListener('click', () => {
        switch (currentSection) {
            case 'listening' : 
                switchSection('structure'); break;
            case 'structure' : 
                switchSection('reading'); break;
        }
    })

    let totalSeconds = 100 * 60;

    function updateTimer() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        timeString =
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');

        document.getElementById("timer").textContent = timeString;

        switch (timeString) {
            case "01:10:00":
                switchSection('structure'); break;
            case "00:55:00":
                switchSection('reading'); break;
        }

        if (totalSeconds > 0) {
            totalSeconds--;
        } else {
            clearInterval(timerInterval);
            alert("Waktu Habis!");
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);

    // --- INITIAL PAGE LOAD ---
    checkUserProfile();
    loadQuestion();
}
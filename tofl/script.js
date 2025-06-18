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
    const score_display = document.getElementById('score-display');
    let selectedAvatarSrc = null;
    let timeString = "";
    // Test Elements
    const questions = { listening, structure, reading };

    let currentSection = 'listening';
    let point = 0;
    let currentQuestionIndex = 0;
    let userAnswers = {};
    const score_data = {
        "listening" : {
            data : [],
            total : 0,
            plus : 24
        },
        
        "structure" : {
            data : [],
            total : 0,
            plus : 20
        },
        "reading" : {
            data : [],
            total : 0,
            plus : 21
        }
    }

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
        const timerInterval = setInterval(updateTimer, 1000);
    }

    userProfileDisplay.addEventListener('click',function updateProfile(){
        userProfileDisplay.classList.add('hidden');
        profileModal.classList.remove('hidden')
    })
    

    function save_and_display_score() {
        let total_data = 0
        Object.keys(score_data).forEach((key)=> {
            total_data += score_data[key].total + score_data[key].plus
        })
        const score = Math.floor((total_data * 10) / 3);
        const time = new Date();
        score_display.textContent = score;
        document.getElementById('ending').style.display = "flex";
        let data_profile = localStorage.getItem('toeflUserProfile');
        let data_history = localStorage.getItem('history');
        data_history = JSON.parse(data_history)
        data_profile = JSON.parse(data_profile)
        data_profile['score'] = score
        data_profile['listening'] = score_data.listening.total
        data_profile['reading'] = score_data.reading.total
        data_profile['structure'] = score_data.structure.total
        localStorage.setItem("name",data_profile.name)
        localStorage.setItem('score',score)
        data_profile['date'] = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`
        data_profile['rank'] = data_history.length + 1
        data_history.push(data_profile)
        localStorage.setItem("history",JSON.stringify(data_history));
        localStorage.removeItem('toeflUserProfile')
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

    function countCurrentPoint() {
        point = 0
        Object.keys(score_data).forEach((key)=> {
            let temp_total = 0;
            score_data[key].data.forEach((element) => {
                if (element) {
                    point += 1; temp_total+= 1
                }
            })
            score_data[key].total = temp_total
        })
        

    }


    function switchSection(sectionName) {
        currentSection = sectionName;
        countCurrentPoint();
        currentQuestionIndex = 0;
        tabButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.tab-btn[data-section="${sectionName}"]`).classList.add('active');
        testSections.forEach(sec => sec.classList.remove('active'));
        document.getElementById(`${sectionName}-section`).classList.add('active');
        loadQuestion();
    }
    function loadQuestion() {

        const questionData = questions[currentSection][currentQuestionIndex];

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
                score_data[currentSection].data[`${currentQuestionIndex}`] = parseInt(e.target.value ) == questionData.answer
                countCurrentPoint();
            });
        });
        updateNavigation();
    }

    function updateNavigation() {
        const totalQuestions = questions[currentSection].length;
        progressIndicator.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
        nextBtn.disabled = currentQuestionIndex === totalQuestions - 1;
        point_display.textContent = point
    }

    document.getElementById('prev-btn').addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                loadQuestion();
            }
        });

    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < questions[currentSection].length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        }
    });



    btnFinish.addEventListener('click', () => {
        countCurrentPoint();
        switch (currentSection) {
            case 'listening' : 
                switchSection('structure'); break;
            case 'structure' : 
                switchSection('reading'); break;
            case 'reading':
                save_and_display_score(); break;
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
            case "00:00:01":
                save_and_display_score(); break;
        }

        if (totalSeconds > 0) {
            totalSeconds--;
        } else {
            clearInterval(timerInterval);
            alert("Waktu Habis!");
        }
    }


    // --- INITIAL PAGE LOAD ---
    checkUserProfile();
    loadQuestion();
}
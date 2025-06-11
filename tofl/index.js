// === TOEFL TEST PAGE LOGIC ===
    if (document.getElementById('test-interface')) {
        const questions = {
            listening: [
                { type: 'audio', question: 'What does the man imply?', options: ['He will not be able to attend the party.', 'He is glad to be invited.', 'He has another engagement.', 'He thinks the party will be boring.'], answer: 1 },
                { type: 'audio', question: 'What does the woman mean?', options: ['The class is very difficult.', 'The professor is not very engaging.', 'She is not interested in the subject.', 'She finds the lectures fascinating.'], answer: 3 },
            ],
            structure: [
                { type: 'text', question: 'The committee has met and ______.', options: ['they have reached a decision.', 'its decision was reached.', 'it has reached a decision.', 'its decision has been reached.'], answer: 2 },
                { type: 'text', question: 'The sun ______ vast amounts of gas from its surface.', options: ['ejects', 'is ejecting', 'ejecting', 'has been ejected'], answer: 0 },
            ],
            reading: [
                { type: 'text', question: 'The word "static" in the passage is closest in meaning to...', options: ['unchanging', 'chaotic', 'noisy', 'popular'], answer: 0 },
                { type: 'text', question: 'According to the passage, who first used the term "folklore"?', options: ['A community elder', 'An English musician', 'William Thoms', 'A folklorist'], answer: 2 },
            ]
        };

        let currentSection = 'listening';
        let currentQuestionIndex = 0;
        let userAnswers = {};

        const tabButtons = document.querySelectorAll('.tab-btn');
        const testSections = document.querySelectorAll('.test-section');
        const questionTextElements = {
            listening: document.getElementById('listening-question-text'),
            structure: document.getElementById('structure-question-text'),
            reading: document.getElementById('reading-question-text'),
        };
        const answerOptionsContainer = document.getElementById('answer-options');
        const progressIndicator = document.getElementById('progress-indicator');
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');

        function switchSection(sectionName) {
            currentSection = sectionName;
            currentQuestionIndex = 0;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector(`.tab-btn[data-section="${sectionName}"]`).classList.add('active');

            testSections.forEach(sec => sec.classList.remove('active'));
            document.getElementById(`${sectionName}-section`).classList.add('active');

            loadQuestion();
        }

        function loadQuestion() {
            const questionData = questions[currentSection][currentQuestionIndex];
            questionTextElements[currentSection].textContent = `${currentQuestionIndex + 1}. ${questionData.question}`;
            
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
                });
            });

            updateNavigation();
        }
        
        function updateNavigation() {
            const totalQuestions = questions[currentSection].length;
            progressIndicator.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
            prevBtn.disabled = currentQuestionIndex === 0;
            nextBtn.disabled = currentQuestionIndex === totalQuestions - 1;
        }

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => switchSection(btn.dataset.section));
        });

        nextBtn.addEventListener('click', () => {
            if (currentQuestionIndex < questions[currentSection].length - 1) {
                currentQuestionIndex++;
                loadQuestion();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                loadQuestion();
            }
        });

        // Initial Load
        loadQuestion();
    }
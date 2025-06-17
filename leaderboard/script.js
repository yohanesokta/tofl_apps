document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('stats')) {
                startCounters(entry.target);
            }
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));
    
    function startCounters(statsSection) {
        const counters = statsSection.querySelectorAll('.counter');
        const speed = 200; 
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const wrapper = document.querySelector('.testimonial-wrapper');
        const slides = document.querySelectorAll('.testimonial-slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;

        function goToSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            wrapper.style.transform = `translateX(${-index * 100}%)`;
            currentIndex = index;
        }

        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    }


    if (document.getElementById('leaderboard-body')) {
        const userData = JSON.parse(localStorage.getItem("history"))
        console.log(userData)

        const sortSelect = document.getElementById('sort-by');

        function renderLeaderboard(data) {
            const podiumData = data.slice(0, 3);
            const listData = data.slice(3);
            if (podiumData[0]) {
            document.getElementById('pod-1').style.display = "block"
            document.getElementById('rank1-name').textContent = podiumData[0].name;
            document.getElementById('rank1-score').textContent = podiumData[0].score;
            document.getElementById('rank1-img').src = podiumData[0].avatar;
            }
            
            if (podiumData[1]) {
            document.getElementById('pod-2').style.display = "block"

            document.getElementById('rank2-name').textContent = podiumData[1].name;
            document.getElementById('rank2-score').textContent = podiumData[1].score;
            document.getElementById('rank2-img').src = podiumData[1].avatar;
            }

            if (podiumData[2]) {
            document.getElementById('pod-3').style.display = "block"

            document.getElementById('rank3-name').textContent = podiumData[2].name;
            document.getElementById('rank3-score').textContent = podiumData[2].score;
            document.getElementById('rank3-img').src = podiumData[2].avatar;
            }
            
            const leaderboardBody = document.getElementById('leaderboard-body');
            leaderboardBody.innerHTML = ''; 

            listData.forEach(user => {
                const row = document.createElement('tr');
                const formattedDate = new Date(user.date).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                });

                row.innerHTML = `
                    <td><span class="rank-cell">${user.rank}</span></td>
                    <td>${user.name}</td>
                    <td>${user.score}</td>
                    <td>${formattedDate}</td>
                `;
                leaderboardBody.appendChild(row);
            });
        }

        function sortData(sortBy) {
            let sortedData = [...userData];
            if (sortBy === 'score') {
                sortedData.sort((a, b) => b.score - a.score);
            } else if (sortBy === 'date') {
                sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
            }

            sortedData.forEach((user, index) => {
                user.rank = index + 1;
            });

            renderLeaderboard(sortedData);
        }
        
        sortSelect.addEventListener('change', (e) => {
            sortData(e.target.value);
        });
        
        sortData('score');
    }
});
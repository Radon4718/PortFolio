document.addEventListener("DOMContentLoaded", () => {
    const app = {
        // === STATE ===
        state: {
            accentColor: '',
            cursor: { x: 0, y: 0, targetX: 0, targetY: 0 },
        },

        // === CONFIG ===
        config: {
            projects: [
                {
                    title: "Fluid Resistance Sim",
                    description: "A desktop simulation using Java to accurately model fluid dynamics and drag forces on various shapes.",
                    type: 'video',
                    tags: ["Physics", "Java", "Processing"],
                    src: "assets/fluid resistance simulator.mp4",
                    poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Fluid+Sim",
                    github: "https://github.com/Radon4718/Processing",
                    demo: ""
                },
                {
                    title: "Visual Path Finder",
                    description: "A visualizer for pathfinding algorithms like A* and Dijkstra's, built with Java.",
                    type: 'video',
                    tags: ["Algorithms", "Java", "Data Structures"],
                    src: "assets/Algorithm Visualizer.mp4",
                    poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Path+Finder",
                    github: "https://github.com/Radon4718/Algorithm-Visualizer",
                    demo: ""
                },
                {
                    title: "Core Game Logic",
                    description: "A prototype demonstrating system design and robust core mechanics for a 2D RPG using Godot.",
                    type: 'video',
                    tags: ["Game Dev", "CPP", "System Design"],
                    src: "assets/game logic.mp4",
                    poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Game+Logic",
                    github: "",
                    demo: ""
                },
                {
                    title: "Interactive Quiz App",
                    description: "A timed quiz application built with vanilla JavaScript, focusing on DOM manipulation and state management.",
                    type: 'video',
                    tags: ["Java", "DataBase", "SQL"],
                    src: "assets/Quiz app.mp4",
                    poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Quiz+App",
                    github: "https://github.com/Radon4718/Quiz_App",
                    demo: ""
                },
                {
                    title: "Gravity Simulator",
                    description: "A physics simulation demonstrating the effect of N-body gravitational pull on particles.",
                    type: 'video',
                    tags: ["Physics", "Simulation", "Java"],
                    src: "assets/gravitational pull simulator.mp4",
                    poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Gravity+Sim",
                    github: "https://github.com/Radon4718/Processing",
                    demo: ""
                },
                {
                    title: "Particle Repulsion",
                    description: "A Processing sketch showing particle movement governed by basic force repulsion mechanics.",
                    type: 'video',
                    tags: ["Processing", "Simulation", "Java"],
                    src: "assets/repulsion simulation.mp4",
                    poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Repulsion",
                    github: "https://github.com/Radon4718/Processing",
                    demo: ""
                },
                {
                    title: "Java 2D Platformer",
                    description: "A 2d platformer game built in Java using OOP principles, featuring player movement, enemies, and level design.",
                    type: 'video',
                    tags: ["Java", "OOP", "Game Dev"],
                    src: "assets/Java Game.mp4",
                    poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Java+RPG",
                    github: "https://github.com/Radon4718/PlatformerGameInJava-master",
                    demo: ""
                },
                {
                    title: "Portfolio v1",
                    description: "A portfolio application demonstrating HTML, CSS, and JavaScript skills to showcase projects effectively.",
                    type: 'video',
                    tags: ["HTML", "CSS", "JavaScript", "Web"],
                    src: "assets/PortFolio.mp4",
                    poster: "https://placehold.co/600x400/1a1a1a/1db954?text=PortFolio",
                    github: "https://github.com/Radon4718/PortFolio",
                    demo: ""
                },
                {
                    title: "Environment Simulator",
                    description: "A simulation modeling fish behavior in response to environmental factors using Java and Processing.",
                    type: 'video',
                    tags: ["Java", "Processing", "Logic Design"],
                    src: "assets/vid fish.mp4",
                    poster: "https://placehold.co/600x400/1a1a1a/1db954?text=PortFolio",
                    github: "https://github.com/Radon4718/Processing",
                    demo: ""
                },
                {
                    title: "Weather App",
                    description: "A Web application that fetches and displays weather data using a public API. Made with Java Servlets and JSP.",
                    type: 'video',
                    tags: ["HTTP", "Java", "Weather API", "Web"],
                    src: "assets/weather app.mp4",
                    poster: "https://placehold.co/600x400/1a1a1a/1db954?text=PortFolio",
                    github: "https://github.com/Radon4718/Weather_Information_app",
                    demo: ""
                },
                {
                    title: "Web Crawler",
                    description: "A Java-based web crawler that indexes web pages and extracts relevant information for analysis.",
                    type: 'video',
                    tags: ["HTTP", "Java", "API", "Web"],
                    src: "assets/web crawler.mp4",
                    poster: "https://placehold.co/600x400/1a1a1a/1db954?text=PortFolio",
                    github: "",
                    demo: ""
                },
                {
                    title: "Godot Environment Sim",
                    description: "A Godot-based simulation modeling fish behavior in response to environmental factors using GDScript.",
                    type: 'video',
                    tags: ["GDScript", "Godot", "Game dev"],
                    src: "assets/Godot.mp4",
                    poster: "https://placehold.co/600x400/1a1a1a/1db954?text=PortFolio",
                    github: "https://github.com/Radon4718/Godot_Enviroment_simuplation",
                    demo: ""
                }
            ],
        },

        // === METHODS ===
        init() {
            this.updateAccentColor();
            this.initPreloader();
            this.initTheme();
            this.initBurgerMenu();
            this.initCursor(); // New Magnetic Cursor
            this.initProjects(); // Generates cards, then calls init3DTilt
            this.initScrollAnimations();
        },

        updateAccentColor() {
            this.state.accentColor = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#10b981';
        },

        initPreloader() {
            const p = document.getElementById('preloader');
            if (p) {
                setTimeout(() => { p.style.opacity = '0'; setTimeout(() => p.remove(), 500); }, 600);
            }
        },

        initTheme() {
            const themeBtn = document.getElementById('themeToggle');
            const html = document.documentElement;
            // Default to dark theme for that hacker/dev aesthetic
            html.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');

            themeBtn.addEventListener('click', () => {
                const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
                this.updateAccentColor();
            });
        },

        initBurgerMenu() {
            const burger = document.getElementById('burger');
            const navLinks = document.querySelector('.nav-links');
            if (burger) {
                burger.addEventListener('click', () => {
                    burger.classList.toggle('active');
                    navLinks.classList.toggle('active');
                });

                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.addEventListener('click', () => {
                        burger.classList.remove('active');
                        navLinks.classList.remove('active');
                    });
                });
            }
        },

        // === NEW FEATURE: Magnetic Cursor ===
        initCursor() {
            const cursor = document.getElementById("cursor");
            const follower = document.getElementById("cursor-follower");

            // Initial position
            this.state.cursor.x = window.innerWidth / 2;
            this.state.cursor.y = window.innerHeight / 2;
            this.state.cursor.targetX = window.innerWidth / 2;
            this.state.cursor.targetY = window.innerHeight / 2;

            document.addEventListener("mousemove", (e) => {
                this.state.cursor.targetX = e.clientX;
                this.state.cursor.targetY = e.clientY;

                // Immediate update for the dot
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            });

            // Smooth follow loop
            const animateFollower = () => {
                const { cursor: c } = this.state;
                // Linear interpolation (lerp) for smooth lag
                c.x += (c.targetX - c.x) * 0.15;
                c.y += (c.targetY - c.y) * 0.15;

                follower.style.left = `${c.x}px`;
                follower.style.top = `${c.y}px`;

                requestAnimationFrame(animateFollower);
            };
            animateFollower();

            // Hover Effects
            const addHover = () => document.body.classList.add("hovering");
            const removeHover = () => document.body.classList.remove("hovering");

            // Attach to all links, buttons, and cards
            const interactables = document.querySelectorAll("a, button, .magnetic-trigger, .project-card");
            interactables.forEach(el => {
                el.addEventListener("mouseenter", addHover);
                el.addEventListener("mouseleave", removeHover);
            });
        },

        // === NEW FEATURE: 3D Tilt Cards ===
        init3DTilt() {
            const cards = document.querySelectorAll(".tilt-card, .project-card");

            cards.forEach(card => {
                card.addEventListener("mousemove", (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    // Calculate rotation (max 15 degrees)
                    const xPct = (x / rect.width - 0.5) * 2; // -1 to 1
                    const yPct = (y / rect.height - 0.5) * 2;

                    const rotateX = yPct * -10; // Invert Y for correct feel
                    const rotateY = xPct * 10;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                });

                card.addEventListener("mouseleave", () => {
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
                });
            });
        },

        initProjects() {
            const grid = document.getElementById('projectsGrid');
            if (!grid) return;

            this.config.projects.forEach(w => {
                const tagsHtml = w.tags.map(t => `<span class="project-tag">${t}</span>`).join('');
                const card = document.createElement('article');
                // Added magnetic-trigger class for cursor interaction
                card.className = 'project-card magnetic-trigger';
                card.setAttribute('data-tags', w.tags.join(' '));
                card.setAttribute('data-animate', '');
                card.innerHTML = `
                    <div class="video-wrapper">
                        ${w.type === 'video' ? `<video preload="metadata" poster="${w.poster}" data-src="${w.src}" playsinline muted loop></video>` : `<img src="${w.src}" alt="${w.title}">`}
                        <div class="card-action-overlay">
                            ${w.demo ? `<a href="${w.demo}" target="_blank" class="icon-btn" title="View Demo">🔗</a>` : ''}
                            ${w.github ? `<a href="${w.github}" target="_blank" class="icon-btn" title="View Code">💻</a>` : ''}
                        </div>
                    </div>
                    <div class="project-info">
                        <div class="project-header-row">
                             <h3 class="project-title">${w.title}</h3>
                        </div>
                        <div class="project-tags">${tagsHtml}</div>
                        <p class="project-description">${w.description}</p>
                    </div>`;
                grid.appendChild(card);
            });

            this.initProjectMedia();
            this.initProjectFiltering();

            // Initialize 3D Tilt AFTER cards are created
            this.init3DTilt();
        },

        initProjectMedia() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        const v = e.target.querySelector('video');
                        if (v && v.dataset.src) {
                            v.src = v.dataset.src;
                            v.removeAttribute('data-src');
                            observer.unobserve(e.target);
                        }
                        if (v) {
                            e.target.addEventListener('mouseenter', () => { if (v.readyState >= 2) v.play().catch(() => { }) });
                            e.target.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });
                        }
                    }
                });
            }, { rootMargin: "200px" });
            document.querySelectorAll('.project-card').forEach(c => observer.observe(c));
        },

        initProjectFiltering() {
            document.querySelectorAll('.filter-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const filter = e.target.dataset.filter.toLowerCase();
                    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                    document.querySelectorAll('.project-card').forEach(card => {
                        const tags = card.dataset.tags.toLowerCase();
                        card.style.display = (filter === 'all' || tags.includes(filter)) ? 'block' : 'none';
                        if (card.style.display === 'block') {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(10px)';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        }
                    });
                });
            });
        },

        initScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        entry.target.style.transitionDelay = `${index * 100}ms`;
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('[data-animate]').forEach(el => {
                observer.observe(el);
            });
        },
    };

    app.init();
});
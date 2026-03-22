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
                    title: "Fish Racer Game — Multiplayer",
                    description: "A high-speed procedurally generated 2D multiplayer runner with advanced networking, infinite terrain generation, and complex boss AI.",
                    fullDescription: `<p><strong>Lead Programmer & Technical Designer</strong> | Godot 4.x, GDScript, GLSL Shaders | PC / Mobile | In Development</p>
                    <p>An intense deep-ocean multiplayer runner featuring infinite procedural terrain, seamless host migration networking, and a multi-phase Megalodon boss fight with adaptive AI.</p>
                    
                    <p><strong>Technical Achievements:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li><strong>Multi-Threaded Procedural Generation:</strong> Infinite ChunkBuilder system using FastNoiseLite for terrain generation and Poisson disk sampling for natural object placement</li>
                    <li><strong>Performance Optimization:</strong> Background thread offloading (WorkerThreadPool) maintains 60 FPS on mobile without stuttering</li>
                    <li><strong>Dynamic Biome Blending:</strong> Seamless transitions between ocean depths with adjusted lighting, ground colors, and enemy spawn tables</li>
                    <li><strong>Robust Multiplayer:</strong> LAN/Online lobby system with custom Host Migration protocol—automatically promotes client to host on server disconnect</li>
                    <li><strong>Boss AI FSM:</strong> Multi-phase Megalodon fight (Stalking → Entering → Charge Prep → Charging → Cooldown) with adaptive rubber-banding through infinite terrain</li>
                    <li><strong>Custom Shaders:</strong> Canvas item shaders for underwater currents, swaying kelp, multi-layered parallax, and screen-space caustics</li>
                    </ul>
                    
                    <p><strong>Problem Solved:</strong> Architected dynamic override system to transition from infinite runner into structured boss arena, eliminating collision and terrain generation bugs by injecting a custom empty "Arena Biome" ahead of the player on the fly.</p>`,
                    type: 'video',
                    tags: ["Game Dev", "Godot", "Multiplayer", "Networking", "Procedural Generation"],
                    src: "assets/edit1 (2).mp4",
                    github: "",
                    demo: ""
                },
                {
                    title: "Core Game Logic",
                    description: "A prototype demonstrating system design and robust core mechanics for a 2D RPG using Godot.",
                    fullDescription: `<p>A demonstration of clean game architecture and core mechanic design for a 2D RPG built in Godot.</p>
                    <p><strong>System Architecture:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li>Event-driven component system for game entities</li>
                    <li>Inventory management with item handling</li>
                    <li>Combat system with configurable abilities</li>
                    <li>Save/load system with serialization</li>
                    </ul>
                    <p><strong>Design Patterns:</strong> Observer Pattern, State Machine, Factory Pattern</p>
                    <p>This project showcases my ability to design extensible systems that other developers can easily build upon.</p>`,
                    type: 'video',
                    tags: ["Game Dev", "CPP", "System Design"],
                    src: "assets/game logic.mp4",
                    github: "",
                    demo: ""
                },
                {
                    title: "Java 2D Platformer",
                    description: "A 2d platformer game built in Java using OOP principles, featuring player movement, enemies, and level design.",
                    fullDescription: `<p>A complete 2D platformer game showcasing robust object-oriented design and game development fundamentals.</p>
                    <p><strong>Game Features:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li>Smooth player movement with gravity and collision detection</li>
                    <li>Multiple enemy types with AI behavior patterns</li>
                    <li>Level design with platforms, hazards, and collectibles</li>
                    <li>Score system and lives management</li>
                    <li>Multiple levels with increasing difficulty</li>
                    </ul>
                    <p><strong>OOP Design:</strong> Abstract base classes, inheritance hierarchy, state patterns</p>
                    <p>This demonstrates my ability to structure large game projects with maintainable, scalable code.</p>`,
                    type: 'video',
                    tags: ["Java", "OOP", "Game Dev"],
                    src: "assets/Java Game.mp4",
                    github: "https://github.com/Radon4718/PlatformerGameInJava-master",
                    demo: ""
                },
                {
                    title: "Enterprise School Management System",
                    description: "A comprehensive full-stack web application for educational institution operations with role-based access control, advanced fee accounting, and database optimization.",
                    fullDescription: `<p><strong>Full Stack Developer</strong> | Java, Spring Boot, MySQL | Production System</p>
                    <p>A high-performance enterprise system designed to digitalize and streamline educational institution operations, from student admissions to academic tracking and financial management.</p>
                    
                    <p><strong>Core Features:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li><strong>Role-Based Access Control (RBAC):</strong> Multi-tiered security using Spring Security with distinct dashboards for Admins, Accountants, Registrars, and Teachers</li>
                    <li><strong>Advanced Fee & Accounting Engine:</strong> Dynamic fee management supporting individual payments and bulk monthly invoice generation</li>
                    <li><strong>Automated Challan Generator:</strong> 4-part print-ready invoice system with CSS @media print, dynamic late-fee calculations, and custom Java algorithm converting numeric totals to English words</li>
                    <li><strong>Lightning-Fast Search & Autocomplete:</strong> REST APIs with JavaScript Fetch providing instant type-ahead search by FR Number, GR Number, or Name across entire application</li>
                    <li><strong>Academic & Attendance Tracking:</strong> Teacher dashboard for marking attendance and assignments, plus WhatsApp integration for parent notifications</li>
                    </ul>
                    
                    <p><strong>Technical Optimizations:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li>Eliminated performance bottlenecks by migrating from in-memory Java Streams to optimized Spring Data JPA queries</li>
                    <li>Strategic SQL indexing on frequently queried columns (frNumber, grNumber, firstName) with lazy-loading frontend techniques</li>
                    <li>Reduced page load times from several seconds to near-instantaneous with thousands of student records</li>
                    </ul>
                    
                    <p><strong>Tech Stack:</strong> Java, Spring Boot, Spring MVC, Spring Data JPA, Spring Security, REST APIs, HTML5, CSS3, JavaScript (ES6+), Thymeleaf, Bootstrap 5, MySQL, Hibernate/JPA, Maven, Git</p>`,
                    type: 'video',
                    tags: ["Full-Stack", "Java", "Spring Boot", "Web", "Database", "Enterprise"],
                    src: "assets/school management system.webm",
                    github: "",
                    demo: ""
                },
                {
                    title: "Godot Environment Sim",
                    description: "A Godot-based simulation modeling fish behavior in response to environmental factors using GDScript.",
                    fullDescription: `<p>An advanced ecosystem simulation built in Godot, featuring AI-driven fish behavior and environmental interaction.</p>
                    <p><strong>Godot Implementation:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li>GDScript AI agents with pathfinding and decision trees</li>
                    <li>Physics-based water simulation and buoyancy</li>
                    <li>Complex environmental interactions and food chains</li>
                    <li>Procedural generation of terrain and obstacles</li>
                    <li>Performance optimization for numerous agents</li>
                    </ul>
                    <p><strong>Learning Outcome:</strong> Deep experience with Godot engine architecture, scene trees, and GDScript</p>
                    <p>This project showcased my rapid learning of new game engines and ability to implement complex simulations.</p>`,
                    type: 'video',
                    tags: ["GDScript", "Godot", "Game dev"],
                    src: "assets/Godot.mp4",
                    github: "https://github.com/Radon4718/Godot_Enviroment_simuplation",
                    demo: ""
                },
                {
                    title: "Visual Path Finder",
                    description: "A visualizer for pathfinding algorithms like A* and Dijkstra's, built with Java.",
                    fullDescription: `<p>An interactive visualization tool for exploring how different pathfinding algorithms work in real-time.</p>
                    <p><strong>Implemented Algorithms:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li>A* Algorithm - optimal pathfinding with heuristics</li>
                    <li>Dijkstra's Algorithm - guaranteed shortest path</li>
                    <li>Breadth-First Search (BFS) - exploring search patterns</li>
                    <li>Depth-First Search (DFS) - recursive exploration</li>
                    </ul>
                    <p><strong>Features:</strong> Draw custom obstacles, step through algorithms, compare performance metrics, adjust heuristics.</p>
                    <p>This project helped me deeply understand data structures, especially priority queues and graph representations.</p>`,
                    type: 'video',
                    tags: ["Algorithms", "Java", "Data Structures"],
                    src: "assets/Algorithm Visualizer.mp4",
                    github: "https://github.com/Radon4718/Algorithm-Visualizer",
                    demo: ""
                },
                {
                    title: "Gravity Simulator",
                    description: "A physics simulation demonstrating the effect of N-body gravitational pull on particles.",
                    fullDescription: `<p>An N-body simulation that visualizes gravitational interactions between multiple celestial bodies or particles.</p>
                    <p><strong>Physics Implementation:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li>Newton's law of universal gravitation calculations</li>
                    <li>Optimized force calculations for multiple bodies</li>
                    <li>Orbital dynamics and trajectory prediction</li>
                    <li>Configurable mass and initial velocity parameters</li>
                    </ul>
                    <p><strong>Optimizations:</strong> Spatial partitioning, collision detection, adaptive timesteps</p>
                    <p>This project demonstrates computational complexity awareness and optimization techniques for physics simulations.</p>`,
                    type: 'video',
                    tags: ["Physics", "Simulation", "Java"],
                    src: "assets/gravitational pull simulator.mp4",
                    github: "https://github.com/Radon4718/Processing",
                    demo: ""
                },
                {
                    title: "Fluid Resistance Sim",
                    description: "A desktop simulation using Java to accurately model fluid dynamics and drag forces on various shapes.",
                    fullDescription: `<p>This simulation accurately models the behavior of various objects moving through fluid mediums, calculating drag forces in real-time.</p>
                    <p><strong>Key Features:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li>Real-time physics calculations using drag coefficient formulas</li>
                    <li>Multiple shape types with different aerodynamic properties</li>
                    <li>Visual representation of forces and velocities</li>
                    <li>Parameter tuning for fluid viscosity and object properties</li>
                    </ul>
                    <p><strong>Technologies:</strong> Java, Processing, Physics Simulation</p>
                    <p>This project demonstrates my understanding of classical physics principles and their implementation in software.</p>`,
                    type: 'video',
                    tags: ["Physics", "Java", "Processing"],
                    src: "assets/fluid resistance simulator.mp4",
                    github: "https://github.com/Radon4718/Processing",
                    demo: ""
                },
                {
                    title: "Core Game Logic",
                    description: "A prototype demonstrating system design and robust core mechanics for a 2D RPG using Godot.",
                    fullDescription: `<p>A demonstration of clean game architecture and core mechanic design for a 2D RPG built in Godot.</p>
                    <p><strong>System Architecture:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li>Event-driven component system for game entities</li>
                    <li>Inventory management with item handling</li>
                    <li>Combat system with configurable abilities</li>
                    <li>Save/load system with serialization</li>
                    </ul>
                    <p><strong>Design Patterns:</strong> Observer Pattern, State Machine, Factory Pattern</p>
                    <p>This project showcases my ability to design extensible systems that other developers can easily build upon.</p>`,
                    type: 'video',
                    tags: ["Game Dev", "CPP", "System Design"],
                    src: "assets/game logic.mp4",
                    github: "",
                    demo: ""
                },
                {
                    title: "Weather App",
                    description: "A Web application that fetches and displays weather data using a public API. Made with Java Servlets and JSP.",
                    fullDescription: `<p>A full-stack web application that integrates third-party weather APIs and provides real-time weather information.</p>
                    <p><strong>Features:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li>Real-time weather data from OpenWeather API integration</li>
                    <li>Location-based weather search functionality</li>
                    <li>Forecast display with thermodynamic charts</li>
                    <li>User preferences storage and saved locations</li>
                    <li>Responsive design for mobile and desktop</li>
                    </ul>
                    <p><strong>Stack:</strong> Java Servlets, JSP, MySQL, REST API consumption</p>
                    <p>This showcased my ability to work with external APIs, handle asynchronous data, and create user-friendly interfaces.</p>`,
                    type: 'video',
                    tags: ["HTTP", "Java", "Weather API", "Web"],
                    src: "assets/weather app.mp4",
                    github: "https://github.com/Radon4718/Weather_Information_app",
                    demo: ""
                },
                {
                    title: "Web Crawler",
                    description: "A Java-based web crawler that indexes web pages and extracts relevant information for analysis.",
                    fullDescription: `<p>A sophisticated web crawler for indexing and analyzing web page content with data extraction capabilities.</p>
                    <p><strong>Technical Implementation:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li>Multi-threaded crawling for performance optimization</li>
                    <li>HTML parsing and DOM traversal</li>
                    <li>URL normalization and duplicate detection</li>
                    <li>Robots.txt compliance and rate limiting</li>
                    <li>Full-text indexing and search capabilities</li>
                    </ul>
                    <p><strong>Algorithms:</strong> BFS for URL queuing, hash-based deduplication, relevance ranking</p>
                    <p>This demonstrated my understanding of web technologies, data structures, and scalable system design.</p>`,
                    type: 'video',
                    tags: ["HTTP", "Java", "API", "Web"],
                    src: "assets/web crawler.mp4",
                    github: "",
                    demo: ""
                },
                {
                    title: "Interactive Quiz App",
                    description: "A timed quiz application built with vanilla JavaScript, focusing on DOM manipulation and state management.",
                    fullDescription: `<p>A full-stack quiz application with timer functionality, progress tracking, and result analytics.</p>
                    <p><strong>Features:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li>Timed quiz rounds with countdown timer</li>
                    <li>Question randomization and difficulty levels</li>
                    <li>Score tracking and performance history</li>
                    <li>Database-backed question storage</li>
                    <li>User authentication and sessions</li>
                    </ul>
                    <p><strong>Stack:</strong> Java Servlets, JSP, MySQL, Vanilla JavaScript</p>
                    <p>This project demonstrated my full-stack capabilities combining backend logic with a responsive frontend.</p>`,
                    type: 'video',
                    tags: ["Java", "DataBase", "SQL"],
                    src: "assets/Quiz app.mp4",
                    github: "https://github.com/Radon4718/Quiz_App",
                    demo: ""
                },
                {
                    title: "Particle Repulsion",
                    description: "A Processing sketch showing particle movement governed by basic force repulsion mechanics.",
                    fullDescription: `<p>A dynamic particle system demonstrating force-based interaction and emergent behavior from simple rules.</p>
                    <p><strong>Core Mechanics:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li>Repulsion forces between particles based on distance</li>
                    <li>Variable particle properties (mass, charge, velocity)</li>
                    <li>Boundary conditions and containment</li>
                    <li>Visual trails and force vectors</li>
                    </ul>
                    <p><strong>Concepts:</strong> Vector physics, force fields, particle systems</p>
                    <p>This demonstrates how complex emergent behavior can arise from relatively simple interaction rules.</p>`,
                    type: 'video',
                    tags: ["Processing", "Simulation", "Java"],
                    src: "assets/repulsion simulation.mp4",
                    github: "https://github.com/Radon4718/Processing",
                    demo: ""
                },
                {
                    title: "Environment Simulator",
                    description: "A simulation modeling fish behavior in response to environmental factors using Java and Processing.",
                    fullDescription: `<p>An ecosystem simulator that models fish behavior, predator-prey dynamics, and environmental adaptation.</p>
                    <p><strong>Simulation Features:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li>Autonomous agent-based modeling with finite state machines</li>
                    <li>Predator-prey ecosystem dynamics</li>
                    <li>Environmental factors affecting behavior (food, temperature)</li>
                    <li>Natural selection and genetic adaptation over generations</li>
                    <li>Real-time statistics and population graphs</li>
                    </ul>
                    <p><strong>Concepts:</strong> AI decision-making, genetic algorithms, ecosystem modeling</p>
                    <p>This project demonstrates my understanding of complex systems and emergent behavior in simulated environments.</p>`,
                    type: 'video',
                    tags: ["Java", "Processing", "Logic Design"],
                    src: "assets/vid fish.mp4",
                    github: "https://github.com/Radon4718/Processing",
                    demo: ""
                },
                {
                    title: "Portfolio v1",
                    description: "A portfolio application demonstrating HTML, CSS, and JavaScript skills to showcase projects effectively.",
                    fullDescription: `<p>My first portfolio website showcasing web development fundamentals and design sensibilities.</p>
                    <p><strong>Technologies & Features:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                    <li>Semantic HTML5 markup and accessibility best practices</li>
                    <li>Responsive CSS3 design adapting to all screen sizes</li>
                    <li>Vanilla JavaScript for interactivity and animations</li>
                    <li>Smooth scrolling navigation and animations</li>
                    <li>Project filtering and categorization</li>
                    </ul>
                    <p><strong>Focus:</strong> User experience, performance optimization, cross-browser compatibility</p>
                    <p>This was my first complete web project and helped establish my foundation in front-end development.</p>`,
                    type: 'video',
                    tags: ["HTML", "CSS", "JavaScript", "Web"],
                    src: "assets/PortFolio.mp4",
                    github: "https://github.com/Radon4718/PortFolio",
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
            this.initTextScanner();
            this.initModalClose(); // Initialize modal close handlers
        },

        initModalClose() {
            const modal = document.getElementById('projectModal');
            const closeBtn = document.getElementById('modalClose');
            const backdrop = document.querySelector('.modal-backdrop');

            closeBtn.addEventListener('click', () => this.closeProjectModal());
            backdrop.addEventListener('click', () => this.closeProjectModal());

            // Close modal on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    this.closeProjectModal();
                }
            });
        },

        initTextScanner() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const text = el.textContent;
                        let i = 0;
                        el.textContent = '';
                        el.classList.add('scanning');

                        const scanner = setInterval(() => {
                            if (i < text.length) {
                                el.textContent += text.charAt(i);
                                i++;
                            } else {
                                el.classList.remove('scanning');
                                clearInterval(scanner);
                            }
                        }, 50);
                        observer.unobserve(el);
                    }
                });
            }, { threshold: 0.5 });

            document.querySelectorAll('[data-scan-text]').forEach(el => {
                observer.observe(el);
            });
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

                // Add click listener to open modal
                card.addEventListener('click', () => this.openProjectModal(w));
            });

            this.initProjectMedia();
            this.initProjectFiltering();

            // Initialize 3D Tilt AFTER cards are created
            this.init3DTilt();
        },

        openProjectModal(project) {
            const modal = document.getElementById('projectModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalTags = document.getElementById('modalTags');
            const modalDescription = document.getElementById('modalDescription');
            const modalVideo = document.getElementById('modalVideo');
            const modalLinks = document.getElementById('modalLinks');

            // Populate modal content
            modalTitle.textContent = project.title;

            // Add tags
            modalTags.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

            // Add full description (with HTML)
            modalDescription.innerHTML = project.fullDescription || project.description;

            // Set up video
            if (project.type === 'video') {
                modalVideo.src = project.src;
                modalVideo.style.display = 'block';
            } else {
                modalVideo.style.display = 'none';
            }

            // Add action links
            let linksHtml = '';
            if (project.github) {
                linksHtml += `<a href="${project.github}" target="_blank">💻 View Code</a>`;
            }
            if (project.demo) {
                linksHtml += `<a href="${project.demo}" target="_blank">🔗 Live Demo</a>`;
            }
            modalLinks.innerHTML = linksHtml || '';

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        },

        closeProjectModal() {
            const modal = document.getElementById('projectModal');
            const modalVideo = document.getElementById('modalVideo');

            modal.classList.remove('active');
            document.body.style.overflow = '';
            modalVideo.pause();
            modalVideo.currentTime = 0;
        },

        initProjectMedia() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    const v = e.target.querySelector('video');
                    if (!v) return;

                    if (e.isIntersecting) {
                        if (v.dataset.src) {
                            v.src = v.dataset.src;
                            v.removeAttribute('data-src');
                            v.load();
                        }
                        v.play().catch(() => { });
                    } else {
                        v.pause();
                    }
                });
            }, { rootMargin: "0px", threshold: 0.5 }); // Using threshold for better play/pause timing
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
window.addEventListener("load", () => {
    // === 1. Preloader ===
    const p = document.getElementById('preloader');
    setTimeout(() => { p.style.opacity = '0'; setTimeout(() => p.remove(), 500); }, 400);

    // === 2. Theme Toggle ===
    const themeBtn = document.getElementById('themeToggle');
    const html = document.documentElement;
    let accentColor = getComputedStyle(document.body).getPropertyValue('--accent') || '#1db954';
    html.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
    themeBtn.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        accentColor = getComputedStyle(document.body).getPropertyValue('--accent') || '#1db954';
    });
    const getAccentRGBA = (alpha = 1) => {
        const rgb = accentColor.replace('#', '').match(/.{2}/g).map(h => parseInt(h, 16));
        return `rgba(${rgb.join(',')},${alpha})`;
    }

    // === 3. Burger Menu ===
    document.getElementById('burger').addEventListener('click', () => document.querySelector('.nav-links').classList.toggle('active'));

    // === 4. Text Animation ===
    const roles = ["Game Developer", "Java Enthusiast", "Problem Solver"];
    let rIndex = 0, cIndex = 0, isDeleting = false;
    const el = document.querySelector('.animated-text');
    function typeEffect() {
        const current = roles[rIndex];
        el.textContent = isDeleting ? current.substring(0, cIndex--) : current.substring(0, cIndex++);
        if (!isDeleting && cIndex === current.length) setTimeout(() => isDeleting = true, 2000);
        else if (isDeleting && cIndex === 0) { isDeleting = false; rIndex = (rIndex + 1) % roles.length; }
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
    typeEffect();

    // === 5. Projects Render with Lazy Videos & Filtering ===

    // ⭐ ENHANCED PROJECT DATA STRUCTURE ⭐
    const works = [
        {
            title: "Fluid Resistance Sim",
            description: "A desktop simulation using Java to accurately model fluid dynamics and drag forces on various shapes.",
            type: 'video',
            tags: ["Physics", "Java", "Processing"],
            src: "assets/fluid resistance simulator.mp4",
            poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Fluid+Sim",
            github: "https://github.com/Radon4718/FluidSim",
            demo: ""
        },
        {
            title: "Visual Path Finder",
            description: "An interactive web app illustrating pathfinding algorithms (A*, Dijkstra's) on a grid.",
            type: 'video',
            tags: ["Algorithms", "Java", "Data Structures"],
            src: "assets/Algorithm Visualizer.mp4",
            poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Path+Finder",
            github: "https://github.com/Radon4718/PathFinder",
            demo: ""
        },
        {
            title: "Core Game Logic",
            description: "A prototype demonstrating system design and robust core mechanics for a 2D RPG using Godot.",
            type: 'video',
            tags: ["Game Dev", "CPP", "System Design"],
            src: "assets/game logic.mp4",
            poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Game+Logic",
            github: "https://github.com/Radon4718/GodotGameLogic",
            demo: ""
        },
        {
            title: "Interactive Quiz App",
            description: "A timed quiz application built with vanilla JavaScript, focusing on DOM manipulation and state management.",
            type: 'video',
            tags: ["Java", "DataBase", "SQL"],
            src: "assets/Quiz app.mp4",
            poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Quiz+App",
            github: "https://github.com/Radon4718/QuizApp",
            demo: "" // Use your real URL
        },
        {
            title: "Gravity Simulator",
            description: "A physics simulation demonstrating the effect of N-body gravitational pull on particles.",
            type: 'video',
            tags: ["Physics", "Simulation", "Java"],
            src: "assets/gravitational pull simulator.mp4",
            poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Gravity+Sim",
            github: "https://github.com/Radon4718/GravitySim",
            demo: ""
        },
        {
            title: "Particle Repulsion",
            description: "A Processing sketch showing particle movement governed by basic force repulsion mechanics.",
            type: 'video',
            tags: ["Processing", "Simulation", "Java"],
            src: "assets/repulsion simulation.mp4",
            poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Repulsion",
            github: "https://github.com/Radon4718/RepulsionSim",
            demo: ""
        },
        {
            title: "Java RPG Prototype",
            description: "A simple command-line RPG prototype demonstrating Object-Oriented Programming (OOP) principles.",
            type: 'video',
            tags: ["Java", "OOP", "Game Dev"],
            src: "assets/Java Game.mp4",
            poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Java+RPG",
            github: "https://github.com/Radon4718/JavaRPG",
            demo: ""
        },
        {
            title: "PortFolio",
            description: "A portfolio application demonstrating HTML, CSS, and JavaScript skills to showcase projects effectively.",
            type: 'video',
            tags: ["HTML", "CSS", "JavaScript", "Web"],
            src: "assets/PortFolio.mp4",
            poster: "https://placehold.co/600x400/1a1a1a/1db954?text=PortFolio",
            github: "https://github.com/Radon4718/JavaRPG",
            demo: ""
        },
        {
            title: "Enviroment Simulator",
            description: "A simulation modeling fish behavior in response to environmental factors using Java and Processing.",
            type: 'video',
            tags: ["Java", "Processing", "Logic Design"],
            src: "assets/vid fish.mp4",
            poster: "https://placehold.co/600x400/1a1a1a/1db954?text=PortFolio",
            github: "https://github.com/Radon4718/JavaRPG",
            demo: ""
        },
        {
            title: "Weather App",
            description: "A Web application that fetches and displays weather data using a public API. Made with Java Servlets and JSP.",
            type: 'video',
            tags: ["HTTP", "Java", "Weather API", "Web"],
            src: "assets/weather app.mp4",
            poster: "https://placehold.co/600x400/1a1a1a/1db954?text=PortFolio",
            github: "https://github.com/Radon4718/JavaRPG",
            demo: ""
        },
        {
            title: "Web Crawler",
            description: "A Java-based web crawler that indexes web pages and extracts relevant information for analysis.",
            type: 'video',
            tags: ["HTTP", "Java", "API", "Web"],
            src: "assets/web crawler.mp4",
            poster: "https://placehold.co/600x400/1a1a1a/1db954?text=PortFolio",
            github: "https://github.com/Radon4718/JavaRPG",
            demo: ""
        }
    ];

    const grid = document.getElementById('projectsGrid');

    // ⭐ NEW: Rendering Logic with Description and Buttons ⭐
    works.forEach(w => {
        const tagsHtml = w.tags.map(t => `<span class="project-tag">${t}</span>`).join('');
        const allTags = w.tags.join(' '); // String of all tags for filtering
        const card = document.createElement('article');
        card.className = 'project-card';
        card.setAttribute('data-tags', allTags); // Add data attribute for filtering

        card.innerHTML = `
            <div class="video-wrapper">
                ${w.type === 'video' ? `<video controls preload="metadata" poster="${w.poster}" data-src="${w.src}" playsinline muted loop></video>` : `<img src="${w.src}" alt="${w.title}" style="width:100%;height:100%;object-fit:cover;transition:0.5s;">`}
            </div>
            <div class="project-info">
                <div class="project-tags">${tagsHtml}</div>
                <h3 class="project-title">${w.title}</h3>
                <p class="project-description">${w.description}</p>
                <div class="project-actions" style="display: flex; gap: 10px;">
                    ${w.demo ? `<a href="${w.demo}" target="_blank" class="btn btn-primary project-btn">Live Demo</a>` : ''}
                    ${w.github ? `<a href="${w.github}" target="_blank" class="btn btn-secondary project-btn">Source Code</a>` : ''}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    // Lazy load & hover play
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const v = e.target.querySelector('video');
                if (v && v.dataset.src) { v.src = v.dataset.src; v.removeAttribute('data-src'); observer.unobserve(e.target); }
                if (v) {
                    e.target.addEventListener('mouseenter', () => { if (v.readyState >= 2) v.play().catch(() => { }); else { v.load(); v.addEventListener('loadeddata', () => v.play().catch(() => { }), { once: true }); } });
                    e.target.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });
                }
            }
        });
    }, { rootMargin: "200px" });
    document.querySelectorAll('.project-card').forEach(c => observer.observe(c));

    // ⭐ NEW: Filtering Logic ⭐
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;

            // Remove 'active' from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            // Add 'active' to the clicked button
            e.target.classList.add('active');

            // Iterate over all project cards
            document.querySelectorAll('.project-card').forEach(card => {
                const tags = card.dataset.tags.toLowerCase();
                // Show if filter is 'all' OR if the card's tags contain the filter tag
                if (filter === 'all' || tags.includes(filter.toLowerCase())) {
                    card.style.display = 'block'; // Or 'grid' if using display: grid
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // === 6. Canvas Setup ===
    const canvases = {
        particles: document.getElementById("particle-bg"),
        orbs: document.getElementById("bg-orbs"),
        mesh: document.getElementById("bg-mesh"),
        waves: document.getElementById("bg-waves")
    };
    let width = window.innerWidth, height = window.innerHeight;
    function resizeAll() { width = window.innerWidth; height = window.innerHeight; Object.values(canvases).forEach(c => { c.width = width; c.height = height; }); }
    resizeAll();
    window.addEventListener("resize", resizeAll);
    const [particleCtx, orbCtx, meshCtx, waveCtx] = Object.values(canvases).map(c => c.getContext("2d"));

    // --- Adaptive particles, orbs & mesh ---
    const PARTICLE_COUNT = Math.min(80, Math.floor(width * height / 20000)), LINK_DIST = 120;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.7, vy: (Math.random() - 0.5) * 0.7, size: Math.random() * 2 + 1.5 }));
    const ORB_COUNT = Math.min(8, Math.floor(width / 300));
    const orbs = Array.from({ length: ORB_COUNT }, () => ({ x: Math.random() * width, y: Math.random() * height, r: Math.random() * 60 + 50, alpha: Math.random() * 0.3 + 0.1, dx: (Math.random() - 0.5) * 0.2, dy: (Math.random() - 0.5) * 0.2 }));
    const GRID_SIZE = width > 1200 ? 60 : width > 800 ? 80 : 100;
    const meshPoints = []; for (let y = 0; y <= height; y += GRID_SIZE) for (let x = 0; x <= width; x += GRID_SIZE) meshPoints.push({ x: x + (Math.random() - 0.5) * 20, y: y + (Math.random() - 0.5) * 20 });

    // --- Drawing functions ---
    function drawParticles() {
        particleCtx.clearRect(0, 0, width, height);
        const accent = getAccentRGBA();
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i]; p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = width; if (p.x > width) p.x = 0; if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
            particleCtx.fillStyle = getAccentRGBA(0.95); particleCtx.shadowColor = accent; particleCtx.shadowBlur = 10;
            particleCtx.beginPath(); particleCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2); particleCtx.fill();
            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j], dx = p.x - q.x, dy = p.y - q.y, dist2 = dx * dx + dy * dy;
                if (dist2 < LINK_DIST * LINK_DIST) { particleCtx.strokeStyle = getAccentRGBA(0.5 * (1 - Math.sqrt(dist2) / LINK_DIST)); particleCtx.lineWidth = 1; particleCtx.beginPath(); particleCtx.moveTo(p.x, p.y); particleCtx.lineTo(q.x, q.y); particleCtx.stroke(); }
            }
        }
    }

    function drawOrbs() {
        orbCtx.clearRect(0, 0, width, height);
        const accent = getAccentRGBA();
        orbs.forEach(o => {
            o.x += o.dx; o.y += o.dy; if (o.x < -o.r) o.x = width + o.r; if (o.x > width + o.r) o.x = -o.r; if (o.y < -o.r) o.y = height + o.r; if (o.y > height + o.r) o.y = -o.r;
            const grad = orbCtx.createRadialGradient(o.x, o.y, o.r * 0.2, o.x, o.y, o.r);
            grad.addColorStop(0, getAccentRGBA(o.alpha)); grad.addColorStop(1, getAccentRGBA(0));
            orbCtx.fillStyle = grad; orbCtx.beginPath(); orbCtx.arc(o.x, o.y, o.r, 0, Math.PI * 2); orbCtx.fill();
        });
    }

    function drawMesh() {
        meshCtx.clearRect(0, 0, width, height);
        const accent = getAccentRGBA(0.05);
        for (let i = 0; i < meshPoints.length; i++) {
            const p = meshPoints[i];
            for (let j = i + 1; j < meshPoints.length; j++) {
                const q = meshPoints[j], dx = p.x - q.x, dy = p.y - q.y, dist2 = dx * dx + dy * dy;
                if (dist2 < GRID_SIZE * GRID_SIZE * 2) { meshCtx.strokeStyle = accent; meshCtx.beginPath(); meshCtx.moveTo(p.x, p.y); meshCtx.lineTo(q.x, q.y); meshCtx.stroke(); }
            }
        }
    }

    let waveTime = 0;
    function drawWaves() {
        waveCtx.clearRect(0, 0, width, height);
        const grad = waveCtx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, getAccentRGBA(0.05)); grad.addColorStop(0.5, getAccentRGBA(0.1)); grad.addColorStop(1, getAccentRGBA(0.05));
        waveCtx.fillStyle = grad; waveCtx.beginPath();
        const step = width > 1200 ? 20 : width > 800 ? 30 : 40;
        for (let x = 0; x <= width; x += step) { const y = Math.sin(x * 0.02 + waveTime) * 20 + height / 2; x === 0 ? waveCtx.moveTo(x, y) : waveCtx.lineTo(x, y); }
        waveCtx.lineTo(width, height); waveCtx.lineTo(0, height); waveCtx.closePath(); waveCtx.fill();
        waveTime += 0.02;
    }

    // --- Animation Loop ---
    function animateAll() { drawWaves(); drawMesh(); drawOrbs(); drawParticles(); requestAnimationFrame(animateAll); }
    animateAll();
});


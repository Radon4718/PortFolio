window.addEventListener("load", () => {
    // 1. PRELOADER
    const p = document.getElementById('preloader');
    setTimeout(() => {
        p.style.opacity = '0';
        setTimeout(() => p.remove(), 500);
    }, 400);

    // 2. THEME TOGGLE (NOW THE ONLY ONE)
    const themeBtn = document.getElementById('themeToggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    themeBtn.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // 3. BURGER MENU
    const burger = document.getElementById('burger');
    const navLinks = document.querySelector('.nav-links');
    burger.addEventListener('click', () => navLinks.classList.toggle('active'));

    // 4. TEXT ANIMATION
    const roles = ["Game Developer", "Java Enthusiast", "Problem Solver"];
    let rIndex = 0, cIndex = 0, isDeleting = false;
    const el = document.querySelector('.animated-text');

    function typeEffect() {
        const current = roles[rIndex];
        if (isDeleting) {
            el.textContent = current.substring(0, cIndex - 1);
            cIndex--;
        } else {
            el.textContent = current.substring(0, cIndex + 1);
            cIndex++;
        }

        if (!isDeleting && cIndex === current.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000); // Pause at end of word
        } else if (isDeleting && cIndex === 0) {
            isDeleting = false;
            rIndex = (rIndex + 1) % roles.length;
            setTimeout(typeEffect, 300);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }
    typeEffect();

    // 5. PROJECTS DATA & RENDER (Re-inserting project data)
    const works = [
        { title: "Fluid Resistance Sim", type: 'video', tags: ["Physics", "Java"], src: "assets/fluid resistance simulator.mp4", poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Fluid+Sim" },
        { title: "Visual Path Finder", type: 'video', tags: ["Algorithms", "AI"], src: "assets/path finder.mp4", poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Path+Finder" },
        { title: "Core Game Logic", type: 'video', tags: ["Game Dev", "System Design"], src: "assets/game logic.mp4", poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Game+Logic" },
        { title: "Interactive Quiz App", type: 'video', tags: ["Web", "JS"], src: "assets/Quiz app.mp4", poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Quiz+App" },
        { title: "Gravity Simulator", type: 'video', tags: ["Physics", "Simulation"], src: "assets/gravitational pull simulator.mp4", poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Gravity+Sim" },
        { title: "Particle Repulsion", type: 'video', tags: ["Canvas", "Math"], src: "assets/repulsion simulation.mp4", poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Repulsion" },
        { title: "Java RPG Prototype", type: 'video', tags: ["Java", "OOP"], src: "assets/Java Game.mp4", poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Java+RPG" }
    ];

    const grid = document.getElementById('projectsGrid');

    works.forEach(w => {
        const tagsHtml = w.tags.map(t => `<span class="project-tag">#${t}</span>`).join('');
        const card = document.createElement('article');
        card.className = 'project-card';

        let mediaContent = '';
        if (w.type === 'video') {
            mediaContent = `
                <div class="video-wrapper">
                    <video controls preload="metadata" poster="${w.poster}" data-src="${w.src}" playsinline muted loop></video>
                </div>
            `;
        } else {
            mediaContent = `<div class="video-wrapper"><img src="${w.src}" alt="${w.title}" style="width:100%;height:100%;object-fit:cover;transition:0.5s;"></div>`;
        }

        card.innerHTML = `
            ${mediaContent}
            <div class="project-info">
            <div class="project-tags">${tagsHtml}</div>
            <h3 class="project-title">${w.title}</h3>
            </div>
        `;
        grid.appendChild(card);
    });

    // Lazy Load & Auto-Hover Play (Only for Videos)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const v = e.target.querySelector('video');
                if (v && v.dataset.src) {
                    v.src = v.dataset.src;
                    v.removeAttribute('data-src');
                }
                observer.unobserve(e.target);
            }
        })
    }, { rootMargin: "200px" });

    document.querySelectorAll('.project-card').forEach(c => {
        observer.observe(c);
        const v = c.querySelector('video');

        if (v) {
            c.addEventListener('mouseenter', () => {
                if (v.readyState >= 2) {
                    v.play().catch(() => { });
                } else {
                    v.load();
                    v.addEventListener('loadeddata', () => v.play().catch(() => { }), { once: true });
                }
            });
            c.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });
        }
    });

    // ===================================================================
    // 6. CANVAS SETUP & LOGIC (Your existing code follows)
    // ===================================================================
    const canvases = {
        particles: document.getElementById("particle-bg"),
        orbs: document.getElementById("bg-orbs"),
        mesh: document.getElementById("bg-mesh"),
        waves: document.getElementById("bg-waves")
    };

    let width = window.innerWidth;
    let height = window.innerHeight;

    function resizeAll() {
        width = window.innerWidth;
        height = window.innerHeight;
        Object.values(canvases).forEach(c => {
            c.width = width;
            c.height = height;
        });
    }
    resizeAll();
    window.addEventListener("resize", resizeAll);

    // Contexts
    const particleCtx = canvases.particles.getContext("2d");
    const orbCtx = canvases.orbs.getContext("2d");
    const meshCtx = canvases.mesh.getContext("2d");
    const waveCtx = canvases.waves.getContext("2d");


    /*** PARTICLES WITH CONSTELLATION ***/
    const PARTICLE_COUNT = 80;
    const LINK_DIST = 150;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        size: Math.random() * 2 + 1.5
    }));

    function drawParticles() {
        particleCtx.clearRect(0, 0, width, height);

        // Get live accent color
        const accentColor = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#1db954';
        const accentRGBA = `rgba(${accentColor.replace('#', '').match(/.{2}/g).map(h => parseInt(h, 16)).join(',')}`; // Basic conversion

        // Lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < LINK_DIST) {
                    const alpha = 1 - dist / LINK_DIST;
                    particleCtx.strokeStyle = `${accentRGBA},${alpha * 0.5})`;
                    particleCtx.lineWidth = 1;
                    particleCtx.beginPath();
                    particleCtx.moveTo(particles[i].x, particles[i].y);
                    particleCtx.lineTo(particles[j].x, particles[j].y);
                    particleCtx.stroke();
                }
            }
        }

        // Particles
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            particleCtx.fillStyle = `${accentRGBA},0.95)`;
            particleCtx.shadowColor = accentColor;
            particleCtx.shadowBlur = 10;
            particleCtx.beginPath();
            particleCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            particleCtx.fill();
        });
    }

    /*** FLOATING ENERGY ORBS ***/
    const ORB_COUNT = 8;
    const orbs = Array.from({ length: ORB_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 60 + 50,
        alpha: Math.random() * 0.3 + 0.1,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2
    }));

    function drawOrbs() {
        orbCtx.clearRect(0, 0, width, height);
        const accentColor = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#1db954';
        const accentRGBA = `rgba(${accentColor.replace('#', '').match(/.{2}/g).map(h => parseInt(h, 16)).join(',')}`;

        orbs.forEach(o => {
            o.x += o.dx; o.y += o.dy;
            if (o.x < -o.r) o.x = width + o.r;
            if (o.x > width + o.r) o.x = -o.r;
            if (o.y < -o.r) o.y = height + o.r;
            if (o.y > height + o.r) o.y = -o.r;

            const grad = orbCtx.createRadialGradient(o.x, o.y, o.r * 0.2, o.x, o.y, o.r);
            grad.addColorStop(0, `${accentRGBA},${o.alpha})`);
            grad.addColorStop(1, `${accentRGBA},0)`);
            orbCtx.fillStyle = grad;
            orbCtx.beginPath();
            orbCtx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
            orbCtx.fill();
        });
    }

    /*** LOW-POLY TRIANGULATED MESH ***/
    const GRID_SIZE = 60;
    const meshPoints = [];
    for (let y = 0; y <= height; y += GRID_SIZE) {
        for (let x = 0; x <= width; x += GRID_SIZE) {
            meshPoints.push({
                x: x + (Math.random() - 0.5) * 20,
                y: y + (Math.random() - 0.5) * 20
            });
        }
    }

    function drawMesh() {
        meshCtx.clearRect(0, 0, width, height);
        const accentColor = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#1db954';
        const accentRGBA = `rgba(${accentColor.replace('#', '').match(/.{2}/g).map(h => parseInt(h, 16)).join(',')}`;

        for (let i = 0; i < meshPoints.length; i++) {
            for (let j = i + 1; j < meshPoints.length; j++) {
                const dx = meshPoints[i].x - meshPoints[j].x;
                const dy = meshPoints[i].y - meshPoints[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < GRID_SIZE * 1.5) {
                    meshCtx.strokeStyle = `${accentRGBA},0.05)`;
                    meshCtx.beginPath();
                    meshCtx.moveTo(meshPoints[i].x, meshPoints[i].y);
                    meshCtx.lineTo(meshPoints[j].x, meshPoints[j].y);
                    meshCtx.stroke();
                }
            }
        }
    }

    /*** SMOOTH GRADIENT WAVES ***/
    let waveTime = 0;
    function drawWaves() {
        waveCtx.clearRect(0, 0, width, height);
        const accentColor = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#1db954';
        const accentRGBA = `rgba(${accentColor.replace('#', '').match(/.{2}/g).map(h => parseInt(h, 16)).join(',')}`;

        const grad = waveCtx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, `${accentRGBA},0.05)`);
        grad.addColorStop(0.5, `${accentRGBA},0.1)`);
        grad.addColorStop(1, `${accentRGBA},0.05)`);
        waveCtx.fillStyle = grad;

        waveCtx.beginPath();
        for (let x = 0; x <= width; x += 20) {
            const y = Math.sin(x * 0.02 + waveTime) * 20 + height / 2;
            if (x === 0) waveCtx.moveTo(x, y);
            else waveCtx.lineTo(x, y);
        }
        waveCtx.lineTo(width, height);
        waveCtx.lineTo(0, height);
        waveCtx.closePath();
        waveCtx.fill();

        waveTime += 0.02;
    }

    /*** ANIMATION LOOP ***/
    function animateAll() {
        drawWaves();
        drawMesh();
        drawOrbs();
        drawParticles();
        requestAnimationFrame(animateAll);
    }

    animateAll();
});
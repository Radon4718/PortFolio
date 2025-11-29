window.addEventListener("load", () => {
    // === Preloader ===
    const p = document.getElementById('preloader');
    setTimeout(() => { p.style.opacity = '0'; setTimeout(() => p.remove(), 500); }, 400);

    // === Theme Toggle ===
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

    // === Burger Menu ===
    document.getElementById('burger').addEventListener('click', () => document.querySelector('.nav-links').classList.toggle('active'));

    // === Text Animation ===
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

    // === Projects Render ===
    const works = [ /* your project data */];
    const grid = document.getElementById('projectsGrid');
    works.forEach(w => {
        const tagsHtml = w.tags.map(t => `<span class="project-tag">#${t}</span>`).join('');
        const card = document.createElement('article');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="video-wrapper">${w.type === 'video' ? `<video controls preload="metadata" poster="${w.poster}" data-src="${w.src}" playsinline muted loop></video>` : `<img src="${w.src}" alt="${w.title}" style="width:100%;height:100%;object-fit:cover;transition:0.5s;">`}</div>
            <div class="project-info"><div class="project-tags">${tagsHtml}</div><h3 class="project-title">${w.title}</h3></div>
        `;
        grid.appendChild(card);
    });
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const v = e.target.querySelector('video');
                if (v && v.dataset.src) { v.src = v.dataset.src; v.removeAttribute('data-src'); observer.unobserve(e.target); }
                if (v) { e.target.addEventListener('mouseenter', () => v.play().catch(() => { })); e.target.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; }); }
            }
        });
    }, { rootMargin: "200px" });
    document.querySelectorAll('.project-card').forEach(c => observer.observe(c));

    // === Canvas Setup ===
    const canvases = {
        particles: document.getElementById("particle-bg"),
        orbs: document.getElementById("bg-orbs"),
        mesh: document.getElementById("bg-mesh"),
        waves: document.getElementById("bg-waves")
    };
    let width = window.innerWidth, height = window.innerHeight;
    function resizeAll() {
        width = window.innerWidth; height = window.innerHeight;
        Object.values(canvases).forEach(c => { c.width = width; c.height = height; });
    }
    resizeAll();
    window.addEventListener("resize", resizeAll);
    const [particleCtx, orbCtx, meshCtx, waveCtx] = Object.values(canvases).map(c => c.getContext("2d"));

    // --- Adaptive particle count & mesh ---
    const PARTICLE_COUNT = Math.min(80, Math.floor(width * height / 20000));
    const LINK_DIST = 120;
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
            const p = particles[i];
            p.x += p.vx; p.y += p.vy;
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

    function animateAll() { drawWaves(); drawMesh(); drawOrbs(); drawParticles(); requestAnimationFrame(animateAll); }
    animateAll();
});

window.addEventListener("load", () => {
    // === GLOBAL CANVAS VARIABLES ===
    let width = window.innerWidth, height = window.innerHeight;
    let accentColor = getComputedStyle(document.body).getPropertyValue('--accent') || '#1db954';
    const getAccentRGBA = (alpha = 1) => {
        const rgb = accentColor.replace('#', '').match(/.{2}/g).map(h => parseInt(h, 16));
        return `rgba(${rgb.join(',')},${alpha})`;
    }

    // === 1. Preloader ===
    const p = document.getElementById('preloader');
    setTimeout(() => { p.style.opacity = '0'; setTimeout(() => p.remove(), 500); }, 400);

    // === 2. Theme Toggle ===
    const themeBtn = document.getElementById('themeToggle');
    const html = document.documentElement;
    html.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
    themeBtn.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        accentColor = getComputedStyle(document.body).getPropertyValue('--accent') || '#1db954';
    });

    // === 3. Burger Menu ===
    document.getElementById('burger').addEventListener('click', () => document.querySelector('.nav-links').classList.toggle('active'));

// ----------------------------------------------------------------------
// === 4. Particle Morph Text Animation (Core Logic) ===
const roles = ["Software Engineer", "Java Enthusiast", "Problem Solver"];
let roleIndex = 0;
const TEXT_PARTICLE_COUNT = 2000;
const TARGET_SPRING = 0.05;
const TARGET_DRAG = 0.9;
let isTransitioning = false; 

// Center point for the circular dispersal
const CENTER_X = width / 2;
const CENTER_Y = height / 2;


// We'll use a new canvas for the morphing text
const morphCanvas = document.createElement('canvas'); // ...
morphCanvas.style.position = 'absolute';
morphCanvas.style.top = '0';
morphCanvas.style.left = '0';
morphCanvas.style.pointerEvents = 'none';
document.getElementById('hero').appendChild(morphCanvas); // Append to hero section
const morphCtx = morphCanvas.getContext('2d');

const textParticles = [];
let targetPositions = []; 

function resizeMorphCanvas() {
    width = window.innerWidth; 
    height = window.innerHeight; 
    morphCanvas.width = width;
    morphCanvas.height = height;
    // Recalculate positions on resize if not transitioning
    if (textParticles.length > 0 && !isTransitioning) {
        // Re-center the target positions based on the new dimensions
        morphText(roles[roleIndex - 1 < 0 ? roles.length - 1 : roleIndex - 1], false); 
    }
}
resizeMorphCanvas();

// --- Particle Generation ---
for (let i = 0; i < TEXT_PARTICLE_COUNT; i++) {
    textParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0, vy: 0,
        tx: Math.random() * width, // target X
        ty: Math.random() * height, // target Y
        dx: 0, // dispersal X (temporary target for transition)
        dy: 0, // dispersal Y
        size: Math.random() * 1.5 + 0.5,
        color: getAccentRGBA(0.9)
    });
}

// --- Text Sampling Function ---
function getTargetPositions(text) {
    // Dynamically adjust font size based on screen width
    const fontSize = Math.min(width / 8, 100); 
    
    morphCtx.clearRect(0, 0, width, height);
    morphCtx.fillStyle = 'white';
    morphCtx.font = `900 ${fontSize}px Outfit, sans-serif`;
    morphCtx.textAlign = 'center';

    const textMetrics = morphCtx.measureText(text);
    const textHeight = fontSize;

    const xOffset = width / 2;
    // Position vertically where the original h1 was (roughly center hero, slightly up)
    const yOffset = height / 2 - 300 + textHeight / 3 ; 

    morphCtx.fillText(text, xOffset, yOffset);

    const data = morphCtx.getImageData(0, 0, width, height).data;
    const positions = [];
    const density = 4; // Higher density samples fewer points, improving performance

    for (let y = 0; y < height; y += density) {
        for (let x = 0; x < width; x += density) {
            const index = (y * width + x) * 4;
            if (data[index + 3] > 0) {
                positions.push({ x: x, y: y });
            }
        }
    }
    
    morphCtx.clearRect(0, 0, width, height);
    return positions;
}

// --- Morphing Function ---
function morphText(text, setDispersal = false) {
    targetPositions = getTargetPositions(text);
    
    textParticles.forEach((p, i) => {
        // Find the next text target position
        const finalTarget = targetPositions[i % targetPositions.length];
        
        // 1. Set Dispersal Target (circular outwards)
        if (setDispersal) {
            // Calculate angle and push outwards from the center of the screen
            const angle = Math.atan2(p.y - CENTER_Y, p.x - CENTER_X);
            const randomDistance = 150 + Math.random() * 150; 
            p.dx = CENTER_X + Math.cos(angle) * randomDistance;
            p.dy = CENTER_Y + Math.sin(angle) * randomDistance;
        } 
        
        // 2. Set Final Target (the new word shape)
        if (finalTarget) {
            p.tx = finalTarget.x + (Math.random() - 0.5) * 4; 
            p.ty = finalTarget.y + (Math.random() - 0.5) * 4;
        } else {
            p.tx = width / 2 + (Math.random() - 0.5) * 50;
            p.ty = height + 100; // Send extras off-screen
        }
    });

    roleIndex = (roleIndex + 1) % roles.length;
}

// --- Animation Loop Control ---
function startMorphLoop() {
    const nextRole = roles[roleIndex % roles.length];
    
    // 1. Start the DISPERSAL (circular transition)
    isTransitioning = true;
    morphText(nextRole, true); // Set dispersal targets (p.dx, p.dy)

    // 2. Wait for scattering (1000ms)
    setTimeout(() => {
        // 3. Set the final new word targets
        morphText(nextRole, false); // Set final text targets (p.tx, p.ty)
    }, 1000); 

    // 4. End transition state after the new word has formed a bit (1800ms)
    setTimeout(() => {
        isTransitioning = false;
    }, 1800);

    // 5. Schedule the next loop (Total time for one cycle)
    // ⬆️ MODIFIED LINE: Increased from 5000ms to 8000ms
    setTimeout(startMorphLoop, 8000); 
}
window.setTimeout(startMorphLoop, 1000); 

// --- Particle Update & Draw Function ---
function drawMorphParticles() {
    // Clear the morph canvas
    morphCtx.clearRect(0, 0, width, height);

    textParticles.forEach(p => {
        let targetX, targetY;
        
        // Select the target based on the transition state
        if (isTransitioning) {
            targetX = p.dx; // Move towards the temporary dispersal target
            targetY = p.dy;
        } else {
            targetX = p.tx; // Move towards the final text target
            targetY = p.ty;
        }
        
        // Calculate the difference vector to the CURRENT target
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        
        // Apply physics
        p.vx += dx * TARGET_SPRING;
        p.vy += dy * TARGET_SPRING;
        
        p.vx *= TARGET_DRAG;
        p.vy *= TARGET_DRAG;
        
        p.x += p.vx;
        p.y += p.vy;

        // Draw the particle
        // Note: The color is set once during initialization, but using getAccentRGBA(0.9) 
        // dynamically here ensures theme changes are respected.
        morphCtx.fillStyle = getAccentRGBA(0.9); 
        morphCtx.beginPath();
        morphCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        morphCtx.fill();
    });
}
// ----------------------------------------------------------------------

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
            demo: "" // Use your real URL
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
            title: "Java 2d platformer game",
            description: "A 2d platformer game built in Java using OOP principles, featuring player movement, enemies, and level design.",
            type: 'video',
            tags: ["Java", "OOP", "Game Dev"],
            src: "assets/Java Game.mp4",
            poster: "https://placehold.co/600x400/1a1a1a/1db954?text=Java+RPG",
            github: "https://github.com/Radon4718/PlatformerGameInJava-master",
            demo: ""
        },
        {
            title: "PortFolio",
            description: "A portfolio application demonstrating HTML, CSS, and JavaScript skills to showcase projects effectively.",
            type: 'video',
            tags: ["HTML", "CSS", "JavaScript", "Web"],
            src: "assets/PortFolio.mp4",
            poster: "https://placehold.co/600x400/1a1a1a/1db954?text=PortFolio",
            github: "https://github.com/Radon4718/PortFolio",
            demo: ""
        },
        {
            title: "Enviroment Simulator",
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
            title: "Godot Enviroment Simulator",
            description: "A Godot-based simulation modeling fish behavior in response to environmental factors using GDScript.",
            type: 'video',
            tags: ["GDScript", "Godot", "Game dev"],
            src: "assets/Godot.mp4",
            poster: "https://placehold.co/600x400/1a1a1a/1db954?text=PortFolio",
            github: "https://github.com/Radon4718/Godot_Enviroment_simuplation",
            demo: ""
        }
    ];
    // ⭐ END FULL PROJECT DATA ⭐


    const grid = document.getElementById('projectsGrid');

    // Rendering Logic
    works.forEach(w => {
        const tagsHtml = w.tags.map(t => `<span class="project-tag">${t}</span>`).join('');
        const allTags = w.tags.join(' ');
        const card = document.createElement('article');
        card.className = 'project-card';
        card.setAttribute('data-tags', allTags);

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

    // Filtering Logic
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;

            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            document.querySelectorAll('.project-card').forEach(card => {
                const tags = card.dataset.tags.toLowerCase();
                if (filter === 'all' || tags.includes(filter.toLowerCase())) {
                    card.style.display = 'block'; 
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // === 6. Background Canvas Setup and Animation ===
    const canvases = {
        particles: document.getElementById("particle-bg"),
        orbs: document.getElementById("bg-orbs"),
        mesh: document.getElementById("bg-mesh"),
        waves: document.getElementById("bg-waves")
    };
    
    function resizeAll() { 
        width = window.innerWidth; 
        height = window.innerHeight; 
        Object.values(canvases).forEach(c => { c.width = width; c.height = height; }); 
        resizeMorphCanvas();
    }
    resizeAll();
    window.addEventListener("resize", resizeAll);
    const [particleCtx, orbCtx, meshCtx, waveCtx] = Object.values(canvases).map(c => c.getContext("2d")); 

    // --- Adaptive orbs & mesh ---
    const ORB_COUNT = Math.min(8, Math.floor(width / 300));
    const orbs = Array.from({ length: ORB_COUNT }, () => ({ x: Math.random() * width, y: Math.random() * height, r: Math.random() * 60 + 50, alpha: Math.random() * 0.3 + 0.1, dx: (Math.random() - 0.5) * 0.2, dy: (Math.random() - 0.5) * 0.2 }));
    const GRID_SIZE = width > 1200 ? 60 : width > 800 ? 80 : 100;
    const meshPoints = []; for (let y = 0; y <= height; y += GRID_SIZE) for (let x = 0; x <= width; x += GRID_SIZE) meshPoints.push({ x: x + (Math.random() - 0.5) * 20, y: y + (Math.random() - 0.5) * 20 });

    // --- Drawing functions ---
    function drawOrbs() {
        orbCtx.clearRect(0, 0, width, height);
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

    // --- Main Animation Loop ---
    function animateAll() { 
        drawMorphParticles(); 
        drawWaves(); 
        drawMesh(); 
        drawOrbs(); 
        requestAnimationFrame(animateAll); 
    }
    animateAll();
});

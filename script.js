
window.addEventListener("load", () => {
    /*** CANVAS SETUP ***/
    const canvases = {
        particles: document.getElementById("particle-bg"),
        orbs: document.getElementById("bg-orbs"),
        mesh: document.getElementById("bg-mesh"),
        waves: document.getElementById("bg-waves")
    };

    const ctxs = {};
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

    /*** PARTICLES WITH CONSTELLATION ***/
    const particleCtx = canvases.particles.getContext("2d");
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

        // Lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < LINK_DIST) {
                    const alpha = 1 - dist / LINK_DIST;
                    particleCtx.strokeStyle = `rgba(29,185,84,${alpha * 0.5})`;
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

            particleCtx.fillStyle = "rgba(29,185,84,0.95)";
            particleCtx.shadowColor = "rgba(29,185,84,1)";
            particleCtx.shadowBlur = 10;
            particleCtx.beginPath();
            particleCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            particleCtx.fill();
        });
    }

    /*** FLOATING ENERGY ORBS ***/
    const orbCtx = canvases.orbs.getContext("2d");
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
        orbs.forEach(o => {
            o.x += o.dx; o.y += o.dy;
            if (o.x < -o.r) o.x = width + o.r;
            if (o.x > width + o.r) o.x = -o.r;
            if (o.y < -o.r) o.y = height + o.r;
            if (o.y > height + o.r) o.y = -o.r;

            const grad = orbCtx.createRadialGradient(o.x, o.y, o.r * 0.2, o.x, o.y, o.r);
            grad.addColorStop(0, `rgba(29,185,84,${o.alpha})`);
            grad.addColorStop(1, `rgba(29,185,84,0)`);
            orbCtx.fillStyle = grad;
            orbCtx.beginPath();
            orbCtx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
            orbCtx.fill();
        });
    }

    /*** LOW-POLY TRIANGULATED MESH ***/
    const meshCtx = canvases.mesh.getContext("2d");
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
        for (let i = 0; i < meshPoints.length; i++) {
            for (let j = i + 1; j < meshPoints.length; j++) {
                const dx = meshPoints[i].x - meshPoints[j].x;
                const dy = meshPoints[i].y - meshPoints[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < GRID_SIZE * 1.5) {
                    meshCtx.strokeStyle = "rgba(29,185,84,0.05)";
                    meshCtx.beginPath();
                    meshCtx.moveTo(meshPoints[i].x, meshPoints[i].y);
                    meshCtx.lineTo(meshPoints[j].x, meshPoints[j].y);
                    meshCtx.stroke();
                }
            }
        }
    }

    /*** SMOOTH GRADIENT WAVES ***/
    const waveCtx = canvases.waves.getContext("2d");
    let waveTime = 0;
    function drawWaves() {
        waveCtx.clearRect(0, 0, width, height);
        const grad = waveCtx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, "rgba(29,185,84,0.05)");
        grad.addColorStop(0.5, "rgba(29,185,84,0.1)");
        grad.addColorStop(1, "rgba(29,185,84,0.05)");
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

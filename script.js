// CANVAS SETUP
const wavesCanvas = document.getElementById("bg-waves");
const meshCanvas = document.getElementById("bg-mesh");
const orbsCanvas = document.getElementById("bg-orbs");

const wavesCtx = wavesCanvas.getContext("2d");
const meshCtx = meshCanvas.getContext("2d");
const orbsCtx = orbsCanvas.getContext("2d");

function resize() {
    wavesCanvas.width = meshCanvas.width = orbsCanvas.width = window.innerWidth;
    wavesCanvas.height = meshCanvas.height = orbsCanvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

//
// 1️⃣ SMOOTH GRADIENT WAVES (BACK LAYER)
//
let waveOffset = 0;

function drawWaves() {
    const w = wavesCanvas.width;
    const h = wavesCanvas.height;

    wavesCtx.clearRect(0, 0, w, h);

    const gradient = wavesCtx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, "#1e0038");
    gradient.addColorStop(1, "#0a0016");
    wavesCtx.fillStyle = gradient;
    wavesCtx.fillRect(0, 0, w, h);

    wavesCtx.fillStyle = "rgba(120, 50, 255, 0.25)";
    wavesCtx.beginPath();

    for (let x = 0; x <= w; x++) {
        wavesCtx.lineTo(
            x,
            h / 2 + Math.sin(x * 0.004 + waveOffset) * 35
        );
    }

    wavesCtx.lineTo(w, h);
    wavesCtx.lineTo(0, h);
    wavesCtx.closePath();
    wavesCtx.fill();

    waveOffset += 0.01;
}

//
// 2️⃣ LOW-POLY TRIANGULATED MESH (MIDDLE LAYER)
//
const meshPoints = [];
const spacing = 120;

for (let y = 0; y < meshCanvas.height; y += spacing) {
    for (let x = 0; x < meshCanvas.width; x += spacing) {
        meshPoints.push({
            x: x + (Math.random() * 40 - 20),
            y: y + (Math.random() * 40 - 20),
            ox: x,
            oy: y,
            speed: Math.random() * 0.005 + 0.002
        });
    }
}

function drawMesh() {
    meshCtx.clearRect(0, 0, meshCanvas.width, meshCanvas.height);
    meshCtx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    meshCtx.lineWidth = 1;

    // Animate points in gentle noise motion
    meshPoints.forEach(p => {
        p.x = p.ox + Math.sin(Date.now() * p.speed) * 20;
        p.y = p.oy + Math.cos(Date.now() * p.speed) * 20;
    });

    // Connect points as triangles
    for (let i = 0; i < meshPoints.length - 1; i++) {
        const p = meshPoints[i];
        const right = meshPoints[i + 1];
        const down = meshPoints[i + Math.floor(meshCanvas.width / spacing)];

        if (right && down) {
            meshCtx.beginPath();
            meshCtx.moveTo(p.x, p.y);
            meshCtx.lineTo(right.x, right.y);
            meshCtx.lineTo(down.x, down.y);
            meshCtx.closePath();
            meshCtx.stroke();
        }
    }
}

//
// 3️⃣ PULSING ORBS (FRONT LAYER)
//
const orbs = Array.from({ length: 30 }, () => ({
    x: Math.random() * orbsCanvas.width,
    y: Math.random() * orbsCanvas.height,
    radius: 10 + Math.random() * 20,
    pulse: Math.random() * Math.PI * 2,
    speed: 0.005 + Math.random() * 0.01,
    hue: Math.floor(Math.random() * 360)
}));

function drawOrbs() {
    orbsCtx.clearRect(0, 0, orbsCanvas.width, orbsCanvas.height);

    orbs.forEach(o => {
        o.pulse += o.speed;
        const r = o.radius + Math.sin(o.pulse) * 8;

        const gradient = orbsCtx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
        gradient.addColorStop(0, `hsla(${o.hue}, 100%, 70%, 1)`);
        gradient.addColorStop(1, `hsla(${o.hue}, 100%, 50%, 0)`);

        orbsCtx.fillStyle = gradient;
        orbsCtx.beginPath();
        orbsCtx.arc(o.x, o.y, r, 0, Math.PI * 2);
        orbsCtx.fill();
    });
}

//
// 🔁 MASTER ANIMATION LOOP
//
function animate() {
    drawWaves();
    drawMesh();
    drawOrbs();
    requestAnimationFrame(animate);
}

animate();

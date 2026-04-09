const player = document.getElementById('player');
const bjarneSpeech = document.getElementById('bjarne-speech');

let posX = 100;
let posY = 100;
let speed = 5;
let isHidden = false;
let keys = {};

// Registrer tastetrykk
window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    if (e.key === ' ') isHidden = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
    if (e.key === ' ') isHidden = false;
});

function gameLoop() {
    // Hvis vi ikke holder inne Space (ikke skjult), kan vi flytte oss
    if (!isHidden) {
        player.classList.remove('bush-mode');
        
        let moving = false;
        if (keys['w'] || keys['arrowup']) { posY -= speed; moving = true; }
        if (keys['s'] || keys['arrowdown']) { posY += speed; moving = true; }
        if (keys['a'] || keys['arrowleft']) { posX -= speed; moving = true; }
        if (keys['d'] || keys['arrowright']) { posX += speed; moving = true; }

        // Oppdater posisjon
        player.style.top = posY + 'px';
        player.style.left = posX + 'px';

        // Logikk for Onkel Bjarne
        if (moving) {
            checkBjarneParanoia();
        } else {
            bjarneSpeech.style.display = 'none';
        }
    } else {
        // Vi er i "Busk-modus"
        player.classList.add('bush-mode');
        bjarneSpeech.style.display = 'none';
    }

    requestAnimationFrame(gameLoop);
}

function checkBjarneParanoia() {
    // Enkel sjanse for at Bjarne ser deg hvis du beveger deg
    let chance = Math.random();
    if (chance > 0.95) {
        bjarneSpeech.innerText = "SÅ DERE DET?! DEN FLYTTA SEG!";
        bjarneSpeech.style.display = 'block';
    }
}

// Start spillet
gameLoop();

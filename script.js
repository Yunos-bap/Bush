const player = document.getElementById('player');
const world = document.getElementById('world');
const bjarneSpeech = document.getElementById('bjarne-speech');

let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
let speed = 5;
let keys = {};

window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

function gameLoop() {
    let isHidden = keys[' '];

    if (!isHidden) {
        player.classList.remove('bush-mode');
        
        // Bevegelse
        if (keys['w'] || keys['arrowup']) posY -= speed;
        if (keys['s'] || keys['arrowdown']) posY += speed;
        if (keys['a'] || keys['arrowleft']) posX -= speed;
        if (keys['d'] || keys['arrowright']) posX += speed;

        // Oppdater buskens posisjon i verden
        player.style.left = posX + 'px';
        player.style.top = posY + 'px';

        // KAMERA-LOGIKK:
        // Vi flytter hele 'world' i motsatt retning av spilleren
        // slik at spilleren alltid er i midten av skjermen.
        let camX = (window.innerWidth / 2) - posX - (player.offsetWidth / 2);
        let camY = (window.innerHeight / 2) - posY - (player.offsetHeight / 2);

        world.style.transform = `translate(${camX}px, ${camY}px)`;
    } else {
        player.classList.add('bush-mode');
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();

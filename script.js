// 1. OPPSETT AV ROM (Her kan du legge til flere rom senere)
const rooms = {
    "skogen": {
        width: 2500, // Bredden på tegningen din
        height: 1200, // Høyden på tegningen din
        bg: "image/IMG_0673.webp"
    }
};

let currentRoom = rooms["skogen"];
let posX = 500, posY = 600;
let blindManX = 1500; // Mannen starter her
let blindManY = 600;
let isHidden = false;
let tutorialTriggered = false;

const player = document.getElementById('player');
const world = document.getElementById('world');
const blindMan = document.getElementById('blind-man');
const dialogBox = document.getElementById('dialog-box');
const dialogText = document.getElementById('dialog-text');

let keys = {};
window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

function visDialog(tekst) {
    dialogText.innerText = tekst;
    dialogBox.style.display = 'block';
}

function gameLoop() {
    // --- SJEKK OM MAN SKAL GJEMME SEG ---
    isHidden = keys['control'];
    if (isHidden) player.classList.add('hidden-mode');
    else player.classList.remove('hidden-mode');

    // --- BEVEGELSE ---
    let speed = 5;
    let isMoving = false;
    if (keys['w'] || keys['arrowup']) { posY -= speed; isMoving = true; }
    if (keys['s'] || keys['arrowdown']) { posY += speed; isMoving = true; }
    if (keys['a'] || keys['arrowleft']) { posX -= speed; isMoving = true; }
    if (keys['d'] || keys['arrowright']) { posX += speed; isMoving = true; }

    // --- GRENSER FOR BUSKEN (Stopper ved kanten av tegningen) ---
    if (posX < 0) posX = 0;
    if (posY < 450) posY = 450; // Mur-linjen din
    if (posX > currentRoom.width - 80) posX = currentRoom.width - 80;
    if (posY > currentRoom.height - 80) posY = currentRoom.height - 80;

    // --- MANNENS BEVEGELSE ---
    blindManX -= 1.5; 
    if (blindMan) {
        blindMan.style.left = blindManX + 'px';
        blindMan.style.top = blindManY + 'px';
    }

    // --- SMART KAMERA (Stopper ved bildekanten) ---
    // Finn ut hvor kameraet VIL være (senter på spiller)
    let camX = (window.innerWidth / 2) - posX - 40;
    let camY = (window.innerHeight / 2) - posY - 40;

    // Sjekk om kameraet prøver å gå utenfor tegningen (0 er venstre/topp)
    if (camX > 0) camX = 0;
    if (camY > 0) camY = 0;

    // Sjekk om kameraet prøver å gå utenfor på høyre/bunn
    let maxCamX = window.innerWidth - currentRoom.width;
    let maxCamY = window.innerHeight - currentRoom.height;
    if (camX < maxCamX) camX = maxCamX;
    if (camY < maxCamY) camY = maxCamY;

    // --- OPPDATER ALT PÅ SKJERMEN ---
    world.style.width = currentRoom.width + "px";
    world.style.height = currentRoom.height + "px";
    world.style.backgroundImage = `url('${currentRoom.bg}')`;
    world.style.transform = `translate(${camX}px, ${camY}px)`;
    
    player.style.left = posX + 'px';
    player.style.top = posY + 'px';

    // Enkel tutorial sjekk
    let distance = blindManX - posX;
    if (!tutorialTriggered && isHidden && distance < -200) {
        visDialog("Good job, it seems you’ve already got the hang of it.");
        tutorialTriggered = true;
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();

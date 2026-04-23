const rooms = {
    "skogen": {
        width: 2500, // Bredden på bildet ditt
        height: 1200, // Høyden på bildet ditt
        bg: "image/IMG_0673.webp"
    }
};

let currentRoom = rooms["skogen"];
let posX = 500, posY = 600;
let blindManX = 1800; // Mannen starter langt til høyre
let blindManY = 600;

const player = document.getElementById('player');
const world = document.getElementById('world');
const blindMan = document.getElementById('blind-man');

let keys = {};
window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

function gameLoop() {
    // Bevegelse
    if (keys['w']) posY -= 5;
    if (keys['s']) posY += 5;
    if (keys['a']) posX -= 5;
    if (keys['d']) posX += 5;

    // 1. STOPP SPILLEREN VED KANTEN AV BILDET
    if (posX < 0) posX = 0;
    if (posY < 450) posY = 450; // Mur-kanten din
    if (posX > currentRoom.width - 80) posX = currentRoom.width - 80;
    if (posY > currentRoom.height - 80) posY = currentRoom.height - 80;

    // 2. FLYTT MANNEN (Han går sakte mot venstre)
    blindManX -= 1.5;
    if (blindMan) {
        blindMan.style.left = blindManX + 'px';
        blindMan.style.top = blindManY + 'px';
    }

    // 3. SMART KAMERA (Låser seg til kantene)
    let camX = (window.innerWidth / 2) - posX;
    let camY = (window.innerHeight / 2) - posY;

    // Stopper kamera fra å vise "hvit verden" til venstre/topp
    if (camX > 0) camX = 0;
    if (camY > 0) camY = 0;

    // Stopper kamera fra å vise "hvit verden" til høyre/bunn
    let maxCamX = window.innerWidth - currentRoom.width;
    let maxCamY = window.innerHeight - currentRoom.height;
    if (camX < maxCamX) camX = maxCamX;
    if (camY < maxCamY) camY = maxCamY;

    // Oppdater posisjoner
    world.style.backgroundImage = `url('${currentRoom.bg}')`;
    world.style.width = currentRoom.width + "px";
    world.style.height = currentRoom.height + "px";
    world.style.transform = `translate(${camX}px, ${camY}px)`;
    
    player.style.left = posX + 'px';
    player.style.top = posY + 'px';

    requestAnimationFrame(gameLoop);
}
gameLoop();

const rooms = {
    "skogen": {
        width: 2500, 
        height: 1200,
        bg: "image/IMG_0613.jpeg"
    }
};

let currentRoom = rooms["skogen"];
let posX = 500, posY = 600;
let blindManX = 1800;
let blindManY = 600;

const player = document.getElementById('player');
const world = document.getElementById('world');
const foreground = document.getElementById('foreground');
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

    // --- GRENSER (Busken stopper ved trærne) ---
    if (posX < 0) posX = 0;
    if (posY < 450) posY = 450; 
    if (posX > currentRoom.width - 80) posX = currentRoom.width - 80;
    
    // Bunn-grense: Stopper busken litt før bunnen av bildet
    let bottomLimit = currentRoom.height - 350; 
    if (posY > bottomLimit) posY = bottomLimit;

    // Kamera-logikk
    let camX = (window.innerWidth / 2) - posX;
    let camY = (window.innerHeight / 2) - posY;

    if (camX > 0) camX = 0;
    if (camY > 0) camY = 0;
    if (camX < window.innerWidth - currentRoom.width) camX = window.innerWidth - currentRoom.width;
    if (camY < window.innerHeight - currentRoom.height) camY = window.innerHeight - currentRoom.height;

    // Oppdatering av bilder og posisjon
    world.style.backgroundImage = `url('${currentRoom.bg}')`;
    
    world.style.width = currentRoom.width + "px";
    world.style.height = currentRoom.height + "px";
    world.style.transform = `translate(${camX}px, ${camY}px)`;
    
    player.style.left = posX + 'px';
    player.style.top = posY + 'px';

    if (blindMan) {
        blindManX -= 1.5;
        blindMan.style.left = blindManX + 'px';
        blindMan.style.top = blindManY + 'px';
    }

    requestAnimationFrame(gameLoop);
}
gameLoop();

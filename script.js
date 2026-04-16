let posX = 500, posY = 500;
let blindManX = 1200; // Startposisjon for mannen
let keys = {};

const player = document.getElementById('player');
const world = document.getElementById('world');
const blindMan = document.getElementById('blind-man');

window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

function gameLoop() {
    // 1. Bevegelse med grenser (Busken stopper ved kanten av #world)
    if ((keys['w'] || keys['arrowup']) && posY > 0) posY -= 5;
    if ((keys['s'] || keys['arrowdown']) && posY < 920) posY += 5; // 1000 (høyde) - 80 (busk)
    if ((keys['a'] || keys['arrowleft']) && posX > 0) posX -= 5;
    if ((keys['d'] || keys['arrowright']) && posX < 1920) posX += 5; // 2000 (bredde) - 80 (busk)

    // 2. Flytt mannen sakte mot venstre (Gammel mann tempo)
    blindManX -= 1.5;
    if (blindMan) {
        blindMan.style.left = blindManX + 'px';
    }

    // 3. Oppdater spiller
    if (player) {
        player.style.left = posX + 'px';
        player.style.top = posY + 'px';
    }

    // 4. Kamerafølging
    if (world) {
        let camX = (window.innerWidth / 2) - posX;
        let camY = (window.innerHeight / 2) - posY;
        world.style.transform = `translate(${camX}px, ${camY}px)`;
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();

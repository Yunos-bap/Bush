// 1. VARIABLER (Øverst)
let posX = 500, posY = 500;
let keys = {};
const player = document.getElementById('player');
const world = document.getElementById('world');

// 2. EVENT LISTENERS (Hører etter tastetrykk)
window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

// 3. GAMELOOP (Hjertet i spillet som kjører hele tiden)
function gameLoop() {
    // Bevegelse (Dette skjer hver gang skjermen tegnes på nytt)
    if (keys['w'] || keys['arrowup']) posY -= 5;
    if (keys['s'] || keys['arrowdown']) posY += 5;
    if (keys['a'] || keys['arrowleft']) posX -= 5;
    if (keys['d'] || keys['arrowright']) posX += 5;

    // Oppdater spillerens posisjon
    if (player) {
        player.style.left = posX + 'px';
        player.style.top = posY + 'px';
    }

    // Kamerafølging (Flytter verdenen slik at spilleren holder seg i midten)
    if (world) {
        let camX = (window.innerWidth / 2) - posX;
        let camY = (window.innerHeight / 2) - posY;
        world.style.transform = `translate(${camX}px, ${camY}px)`;
    }

    requestAnimationFrame(gameLoop);
}

// 4. START (Dette kaller på funksjonen én gang for å sette i gang alt)
gameLoop();

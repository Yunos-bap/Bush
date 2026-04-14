let posX = 500, posY = 500;
const player = document.getElementById('player');
const world = document.getElementById('world');
let keys = {};

window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

function gameLoop() {
    // Bevegelse
    if (keys['w']) posY -= 5;
    if (keys['s']) posY += 5;
    if (keys['a']) posX -= 5;
    if (keys['d']) posX += 5;

    // Oppdater spiller
    player.style.left = posX + 'px';
    player.style.top = posY + 'px';

    // Kamerafølging (senterer kamera på spiller)
    let camX = (window.innerWidth / 2) - posX;
    let camY = (window.innerHeight / 2) - posY;
    world.style.transform = `translate(${camX}px, ${camY}px)`;

    requestAnimationFrame(gameLoop);
}
gameLoop();

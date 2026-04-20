// --- STARTPOSISJONER ---
let posX = 500, posY = 600; // Busken starter her
let blindManX = 700;        // Mannen starter NÆRME deg!
let blindManY = 600;        // Mannen starter på samme høyde som deg!

let keys = {};
const player = document.getElementById('player');
const world = document.getElementById('world');
const blindMan = document.getElementById('blind-man');

window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

function gameLoop() {
    // --- 1. BEVEGELSE & GRENSER ---
    if (keys['w'] || keys['arrowup']) posY -= 5;
    if (keys['s'] || keys['arrowdown']) posY += 5;
    if (keys['a'] || keys['arrowleft']) posX -= 5;
    if (keys['d'] || keys['arrowright']) posX += 5;

    // Her er murene (Juster disse hvis busken kan gå for langt opp eller ned)
    let øversteMurGrense = 450;  
    let nedersteTegningGrense = 1000; 
    let venstreGrense = 0;
    let høyreGrense = 2400; 

    // Tving busken til å bli innenfor grensene
    if (posY < øversteMurGrense) posY = øversteMurGrense;
    if (posY > nedersteTegningGrense) posY = nedersteTegningGrense;
    if (posX < venstreGrense) posX = venstreGrense;
    if (posX > høyreGrense) posX = høyreGrense;


    // --- 2. MANNEN ---
    blindManX -= 1; // Mannen går sakte til venstre
    if (blindMan) {
        blindMan.style.left = blindManX + 'px';
        blindMan.style.top = blindManY + 'px';
    }


    // --- 3. OPPDATER BUSKEN ---
    if (player) {
        player.style.left = posX + 'px';
        player.style.top = posY + 'px';
    }


    // --- 4. KAMERAET ---
    if (world) {
        let skjermMidtX = window.innerWidth / 2;
        let skjermMidtY = window.innerHeight / 2;

        // Sentrer kameraet på busken
        let camX = skjermMidtX - posX - 40;
        let camY = skjermMidtY - posY - 40;

        world.style.transform = `translate(${camX}px, ${camY}px)`;
    }

    requestAnimationFrame(gameLoop);
}

// Start spillet
gameLoop();

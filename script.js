// STARTPOSISJONER
let posX = 500, posY = 600; // Busken starter her
let blindManX = 900;        // Mannen starter litt til høyre for deg!
let blindManY = 550;        // Mannens høyde på skjermen

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

    // Her er grensene dine! Endre disse tallene for å treffe muren din perfekt.
    let øversteMurGrense = 450;  // Busken stopper her når den går OPP
    let nedersteTegningGrense = 1000; // Busken stopper her når den går NED
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


    // --- 4. DET PERFEKTE KAMERAET ---
    // Dette tvinger kameraet til å ALLTID ha busken i midten, uten å glitche.
    if (world) {
        let skjermMidtX = window.innerWidth / 2;
        let skjermMidtY = window.innerHeight / 2;

        // Vi trekker fra 40 for å sentrere akkurat på midten av busken (siden den er 80px stor)
        let camX = skjermMidtX - posX - 40;
        let camY = skjermMidtY - posY - 40;

        world.style.transform = `translate(${camX}px, ${camY}px)`;
    }

    requestAnimationFrame(gameLoop);
}

// Start spillet
gameLoop();

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

        // Juster disse tallene basert på hvor på skjermen muren og bunnlinjen er
        const minY = 200; // Grensen for muren øverst
        const maxY = 600; // Grensen for streken nederst

        // Sjekker om spilleren prøver å gå utenfor grensene
        if (posY < minY) posY = minY;
        if (posY > maxY) posY = maxY;

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

const blindMan = document.getElementById('blind-man');
let blindManX = 2000; // Startposisjon langt til høyre
let tutorialTriggered = false; // Sikrer at dialogen bare skjer én gang

function sjekkTutorialLogikk() {
    if (tutorialTriggered) return; // Stopp hvis en dialog allerede er trigget

    // Få mannen til å gå mot venstre
    blindManX -= 3; 
    blindMan.style.left = blindManX + 'px';

    // Regn ut avstanden mellom mannen og busken
    let distance = blindManX - posX;

    // SCENARIO C: Beveger seg, fanges opp på lengre avstand
    if (!isHidden && isMoving && distance < 500 && distance > 0) {
        visDialog("WOW. He must be both blind and deaf. You got really lucky. For your own sake, do it properly next time.");
        tutorialTriggered = true;
    }
    // SCENARIO B: Står stille, men ikke gjemt, fanges opp på kort avstand
    else if (!isHidden && !isMoving && distance < 250 && distance > 0) {
        visDialog("It appears that that man is legally blind, or just doesn’t give a damn. You got lucky. Do it properly next time.");
        tutorialTriggered = true;
    }
    // SCENARIO A: Gjemt, mannen har gått trygt forbi
    else if (isHidden && distance < -100) {
        visDialog("Good job, it seems you’ve already got the hang of it.");
        tutorialTriggered = true;
    }
    const dialogContainer = document.getElementById('dialog-container');
const dialogText = document.getElementById('dialog-text');
let isDialogOpen = false;

// Funksjon for å vise dialog
function visDialog(tekst) {
    dialogText.innerText = tekst;
    dialogContainer.style.display = 'flex';
    isDialogOpen = true;
    // Vi kan stoppe spillet her hvis du vil ved å sette speed = 0
}

// Lukk dialog med SPACE
window.addEventListener('keydown', (e) => {
    if (e.key === ' ' && isDialogOpen) {
        dialogContainer.style.display = 'none';
        isDialogOpen = false;
        // Her kan du starte Blind Man-bevegelsen hvis den var pauset
    }
});

// Tutorial-sjekk (Kjør denne i gameLoop)
function sjekkTutorialLogikk() {
    if (tutorialTriggered || isDialogOpen) return;

    // Oppdater Blind Man sin posisjon
    blindManX -= 2; 
    document.getElementById('blind-man').style.left = blindManX + 'px';

    let distance = blindManX - posX;

    // Scenario C: Beveger seg
    if (!isHidden && isMoving && distance < 500 && distance > 0) {
        visDialog("WOW. He must be both blind and deaf. You got really lucky. For your own sake, do it properly next time.");
        tutorialTriggered = true;
    } 
    // Scenario B: Står stille, men ikke gjemt
    else if (!isHidden && !isMoving && distance < 250 && distance > 0) {
        visDialog("It appears that that man is legally blind, or just doesn’t give a damn. You got lucky. Do it properly next time.");
        tutorialTriggered = true;
    }
    // Scenario A: Gjemt og mannen har passert
    else if (isHidden && distance < -100) {
        visDialog("Good job, it seems you’ve already got the hang of it.");
        tutorialTriggered = true;
    }
}
}


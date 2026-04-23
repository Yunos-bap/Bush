let posX = 500, posY = 600;
let blindManX = 1200; 
let isHidden = false;
let isMoving = false;
let tutorialTriggered = false;
let visibilityCounter = 0; 
const framesToWait = 180; // 3 sekunder

let keys = {};
const player = document.getElementById('player');
const world = document.getElementById('world');
const blindMan = document.getElementById('blind-man');
const dialogBox = document.getElementById('dialog-box');
const dialogText = document.getElementById('dialog-text');

window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

function visDialog(tekst) {
    dialogText.innerText = tekst;
    dialogBox.style.display = 'block';
}

function gameLoop() {
    // --- 1. HIDE-FUNKSJON (H-tast) ---
    if (keys['h']) {
        isHidden = true;
        player.classList.add('hidden-mode');
    } else {
        isHidden = false;
        player.classList.remove('hidden-mode');
    }

    // --- 2. BEVEGELSE & GRENSER ---
    isMoving = false;
    if (keys['w'] || keys['arrowup']) { posY -= 5; isMoving = true; }
    if (keys['s'] || keys['arrowdown']) { posY += 5; isMoving = true; }
    if (keys['a'] || keys['arrowleft']) { posX -= 5; isMoving = true; }
    if (keys['d'] || keys['arrowright']) { posX += 5; isMoving = true; }

    // Mur-grenser
    if (posY < 450) posY = 450;
    if (posY > 1000) posY = 1000;
    if (posX < 0) posX = 0;
    if (posX > 2400) posX = 2400;

    // --- 3. MANNEN & TUTORIAL LOGIKK ---
    blindManX -= 1.5; 
    if (blindMan) blindMan.style.left = blindManX + 'px';

    let distance = blindManX - posX;

    // Sjekk om mannen er i nærheten (synlig)
    if (distance < 800 && distance > -200 && !tutorialTriggered) {
        visibilityCounter++;
        
        if (visibilityCounter > framesToWait) {
            // SCENARIO C: Beveger seg (Trigges på avstand)
            if (!isHidden && isMoving && distance < 400 && distance > 0) {
                visDialog("WOW. He must be both blind and deaf. You got really lucky. For your own sake, do it properly next time.");
                tutorialTriggered = true;
            } 
            // SCENARIO B: Står stille, men ikke gjemt (Veldig nær)
            else if (!isHidden && !isMoving && distance < 150 && distance > 0) {
                visDialog("It appears that that man is legally blind, or just doesn’t give a damn. You got lucky. Do it properly next time.");
                tutorialTriggered = true;
            }
        }
    }

    // SCENARIO A: Du har gjemt deg og han har passert
    if (isHidden && distance < -300 && !tutorialTriggered) {
        visDialog("Good job, it seems you’ve already got the hang of it.");
        tutorialTriggered = true;
    }

    // --- 4. OPPDATERING ---
    player.style.left = posX + 'px';
    player.style.top = posY + 'px';

    let camX = (window.innerWidth / 2) - posX - 40;
    let camY = (window.innerHeight / 2) - posY - 40;
    world.style.transform = `translate(${camX}px, ${camY}px)`;

    requestAnimationFrame(gameLoop);
}

gameLoop();

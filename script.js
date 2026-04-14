const player = document.getElementById('player');
const world = document.getElementById('world');
const dialogContainer = document.getElementById('dialog-container');
const dialogText = document.getElementById('dialog-text');

let posX = 500;
let posY = 500;
let speed = 5;
let keys = {};
let isHidden = false;
let isMoving = false;

// Variabler for dialog og tutorial
let isDialogOpen = false;
let isTyping = false;
let tutorialTriggered = false;
let blindManX = 2000; 

// Registrer tastetrykk
window.addEventListener('keydown', e => {
    keys[e.key.toLowerCase()] = true;
    
    // Lukk dialogboks med Space
    if (e.key === ' ' && isDialogOpen && !isTyping) {
        dialogContainer.style.display = 'none';
        isDialogOpen = false;
    }
});
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

// --- Skrivemaskin-effekt ---
function visDialog(tekst) {
    if (isTyping) return; 
    
    dialogContainer.style.display = 'flex';
    dialogText.innerText = ""; 
    isDialogOpen = true;
    isTyping = true;
    
    let i = 0;
    function typeWriter() {
        if (i < tekst.length) {
            dialogText.innerText += tekst.charAt(i);
            i++;
            setTimeout(typeWriter, 30); // 30ms per bokstav
        } else {
            isTyping = false;
            dialogText.innerText += " (Trykk SPACE)";
        }
    }
    typeWriter();
}

// --- Tutorial Logikk ---
function sjekkTutorialLogikk() {
    if (tutorialTriggered || isDialogOpen) return;

    const blindMan = document.getElementById('blind-man');
    if (!blindMan) return;

    blindManX -= 2.5; // Mannen går mot venstre
    blindMan.style.left = blindManX + 'px';

    let distance = blindManX - posX;

    if (!isHidden && isMoving && distance < 500 && distance > 0) {
        visDialog("WOW. He must be both blind and deaf. You got really lucky. For your own sake, do it properly next time.");
        tutorialTriggered = true;
    } 
    else if (!isHidden && !isMoving && distance < 200 && distance > 0) {
        visDialog("It appears that that man is legally blind, or just doesn’t give a damn. You got lucky. Do it properly next time.");
        tutorialTriggered = true;
    }
    else if (isHidden && distance < -150) {
        visDialog("Good job, it seems you’ve already got the hang of it.");
        tutorialTriggered = true;
    }
}

// --- Hovedløkke for spillet ---
function gameLoop() {
    isHidden = keys[' '];
    isMoving = false;

    // Du kan bare bevege deg hvis du ikke gjemmer deg og dialogen er stengt
    if (!isHidden && !isDialogOpen) {
        player.classList.remove('bush-mode');
        
        if (keys['w'] || keys['arrowup']) { posY -= speed; isMoving = true; }
        if (keys['s'] || keys['arrowdown']) { posY += speed; isMoving = true; }
        if (keys['a'] || keys['arrowleft']) { posX -= speed; isMoving = true; }
        if (keys['d'] || keys['arrowright']) { posX += speed; isMoving = true; }

        // --- MUREN OG BUNNLINJEN ---
        // TIPS: Juster disse to tallene for at de skal passe nøyaktig med tegningen din!
        const murTopp = 350; 
        const bunnLinje = 800; 

        if (posY < murTopp) posY = murTopp;
        if (posY > bunnLinje) posY = bunnLinje;

        player.style.left = posX + 'px';
        player.style.top = posY + 'px';

        // Kamerafølging
        let camX = (window.innerWidth / 2) - posX - (player.offsetWidth / 2);
        let camY = (window.innerHeight / 2) - posY - (player.offsetHeight / 2);
        world.style.transform = `translate(${camX}px, ${camY}px)`;
        
    } else if (isHidden) {
        player.classList.add('bush-mode');
    }

    // Kjør mannen og sjekk reglene hver frame
    sjekkTutorialLogikk();

    requestAnimationFrame(gameLoop);
}

gameLoop();

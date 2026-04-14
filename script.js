let visibilityCounter = 0; // Teller frames mannen er synlig
const framesToWait = 180;  // 3 sekunder (60 frames per sekund * 3)

function sjekkTutorialLogikk() {
    if (tutorialTriggered || isDialogOpen) return;

    const blindMan = document.getElementById('blind-man');
    
    // 1. Bevegelse: Går sakte men sikkert (gammel mann tempo)
    blindManX -= 1.8; 
    blindMan.style.left = blindManX + 'px';

    let distance = blindManX - posX;

    // 2. Sjekk om han er synlig på skjermen (innenfor f.eks. 800 piksler)
    if (distance < 800 && distance > -200) {
        visibilityCounter++;
    }

    // 3. Trigger logikk etter 3 sekunder
    if (visibilityCounter > framesToWait) {
        
        // SCENARIO C: Beveger seg (Trigges på litt avstand)
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

    // SCENARIO A: Har passert busken mens du var gjemt
    // Økt avstanden her (A var for liten)
    if (isHidden && distance < -300) {
        visDialog("Good job, it seems you’ve already got the hang of it.");
        tutorialTriggered = true;
    }
}

// Oppdater gameLoop for å holde busken inni tegningen
function gameLoop() {
    // ... (bevegelseskode fra før)

    // Grenser for busken (Busken kan ikke gå utenfor world-boksen)
    if (posX < 0) posX = 0;
    if (posX > 1900) posX = 1900; // world bredde minus busk bredde
    
    // Juster disse så de passer nøyaktig med "veiene" i tegningen din
    const murTopp = 450; 
    const bunnLinje = 900; 

    if (posY < murTopp) posY = murTopp;
    if (posY > bunnLinje) posY = bunnLinje;

    // ... (resten av kamera og render-kode)
}

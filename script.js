// 1. DEFINISJON AV ROM
const rooms = {
    "skogen": {
        width: 2500,
        height: 1200,
        bg: "image/IMG_0673.webp",
        playerStart: { x: 500, y: 600 }
    },
    "huset": {
        width: 800,  // Et lite rom
        height: 600,
        bg: "image/ditt_nye_bilde.png", // Bytt ut når du er klar
        playerStart: { x: 400, y: 300 }
    }
};

let currentRoom = rooms["skogen"];
let posX = currentRoom.playerStart.x;
let posY = currentRoom.playerStart.y;
let keys = {};

const player = document.getElementById('player');
const world = document.getElementById('world');
const fadeOverlay = document.getElementById('fade-overlay');

// 2. FUNKSJON FOR Å BYTTE ROM (Med Undertale-fade)
function changeRoom(roomId) {
    fadeOverlay.classList.add('active');
    
    setTimeout(() => {
        currentRoom = rooms[roomId];
        
        // Oppdater verdenen
        world.style.width = currentRoom.width + "px";
        world.style.height = currentRoom.height + "px";
        world.style.backgroundImage = `url('${currentRoom.bg}')`;
        
        // Flytt spilleren til startposisjon i nytt rom
        posX = currentRoom.playerStart.x;
        posY = currentRoom.playerStart.y;
        
        // Fjern faden
        setTimeout(() => {
            fadeOverlay.classList.remove('active');
        }, 500);
    }, 1000); // 1 sekund svart skjerm
}

// 3. INPUT
window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

// 4. GAME LOOP
function gameLoop() {
    // Bevegelse
    if (keys['w'] || keys['arrowup']) posY -= 5;
    if (keys['s'] || keys['arrowdown']) posY += 5;
    if (keys['a'] || keys['arrowleft']) posX -= 5;
    if (keys['d'] || keys['arrowright']) posX += 5;

    // GRENSER (Stopp ved kanten av bakgrunnen)
    if (posX < 0) posX = 0;
    if (posY < 0) posY = 0;
    if (posX > currentRoom.width - 60) posX = currentRoom.width - 60;
    if (posY > currentRoom.height - 60) posY = currentRoom.height - 60;

    // Oppdater spiller
    player.style.left = posX + 'px';
    player.style.top = posY + 'px';

    // 5. SMART KAMERA (Undertale-stil)
    let camX = (window.innerWidth / 2) - posX;
    let camY = (window.innerHeight / 2) - posY;

    // Hvis rommet er MINDRE enn skjermen -> Senterer rommet
    if (currentRoom.width < window.innerWidth) {
        camX = (window.innerWidth - currentRoom.width) / 2;
    } else {
        // Hvis rommet er STØRRE -> Følg karakteren, men stopp ved kantene
        if (camX > 0) camX = 0; // Ikke vis tomrom til venstre
        if (camX < window.innerWidth - currentRoom.width) camX = window.innerWidth - currentRoom.width; // Ikke vis tomrom til høyre
    }

    if (currentRoom.height < window.innerHeight) {
        camY = (window.innerHeight - currentRoom.height) / 2;
    } else {
        if (camY > 0) camY = 0; // Ikke vis tomrom over
        if (camY < window.innerHeight - currentRoom.height) camY = window.innerHeight - currentRoom.height; // Ikke vis tomrom under
    }

    world.style.transform = `translate(${camX}px, ${camY}px)`;

    requestAnimationFrame(gameLoop);
}

gameLoop();

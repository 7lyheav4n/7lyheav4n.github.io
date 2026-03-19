// Matrix Rain Effect

const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Matrix rain
const matrix = "ABCDEFｦｲｸGHIJKLMNOPQRSTｺｿﾁﾄﾉﾛﾝUVWXYﾌﾔﾖﾙﾚZ123456789@#$%^&*()¦｜*&^%+-/~{[|`]}";
const matrixChars = matrix.split("");

const fontSize = 16;
const columns = canvas.width / fontSize;

// Array of drops (one per column)
const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * -100; // Start at random heights
}

// Draw the matrix
function drawMatrix() {
    // Black background with low opacity for trail effect
    ctx.fillStyle = "rgba(13, 2, 8, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Green text
    ctx.fillStyle = "#00FF41";
    ctx.font = fontSize + "px monospace";

    // Loop through drops
    for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
    }
}

// Animation loop
setInterval(drawMatrix, 35);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
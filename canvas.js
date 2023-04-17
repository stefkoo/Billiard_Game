export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export const margin = 60;

canvas.width = 800 + 2 * margin;
canvas.height = 400 + 2 * margin;

//Löscht Canvas
export function clearCanvas() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

export const canvasNorm = Math.sqrt(
    canvas.width * canvas.width + canvas.height * canvas.height
    );
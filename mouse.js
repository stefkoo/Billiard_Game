import { canvas } from "./canvas.js";

export const mouse = {
    x: 0,
    y: 0,
};

canvas.addEventListener("touchmove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (e.touches[0].clientX - rect.left) * (canvas.width / rect.width);
    mouse.y = (e.touches[0].clientY - rect.top) * (canvas.height / rect.height);
});

import { canvasNorm, ctx } from "./canvas.js";
import { scale, sub, normalize, limit } from "./math.js";
import { mouse } from "./mouse.js";

export class Controller {
  constructor(ball) {
    this.ball = ball;
    this.vector = { x: 0, y: 0 };
    this.addControl();
    this.active = false;
    this.maxLength = 300;
  }

  addControl() {
    // Touch-Events hinzufügen
    document.addEventListener("touchstart", this.onTouchStart.bind(this), {
      passive: false,
    });
    document.addEventListener("touchmove", this.onTouchMove.bind(this), {
      passive: false,
    });
    document.addEventListener("touchend", this.onTouchEnd.bind(this), {
      passive: false,
    });
  }

  onTouchStart(e) {
    // Touch-Event-Handler für Berührung aufnehmen
    if (e.target.nodeName == "BUTTON" || this.active) return;
    this.active = true;
    e.preventDefault();
  }

  onTouchMove(e) {
    // Touch-Event-Handler für Bewegung aufnehmen
    e.preventDefault();
    if (!this.active) return;
    const touch = e.touches[0];
    const touchPos = { x: touch.clientX, y: touch.clientY };
    this.vector = limit(
      this.maxLength,
      sub(touchPos, this.ball.pos)
    );
  }

  onTouchEnd(e) {
    // Touch-Event-Handler für Ende aufnehmen
    if (e.target.nodeName == "BUTTON" || !this.active) return;
    const factor = 0.15;
    this.ball.vel = scale(factor, this.vector);
    this.active = false;
    e.preventDefault();
  }

  update() {
    // Funktion für Aktualisierung
    // Hier wird nichts geändert
    this.vector = limit(
      this.maxLength,
      sub(mouse, this.ball.pos)
    );
  }

  draw() {
    if (!this.active) return;
    ctx.save();
    // thick line
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.translate(this.ball.pos.x, this.ball.pos.y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.vector.x, this.vector.y);
    ctx.stroke();
    ctx.closePath();
    // thin line
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    const targetFar = scale(canvasNorm, normalize(this.vector));
    ctx.lineTo(targetFar.x, targetFar.y);
    ctx.stroke();
    ctx.restore();
  }
}

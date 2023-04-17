import { canvasNorm, ctx } from "./canvas.js";
import { scale, sub } from "./math.js";
import { mouse } from "./mouse.js";


export class Controller {
    constructor(ball) {
        this.ball = ball;
        this.vector = {x:0,y:0};
        this.addControl()
        this.active = true;
    }

    addControl(){
        document.addEventListener("click", e=> {
            if(!this.active) return;
            this.active = false;
            const factor = 0.15;
            this.ball.vel = scale(factor, this.vector);
        })
    }

    update() {
        console.log(this.vector)
        this.vector = sub(mouse, this.ball.pos);
    }

    draw() {
        if(!this.active) return;
        ctx.save();
        // Thick line
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.translate(this.ball.pos.x, this.ball.pos.y)
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        ctx.closePath();
        //thin line
        ctx.lineWidth = 1;
        ctx.moveTo(this.ball.pos.x, this.ball.pos.y);
        const vectorLength = Math.sqrt(this.vector.x * this.vector.x + this.vector.y * this.vector.y);
        ctx.lineTo(
            this.ball.pos.x + canvasNorm/vectorLength * this.vector.x,
            this.ball.pos.y + canvasNorm/vectorLength * this.vector.y
            );
        ctx.stroke();
        ctx.restore();
    }
}
//weiter bei part2 9:19
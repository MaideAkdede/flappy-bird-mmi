import ground from "./ground";

const birdie = {
    game: null,
    frames: [
        {sx: 6, sy: 982},
        {sx: 62, sy: 982},
        {sx: 118, sy: 982}
    ],
    animationStep: 0,
    maxAnimationStep: 0,
    counterInterval: 0,
    maxInterval: 5,
    width: 34,
    height: 24,
    x: 0,
    y: 0,
    fallSpeed: 0,
    maxFallSpeed: 7,
    maxOffset: 0,
    init(game) {
        this.game = game;
        this.x = this.width / 2 + 3;
        this.y = (game.canvas.height - ground.frame.sh) / 2;
        this.maxAnimationStep = this.frames.length - 1;
    },
    update() {
        if(this.game.hasStarted){
            if (this.fallSpeed < this.maxFallSpeed){
                this.fallSpeed += this.game.gravity;
            }
            this.y += this.fallSpeed;
            this.checkCollisionWithGround();
        }
        this.render();
    },
    render() {
        this.counterInterval++
        if(!(this.counterInterval%this.maxInterval)){
            this.counterInterval = 0
            this.animationStep = this.animationStep < this.maxAnimationStep ? this.animationStep + 1 : 0;
        }
        this.game.context.save();
        this.game.context.translate(this.x, this.y);
        this.game.context.rotate(this.fallSpeed / this.maxFallSpeed);
        this.game.renderSpriteFrame(
            {
                sx: this.frames[this.animationStep].sx,
                sy: this.frames[this.animationStep].sy,
                sw: this.width,
                sh: this.height,
                dx: -this.width / 2,
                dy: -this.height / 2,
                dw: this.width,
                dh: this.height,
            }
        )
        this.game.context.restore();
    },
    checkCollisionWithGround (){
        if(this.y + (this.height / 2) > ground.frame.dy){
            this.y = ground.frame.dy - this.height / 2;
            this.fallSpeed = -this.maxFallSpeed;
        }
    }
}
export default birdie;
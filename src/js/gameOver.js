const gameOver = {
    game: null,
    width: 198,
    height: 50,
    frame: {
        sx: 787,
        sy: 113,
        sw: 0,
        sh: 0,
        dx: 0,
        dy: 0,
        dw: 0,
        dh: 0
    },
    fall: 0,
    y: 0,
    maxY: 0,

    init(game) {
        this.game = game;
        this.y =  -this.height;
        this.maxY = game.canvas.height / 2 - this.height * 2.5;
        this.frame.sw = this.width;
        this.frame.sh =  this.height;
        this.frame.dw = this.width;
        this.frame.dh =  this.height;
        this.frame.dx = game.canvas.width / 2 - this.width / 2;
    },
    update() {
        this.fall += 0.1;
        this.y += this.fall;
        this.frame.dy = this.y;
        if(this.frame.dy > this.maxY){
            this.frame.dy = this.maxY;
        }
        this.game.renderSpriteFrame(this.frame);
    }
}
export default gameOver;
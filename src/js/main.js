import background from "./background";
import TubesPair from "./TubesPair";
import gameController from "./gameController";
import ground from "./ground";
import birdie from "./birdie";
import gameOver from "./gameOver";

const game = {
    canvas: document.getElementById('game'),
    context: null,
    spriteSheetSrc : './src/resources/sprite.png',
    sprite: new Image(),
    gravity: 0.9,
    hasStarted: false,
    tubesPairs: [],
    maxTubesPairs: 3,
    frameCounter: 0,
    frameInterval: 80,
    requestId: 0,

    init() {
        this.context = this.canvas.getContext('2d');
        this.sprite.src = this.spriteSheetSrc;
        this.sprite.addEventListener('load', ()=>{
            gameController.init(this);
            background.init(this);
            ground.init(this);
            birdie.init(this);
            gameOver.init(this);
            this.animate();
        })
    },
    animate() {
        this.requestId = window.requestAnimationFrame(() => {
            this.animate()
        })
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        background.update();
        if(this.hasStarted){
            if(this.frameCounter++ > this.frameInterval){
                if(this.tubesPairs.length >= this.maxTubesPairs){
                    this.tubesPairs.splice(0, 1);
                }
                this.tubesPairs.push(new TubesPair(this));
                this.frameCounter = 0;
            }
            this.tubesPairs.forEach(tubePair=>{
                tubePair.update();
            })
        }
        ground.update();
        birdie.update();
    },
    renderSpriteFrame (coordinates){
        this.context.drawImage(
            this.sprite,
            coordinates.sx,
            coordinates.sy,
            coordinates.sw,
            coordinates.sh,
            coordinates.dx,
            coordinates.dy,
            coordinates.dw,
            coordinates.dh,
        )
    },
    cancelAnimation(){
        window.cancelAnimationFrame(this.requestId);
        this.gameOverText();
    },
    gameOverText (){
        window.requestAnimationFrame(() => {
            this.gameOverText();
        })
        //this.context.clearRect( gameOver.frame.dx , gameOver.maxY, gameOver.frame.dx,  gameOver.maxY);
        gameOver.update();
    }
}
game.init();
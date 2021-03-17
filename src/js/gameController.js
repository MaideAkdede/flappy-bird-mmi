const gameController = {
    init(game){
        window.addEventListener('keydown', (e)=>{
            if(e.key ==='j'){
                if(!game.hasStarted){
                    game.hasStarted = true;
                }
                // faire monter l'oiseau (qui ressemble à un poisson
            }
        })
    }
}
export default gameController;
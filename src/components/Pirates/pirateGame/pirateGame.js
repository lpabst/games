
let pirateGame = {
    init: () => {
        document.getElementById('messageDiv').innerText = '';
        document.querySelectorAll('.btn').forEach( btn => btn.style.visibility = 'hidden');

        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var animationFrame = 0;
        var gameOver = false;
        var gameRunning = true;

        var data = { canvas, context, animationFrame, gameOver, gameRunning };

        window.addEventListener('keydown', function(e) { 
            game.handleInput(e, data) 
        });

        game.run(data);
    },

    run: data => {
        function loop() {
            if (data.gameOver) {
                game.gameOver(data);
            } else {
                if (data.gameRunning){
                    game.update(data);
                    game.render(data);
                    data.animationFrame++;
                }

                window.requestAnimationFrame(loop);
            }
        }

        loop();
    },

    update: data => {

    },

    render: data => {

    },
    
    gameOver: data => {

    },
}

export default pirateGame;
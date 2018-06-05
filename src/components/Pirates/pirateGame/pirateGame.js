import entities from './entities';

let pirateGame = {
    init: () => {
        document.getElementById('messageDiv').innerText = '';
        document.querySelectorAll('.btn').forEach( btn => btn.style.visibility = 'hidden');

        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var animationFrame = 0;
        var gameOver = false;
        var gameRunning = true;

        let wordsToType = [];
        let score = 0;
        let ship = new entities.Ship();

        var data = { canvas, context, animationFrame, gameOver, gameRunning, wordsToType, score, ship };

        window.addEventListener('keydown', function(e) { 
            pirateGame.handleInput(e, data) 
        });

        pirateGame.run(data);
    },

    run: data => {
        function loop() {
            if (data.gameOver) {
                pirateGame.gameOver(data);
            } else {
                if (data.gameRunning){
                    pirateGame.update(data);
                    pirateGame.render(data);
                    data.animationFrame++;
                }

                window.requestAnimationFrame(loop);
            }
        }

        loop();
    },

    handleInput: (e, data) => {
        if (data.gameOver) return;

        // right arrow pauses game
        if(e.keyCode === 39) {
            e.preventDefault();
            pirateGame.togglePauseGame(data);
        }
    
    },

    togglePauseGame: data => {
        if (data.gameRunning){
            let currentDirection;
            if (data.snake.velX === 1) currentDirection = 'RIGHT';
            if (data.snake.velX === -1) currentDirection = 'LEFT';
            if (data.snake.velY === 1) currentDirection = 'DOWN';
            if (data.snake.velY === -1) currentDirection = 'UP';

            document.getElementById('messageDiv').innerText = 'Paused. Press space to continue. (Moving ' + currentDirection + ')';
            data.gameRunning = false;
        }else{
            document.getElementById('messageDiv').innerText = '';
            data.gameRunning = true;
        }
    },

    checkForCompleteWord: data => {

    },

    update: data => {
        let { wordsToType, ship, canvas } = data;

        // add words to the user's array of words they need to type
        if (data.animationFrame % 20 === 0){
            let randX = Math.floor(Math.random() * (canvas.width-150)) + 150;
            let randY = Math.floor(Math.random() * (canvas.height-100)) + 100;
            let newWord = new entities.Word(randX, randY);
            wordsToType.push(newWord);
        }

        // Any word that has been up for longer than 3 seconds disappears and causes damage equal to the length of the word
        let now = new Date().getTime();
        for (let i = wordsToType.length-1; i >= 0; i--){
            if (now - wordsToType[i].timeCreated >= 3000){
                wordsToType.splice(i, 1);
                ship.health -= ( wordsToType[i].word.length - ship.shield );
            }
        }
        
    },

    render: data => {
        let { context } = data;

        // Black background
        context.fillStyle = '#000000';
        context.fillRect(0, 0, data.canvas.width, data.canvas.height);

        // white Game Info
        context.fillStyle = 'white';
        context.font = '24px Arial';
        context.fillText('Score: ' + data.score, 10, 25);
        context.fillText('Health: ' + data.ship.health, 10, 50);
        context.fillText('Shield: ' + data.ship.shield, 10, 50);

        // white words to type
        context.fillStyle = 'white';
        context.font = '12px Arial';
        data.wordsToType.forEach( obj => {
            context.fillText(obj.word, obj.x, obj.y);
        })

    },
    
    gameOver: data => {

    },
}

export default pirateGame;
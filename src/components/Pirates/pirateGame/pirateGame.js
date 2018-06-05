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
        let typedWord = '';
        let score = 0;
        let ship = new entities.Ship(100, 2);
        let enemy = new entities.Ship(50, 3);
        let shipsDestroyed = 0;

        var data = { canvas, context, animationFrame, gameOver, gameRunning, wordsToType, typedWord, score, ship, enemy, shipsDestroyed };

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

    handleInput: (e, data) => {
        if (data.gameOver) return;

        // right arrow pauses game and opens shop for purhcasing upgrades
        if(e.keyCode === 39) {
            e.preventDefault();
            pirateGame.togglePauseGame(data);
        }
        
        // backspace and delete should both remove most recently typed letter
        if (e.keyCode === 8 || e.keyCode === 46){
            e.preventDefault();
            data.typedWord = data.typedWord.substring(0, data.typedWord.length-1);
        }
        // enter clears what user has typed
        else if (e.keyCode === 13){
            e.preventDefault();
            pirateGame.checkForCompleteWord(data);
            data.typedWord = '';
        }
        // Only letters should be added to the word
        else if (e.keyCode >= 65 && e.keyCode <= 90){
            e.preventDefault();
            data.typedWord += e.key;
            pirateGame.checkForCompleteWord(data);
        }

        document.getElementById('typedWord').innerText = data.typedWord;
    },

    checkForCompleteWord: data => {
        let { wordsToType, typedWord } = data;
        // Finds the first word that matches what the user has typed so far and removes it from the list
        for (let i = wordsToType.length-1; i >= 0; i--){
            if (wordsToType[i].word.toLowerCase().trim() === typedWord.toLowerCase().trim()){

                if (wordsToType[i].type === 'cannonball'){
                    // score goes up & enemy ship takes damage
                    data.score ++;
                    let damage = wordsToType[i].word.length - data.enemy.shield;
                    data.enemy.health -= damage > 0 ? damage : 0;

                    // Additional points for destroying a ship
                    if (data.enemy.health <= 0){
                        data.score += 100;
                        data.shipsDestroyed ++;

                        // Create a new enemy
                        let newEnemyHealth = (60 * data.shipsDestroyed) + (Math.floor(Math.random() * 50) + 70);
                        let newEnemyShield = Math.floor(Math.random() * 5) + 1
                        data.enemy = new entities.Ship(newEnemyHealth, newEnemyShield);
                    }
                }else{
                    data.ship.health += 2;
                }

                data.typedWord = '';
                data.wordsToType.splice(i, 1);
                return;
            }
        }
    },

    update: data => {
        let { wordsToType, ship, canvas } = data;

        // Every 100 frames, add a word to the user's array of words they need to type
        if (data.animationFrame % 100 === 0){
            let randX = Math.floor(Math.random() * (canvas.width-150)) + 50;
            let randY = Math.floor(Math.random() * (canvas.height-100)) + 85;
            let newWord = new entities.Word(randX, randY, 'cannonball');
            wordsToType.push(newWord);

            // Every now and then randomly add a repair word to the array as well
            let randomChance = Math.floor(Math.random() * 100);
            if (randomChance <= 2){
                let randX = Math.floor(Math.random() * (canvas.width-150)) + 50;
                let randY = Math.floor(Math.random() * (canvas.height-100)) + 85;
                let newWord = new entities.Word(randX, randY, 'repair');
                wordsToType.push(newWord);
            }
        }

        // Any word that has been up for longer than 5 seconds disappears
        let now = new Date().getTime();
        for (let i = wordsToType.length-1; i >= 0; i--){
            if (now - wordsToType[i].timeCreated >= 5000){
                wordsToType.splice(i, 1);

                // If it's a cannonball, it causes damage equal to the length of the word
                if (wordsToType[i] && wordsToType[i].type === 'cannonball'){
                    let damage = wordsToType[i].word.length - ship.shield;
                    data.ship.health -= ( damage > 0 ) ? damage : 0;
                }
            }
        }
        
    },

    render: data => {
        let { canvas, context, ship, score, wordsToType } = data;

        // Black background
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // white Game Info
        context.fillStyle = 'white';
        context.font = '20px Arial';
        context.fillText('Score: ' + score, 10, 25);
        context.fillText('Health: ' + ship.health, 10, 50);
        context.fillText('Shield: ' + ship.shield, 10, 75);

        // Words to type
        context.font = '14px Arial';
        wordsToType.forEach( obj => {
            if (obj.type === 'repair'){
                context.fillStyle = 'green';
            }else{
                context.fillStyle = 'white';
            }
            context.fillText(obj.word, obj.x, obj.y);
        })

        // Red Text for enemy info
        context.fillStyle = 'red';
        context.font = '20px Arial';
        context.fillText('Enemy', 450, 25);
        context.fillText('Health: ' + data.enemy.health, 450, 50);
        context.fillText('Shield: ' + data.enemy.shield, 450, 75);

    },
    
    gameOver: data => {
        pirateGame.render(data);

        // game over text
        let context = data.context;
        context.fillStyle = 'white';
        context.font = '42px Arial';
        context.fillText('Game Over', 200, 300);

        if (data.gameOverMessage) {
            document.getElementById('messageDiv').innerText = data.gameOverMessage;
        }
        
        document.querySelectorAll('.btn').forEach( btn => btn.style.visibility = 'visible');

        // Send score to back end
        let name = document.getElementById('username').value || 'anonymous' 
        // $.post('/api/newHighScore', {
        //     name: name,
        //     score: data.score
        // })
        // .done( res => {
        //     window.getHighScores();
        // })
    },
}

export default pirateGame;
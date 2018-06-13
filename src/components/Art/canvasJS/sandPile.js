var sandPile = {
    init: function(artClass){

        var canvas = document.getElementById('sandpileCanvas');
        var context = canvas.getContext('2d');
        var animationFrame = 0;

        var sandArray = [];
        for (var i = 0; i <= 200; i++){
            sandArray[i] = [];
            for (var j = 0; j <= 200; j++){
                sandArray[i][j] = 0;
            }
        }
        sandArray[100][100] = 400;

        artClass.data = { canvas, context, animationFrame, sandArray };

        sandPile.run(artClass);
    },

    run: function(artClass){
        function loop() {
            sandPile.update(artClass);
            sandPile.render(artClass);
            window.requestAnimationFrame(loop);
        }

        loop();
    },

    update: function(artClass){
        // Copy sandArray
        let { sandArray } = artClass.data;
        let nextFrameSandArray = JSON.parse(JSON.stringify(sandArray));
        
        // Piles that are too large overflow onto their neighbors here
        for (var i = 0; i <= 200; i++){
            for (var j = 0; j <= 200; j++) {
                if (sandArray[i][j] >= 4){
                    nextFrameSandArray[i][j] -= 4;
                    nextFrameSandArray[i][j+1] ++;
                    nextFrameSandArray[i][j-1] ++;
                    nextFrameSandArray[i+1][j] ++;
                    nextFrameSandArray[i-1][j] ++;
                }
            }
        }

        artClass.data.sandArray = JSON.parse(JSON.stringify(nextFrameSandArray));
    },

    render: function(artClass){
        let { canvas, context, sandArray } = artClass.data

        // Black background
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // index maps to the number of sand particles on any pixel
        var colorMapping = ['#000', '#551c00', '#803815', '#d48d6a', '#ffc6aa'];

        for (var i = 0; i <= 200; i++){
            for (var j = 0; j <= 200; j++) {
                var numSandParticles = sandArray[i][j];
                context.fillStyle = colorMapping[numSandParticles] ? colorMapping[numSandParticles] : '#ffc6aa';
                context.fillRect(i*3, j*3, 3, 3);
            }
        }
    },
}

module.exports = sandPile;
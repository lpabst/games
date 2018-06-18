var sandPile = {
    init: function(artClass){

        var canvas = document.getElementById('sandpileCanvas');
        var context = canvas.getContext('2d');
        var animationFrame = 0;
        var fastForwardSpeed = 1;
        
        var sandArray = [];
        var scale = 4;
        var cols = Math.floor(canvas.width / scale);
        var rows = Math.floor(canvas.height / scale);

        for (var i = 0; i <= cols; i++){
            sandArray[i] = [];
            for (var j = 0; j <= rows; j++){
                sandArray[i][j] = 0;
            }
        }
        sandArray[cols/2][rows/2] = 1000000;

        artClass.sandPile = {};
        artClass.sandPile.data = { canvas, context, animationFrame, fastForwardSpeed, sandArray, scale, cols, rows };

        sandPile.run(artClass);
    },

    run: function(artClass){
        let { fastForwardSpeed } = artClass.sandPile.data;
        function loop() {
            for (let i = 0; i < fastForwardSpeed; i++){
                sandPile.update(artClass);
            }
            sandPile.render(artClass);
            window.requestAnimationFrame(loop);
        }

        loop();
    },

    update: function(artClass){
        // Copy sandArray
        let { sandArray, cols, rows } = artClass.sandPile.data;
        let nextFrameSandArray = JSON.parse(JSON.stringify(sandArray));
        
        // Piles that are too large overflow onto their neighbors here
        for (var i = 0; i <= cols; i++){
            for (var j = 0; j <= rows; j++) {
                if (sandArray[i][j] >= 4){
                    nextFrameSandArray[i][j] -= 4;
                    if (j < rows) nextFrameSandArray[i][j+1] ++;
                    if (j > 0) nextFrameSandArray[i][j-1] ++;
                    if (i < cols) nextFrameSandArray[i+1][j] ++;
                    if (i > 0) nextFrameSandArray[i-1][j] ++;
                }
            }
        }

        artClass.sandPile.data.sandArray = JSON.parse(JSON.stringify(nextFrameSandArray));
    },

    render: function(artClass){
        let { canvas, context, sandArray, scale, cols, rows } = artClass.sandPile.data

        // Black background
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // index maps to the number of sand particles on any pixel
        var colorMapping = ['#000', '#551c00', '#803815', '#d48d6a', '#ffc6aa'];

        for (var i = 0; i <= cols; i++){
            for (var j = 0; j <= rows; j++) {
                var numSandParticles = sandArray[i][j];
                context.fillStyle = colorMapping[numSandParticles] ? colorMapping[numSandParticles] : '#ffc6aa';
                context.fillRect(i*scale, j*scale, scale, scale);
            }
        }
    },
}

module.exports = sandPile;
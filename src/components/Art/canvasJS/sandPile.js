var sandPile = {
    init: function(artClass){

        var canvas = document.getElementById('sandpileCanvas');
        var context = canvas.getContext('2d');
        var animationFrame = 0;

        var sandArray = [];
        for (var i = 0; i < 201; i++){
            sandArray[i] = [];
            for (var j = 0; j < 201; j++){
                sandArray[i][j] = 0;
            }
        }

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

    },

    render: function(artClass){

    },
}

module.exports = sandPile;
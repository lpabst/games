const barnsleyFern = {
    init: function (artClass) {

        let canvas = document.getElementById('fernCanvas');
        let context = canvas.getContext('2d');
        let animationFrame = 0;

        let points = [[300, 590]];
        let scale = 2;

        artClass.fern = {};
        artClass.fern.data = { canvas, context, animationFrame, points, scale };

        barnsleyFern.run(artClass);
    },

    run: function (artClass) {
        function loop() {
            barnsleyFern.update(artClass);
            barnsleyFern.render(artClass);
            window.requestAnimationFrame(loop);
        }

        loop();
    },

    // x = -2.1820 - 2.6558 && y = 0 - 9.9983
    update: function (artClass) {
        let { points } = artClass.fern.data;
        let x = points[points.length - 1][0];
        let y = points[points.length - 1][1];
        let nextX, nextY;
        let rand = Math.random();

        if (rand < 0.01){
            nextX = 0;
            nextY = 0.16 * y;
        }else if (rand < 0.86){
            nextX = 0.85 * x + 0.04 * y;
            nextY = -0.04 * x + 0.85 * y + 1.6
        }else if (rand < 0.93){
            nextX = 0.2 * x - 0.26 * y;
            nextY = 0.23 * x + 0.22 * y + 1.6;
        }else{
            nextX = -0.15 * x + 0.28 * y;
            nextY = 0.26 * x + 0.24 * y + 0.44;
        }

        artClass.fern.data.points.push([nextX, nextY])
    },

    render: function (artClass) {
        let { canvas, context, points, scale } = artClass.fern.data;

        // Black background
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the points
        context.fillStyle = '#fff';
        points.forEach(location => {
            context.fillRect(location[0], location[1], scale, scale);
        })
    },
}

module.exports = barnsleyFern;
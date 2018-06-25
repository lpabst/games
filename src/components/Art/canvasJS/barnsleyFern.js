/* 
I got this wonderful map function off of stackoverflow:
https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
 */
function map(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const barnsleyFern = {
    init: function (artClass) {

        let canvas = document.getElementById('fernCanvas');
        let context = canvas.getContext('2d');
        let animationFrame = 0;

        let points = [[0, 0]];
        let mappedPoints = [[300, 600]];
        let scale = 2;
        let updateSpeed = 50;

        artClass.fern = {};
        artClass.fern.data = { canvas, context, animationFrame, points, mappedPoints, scale, updateSpeed };

        barnsleyFern.run(artClass);
    },

    run: function (artClass) {
        let { updateSpeed } = artClass.fern.data;

        function loop() {
            for (let i = 0; i < updateSpeed; i++){
                barnsleyFern.update(artClass);
            }
            barnsleyFern.render(artClass);
            window.requestAnimationFrame(loop);
        }

        loop();
    },

    update: function (artClass) {
        let { canvas, points } = artClass.fern.data;

        if (points.length > 5000) return;
        
        let x = points[points.length - 1][0];
        let y = points[points.length - 1][1];
        let nextX, nextY, mappedX, mappedY;
        let rand = Math.random();

        if (rand < 0.01) {
            nextX = 0;
            nextY = 0.16 * y;
        } else if (rand < 0.86) {
            nextX = 0.85 * x + 0.04 * y;
            nextY = -0.04 * x + 0.85 * y + 1.6
        } else if (rand < 0.93) {
            nextX = 0.2 * x - 0.26 * y;
            nextY = 0.23 * x + 0.22 * y + 1.6;
        } else {
            nextX = -0.15 * x + 0.28 * y;
            nextY = 0.26 * x + 0.24 * y + 0.44;
        }

        // map the points to the size of the canvas here
        mappedX = map(x, -2.1820, 2.6558, 0, canvas.width);
        mappedY = map(y, 0, 9.9983, canvas.height, 0);

        artClass.fern.data.mappedPoints.push([mappedX, mappedY]);
        artClass.fern.data.points.push([nextX, nextY]);
    },

    render: function (artClass) {
        let { canvas, context, mappedPoints, scale } = artClass.fern.data;

        // Black background
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the mapped points
        context.fillStyle = '#fff';
        mappedPoints.forEach(location => {
            context.fillRect(location[0], location[1], scale, scale);
        })
    },
}

module.exports = barnsleyFern;

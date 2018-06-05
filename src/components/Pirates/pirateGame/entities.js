let entities = {
    Ship: () => {
        this.health = 100;
        this.shield = 2;
    },

    Word: (x, y) => {
        this.x = x;
        this.y = y;
        this.timeCreated = new Date().getTime();
        this.word = 'hello';
    },
}

export default entities;
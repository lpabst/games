let entities = {
    Ship: function(health, shield) {
        console.log(this);
        this.health = health;
        this.shield = shield;
    },

    Word: function(x, y) {
        this.x = x;
        this.y = y;
        this.timeCreated = new Date().getTime();
        this.word = 'hello';
    },
}

export default entities;
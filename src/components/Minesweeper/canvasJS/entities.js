let entities = {
    Cell: function(){
        this.isBomb = false;
        this.neighboringBombs = 0;
        this.visible = false;
        this.suspect = false;
    },
}

export default entities;
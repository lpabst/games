let entities = {
    Cell: function(){
        this.isBomb = false;
        this.isVisible = false;
        this.isSuspect = false;
        this.neighboringBombs = 0;
    },
}

export default entities;
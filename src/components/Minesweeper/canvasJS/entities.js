let entities = {
    Cell: function(){
        this.isBomb = false;
        this.neighboringBombs = 0;
        this.visible = false;
        this.suspect = false;

        this.click = function(){
            if (this.visible) return;
            if (!this.suspect){
                this.reveal();
            }
        }

        this.reveal = function(){
            this.visible = true;
        }
    },
}

export default entities;
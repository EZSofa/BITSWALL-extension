class Brick {
    constructor(source) {

    }
}

class BrickTemplate {
    constructor(source) {
        this.title = source.title;
        this.description = source.description;
        this.image = source.image;
        this.createTime = source.createTime;

        if (source.bricks) {
            this.bricks = source.bricks.map((brick) => new Brick(brick));
        } else {
            this.bricks = []
        }
    }
}
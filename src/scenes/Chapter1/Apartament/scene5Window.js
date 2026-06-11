export class Chapter1ApartamentScene5Window extends Phaser.Scene {
    constructor() {
        super({ key: 'Chapter1ApartamentScene5Window'})
    }

    create() {
        this.add.image(500, 400, 'C1AS5_look')
    }
}
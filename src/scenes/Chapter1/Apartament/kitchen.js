

export class Kitchen extends Phaser.Scene {
    constructor() {
        super({ key: 'kitchen'})
    }

    create() {
        
        this.add.image(300, 250, 'kitchen')
        this.add.image(300, 600, 'placeholder')
    }
}
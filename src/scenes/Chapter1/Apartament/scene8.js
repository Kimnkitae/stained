export class Chapter1End extends Phaser.Scene {
    constructor() {
        super({ key: 'Chapter1End'})
    }

    create() {
        this.add.image(300, 600, 'placeholder')
        this.textObject = this.add.bitmapText(65, 520, 'W95FA', 'to be contiuned..', 32)
        // Получаем значение, и если его нет (undefined), берем 0
        let score = this.registry.get('karma')

        score += 1

        this.registry.set('karma', score)
        console.log(this.registry.get('karma'))

    }
}
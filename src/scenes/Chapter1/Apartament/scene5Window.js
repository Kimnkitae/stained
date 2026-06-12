import NextText from '../../../utils/texts/nextText.js'

export class Chapter1ApartamentScene5Window extends Phaser.Scene {
    constructor() {
        super({ key: 'Chapter1ApartamentScene5Window'})
    }

    create() {
        this.add.image(500, 400, 'C1AS5_look')
        const jsonText = this.cache.json.get('chapter1Scene1')
        this.add.image(300, 600, 'placeholder')
        const tex = jsonText.apartament.scene1.night.room.firstLine
                
        this.nextTex = new NextText(this, tex, () => {
            this.scene.start('Chapter1ApartamentScene6')
        })
    }
}
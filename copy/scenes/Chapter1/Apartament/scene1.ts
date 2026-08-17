import Phaser from 'phaser'

import NextText from '../../../utils/texts/nextText.ts'

export class Chapter1ApartamentScene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Chapter1ApartamentScene1'})
    }

    preload() 
    {
        this.load.json('chapter1', 'assets/texts/chapter1.json')
    }

    create()
    {
        this.add.image(500, 200, 'C1AS1_street')
        this.add.image(150, 200, 'C1AS1_player-sleep')  
        this.add.image(300, 600, 'placeholder')
        const jsonText = this.cache.json.get('chapter1Scene1')
        
        new NextText(this, jsonText.apartament.scene1.street.firstLine, () => {
            this.scene.start('Chapter1ApartamentScene2')
        })
        
        
        
    }  
}
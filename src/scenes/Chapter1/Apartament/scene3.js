import BaseApartamentScene from './apartament.js'

export class Chapter1ApartamentScene3 extends BaseApartamentScene {
    constructor() {
        super({ key: 'Chapter1ApartamentScene3'})
    }

    create() {
        super.create()
        super.initPlayer(510, 130)

        this.add.image(300, 600, 'placeholder')
        this.add.image(300, 600, 'placeholder')
    }

}
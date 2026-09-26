import Chapter1BaseApartamentScene from '../../BaseScenes/apartament'

export default class Chapter1apartamentScene1 extends Chapter1BaseApartamentScene {
    constructor() {
        super({key: 'Chapter1apartamentScene1'})
    }

    create() {

        this.add.image(100, 200, 'chapter1apartament',)
    }
}
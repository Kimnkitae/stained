import Chapter1BaseApartamentScene from '../../BaseScenes/apartament'
import Player from '../../../utils/player/player.ts'

export default class Chapter1apartamentScene1 extends Chapter1BaseApartamentScene {

    player!: Player

    constructor() {
        super({key: 'Chapter1apartamentScene1'})
    }

    create() {

        this.add.image(500, 500, 'chapter1apartament')

        super.create()
        
        this.player = new Player(this)
        
        this.player.create(505, 330)
        
        this.add.existing(this.player.sprite)
    }

    update() {
        this.player.update()

    
    }
}
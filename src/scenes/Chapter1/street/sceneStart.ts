import Phaser from 'phaser'
import Chapter1BaseStreetScene from '../../BaseScenes/street.ts'
import Player from '../../../utils/player/player.ts'

export default class Chapter1streetSceneStart extends Chapter1BaseStreetScene {
    player!: Player
    
    constructor() {
        super(
            {key: 'Chapter1streetSceneStart'}
        )
    }

    create() {

        

        super.create()
        this.player = new Player(this)
        this.player.create(270, 300)
        this.add.existing(this.player.sprite)

        
        
    }

    update() {
        this.player.update()
    }
}
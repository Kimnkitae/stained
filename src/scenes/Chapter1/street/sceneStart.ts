import Phaser from 'phaser'
import Chapter1BaseStreetScene from '../../BaseScenes/street.ts'
import Player from '../../../utils/player/player.ts'
export default class Chapter1streetSceneStart extends Chapter1BaseStreetScene {
    constructor() {
        super(
            {key: 'Chapter1streetSceneStart'}
        )
    }

    create() {
        super.create()
        const player = new Player(this)
        player.create(270, 300)
        this.add.existing(player.sprite)
    }
}
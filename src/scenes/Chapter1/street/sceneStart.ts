import Phaser from 'phaser'
import Chapter1BaseStreetScene from './street.ts'
import Player from '../../../utils/player/player.ts'
export default class Chapter1streetSceneStart extends Chapter1BaseStreetScene {
    constructor() {
        super(
            {key: 'Chapter1streetSceneStart'}
        )
    }

    create() {
        console.log('Chapter1streetSceneStart created')
        const player = new Player(this)
        player.create(100, 100)
        this.add.existing(player.sprite)
    }
}
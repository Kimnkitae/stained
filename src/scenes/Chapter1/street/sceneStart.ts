import Phaser from 'phaser'

export default class Chapter1streetSceneStart extends Phaser.Scene {
    constructor() {
        super(
            {key: 'Chapter1streetSceneStart'}
        )
    }

    create() {
        console.log('Chapter1streetSceneStart created')
    }
}
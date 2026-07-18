import Phaser from 'phaser'

export default class bootloader extends Phaser.Scene { 
    constructor() {
        super(
            {key: 'bootloader'}
        )
    }

    preload() {

    }


    create() {
        this.scene.start('Chapter1streetSceneStart')
    }

}
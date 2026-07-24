import Phaser from 'phaser'

export default class bootloader extends Phaser.Scene { 
    constructor() {
        super(
            {key: 'bootloader'}
        )
    }

    preload() {
        /* Player */
        this.load.spritesheet('player', 'assets/player/player.png',
            { frameWidth: 46,
              frameHeight: 64, 
            }
        )
        
    }


    create() {
        this.scene.start('Chapter1streetSceneStart')
    }

}
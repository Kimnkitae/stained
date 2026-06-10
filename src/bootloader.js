export default class Bootloader extends Phaser.Scene {
    constructor() {
        super({ key: 'bootloader'})
    }

    preload() {
        this.loadImages()
        this.loadSounds()
        this.loadTexts()
        this.loadPlayer()
        this.loadEffects()
    }

    loadImages() {

        /* Street */
        this.load.image('C1AS1_street', 'assets/street/street.png')
        this.load.image('C1AS1_bottom', 'assets/street/bottom.png')
        this.load.image('C1AS1_right', 'assets/street/right.png')
        this.load.image('C1AS1_top', 'assets/street/top.png')
        this.load.image('C1AS1_left', 'assets/street/left.png')
        this.load.image('C1AS1_trees', 'assets/street/trees.png')
        this.load.image('C1AS1_house', 'assets/street/house.png')
        this.load.image('C1AS1_chair', 'assets/street/chair.png')
        this.load.image('C1AS1_player-sleep', 'assets/player/player-sleep.png')
        this.load.image('placeholder', 'assets/holder-text/holder-text.png')

        /* Apartment */

        this.load.image('apartament', 'assets/apartament/apartament.png')
        this.load.image('C1AS3_bottomWall', 'assets/apartament/BottomWall.png')
        this.load.image('C1AS3_topWall', 'assets/apartament/TopWall.png')
        this.load.image('C1AS3_leftWall', 'assets/apartament/LeftWall.png')
        this.load.image('C1AS3_room', 'assets/apartament/openRoom.png')
        this.load.image('C1AS3_kitchen', 'assets/apartament/openKitchen.png')
        this.load.image('C1AS3_tv', 'assets/apartament/TV.png')
        this.load.image('C1AS3_chair', 'assets/apartament/chair.png')
        this.load.image('C1AS3_exit', 'assets/apartament/exit.png')

        /* room */

        this.load.image('room', 'assets/room/room.png')
        this.load.image('C1AS4_door', 'assets/room/door.png')
        this.load.image('C1AS4_leftWall', 'assets/room/leftWall.png')
        this.load.image('C1AS4_topWall', 'assets/room/topWall.png')
        this.load.image('C1AS4_windows', 'assets/room/windows.png')
        this.load.image('C1AS4_bed', 'assets/room/bed.png')

        /* kitchen */

        this.load.image('kitchen', 'assets/kitchen/kitchen.png')
        this.load.image('kitchen-door', 'assets/kitchen/door.png')
        this.load.image('kitchen-furniture', 'assets/kitchen/furniture.png')
        this.load.image('kitchen-fridge', 'assets/kitchen/fridge.png')
        this.load.image('kitchen-leftWall', 'assets/kitchen/leftWall.png')
        this.load.image('kitchen-topWall', 'assets/kitchen/topWall.png')
        

    }

    loadSounds() {
        this.load.audio('theme', 'assets/sounds/theme.wav', { loop: true})
    }

    loadTexts() {
        this.load.bitmapFont('W95FA', 'assets/fonts/W95FA.png', 'assets/fonts/W95FA.fnt')
        this.load.json('chapter1Scene1', "assets/texts/chapter1.json")
    }


    loadPlayer() {
        this.load.spritesheet('player', 'assets/player.png', {
            frameWidth: 46,
            frameHeight: 64,
        })
    }

    loadEffects() {
        this.load.image('effect-e', 'assets/effects/circle.png')
    }
    
    create() {
        this.scene.start('Chapter1ApartamentScene1')
    }
}
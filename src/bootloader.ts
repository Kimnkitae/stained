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

        /* Chapter1 */

        this.load.image('chapter1street', 'Chapter1/assets/street/street.png')
        this.load.image('chapter1streetLeftWall', 'Chapter1/assets/street/leftWall.png')
        this.load.image('chapter1streetTopWall', 'Chapter1/assets/street/topWall.png')
        this.load.image('chapter1streetTrees', 'Chapter1/assets/street/trees.png')
        this.load.image('chapter1streetChair', 'Chapter1/assets/street/chair.png')
        this.load.image('chapter1streetHouse', 'Chapter1/assets/street/house.png')

        this.load.image('chapter1apartament', 'Chapter1/assets/apartament/apartament.png')
        this.load.image('chapter1apartamentLeftWall', 'Chapter1/assets/apartament/leftWall.png')
        this.load.image('chapter1apartamentTopWall', 'Chapter1/assets/apartament/topWall.png')
        this.load.image('chapter1apartamentBottomWall', 'Chapter1/assets/apartament/bottomWall.png')
        this.load.image('chapter1apartamentChair', 'Chapter1/assets/apartament/chair.png')
        this.load.image('chapter1apartamentTV', 'Chapter1/assets/apartament/TV.png')
        this.load.image('chapter1apartamentDoorToKitchen', 'Chapter1/assets/apartament/doorToKitchen.png')
        this.load.image('chapter1apartamentDoorToStreet', 'Chapter1/assets/apartament/doorToStreet.png')
        this.load.image('chapter1apartamentDoorToRoom', 'Chapter1/assets/apartament/doorToRoom.png')

        this.load.image('chapter1kitchen', 'Chapter1/assets/kitchen/kitchen.png')
        this.load.image('chapter1kitchenLeftWall', 'Chapter1/assets/kitchen/leftWall.png')
        this.load.image('chapter1kitchenTopWall', 'Chapter1/assets/kitchen/topWall.png')
        this.load.image('chapter1kitchenFurniture', 'Chapter1/assets/kitchen/furniture.png')
        this.load.image('chapter1kitchenFridge', 'Chapter1/assets/kitchen/fridge.png')
        this.load.image('chapter1kitchenDoorToRoom', 'Chapter1/assets/kitchen/doorToRoom.png')
        
        this.load.image('chapter1room', 'Chapter1/assets/room/room.png')
        this.load.image('chapter1roomLeftWall', 'Chapter1/assets/room/leftWall.png')
        this.load.image('chapter1roomTopWall', 'Chapter1/assets/room/topWall.png')
        this.load.image('chapter1roomDoorToRoom', 'Chapter1/assets/room/doorToRoom.png')
        this.load.image('chapter1roomBed', 'Chapter1/assets/room/bed.png')
        this.load.image('chapter1roomWindows', 'Chapter1/assets/room/windows.png')

        this.load.image('chapter1bathroom', 'Chapter1/assets/bathroom/bathroom.png')
    }


    create() {
        this.scene.start('Chapter1streetSceneStart')
    }

}
import Phaser from 'phaser'

export default class bootloader extends Phaser.Scene { 
    constructor() {
        super(
            {key: 'bootloader'}
        )
    }

    preload() {
        /* text */
        this.load.image('holderText', 'assets/holder-text/holder-text.png')
        this.load.json('chapter1', 'src/dialogues/chapter1/dialogues.json')


        /* Player */

        this.load.spritesheet('player', 'assets/player/player.png',
            { frameWidth: 46,
              frameHeight: 64, 
            }
        )

        /* Chapter1 */

        this.load.image('chapter1street', 'assets/chapter1/street/street.png')
        this.load.image('chapter1streetLeftWall', 'assets/chapter1/street/leftWall.png')
        this.load.image('chapter1streetTopWall', 'assets/chapter1/street/topWall.png')
        this.load.image('chapter1streetBottomWall', 'assets/chapter1/street/bottomWall.png')
        this.load.image('chapter1streetRightWall', 'assets/chapter1/street/rightWall.png')
        this.load.image('chapter1streetTrees', 'assets/chapter1/street/trees.png')
        this.load.image('chapter1streetBench', 'assets/chapter1/street/bench.png')
        this.load.image('chapter1streetHouse', 'assets/chapter1/street/house.png')

        this.load.image('chapter1apartament', 'assets/chapter1/apartament/apartament.png')
        this.load.image('chapter1apartamentLeftWall', 'assets/chapter1/apartament/leftWall.png')
        this.load.image('chapter1apartamentTopWall', 'assets/chapter1/apartament/topWall.png')
        this.load.image('chapter1apartamentBottomWall', 'assets/chapter1/apartament/bottomWall.png')
        this.load.image('chapter1apartamentChair', 'assets/chapter1/apartament/chair.png')
        this.load.image('chapter1apartamentTV', 'assets/chapter1/apartament/TV.png')
        this.load.image('chapter1apartamentDoorToKitchen', 'assets/chapter1/apartament/doorToKitchen.png')
        this.load.image('chapter1apartamentDoorToStreet', 'assets/chapter1/apartament/doorToStreet.png')
        this.load.image('chapter1apartamentDoorToRoom', 'assets/chapter1/apartament/doorToRoom.png')

        this.load.image('chapter1kitchen', 'assets/chapter1/kitchen/kitchen.png')
        this.load.image('chapter1kitchenLeftWall', 'assets/chapter1/kitchen/leftWall.png')
        this.load.image('chapter1kitchenTopWall', 'assets/chapter1/kitchen/topWall.png')
        this.load.image('chapter1kitchenFurniture', 'assets/chapter1/kitchen/furniture.png')
        this.load.image('chapter1kitchenFridge', 'assets/chapter1/kitchen/fridge.png')
        this.load.image('chapter1kitchenDoorToRoom', 'assets/chapter1/kitchen/doorToRoom.png')
        
        this.load.image('chapter1room', 'assets/chapter1/room/room.png')
        this.load.image('chapter1roomLeftWall', 'assets/chapter1/room/leftWall.png')
        this.load.image('chapter1roomTopWall', 'assets/chapter1/room/topWall.png')
        this.load.image('chapter1roomDoorToApartment', 'assets/chapter1/room/doorToApartment.png')
        this.load.image('chapter1roomBed', 'assets/chapter1/room/bed.png')
        this.load.image('chapter1roomWindows', 'assets/chapter1/room/windows.png')

        this.load.image('chapter1bathroom', 'assets/chapter1/bathroom/bathroom.png')
        this.load.image('chapter1bathroomLeftWall', 'assets/chapter1/bathroom/leftWall.png')
        this.load.image('chapter1bathroomTopWall', 'assets/chapter1/bathroom/topWall.png')
        this.load.image('chapter1bathroomRightWall', 'assets/chapter1/bathroom/rightWall.png')
        this.load.image('chapter1bathroomBottomWall', 'assets/chapter1/bathroom/bottomWall.png')
        this.load.image('chapter1bathroomDoorToApartment', 'assets/chapter1/bathroom/doorToApartment.png')
        this.load.image('chapter1bathroomVanityTable', 'assets/chapter1/bathroom/vanityTable.png')
        this.load.image('chapter1bathroomToilet', 'assets/chapter1/bathroom/toilet.png')
        this.load.image('chapter1bathroomShower', 'assets/chapter1/bathroom/shower.png')
        this.load.image('chapter1bathroomWashingMachine', 'assets/chapter1/bathroom/washing-machine.png')

        /* Chapter2 */

        
    }


    create() {
        this.scene.start('Chapter1streetSceneStart')
    }

}
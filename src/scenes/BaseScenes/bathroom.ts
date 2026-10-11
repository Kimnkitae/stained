import Phaser from 'phaser'
import NextText from '../../utils/texts/NextText'
import Choose from '../../utils/choose/choose'

export default class Chapter1BaseBathroomScene extends Phaser.Scene {
    walls!: Phaser.Physics.Arcade.StaticGroup
    doors!: Phaser.Physics.Arcade.StaticGroup
    colliders!: Phaser.Physics.Arcade.StaticGroup[]
    furniture!: Phaser.Physics.Arcade.StaticGroup

    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        super(config)
    }

    create() {
        this.walls = this.physics.add.staticGroup()
        this.doors = this.physics.add.staticGroup()
        this.furniture = this.physics.add.staticGroup()

        this.add.image(500, 300, 'chapter1bathroom')

        this.walls.create(330, 300, 'chapter1bathroomLeftWall')
        this.walls.create(670, 300, 'chapter1bathroomLeftWall')
        this.walls.create(500, 130, 'chapter1bathroomTopWall')
        this.walls.create(500, 470, 'chapter1bathroomTopWall')

        
        this.doors.create(336, 425, 'chapter1bathroomDoorToApartament')

        this.furniture.create(355, 160, 'chapter1bathroomToilet')
        this.furniture.create(625, 413, 'chapter1bathroomShower')
        this.furniture.create(575, 443, 'chapter1bathroomWashingMachine')
        this.furniture.create(520, 165, 'chapter1bathroomVanityTable')

        

        this.colliders = [
            this.walls,
            this.doors,
            this.furniture
        ]
    }

    addColliders(player: Phaser.GameObjects.GameObject,
         onDialogueStart: () => void,
        onDialogueEnd: () => void
    ) {
        this.physics.add.collider(player, this.colliders)
    }


}
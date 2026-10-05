import Phaser from 'phaser'
import NextText from '../../utils/texts/NextText'
import Choose from '../../utils/choose/choose'

export default class Chapter1BaseKitchenScene extends Phaser.Scene {
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

        this.add.image(500, 300, 'chapter1kitchen')

        this.walls.create(305, 300, 'chapter1kitchenLeftWall')
        this.walls.create(695, 300, 'chapter1kitchenLeftWall')
        this.walls.create(500, 495, 'chapter1kitchenTopWall')
        this.walls.create(500, 105, 'chapter1kitchenTopWall')

        
        this.doors.create(312, 360, 'chapter1kitchenDoorToRoom')

        this.furniture.create(447, 148, 'chapter1kitchenFurniture')
        this.furniture.create(602, 147, 'chapter1kitchenFridge')

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
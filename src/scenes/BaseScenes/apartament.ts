import Phaser from 'phaser'
import NextText from '../../utils/texts/NextText'
import Choose from '../../utils/choose/choose'

export default class Chapter1BaseApartamentScene extends Phaser.Scene {
    walls!: Phaser.Physics.Arcade.StaticGroup
    doors!: Phaser.Physics.Arcade.StaticGroup
    furniture!: Phaser.Physics.Arcade.StaticGroup

    colliders!: Phaser.Physics.Arcade.StaticGroup[]

    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        super(config)
    }

    create() {
        this.walls = this.physics.add.staticGroup()
        this.doors = this.physics.add.staticGroup()
        this.furniture = this.physics.add.staticGroup()
        
        this.add.image(500, 505, 'chapter1apartament')

        this.walls.create(135, 420, 'chapter1apartamentLeftWall')
        this.walls.create(910, 420, 'chapter1apartamentLeftWall')
        this.walls.create(523, 626, 'chapter1apartamentBottomWall')
        this.walls.create(521, 244, 'chapter1apartamentTopWall')

        this.doors.create(903, 365, 'chapter1apartamentDoorToKitchen')
        this.doors.create(509, 283, 'chapter1apartamentDoorToStreet')
        this.doors.create(903, 560, 'chapter1apartamentDoorToBathroom')
        this.doors.create(750, 619, 'chapter1apartamentDoorToBalcony')
        this.doors.create(190, 285, 'chapter1apartamentDoorToRoom')

        this.furniture.create(235, 487, 'chapter1apartamentChair')
        this.furniture.create(235, 555, 'chapter1apartamentTV')

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
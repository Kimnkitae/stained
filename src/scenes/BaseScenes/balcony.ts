import Phaser from 'phaser'


export default class Chapter1BaseBalconyScene extends Phaser.Scene {
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

        this.add.image(500, 300, 'chapter1balcony')

        this.walls.create(305, 300, 'chapter1balconyLeftWall')
        this.walls.create(695, 300, 'chapter1balconyLeftWall')
        this.walls.create(500, 345, 'chapter1balconyTopWall')
        this.walls.create(500, 255, 'chapter1balconyTopWall')

        
        this.doors.create(627, 261, 'chapter1balconyDoorToApartament')

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
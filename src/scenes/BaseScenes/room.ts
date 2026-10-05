import Phaser from 'phaser'


export default class Chapter1BaseRoomScene extends Phaser.Scene {
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

        this.add.image(500, 300, 'chapter1room')

        this.walls.create(352, 300, 'chapter1roomLeftWall')
        this.walls.create(647, 300, 'chapter1roomLeftWall')
        this.walls.create(500, 75, 'chapter1roomTopWall')
        this.walls.create(500, 527, 'chapter1roomTopWall')

        
        this.doors.create(415, 517, 'chapter1roomDoorToApartament')

        this.furniture.create(568, 210, 'chapter1roomBed')
        this.furniture.create(478, 95, 'chapter1roomWindows')

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
import Phaser from 'phaser'

export default class Chapter1BaseStreetScene extends Phaser.Scene {
    spacebar!: Phaser.Input.Keyboard.Key
    house!: Phaser.Physics.Arcade.StaticGroup
    walls!: Phaser.Physics.Arcade.StaticGroup
    chair!: Phaser.Physics.Arcade.StaticGroup
    trees!: Phaser.Physics.Arcade.StaticGroup


    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        super(config)
    } 

    create() {
        this.spacebar = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.add.image(0, 0, 'chapter1street').setOrigin(-0.2, -0.2)

        this.house = this.physics.add.staticGroup()
        this.walls = this.physics.add.staticGroup()
        this.chair = this.physics.add.staticGroup()
        this.trees = this.physics.add.staticGroup()

        this.walls.create(0, 0, 'leftWall').setOrigin(0, 0).refreshBody()
    }
}
import Phaser from 'phaser'

export default class Chapter1BaseStreetScene extends Phaser.Scene {
    spacebar!: Phaser.Input.Keyboard.Key
    house!: Phaser.Physics.Arcade.StaticGroup
    walls!: Phaser.Physics.Arcade.StaticGroup
    bench!: Phaser.Physics.Arcade.StaticGroup
    trees!: Phaser.Physics.Arcade.StaticGroup


    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        super(config)
    } 

    create() {
        this.spacebar = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.add.image(0, 0, 'chapter1street').setOrigin(-0.2, -0.2)

        this.house = this.physics.add.staticGroup()
        this.walls = this.physics.add.staticGroup()
        this.bench = this.physics.add.staticGroup()
        this.trees = this.physics.add.staticGroup()

        this.walls.create(0, 0, 'chapter1streetLeftWall')
        this.walls.create(0, 0, 'chapter1streetTopWall')
        this.walls.create(0, 0, 'chapter1streetRightWall')
        this.walls.create(0, 0, 'chapter1streetBottomWall')

        this.trees.create(0, 0, 'chapter1streetTrees')
        this.house.create(0, 0, 'chapter1streetHouse')
        this.bench.create(0, 0, 'chapter1streetBench')
    }
}
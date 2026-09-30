import Phaser from 'phaser'
import NextText from '../../utils/texts/NextText'
import Choose from '../../utils/choose/choose'

export default class Chapter1BaseApartamentScene extends Phaser.Scene {
    walls!: Phaser.Physics.Arcade.StaticGroup
    doors!: Phaser.Physics.Arcade.StaticGroup

    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        super(config)
    }

    create() {
        this.walls = this.physics.add.staticGroup()
        this.doors = this.physics.add.staticGroup()
        

        this.walls.create(135, 415, 'chapter1apartamentLeftWall')
        this.walls.create(910, 415, 'chapter1apartamentLeftWall')
        this.walls.create(523, 625, 'chapter1apartamentBottomWall')
        this.walls.create(521, 241, 'chapter1apartamentTopWall')
    }
}
import Phaser from 'phaser'
import Player from '../../utils/player/player'


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

    
        this.walls.create(179, 0, 'chapter1streetLeftWall').setOrigin(-0.2, -0.2)
        this.walls.create(92, 65, 'chapter1streetTopWall').setOrigin(-0.2, -0.2)
        this.walls.create(615, 0, 'chapter1streetRightWall').setOrigin(-0.2, -0.2)
        this.walls.create(92, 418, 'chapter1streetBottomWall').setOrigin(-0.2, -0.2)
        this.trees.create(160, 52, 'chapter1streetTrees').setOrigin(-0.2, -0.2).setData('textKey', 'trees')
        this.house.create(120, 372, 'chapter1streetHouse').setOrigin(-0.2, -0.2).setData('textKey', 'house')
        this.bench.create(210, 216, 'chapter1streetBench').setOrigin(-0.2, -0.2).setData('textKey', 'bench')


        
        
    }
}
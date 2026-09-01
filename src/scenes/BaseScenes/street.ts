import Phaser from 'phaser'
import NextText from '../../utils/texts/NextText'


export default class Chapter1BaseStreetScene extends Phaser.Scene {
    spacebar!: Phaser.Input.Keyboard.Key
    house!: Phaser.Physics.Arcade.StaticGroup
    walls!: Phaser.Physics.Arcade.StaticGroup
    bench!: Phaser.Physics.Arcade.StaticGroup
    trees!: Phaser.Physics.Arcade.StaticGroup
    colliders!: Phaser.Physics.Arcade.StaticGroup[]
    jsonTexts!: any
    streetTexts!: any
    text!: NextText
    collidedObj!: Phaser.GameObjects.GameObject
    

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

    
        this.walls.create(179, 0, 'chapter1streetLeftWall').setOrigin(-0.2, -0.2).refreshBody()
        this.walls.create(92, 65, 'chapter1streetTopWall').setOrigin(-0.2, -0.2).refreshBody()
        this.walls.create(615, 0, 'chapter1streetRightWall').setOrigin(-0.2, -0.2).refreshBody()
        this.walls.create(92, 418, 'chapter1streetBottomWall').setOrigin(-0.2, -0.2).refreshBody()
        this.trees.create(160, 52, 'chapter1streetTrees').setOrigin(-0.2, -0.2).refreshBody().setData('textKey', 'trees')
        this.house.create(120, 372, 'chapter1streetHouse').setOrigin(-0.2, -0.2).refreshBody().setData('textKey', 'house')
        this.bench.create(210, 216, 'chapter1streetBench').setOrigin(-0.2, -0.2).refreshBody().setData('textKey', 'bench')

        this.colliders = [this.walls, this.trees, this.house, this.bench]

        

        const jsonTexts = this.cache.json.get('chapter1') as any
        this.streetTexts = jsonTexts.street
    }

    addColliders(colliderObject: Phaser.GameObjects.GameObject) {
        this.physics.add.collider(colliderObject, this.colliders, (player, collidedObj) => {
            const sprite = collidedObj as Phaser.Physics.Arcade.Sprite;
            if(this.spacebar.isDown) {
                if(this.walls.contains(sprite)) {} else {
                    if (!this.text) {
                        this.text = new NextText(this)
                            
                        this.text.create(400, 600, this.streetTexts[sprite.getData('textKey')].text)
                    } else {
                        this.text.nextString()
                    }
                }
                
            }

        })
    }

    update() {

    }
}
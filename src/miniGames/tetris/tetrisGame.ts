import Phaser from 'phaser'
import { randomInt } from '../../utils/functions/randomInt.ts'
export default class TetrisGame extends Phaser.Scene {
    blocks!: Phaser.Physics.Arcade.Group
    walls!: Phaser.Physics.Arcade.Group
    blockTypes!: string[]
    currentBlock!: Phaser.GameObjects.Sprite
    nextBlock: boolean = false
    fall: boolean = false
    lengthOfBlocks: number = 0
    cursors!: any
    
    constructor() {
        super({key: 'TetrisGame'})
    }

    create() {
        this.blocks = this.physics.add.group()
        this.walls = this.physics.add.staticGroup()

        this.add.existing(this.walls)
        this.add.existing(this.blocks)
        this.walls.create(650, 705, 'tetrisTopWall')
        this.walls.create(395, 200, 'tetrisLeftWall')
        this.walls.create(905, 200, 'tetrisLeftWall')

        this.add.image(650, 200, 'tetrisBackground').setOrigin(0.5, 0.5)
        

        this.blockTypes = ['i-block', 'j-block', 'l-block', 'o-block', 's-block', 't-block', 'z-block']

        this.currentBlock = this.blocks.create(610, 50, this.blockTypes[randomInt(this.blockTypes.length)])

        this.fall = true

        this.physics.add.collider(this.blocks, this.blocks)
        this.physics.add.collider(this.blocks, this.walls)

        this.physics.world.gravity.y = 100

        
        this.input.keyboard!.on('keyup-LEFT', () => {
            this.currentBlock.x -= 50
        })

        this.input.keyboard!.on('keyup-RIGHT', () => {
            this.currentBlock.x += 50
        })

    }
    nextBlockSpawn() {
        this.currentBlock = this.blocks.create(610, 50, this.blockTypes[randomInt(this.blockTypes.length)])
        this.fall = true
    }

    

    update() {
        const body = this.currentBlock.body as Phaser.Physics.Arcade.Body
        if (this.fall && (body.touching.down || body.blocked.down)) {
            if(this.currentBlock)
            this.fall = false
            this.nextBlockSpawn()
        }
    }
}
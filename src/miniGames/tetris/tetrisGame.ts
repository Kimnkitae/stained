import Phaser from 'phaser'
import { randomInt } from '../../utils/functions/randomInt.ts'
export default class TetrisGame extends Phaser.Scene {
    blocks!: Phaser.Physics.Arcade.Group
    currentBlock!: Phaser.GameObjects.Sprite
    nextBlock: boolean = false
    fall: boolean = false
    
    constructor() {
        super({key: 'TetrisGame'})
    }

    create() {
        this.blocks = this.physics.add.group()

        this.add.image(650, 200, 'tetrisBackground').setOrigin(0.5, 0.5)
        /* this.blocks.create(100, 200, 'i-block')
        this.blocks.create(300, 200, 'j-block')
        this.blocks.create(500, 200, 'l-block')
        this.blocks.create(700, 200, 'o-block')
        this.blocks.create(100, 500, 's-block')
        this.blocks.create(300, 500, 't-block')
        this.blocks.create(500, 500, 'z-block') */
       /*  setInterval(() => {
            const blockTypes = ['i-block', 'j-block', 'l-block', 'o-block', 's-block', 't-block', 'z-block']
            const randomBlockType = blockTypes[randomInt(blockTypes.length)]
            
            this.blocks.create(625, 0, randomBlockType)
        }, 1000) */

        this.blockTypes = ['i-block', 'j-block', 'l-block', 'o-block', 's-block', 't-block', 'z-block']

        this.currentBlock = this.blocks.create(610, 50, this.blockTypes[randomInt(this.blockTypes.length)])

        this.fall = true

    }

    nextBlockSpawn() {
        this.currentBlock = this.blocks.create(610, 50, this.blockTypes[randomInt(this.blockTypes.length)])
        this.fall = true
    }

    update() {
        if(this.fall) {

            this.currentBlock.y += 3
        }

        if(this.currentBlock.y > 650) {
            this.fall = false
            this.currentBlock.y = 650
            this.nextBlockSpawn()
        }

    }


    


}
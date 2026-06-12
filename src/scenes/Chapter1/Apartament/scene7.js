import Player from '../../../utils/player/player.js'
import NextText from '../../../utils/texts/nextText.js'
import Choose from '../../../utils/choose/Choose.js'

export class Chapter1ApartamentScene7 extends Phaser.Scene {
    constructor() {
        super({ key: 'Chapter1ApartamentScene7'})
         
    }

    create() { 
        const overlay = this.add.rectangle(
          this.scale.width / 2,
          this.scale.height / 2,
          this.scale.width,
          this.scale.height,
          0x000000,        
          0.5              
        )
        overlay.setDepth(100)
        this.add.image(300, 250, 'kitchen')
        this.add.image(300, 600, 'placeholder')
        this.walls = this.physics.add.staticGroup()
        this.furniture = this.physics.add.staticGroup()
        this.exit = this.physics.add.staticGroup()

        this.walls.create(300, 55, 'kitchen-topWall')
        this.walls.create(105, 250, 'kitchen-leftWall')
         
        this.walls.create(495, 250, 'kitchen-leftWall')
        this.walls.create(300, 445, 'kitchen-topWall')
        this.furniture.create(247, 97, 'kitchen-furniture').setData('textKey', 'knife')
        this.furniture.create(401, 97, 'kitchen-fridge').setData('textKey', 'fridge')
        this.exit.create(112, 310, 'kitchen-door').setData('textKey', 'exit')
         
        this.player = new Player(this, 250, 170)
        const jsonText = this.cache.json.get('chapter1Scene1')
        this.kitchenText = jsonText.apartament.scene1.night.kitchenNight
        this.isTextShowing = false
        this.nextText = null
        this.physics.add.collider(this.player.sprite, this.walls)

        this.physics.add.collider(this.player.sprite, this.exit, (player, collidedObj) => {
            if(this.isTextShowing) return
            this.isTextShowing = true
            this.player.isFrozen = true
            this.player.sprite.setVelocity(0)
            let currentKey = collidedObj.getData('textKey')
            const text = this.kitchenText[currentKey]
            this.nextText = new Choose(this, text, () => {
            this.isTextShowing = false
            this.player.isFrozen = false
            this.nextText = null
                }, () => {
                    this.scene.start('Chapter1ApartamentScene7Apartament', { spawnPoint: 'exit', from: 'kitchen' })
                })
        })

        this.physics.add.collider(this.player.sprite, this.fridge)

        this.physics.add.collider(this.player.sprite, this.furniture)
    }
    update() {
        if (this.player) this.player.update()
        if (this.isTextShowing && this.player && this.player.sprite.body.touching.none) {
            this.isTextShowing = false
            this.nextText = null
            
        }
    }
}
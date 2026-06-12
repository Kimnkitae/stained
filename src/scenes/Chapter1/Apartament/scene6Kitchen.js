import Player from '../../../utils/player/player.js'
import NextText from '../../../utils/texts/nextText.js'
import Choose from '../../../utils/choose/Choose.js'

export default class Chapter1ApartamentScene6Kitchen extends Phaser.Scene {
    constructor() {
        super({ key: 'Chapter1ApartamentScene6Kitchen'})
         
    }

    create() { 
        this.add.image(300, 250, 'kitchen')
        this.add.image(300, 600, 'placeholder')
        this.walls = this.physics.add.staticGroup()
        this.furniture = this.physics.add.staticGroup()
        this.exit = this.physics.add.staticGroup()

        this.walls.create(300, 55, 'kitchen-topWall')
        this.walls.create(105, 250, 'kitchen-leftWall')
         
        this.walls.create(495, 250, 'kitchen-leftWall')
        this.walls.create(300, 445, 'kitchen-topWall')
        this.furniture.create(247, 97, 'kitchen-furniture').setData('textKey', 'furnitureInteract')
        this.furniture.create(401, 97, 'kitchen-fridge').setData('textKey', 'fridge')
        this.exit.create(112, 310, 'kitchen-door').setData('textKey', 'exit')
         
    }

    initPlayer(x, y) {
        this.player = new Player(this, x, y)
        const jsonText = this.cache.json.get('chapter1Scene1')
        this.kitchenText = jsonText.apartament.scene1.kitchen
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
                    this.scene.start('Chapter1ApartamentScene3', { spawnPoint: 'exit', from: 'kitchen' })

                })
        })

        this.physics.add.collider(this.player.sprite, this.fridge, (player, collidedObj) => {
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
                    this.scene.start('kitchen')
                })
        })

        this.physics.add.collider(this.player.sprite, this.furniture, (player, collidedObj) => {
            if(this.isTextShowing) return
            this.isTextShowing = true
            this.player.isFrozen = true
            let currentKey = collidedObj.getData('textKey')
            const text = this.kitchenText[currentKey]
            this.nextText = new NextText(this, text, () => {
                this.isTextShowing = false
                this.player.isFrozen = false
                this.player.addMovements = true
                this.nextText = null
            }) 
        })

        
    }

    update() {
        if (this.player) this.player.update()
        if (this.isTextShowing && this.player && this.player.sprite.body.touching.none) {
            this.isTextShowing = false
            this.nextText = null
            
        }
    }
}
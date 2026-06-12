import Player from '../../../utils/player/player.js'
import NextText from '../../../utils/texts/nextText.js'
import Choose from '../../../utils/choose/Choose.js'

export class Chapter1ApartamentScene6Apartament extends Phaser.Scene {
    constructor() {
        super({ key: 'Chapter1ApartamentScene6Apartament'})
    }

    create(data) {
        const overlay = this.add.rectangle(
          this.scale.width / 2,
          this.scale.height / 2,
          this.scale.width,
          this.scale.height,
          0x000000,        
          0.5              
        )
        overlay.setDepth(100)

        

        this.add.image(500, 300, 'apartament')
        this.walls = this.physics.add.staticGroup()
        this.room = this.physics.add.staticGroup()
        this.kitchen = this.physics.add.staticGroup()
        this.furniture = this.physics.add.staticGroup()
        this.exit = this.physics.add.staticGroup()
        this.add.image(300, 600, 'placeholder')
        this.walls.create(521, 40, 'C1AS3_topWall')
        this.walls.create(135, 215, 'C1AS3_leftWall')
        this.walls.create(908, 215, 'C1AS3_leftWall')
        this.walls.create(521, 424, 'C1AS3_bottomWall')
        this.room.create(190, 80, 'C1AS3_room').setData('textKey', "enterToRoom")
        this.kitchen.create(902, 165, 'C1AS3_kitchen').setData('textKey', "enterToKitchen")
        this.furniture.create(235, 288, 'C1AS3_chair').setData('textKey', 'momInteract')
        this.furniture.create(235, 355, 'C1AS3_tv').setData('textKey', 'tvInteract')
        this.exit.create(509, 81, 'C1AS3_exit').setData('textKey', 'exit')
        this.player = new Player(this, 300, 200)
        
        if(data && data.spawnPoint === 'exit' && data.from == 'kitchen') {
            this.player.sprite.setPosition(850, 150)  
        }
        if(data && data.spawnPoint === 'exit' && data.from == 'room') {
            this.player.sprite.setPosition(180, 150)  
        }
        if(data && data.spawnPoint === 'exit' && data.from == 'street') {
            this.player.sprite.setPosition(510, 130) 
        }
    

    
    const jsonText = this.cache.json.get('chapter1Scene1')
    this.apartamentText = jsonText.apartament.scene1.apartament
    this.isTextShowing = false
    this.nextText = null
    this.physics.add.collider(this.player.sprite, this.walls)
    this.physics.add.collider(this.player.sprite, this.room, (player, collidedObj) => {
        if(this.isTextShowing) return
        this.isTextShowing = true
        this.player.isFrozen = true
        this.player.sprite.setVelocity(0)
        let currentKey = collidedObj.getData('textKey')
        const text = this.apartamentText[currentKey]
        this.nextText = new Choose(this, text, () => {
        this.isTextShowing = false
        this.player.isFrozen = false
        this.nextText = null
            }, () => {
                this.scene.start('Chapter1ApartamentScene6', { from: 'apartament', spawnPoint: 'exit'})
            })
    })
    this.physics.add.collider(this.player.sprite, this.exit, (player, collidedObj) => {
        if(this.isTextShowing) return
        this.isTextShowing = true
        this.player.isFrozen = true
        this.player.sprite.setVelocity(0)
        let currentKey = collidedObj.getData('textKey')
        const text = this.apartamentText[currentKey]
        this.nextText = new Choose(this, text, () => {
        this.isTextShowing = false
        this.player.isFrozen = false
        this.nextText = null
            }, () => {
                this.scene.start('Chapter1ApartamentScene2', { from: 'kitchen', spawnData: 'exit'})
            })
    })
    this.physics.add.collider(this.player.sprite, this.kitchen, (player, collidedObj) => {
        if(this.isTextShowing) return
        this.isTextShowing = true
        this.player.isFrozen = true
        this.player.sprite.setVelocity(0)
        let currentKey = collidedObj.getData('textKey')
        const text = this.apartamentText[currentKey]
        this.nextText = new Choose(this, text, () => {
        this.isTextShowing = false
        this.player.isFrozen = false
        this.nextText = null
            }, () => {
                this.scene.start('Chapter1ApartamentScene4Kitchen')
            })
    })
    this.physics.add.collider(this.player.sprite, this.furniture, (player, collidedObj) => {
        if(this.isTextShowing) return
        this.isTextShowing = true
        this.player.isFrozen = true
        let currentKey = collidedObj.getData('textKey')
        const text = this.apartamentText[currentKey]
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

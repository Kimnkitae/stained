import Player from '../../../utils/player/player.js'
import NextText from '../../../utils/texts/nextText.js'
import Choose from '../../../utils/choose/Choose.js'

export class Chapter1ApartamentScene6 extends Phaser.Scene {
    constructor() {
        super({ key: 'Chapter1ApartamentScene6'})
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
        this.add.image(500, 300, 'room')
        this.add.image(100, 600, 'placeholder')
        this.walls = this.physics.add.staticGroup()
        this.windows = this.physics.add.staticGroup()
        this.door = this.physics.add.staticGroup()
        this.bed = this.physics.add.staticGroup()
        

        this.walls.create(352, 300, 'C1AS4_leftWall')
        this.walls.create(647, 300, 'C1AS4_leftWall')
        this.walls.create(499, 74, 'C1AS4_topWall')
        this.walls.create(499, 526, 'C1AS4_topWall')

        this.door.create(415, 515, 'C1AS4_door').setData('textKey', 'roomExit')
        this.windows.create(478, 93, 'C1AS4_windows').setData('textKey', 'windows')
        this.bed.create(570, 212, 'C1AS4_bed').setData('textKey', 'sleepAndNothing')
        this.player = new Player(this, 470, 140)
        if(data && data.spawnPoint === 'exit' && data.from == 'apartament') {
            this.player.sprite.setPosition(420, 460)  
        }
        const jsonText = this.cache.json.get('chapter1Scene1')
        this.roomText = jsonText.apartament.scene1.night.room
        this.isTextShowing = false
        this.nextText = null
        this.physics.add.collider(this.player.sprite, this.walls)

        this.physics.add.collider(this.player.sprite, this.windows)

        this.physics.add.collider(this.player.sprite, this.door, (player, collidedObj) => {
            if(this.isTextShowing) return
            this.isTextShowing = true
            this.player.isFrozen = true
            this.player.sprite.setVelocity(0)
            let currentKey = collidedObj.getData('textKey')
            const text = this.roomText[currentKey]
            this.nextText = new Choose(this, text, () => {
                this.isTextShowing = false
                this.player.isFrozen = false
                this.nextText = null
            }, () => {
                this.scene.start('Chapter1ApartamentScene6Apartament', { from: 'room', spawnPoint: 'exit'})
            })
                                
        })

        this.physics.add.collider(this.player.sprite, this.bed, (player, collidedObj) => {
           if(this.isTextShowing) return
           this.isTextShowing = true
           this.player.isFrozen = true
           this.player.sprite.setVelocity(0)
           let currentKey = collidedObj.getData('textKey')
           const text = this.roomText[currentKey]
           this.nextText = new Choose(this, text, () => {
               this.isTextShowing = false
               this.player.isFrozen = false
               this.nextText = null
           }, () => {
               this.scene.start('Chapter1End')
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
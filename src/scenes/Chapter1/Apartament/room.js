import Player from '../../../utils/player/player.js'
import NextText from '../../../utils/texts/nextText.js'
import Choose from '../../../utils/choose/Choose.js'

export default class BaseRoomScene extends Phaser.Scene {
    constructor(config) {
        super(config)
    }

    create() {
        this.add.image(500, 300, 'room')
        this.walls = this.physics.add.staticGroup()
        this.windows = this.physics.add.staticGroup()
        this.door = this.physics.add.staticGroup()
        this.bed = this.physics.add.staticGroup()

        this.walls.create(352, 300, 'C1AS4_leftWall')
        this.walls.create(647, 300, 'C1AS4_leftWall')
        this.walls.create(499, 74, 'C1AS4_topWall')
        this.walls.create(499, 526, 'C1AS4_topWall')

        this.door.create(415, 515, 'C1AS4_door').setData('textKey', 'roomExit')
        this.windows.create(478, 93, 'C1AS4_windows')
        this.bed.create(570, 212, 'C1AS4_bed').setData('textKey', 'bedInteract')
        
    }

    initPlayer(x, y) {
        this.player = new Player(this, x, y)
        
        const jsonText = this.cache.json.get('chapter1Scene1')
        this.roomText = jsonText.apartament.scene1.room
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
                this.scene.start('Chapter1ApartamentScene3', { from: 'room', spawnPoint: 'exit'})
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
                this.scene.start('Chapter1ApartamentScene5')
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
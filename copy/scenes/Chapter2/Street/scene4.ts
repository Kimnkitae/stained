import Phaser from 'phaser'
import Player from '../../../utils/player/player.ts'
import Choose from '../../../utils/choose/Choose.ts'

export class Chapter2StreetScene4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Chapter2StreetScene4'})
    }

    create() {
       
        
        this.add.image(300, 300, 'street2BH')

        this.walls = this.physics.add.staticGroup()
        this.building = this.physics.add.staticGroup()
        this.nextScene = this.physics.add.staticGroup()

        this.walls.create(73, 300, 'street2LeftWall')
        this.walls.create(300, 213, 'street2TopWall')
        this.walls.create(300, 401, 'street2BottomWall')
        this.building.create(400, 223, 'street2BHBH').setData('textKey', 'enterToBrokenHouse')
        this.nextStreet = this.nextScene.create(527, 300, 'street2LeftWall')
        this.add.image(300, 600, 'placeholder')
        this.initPlayer(100, 300)
        this.interactSound = this.sound.add('interact')
        const overlay = this.add.rectangle(
          this.scale.width / 2,
          this.scale.height / 2,
          this.scale.width,
          this.scale.height,
          0x000000,        
          0.5              
        )
        overlay.setDepth(100)
    }

    initPlayer(x, y) {
                this.player = new Player(this, x, y)
                const jsonText = this.cache.json.get('chapter2')
                this.streetText = jsonText.street
                this.isTextShowing = false
                this.nextText = null
                this.physics.add.collider(this.player.sprite, this.walls)
               this.physics.add.collider(this.player.sprite, this.building, (player, collidedObj) => {
                    this.interactSound.play()
                    if(this.isTextShowing) return
                    this.isTextShowing = true
                    this.player.isFrozen = true
                    this.player.sprite.setVelocity(0)
                    let currentKey = collidedObj.getData('textKey')
                    const text = this.streetText[currentKey]
                    this.nextText = new Choose(this, text, () => {
                    this.isTextShowing = false
                    this.player.isFrozen = false
                    this.nextText = null
                        }, () => {
                            this.scene.start('Chapter2BHScene1')
                        })
                })
        
                this.physics.add.collider(this.player.sprite, this.nextStreet, (player, collidedObj) => {
                    
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
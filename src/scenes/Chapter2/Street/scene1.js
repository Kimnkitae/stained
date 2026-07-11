import Player from '../../../utils/player/player.js'
import NextText from '../../../utils/texts/nextText.js'
export class Chapter2StreetScene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Chapter2StreetScene1'})
    }

    create() {
       
        this.add.image(300, 300, 'street2')

        this.walls = this.physics.add.staticGroup()
        this.nextScene = this.physics.add.staticGroup()

        this.walls.create(73, 300, 'street2LeftWall')
        this.walls.create(300, 213, 'street2TopWall')
        this.walls.create(300, 401, 'street2BottomWall')
        this.nextStreet = this.nextScene.create(527, 300, 'street2LeftWall')
        this.add.image(300, 600, 'placeholder')
        this.initPlayer(100, 300)

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
                this.streetText = jsonText.street.firstLine
                this.isTextShowing = false
                this.nextText = null
                this.physics.add.collider(this.player.sprite, this.walls)
        
               
        
                this.physics.add.collider(this.player.sprite, this.nextStreet, (player, collidedObj) => {
                    if(this.isTextShowing) return
                    this.isTextShowing = true
                    this.player.isFrozen = true
                    this.player.sprite.setVelocity(0)
                    const text = this.streetText
                    this.nextText = new NextText(this, text, () => {
                    this.isTextShowing = false
                    this.player.isFrozen = false
                    this.nextText = null
                    this.scene.start('Chapter2StreetScene2')
                    
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
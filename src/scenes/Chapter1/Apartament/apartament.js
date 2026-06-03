import Player from '../../../utils/player/player.js'
import NextText from '../../../utils/texts/nextText.js'
import Choose from '../../../utils/choose/Choose.js'

export default class BaseApartamentScene extends Phaser.Scene {
    constructor(config) {
        super(config)
    }

    create() {
        this.add.image(500, 300, 'apartament')
        this.walls = this.physics.add.staticGroup()
        this.room = this.physics.add.staticGroup()
        this.kitchen = this.physics.add.staticGroup()
        this.furniture = this.physics.add.staticGroup()
        this.exit = this.physics.add.staticGroup()

        this.walls.create(521, 40, 'C1AS3_topWall')
        this.walls.create(135, 215, 'C1AS3_leftWall')
        this.walls.create(908, 215, 'C1AS3_leftWall')
        this.walls.create(521, 424, 'C1AS3_bottomWall')
        this.room.create(190, 80, 'C1AS3_room').setData('textKey', "enterToRoom")
        this.kitchen.create(902, 165, 'C1AS3_kitchen').setData('textKey', "enterToKitchen")
        this.furniture.create(235, 288, 'C1AS3_chair').setData('momInteract')
        this.furniture.create(235, 355, 'C1AS3_tv').setData('textKey', 'tvInteract')
        this.exit.create(509, 81, 'C1AS3_exit')
    }

    initPlayer(x, y) {
        this.player = new Player(this, x, y)

        this.isTextShowing = false
        this.nextText = null
        this.physics.add.collider(this.player.sprite, this.walls, () => {
            
        })

        this.physics.add.collider(this.player.sprite, this.room, () => {

        })

        this.physics.add.collider(this.player.sprite, this.kitchen, () => {

        })

        this.physics.add.collider(this.player.sprite, this.furniture, () => {

        })

        this.physics.add.collider(this.player.sprite, this.exit, () => {

        })
    }

    update() {
        if (this.player) this.player.update()
    }
}
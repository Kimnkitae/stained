import Phaser from 'phaser'
import NextText from '../../utils/texts/NextText'
import Choose from '../../utils/choose/Choose'

export default class Chapter1BaseApartamentScene extends Phaser.Scene {
    spacebar!: Phaser.Input.Keyboard.Key

    walls!: Phaser.Physics.Arcade.StaticGroup
    doors!: Phaser.Physics.Arcade.StaticGroup
    furniture!: Phaser.Physics.Arcade.StaticGroup

    colliders!: Phaser.Physics.Arcade.StaticGroup[]

    jsonTexts!: any
    apartamentTexts!: any

    text?: NextText
    choose?: Choose
    interactableObj?: Phaser.GameObjects.GameObject

    private inputLock = false

    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        super(config)
    }

    create() {
        this.spacebar = this.input.keyboard!.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        )

        this.walls = this.physics.add.staticGroup()
        this.doors = this.physics.add.staticGroup()
        this.furniture = this.physics.add.staticGroup()
        
        this.add.image(500, 505, 'chapter1apartament')

        this.walls.create(135, 420, 'chapter1apartamentLeftWall').refreshBody()
        this.walls.create(910, 420, 'chapter1apartamentLeftWall').refreshBody()
        this.walls.create(523, 626, 'chapter1apartamentBottomWall').refreshBody()
        this.walls.create(521, 244, 'chapter1apartamentTopWall').refreshBody()

        this.doors.create(902, 369, 'chapter1apartamentDoorToKitchen').refreshBody().setData('textKey', 'doorToKitchen')
        this.doors.create(509, 283, 'chapter1apartamentDoorToStreet').refreshBody().setData('textKey', 'doorToStreet')
        this.doors.create(902, 567, 'chapter1apartamentDoorToBathroom').refreshBody().setData('textKey', 'doorToBathroom')
        this.doors.create(750, 619, 'chapter1apartamentDoorToBalcony').refreshBody().setData('textKey', 'doorToBalcony')
        this.doors.create(190, 285, 'chapter1apartamentDoorToRoom').refreshBody().setData('textKey', 'doorToRoom')

        this.furniture.create(235, 487, 'chapter1apartamentChair').refreshBody().setData('textKey', 'chair')
        this.furniture.create(235, 555, 'chapter1apartamentTV').refreshBody().setData('textKey', 'TV')

        this.colliders = [
            this.walls,
            this.doors,
            this.furniture
        ]

        const jsonTexts = this.cache.json.get('chapter1') as any
        this.apartamentTexts = jsonTexts.apartament
    }

    addColliders(
            player: Phaser.GameObjects.GameObject,
            onDialogueStart: () => void,
            onDialogueEnd: () => void
        ) {
            this.physics.add.collider(player, this.colliders)
    
            this.addInteractionZone(player, this.furniture.getChildren()[0])
            this.addInteractionZone(player, this.doors.getChildren()[0])
            this.addInteractionZone(player, this.walls.getChildren()[0])
    
            const finish = () => {
                this.interactableObj = undefined
                this.inputLock = true
                onDialogueEnd()
            }
    
            this.events.on('interaction', () => {
                if (!this.interactableObj) return
                
                const sprite = this.interactableObj as Phaser.Physics.Arcade.Sprite
                const data = this.apartamentTexts[sprite.getData('textKey')]
    
                if (data.type !== 'dialogue') {
                    if (this.text || this.choose) return
    
                    onDialogueStart()
    
                    this.choose = new Choose(this)
                    this.choose.create(
                        400,
                        600,
                        data.question,
                        data.options[0].text,
                        data.options[1].text,
                        data.options[0].next,
                        () => {
                            this.choose = undefined
                            finish()
                        }
                    )
                    return
                }
    
                if (!this.text) {
                    onDialogueStart()
    
                    this.text = new NextText(this, () => {
                        this.text = undefined
                        finish()
                    })
                    this.text.create(400, 600, data.text)
                } else {
                    this.text.nextString()
                }
            })
        }
    
        private addInteractionZone(
            player: Phaser.GameObjects.GameObject,
            object: Phaser.GameObjects.GameObject
        ) {
            const sprite = object as Phaser.Physics.Arcade.Sprite
            const body = sprite.body as Phaser.Physics.Arcade.StaticBody

              console.log('Объект:', sprite.texture.key, 
                'body.center:', body.center.x, body.center.y,
                'body.size:', body.width, body.height,
                'sprite pos:', sprite.x, sprite.y,
                'origin:', sprite.originX, sprite.originY)
    
            const zone = this.add.zone(
                body.center.x,
                body.center.y,
                body.width + 10,
                body.height + 10
            )
    
            this.physics.add.existing(zone, true)
    
            this.physics.add.overlap(player, zone, () => {
                console.log('Overlap detected with zone:', object);
                this.interactableObj = object
            })
        }
    
        update() {
            console.log('base update called')
        const pressed = Phaser.Input.Keyboard.JustDown(this.spacebar)
    
        if (this.inputLock) {
            this.inputLock = false
            return
        }
    
        if (this.choose) return
    
        if (pressed && this.interactableObj) {
            console.log('interaction')
            this.events.emit('interaction')
        }
    }
}
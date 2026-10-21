import Phaser from 'phaser'
import NextText from '../../utils/texts/NextText'
import Choose from '../../utils/choose/Choose'

export default class Chapter1KitchenScene extends Phaser.Scene {
    spacebar!: Phaser.Input.Keyboard.Key

    walls!: Phaser.Physics.Arcade.StaticGroup
    doors!: Phaser.Physics.Arcade.StaticGroup
    furniture!: Phaser.Physics.Arcade.StaticGroup

    colliders!: Phaser.Physics.Arcade.StaticGroup[]

    jsonTexts!: any
    kitchenTexts!: any

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
        
        this.add.image(500, 405, 'chapter1kitchen')

        this.walls.create(305, 405, 'chapter1kitchenLeftWall').setOrigin(0.5).refreshBody()
        this.walls.create(501, 209, 'chapter1kitchenTopWall').setOrigin(0.5).refreshBody()
        this.walls.create(695, 405, 'chapter1kitchenLeftWall').setOrigin(0.5).refreshBody()
        this.walls.create(501, 600, 'chapter1kitchenTopWall').setOrigin(0.5).refreshBody()

        this.doors.create(312, 464, 'chapter1kitchenDoorToApartament').setOrigin(0.5).refreshBody().setData('textKey', 'doorToApartament')
       
        this.furniture.create(601, 252, 'chapter1kitchenFridge').setOrigin(0.5).refreshBody().setData('textKey', 'fridge')
        this.furniture.create(447, 252, 'chapter1kitchenFurniture').setOrigin(0.5).refreshBody().setData('textKey', 'furniture')

        this.colliders = [
            this.walls,
            this.doors,
            this.furniture
        ]

        const jsonTexts = this.cache.json.get('chapter1') as any
        this.kitchenTexts = jsonTexts.kitchen
    }

    addColliders(
            player: Phaser.GameObjects.GameObject,
            onDialogueStart: () => void,
            onDialogueEnd: () => void
        ) {
            this.physics.add.collider(player, this.colliders)
    
            this.furniture.getChildren().forEach(object => {
                this.addInteractionZone(player, object)
            })
            
            this.doors.getChildren().forEach(object => {
                this.addInteractionZone(player, object)
            })
            
    
            const finish = () => {
                this.interactableObj = undefined
                this.inputLock = true
                onDialogueEnd()
            }
    
            this.events.on('interaction', () => {
                if (!this.interactableObj) return
                
                const sprite = this.interactableObj as Phaser.Physics.Arcade.Sprite
                const data = this.kitchenTexts[sprite.getData('textKey')]
    
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
import Phaser from 'phaser'
import NextText from '../../utils/texts/NextText'
import Choose from '../../utils/choose/Choose'

export default class Chapter1BaseBathroomScene extends Phaser.Scene {
    walls!: Phaser.Physics.Arcade.StaticGroup
    doors!: Phaser.Physics.Arcade.StaticGroup
    colliders!: Phaser.Physics.Arcade.StaticGroup[]
    furniture!: Phaser.Physics.Arcade.StaticGroup

    spacebar!: Phaser.Input.Keyboard.Key
    

    jsonTexts!: any
    bathroomTexts!: any

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

        this.add.image(500, 300, 'chapter1bathroom')

        this.walls.create(330, 300, 'chapter1bathroomLeftWall')
        this.walls.create(670, 300, 'chapter1bathroomLeftWall')
        this.walls.create(500, 130, 'chapter1bathroomTopWall')
        this.walls.create(500, 470, 'chapter1bathroomTopWall')

        
        this.doors.create(336, 425, 'chapter1bathroomDoorToApartament').setOrigin(0.5).refreshBody().setData('textKey', 'doorToApartament')

        this.furniture.create(355, 160, 'chapter1bathroomToilet').setOrigin(0.5).refreshBody().setData('textKey', 'toilet')
        this.furniture.create(625, 413, 'chapter1bathroomShower').setOrigin(0.5).refreshBody().setData('textKey', 'shower')
        this.furniture.create(575, 443, 'chapter1bathroomWashingMachine').setOrigin(0.5).refreshBody().setData('textKey', 'washingMachine')
        this.furniture.create(520, 165, 'chapter1bathroomVanityTable').setOrigin(0.5).refreshBody().setData('textKey', 'vanityTable')

        this.colliders = [
            this.walls,
            this.doors,
            this.furniture
        ]

        const jsonTexts = this.cache.json.get('chapter1') as any
        this.bathroomTexts = jsonTexts.bathroom
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
                    const data = this.bathroomTexts[sprite.getData('textKey')]
        
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
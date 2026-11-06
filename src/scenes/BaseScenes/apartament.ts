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

        this.walls.create(135, 420, 'chapter1apartamentLeftWall').setOrigin(0.5).refreshBody()
        this.walls.create(910, 420, 'chapter1apartamentLeftWall').setOrigin(0.5).refreshBody()
        this.walls.create(523, 626, 'chapter1apartamentBottomWall').setOrigin(0.5).refreshBody()
        this.walls.create(521, 244, 'chapter1apartamentTopWall').setOrigin(0.5).refreshBody()

        this.doors.create(902, 369, 'chapter1apartamentDoorToKitchen')
            .setOrigin(0.5).refreshBody().setData('textKey', 'doorToKitchen')

        this.doors.create(509, 283, 'chapter1apartamentDoorToStreet')
            .setOrigin(0.5).refreshBody().setData('textKey', 'doorToStreet')

        this.doors.create(902, 567, 'chapter1apartamentDoorToBathroom')
            .setOrigin(0.5).refreshBody().setData('textKey', 'doorToBathroom')

        this.doors.create(750, 619, 'chapter1apartamentDoorToBalcony')
            .setOrigin(0.5).refreshBody().setData('textKey', 'doorToBalcony')

        this.doors.create(190, 285, 'chapter1apartamentDoorToRoom')
            .setOrigin(0.5).refreshBody().setData('textKey', 'doorToRoom')

        this.furniture.create(235, 487, 'chapter1apartamentChair')
            .setOrigin(0.5).refreshBody().setData('textKey', 'chair')

        this.furniture.create(235, 555, 'chapter1apartamentTV')
            .setOrigin(0.5).refreshBody()

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
            if (this.text || this.choose) return

            const sprite = this.interactableObj as Phaser.Physics.Arcade.Sprite
            const textKey = sprite.getData('textKey')
            const data = this.apartamentTexts[textKey]

            if (!data) return

            onDialogueStart()

            if (data.type === 'choice') {
                this.startChoice(data, finish)
                return
            }

            if (data.type === 'dialogue') {
                this.startDialogue(data, finish)
            }
        })
    }

    private startChoice(data: any, finish: () => void) {
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
    }

    private startDialogue(data: any, finish: () => void) {
        this.text = new NextText(this, () => {
            this.text = undefined
            finish()
        })

        this.text.create(400, 600, data.text)
    }

    private addInteractionZone(
        player: Phaser.GameObjects.GameObject,
        object: Phaser.GameObjects.GameObject
    ) {
        const sprite = object as Phaser.Physics.Arcade.Sprite
        const body = sprite.body as Phaser.Physics.Arcade.StaticBody

        const zone = this.add.zone(
            body.center.x,
            body.center.y,
            body.width + 10,
            body.height + 10
        )

        this.physics.add.existing(zone, true)

        let overlapping = false

        this.physics.add.overlap(player, zone, () => {
            overlapping = true
            this.interactableObj = object
        })

        this.events.on('postupdate', () => {
            if (!overlapping) {
                if (this.interactableObj === object) {
                    this.interactableObj = undefined
                }
            }

            overlapping = false
        })
    }

    update() {
        const pressed = Phaser.Input.Keyboard.JustDown(this.spacebar)

        if (this.inputLock) {
            if (!this.spacebar.isDown) {
                this.inputLock = false
            }

            return
        }

        if (this.choose) return

        if (pressed && this.interactableObj) {
            this.events.emit('interaction')
            return
        }

        if (pressed && this.text) {
            this.text.nextString()
        }
    }
}
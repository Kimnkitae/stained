
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

        this.createWalls()
        this.createDoors()
        this.createFurniture()

        this.colliders = [
            this.walls,
            this.doors,
            this.furniture
        ]

        this.jsonTexts = this.cache.json.get('chapter1')
        this.kitchenTexts = this.jsonTexts.kitchen
    }

    private createWalls() {
        this.walls.create(305, 405, 'chapter1kitchenLeftWall')
            .setOrigin(0.5)
            .refreshBody()

        this.walls.create(501, 209, 'chapter1kitchenTopWall')
            .setOrigin(0.5)
            .refreshBody()

        this.walls.create(695, 405, 'chapter1kitchenLeftWall')
            .setOrigin(0.5)
            .refreshBody()

        this.walls.create(501, 600, 'chapter1kitchenTopWall')
            .setOrigin(0.5)
            .refreshBody()
    }

    private createDoors() {
        this.doors.create(
            312,
            464,
            'chapter1kitchenDoorToApartament'
        )
            .setOrigin(0.5)
            .refreshBody()
            .setData('textKey', 'doorToApartament')
    }

    private createFurniture() {
        this.furniture.create(601, 252, 'chapter1kitchenFridge')
            .setOrigin(0.5)
            .refreshBody()
            .setData('textKey', 'fridge')

        this.furniture.create(447, 252, 'chapter1kitchenFurniture')
            .setOrigin(0.5)
            .refreshBody()
            .setData('textKey', 'furniture')
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
            const data = this.kitchenTexts[textKey]

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
            if (!overlapping && this.interactableObj === object) {
                this.interactableObj = undefined
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

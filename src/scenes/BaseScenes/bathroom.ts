
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

        this.createWalls()
        this.createDoors()
        this.createFurniture()

        this.colliders = [
            this.walls,
            this.doors,
            this.furniture
        ]

        this.jsonTexts = this.cache.json.get('chapter1')
        this.bathroomTexts = this.jsonTexts.bathroom
    }

    private createWalls() {
        this.walls.create(330, 300, 'chapter1bathroomLeftWall')
            .setOrigin(0.5)
            .refreshBody()

        this.walls.create(670, 300, 'chapter1bathroomLeftWall')
            .setOrigin(0.5)
            .refreshBody()

        this.walls.create(500, 130, 'chapter1bathroomTopWall')
            .setOrigin(0.5)
            .refreshBody()

        this.walls.create(500, 470, 'chapter1bathroomTopWall')
            .setOrigin(0.5)
            .refreshBody()
    }

    private createDoors() {
        this.doors.create(
            336,
            425,
            'chapter1bathroomDoorToApartament'
        )
            .setOrigin(0.5)
            .refreshBody()
            .setData('textKey', 'doorToApartment')
    }

    private createFurniture() {
        this.furniture.create(355, 160, 'chapter1bathroomToilet')
            .setOrigin(0.5)
            .refreshBody()
            .setData('textKey', 'toilet')

        this.furniture.create(625, 413, 'chapter1bathroomShower')
            .setOrigin(0.5)
            .refreshBody()
            .setData('textKey', 'shower')

        this.furniture.create(575, 443, 'chapter1bathroomWashingMachine')
            .setOrigin(0.5)
            .refreshBody()
            .setData('textKey', 'washingMachine')

        this.furniture.create(520, 165, 'chapter1bathroomVanityTable')
            .setOrigin(0.5)
            .refreshBody()
            .setData('textKey', 'vanityTable')
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
            const data = this.bathroomTexts[textKey]

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

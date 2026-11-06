
import Phaser from 'phaser'
import NextText from '../../utils/texts/NextText'
import Choose from '../../utils/choose/Choose'

export default class Chapter1BaseRoomScene extends Phaser.Scene {
    spacebar!: Phaser.Input.Keyboard.Key

    walls!: Phaser.Physics.Arcade.StaticGroup
    doors!: Phaser.Physics.Arcade.StaticGroup
    furniture!: Phaser.Physics.Arcade.StaticGroup

    colliders!: Phaser.Physics.Arcade.StaticGroup[]

    jsonTexts!: any
    roomTexts!: any

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

        this.add.image(500, 300, 'chapter1room')

        this.createWalls()
        this.createDoors()
        this.createFurniture()

        this.colliders = [
            this.walls,
            this.doors,
            this.furniture
        ]

        this.jsonTexts = this.cache.json.get('chapter1')
        this.roomTexts = this.jsonTexts.room
    }

    private createWalls() {
        this.walls.create(352, 300, 'chapter1roomLeftWall')
            .setOrigin(0.5)
            .refreshBody()

        this.walls.create(647, 300, 'chapter1roomLeftWall')
            .setOrigin(0.5)
            .refreshBody()

        this.walls.create(500, 75, 'chapter1roomTopWall')
            .setOrigin(0.5)
            .refreshBody()

        this.walls.create(500, 527, 'chapter1roomTopWall')
            .setOrigin(0.5)
            .refreshBody()
    }

    private createDoors() {
        this.doors.create(
            415,
            517,
            'chapter1roomDoorToApartament'
        )
            .setOrigin(0.5)
            .refreshBody()
            .setData('textKey', 'doorToApartment')
    }

    private createFurniture() {
        this.furniture.create(568, 210, 'chapter1roomBed')
            .setOrigin(0.5)
            .refreshBody()
            .setData('textKey', 'bed')

        this.furniture.create(478, 95, 'chapter1roomWindows')
            .setOrigin(0.5)
            .refreshBody()
            .setData('textKey', 'windows')
    }

    addColliders(
        player: Phaser.GameObjects.GameObject,
        onDialogueStart: () => void,
        onDialogueEnd: () => void
    ) {
        this.physics.add.collider(player, this.colliders)

        this.doors.getChildren().forEach(object => {
            this.addInteractionZone(player, object)
        })

        this.furniture.getChildren().forEach(object => {
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
            const data = this.roomTexts[textKey]

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

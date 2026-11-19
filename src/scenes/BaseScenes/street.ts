import Phaser from 'phaser'
import NextText from '../../utils/texts/NextText'
import Choose from '../../utils/choose/Choose'

export default class Chapter1BaseStreetScene extends Phaser.Scene {
    spacebar!: Phaser.Input.Keyboard.Key

    house!: Phaser.Physics.Arcade.StaticGroup
    walls!: Phaser.Physics.Arcade.StaticGroup
    bench!: Phaser.Physics.Arcade.StaticGroup
    trees!: Phaser.Physics.Arcade.StaticGroup

    colliders!: Phaser.Physics.Arcade.StaticGroup[]

    jsonTexts!: any
    streetTexts!: any

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

        this.add.image(0, 0, 'chapter1street')

        this.house = this.physics.add.staticGroup()
        this.walls = this.physics.add.staticGroup()
        this.bench = this.physics.add.staticGroup()
        this.trees = this.physics.add.staticGroup()

        
        this.walls.create(179, 0, 'chapter1streetLeftWall').setOrigin(-0.2, -0.2).refreshBody()

        this.walls.create(92, 65, 'chapter1streetTopWall').setOrigin(-0.2, -0.2).refreshBody()

        this.walls.create(615, 0, 'chapter1streetRightWall').setOrigin(-0.2, -0.2).refreshBody()

        this.walls.create(92, 418, 'chapter1streetBottomWall').setOrigin(-0.2, -0.2).refreshBody()

        this.trees.create(160, 52, 'chapter1streetTrees').setOrigin(-0.2, -0.2).refreshBody().setData('textKey', 'trees')

        this.house.create(120, 372, 'chapter1streetHouse').setOrigin(-0.2, -0.2).refreshBody().setData('textKey', 'house')

        this.bench.create(210, 216, 'chapter1streetBench').setOrigin(-0.2, -0.2).refreshBody().setData('textKey', 'bench')

        this.colliders = [
            this.walls,
            this.trees,
            this.house,
            this.bench
        ]

        const jsonTexts = this.cache.json.get('chapter1') as any
        this.streetTexts = jsonTexts.street
    }

    addColliders(
        player: Phaser.GameObjects.GameObject,
        onDialogueStart: () => void,
        onDialogueEnd: () => void
    ) {
        this.physics.add.collider(player, this.colliders)


        this.house.getChildren().forEach(object => {
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
            const data = this.streetTexts[textKey]

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
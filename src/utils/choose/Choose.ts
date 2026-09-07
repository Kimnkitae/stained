import Phaser from 'phaser'

export default class Choose{
    textObject!: Phaser.GameObjects.Text
    holderText!: Phaser.GameObjects.Image
    firstChooseText!: Phaser.GameObjects.Text
    state!: boolean
    secondChooseText!: Phaser.GameObjects.Text
    effectCircle!: Phaser.GameObjects.Image
    string!: string
    nextScene!: string
    leftArrow!: Phaser.Input.Keyboard.Key
    rightArrow!: Phaser.Input.Keyboard.Key
    spaceBar!: Phaser.Input.Keyboard.Key


    constructor(
        public scene: Phaser.Scene
    ) {}

    create(x: number, y: number, text: string, nextScene: string) {
        this.string = text
        this.state = true
        this.nextScene = nextScene

        this.holderText = this.scene.add
            .image(x, y, 'holderText')
            .setOrigin(0.5, 0.5)

        this.textObject = this.scene.add.text(
            x - 200,
            y - 50,
            this.string,
            {
                fontSize: '16px',
                color: '#fff'
            }
        )

        this.firstChooseText = this.scene.add.text(
            x - 200,
            y + 50,
            this.string,
            {
                fontSize: '16px',
                color: '#fff'
            }
        )

        this.secondChooseText = this.scene.add.text(
            x - 200,
            y + 100,
            this.string,
            {
                fontSize: '16px',
                color: '#fff'
            }
        )
        
        this.effectCircle = this.scene.add.image(
            x - 200,
            y + 50,
            'effect-circle')

        this.leftArrow = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.rightArrow = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.spaceBar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.leftArrow.on('down', this.otherChoose, this)
        this.rightArrow.on('down', this.otherChoose, this)
        this.spaceBar.on('down', this.endAll, this)

    }

    otherChoose() {
        if(this.state) {
            this.state = false
            this.effectCircle.setPosition(this.effectCircle.x, this.effectCircle.y + 50)

        } else {
            this.state = true
            this.effectCircle.setPosition(this.effectCircle.x, this.effectCircle.y - 50)
        }
    }

    endAll() {
        this.holderText.destroy()
        this.textObject.destroy()
        this.firstChooseText.destroy()
        this.secondChooseText.destroy()
        this.effectCircle.destroy()
        this.leftArrow.destroy()
        this.rightArrow.destroy()
        this.spaceBar.destroy()
    }
}
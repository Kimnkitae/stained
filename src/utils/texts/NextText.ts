export default class NextText {
    textObject!: Phaser.GameObjects.Text
    holderText!: Phaser.GameObjects.Image
    k = 0
    strings!: string[]

    constructor(
        public scene: Phaser.Scene,
        private onEnd: () => void
    ) {}

    create(x: number, y: number, text: string[]) {
        this.strings = text

        this.holderText = this.scene.add
            .image(x, y, 'holderText')
            .setOrigin(0.5, 0.5)

        this.textObject = this.scene.add.text(
            x - 200,
            y - 50,
            this.strings[this.k],
            {
                fontSize: '16px',
                color: '#fff'
            }
        )
    }

    nextString() {
        this.k++

        if (this.k >= this.strings.length) {
            this.endAll()
            return
        }

        this.textObject.setText(this.strings[this.k])
    }

    endAll() {
        this.holderText.destroy()
        this.textObject.destroy()
        this.onEnd()
    }
}
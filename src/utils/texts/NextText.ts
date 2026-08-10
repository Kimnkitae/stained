import Phaser from 'phaser'
export default class NextText  {
    text!: Phaser.GameObjects.Text
    holderText!: Phaser.GameObjects.Image
    constructor(public scene: Phaser.Scene) {
    }

    create(x: number, y: number, text: string) {
        this.holderText = this.scene.add.image(x, y, 'holderText').setOrigin(0.5, 0.5)
        this.text = this.scene.add.text(x-200, y-50, text, { fontSize: '16px', color: '#fff' })
        nextText(text)
    }

    nextText(text: string) {
        this.text.setText(text)
    }

    typingEffect(text: string, x: number, y: number) {
        this.text = this.scene.add.text(x-200, y-50, text, { fontSize: '16px', color: '#fff' })
    }

    endAll() {
        this.text.destroy()
        this.holderText.destroy()
    }
}
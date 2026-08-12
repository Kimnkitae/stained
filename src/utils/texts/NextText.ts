import Phaser from 'phaser'
export default class NextText  {
    textObject!: Phaser.GameObjects.Text
    holderText!: Phaser.GameObjects.Image
    constructor(public scene: Phaser.Scene) {
    }

    create(x: number, y: number, text: string) {
        this.holderText = this.scene.add.image(x, y, 'holderText').setOrigin(0.5, 0.5)
        this.textObject = this.scene.add.text(x-200, y-50, text.text[0], { fontSize: '16px', color: '#fff' })
        
    }

    nextText(text: string) {
        this.textObject.setText(text)
    }

    typingEffect(text: string, x: number, y: number) {
        this.textObject = this.scene.add.text(x-200, y-50, text, { fontSize: '16px', color: '#fff' })
    }

    endAll() {
        this.textObject.destroy()
        this.holderText.destroy()
    }
}
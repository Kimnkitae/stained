import Phaser from 'phaser'
export default class NextText  {
    text!: Phaser.GameObjects.Text
    holderText!: Phaser.GameObjects.Image
    constructor(public scene: Phaser.Scene) {
    }

    create(x: number, y: number, text: string) {
        this.holderText = this.scene.add.image(x, y, 'holderText').setOrigin(0.5, 0.5)
        this.text = this.scene.add.text(x, y, text, { fontSize: '16px', color: '#fff' })
    }
}
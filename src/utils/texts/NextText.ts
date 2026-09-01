import Phaser from 'phaser'
export default class NextText { 
    textObject!: Phaser.GameObjects.Text 
    holderText!: Phaser.GameObjects.Image 
    k!: number 
    
    constructor(public scene: Phaser.Scene) { } 
    
    create(x: number, y: number, text: string) { 
        this.k = 0 
        this.holderText = this.scene.add.image(x, y, 'holderText').setOrigin(0.5, 0.5) 
        this.textObject = this.scene.add.text(x-200, y-50, text[this.k], { fontSize: '16px', color: '#fff' }) 
    } 
    
    nextString() { 
        this.k++ 
        this.textObject.setText(this.textObject.text[this.k]) 
    } 
    endAll() 
    { 
        this.holderText.destroy() 
        this.textObject.destroy() 
    } 
}
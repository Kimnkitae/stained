export default class NextText {
    constructor(scene, dialogueKey, endAll) {
        this.scene = scene;
        this.dialogueKey = dialogueKey
        this.endAll = endAll
        this.k = 0
        
        this.init()
    }

    init() {
        this.textObject = this.scene.add.bitmapText(65, 520, 'W95FA', this.dialogueKey.text[0], 32)
        this.spaceBar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.spaceBar.on('down', this.handleNext, this)
    }

    handleNext() {
        this.k++

        // Проверяем, есть ли еще текст
        if (this.k < this.dialogueKey.text.length) {
            this.textObject.setText(this.dialogueKey.text[this.k])
            
        } else {
            this.endText()
        }
    }

    endText() {
        
        this.textObject.destroy()
        this.spaceBar.off('down', this.handleNext, this)
        
        
        if (this.endAll) this.endAll()
    }
}
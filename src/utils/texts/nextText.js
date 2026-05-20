
export default class NextText {
    constructor(scene, dialogueKey) {
        this.scene = scene
        this.dialogueKey = dialogueKey
        this.init()
    }

    init() {
        this.createText()
    }

    createText() {
        const spaceBar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        
        spaceBar.on('down', () => {
            this.text = this.scene.add.bitmapText(65, 520, 'W95FA', this.dialogueKey.text[0], 32)
        })
        
    }

    nextText() {

    }

    endText() {
        
    }
}





export default class Choose {
    constructor(scene, chooseKey, endAll, toDo) {
        this.scene = scene
        this.endAll = endAll
        this.chooseKey = chooseKey
        this.toDo = toDo 
        this.init()
    }

    init() {
        this.text = this.scene.add.bitmapText(65, 520, 'W95FA', this.chooseKey.question, 32)
        this.firstChooseText = this.scene.add.bitmapText(140, 560, 'W95FA', this.chooseKey.options[0].text, 32)
        this.secondChooseText = this.scene.add.bitmapText(240, 560, 'W95FA', this.chooseKey.options[1].text, 32)
        this.effectCircle = this.scene.add.image(120, 570, 'effect-e')
        this.firstChooseState = true
        this.secondChooseState = false

        
        this.leftArrow = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.rightArrow = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.spaceBar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        
        this.leftArrow.on('down', this.moveLeft, this)
        this.rightArrow.on('down', this.moveRight, this)
        this.spaceBar.on('down', this.handleSelect, this)
    }

    moveLeft() {
        if (!this.firstChooseState) {
            this.firstChooseState = true
            this.secondChooseState = false
            this.effectCircle.setPosition(120, 570)
        }
    }

    moveRight() {
        if (!this.secondChooseState) {
            this.firstChooseState = false
            this.secondChooseState = true
            this.effectCircle.setPosition(230, 570)
        }
    }

    handleSelect() {
        if (this.firstChooseState) {
            
            if (this.toDo) {
                this.toDo() 
            }
            
        } else if (this.secondChooseState) {
            
        }
        
        
        this.destroy()
        
        
        this.endAll()
    }

    destroy() {
        this.leftArrow.off('down', this.moveLeft, this)
        this.rightArrow.off('down', this.moveRight, this)
        this.spaceBar.off('down', this.handleSelect, this)
        
        this.text.destroy()
        this.firstChooseText.destroy()
        this.secondChooseText.destroy()
        this.effectCircle.destroy()
    }
}
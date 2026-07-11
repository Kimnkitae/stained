export default class Player {
    constructor(scene, x, y) {
        this.scene = scene
        this.label = 'player'
        this.init(x, y)
        
    }

    init(x, y) {
        this.sprite = this.scene.physics.add.sprite(x, y, 'player')
        this.addAnimations()
        this.addMovements()
        this.addSounds()
    }

    create() {
        
    }

    addAnimations() {
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers(this.label, { start: 0, end: 1}),
            frameRate: 2,
            repeat: -1
        })
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers(this.label, { start: 2, end: 3}),
            frameRate: 3,
            repeat: -1
        })
        this.scene.anims.create({
            key: 'up',
            frames: this.scene.anims.generateFrameNumbers(this.label, { start: 6, end: 7}),
            frameRate: 3,
            repeat: -1
        })
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers(this.label, { start: 4, end: 5}),
            frameRate: 3,
            repeat: -1
        })
        this.scene.anims.create({
            key: 'down',
            frames: this.scene.anims.generateFrameNumbers(this.label, { start: 8, end: 9}),
            frameRate: 3,
            repeat: -1
        })
    }

    addMovements() {
        this.cursors = this.scene.input.keyboard.createCursorKeys()
    }

    addSounds() {
        this.walkSound = this.scene.sound.add('walk', { loop: true, volume: 0.3 })
    }



    update() {
    if (this.isFrozen) {
        this.sprite.setVelocity(0)
        this.sprite.anims.play('idle', true)
        if (this.walkSound.isPlaying) this.walkSound.stop()
        return;
    }

    const moving = this.cursors.down.isDown || this.cursors.up.isDown || this.cursors.left.isDown || this.cursors.right.isDown

    if (moving) {
        if (!this.walkSound.isPlaying) {
            this.walkSound.play()
        }

        if (this.cursors.down.isDown) {
            this.sprite.setVelocityY(70)
            this.sprite.anims.play('down', true)
        } else if (this.cursors.up.isDown) {
            this.sprite.setVelocityY(-70)
            this.sprite.anims.play('up', true)
        } else if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-70)
            this.sprite.anims.play('left', true)
        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(70)
            this.sprite.anims.play('right', true)
        }
    } else {
    
        this.sprite.setVelocityX(0)
        this.sprite.setVelocityY(0)
        this.sprite.anims.play('idle', true)
        if (this.walkSound.isPlaying) {
            this.walkSound.stop()
        }
    }
}
}
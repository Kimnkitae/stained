import Phaser from 'phaser'

export default class Player {
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    sprite!: Phaser.Physics.Arcade.Sprite
    isFrozen: boolean = false
    diagonal: boolean = false
    moving: boolean = false
    speedMoving: integer = 100
    constructor(public scene: Phaser.Scene) {
        
    }

    create(x: number, y: number) {
        this.cursors = this.scene.input.keyboard!.createCursorKeys()
        this.sprite = this.scene.physics.add.sprite(x, y, 'player')
        this.addAnimations()
    }

    addAnimations() {
        this.sprite.anims.create({
            key: 'idle',
            frames: this.sprite.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        }),
        this.sprite.anims.create({
            key: 'right',
            frames: this.sprite.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
            frameRate: 2,
            repeat: -1
        }),
        this.sprite.anims.create({
            key: 'left',
            frames: this.sprite.anims.generateFrameNumbers('player', { start: 4, end: 5 }),
            frameRate: 2,
            repeat: -1
        }),
        this.sprite.anims.create({
            key: 'top',
            frames: this.sprite.anims.generateFrameNumbers('player', { start: 6, end: 7 }),
            frameRate: 2,
            repeat: -1
        }),
        this.sprite.anims.create({
            key: 'down',
            frames: this.sprite.anims.generateFrameNumbers('player', { start: 8, end: 9 }),
            frameRate: 2,
            repeat: -1
        })
    }

    update() {
        if(this.isFrozen) {
            this.sprite.setVelocity(0)
            this.sprite.anims.play('idle', true)
            return
        }
        

        this.moving = this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown
        this.diagonal = (this.cursors.left.isDown && this.cursors.up.isDown) || (this.cursors.left.isDown && this.cursors.down.isDown) || (this.cursors.right.isDown && this.cursors.up.isDown) || (this.cursors.right.isDown && this.cursors.down.isDown)
        if(this.moving) {
            if(this.cursors.left.isDown) {
                this.sprite.setVelocityX(-this.speedMoving)
                this.sprite.anims.play('left', true)
            } else if(this.cursors.right.isDown) {
                this.sprite.setVelocityX(this.speedMoving)
                this.sprite.anims.play('right', true)
            } else if(this.cursors.up.isDown) {
                this.sprite.setVelocityY(-this.speedMoving)
                this.sprite.anims.play('top', true)
            } else if(this.cursors.down.isDown) {
                this.sprite.setVelocityY(this.speedMoving)
                this.sprite.anims.play('down', true)
            }
        } else {
            this.sprite.setVelocity(0)
            this.sprite.anims.play('idle', true)
        }

        if(this.diagonal) {
            if(this.cursors.left.isDown) {
                this.sprite.setVelocityX(-this.speedMoving * Math.SQRT1_2)
                this.sprite.anims.play('left', true)
            } else if(this.cursors.right.isDown) {
                this.sprite.setVelocityX(this.speedMoving * Math.SQRT1_2)
                this.sprite.anims.play('right', true)
            } else if(this.cursors.up.isDown) {
                this.sprite.setVelocityY(-this.speedMoving * Math.SQRT1_2)
                this.sprite.anims.play('top', true)
            } else if(this.cursors.down.isDown) {
                this.sprite.setVelocityY(this.speedMoving * Math.SQRT1_2)
                this.sprite.anims.play('down', true)
            }
        }
    }
}
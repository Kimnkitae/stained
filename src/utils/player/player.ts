import Phaser from 'phaser'

export default class Player {
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    sprite!: Phaser.Physics.Arcade.Sprite
    isFrozen: boolean = false
    diagonal: boolean = false
    moving: boolean = false
    velocityX: integer = 0
    velocityY: integer = 0

    constructor(public scene: Phaser.Scene) {}

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
        if (this.isFrozen) {
            this.sprite.setVelocity(0)
            this.sprite.anims.play('idle', true)
            return
        }

        let x = 0
        let y = 0

        if (this.cursors.left.isDown) {
            x = -1
            this.sprite.anims.play('left', true)
        } else if (this.cursors.right.isDown) {
            x = 1
            this.sprite.anims.play('right', true)
        }

        if (this.cursors.up.isDown) {
            y = -1
            this.sprite.anims.play('top', true)
        } else if (this.cursors.down.isDown) {
            y = 1
            this.sprite.anims.play('down', true)
        }

        if (x === 0 && y === 0) {
            this.sprite.setVelocity(0)
            this.sprite.anims.play('idle', true)
            return
        }

        const normalizer = x !== 0 && y !== 0
            ? Math.SQRT1_2
            : 1

        this.velocityX = x * 100 * normalizer
        this.velocityY = y * 100 * normalizer

        this.sprite.setVelocity(
            this.velocityX,
            this.velocityY
        )
    }
}
import Phaser from 'phaser'

export default class Player {
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    sprite!: Phaser.Physics.Arcade.Sprite

    constructor(public scene: Phaser.Scene) {
        
    }

    create(x: number, y: number) {
        this.cursors = this.scene.input.keyboard!.createCursorKeys()
        this.sprite = this.scene.physics.add.sprite(x, y, 'player')

        this.addAnimations()
    }

    private addAnimations() {
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

    }

}
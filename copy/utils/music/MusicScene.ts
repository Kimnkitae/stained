import Phaser from 'phaser'

export default class MusicScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MusicScene', active: true })
    }

    preload() {
        this.load.audio('theme', 'assets/sounds/theme.mp3', { loop: true})
    }

    create() {
        this.theme = this.sound.add('theme', { loop: true, volume: 0.3 })
        this.theme.play()
    }
}
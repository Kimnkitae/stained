import Phaser from 'phaser'
import bootloader from './bootloader.ts'
import allScenes from './allScenes.ts'

const config: Object = {
    type: Phaser.AUTO,
    title: 'stained',
    description: '2D psyhological horror',
    pixelArt: true,
    render: {
        antialias: true,
        roundPixels: true
    },
    parent: 'game-container',
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade', 
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    fps: {
        target: 60,
        showChart: true,
    },
    backgroundColor: '#000000',
    scene: [bootloader, ...allScenes],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}

new Phaser.Game(config)       
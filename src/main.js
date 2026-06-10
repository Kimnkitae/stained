import { allScenes } from './allScenes.js'
import  Bootloader  from './bootloader.js'


const config = {
    type: Phaser.AUTO,
    title: 'bad_blood',
    description: '2D psyhological horror',
    pixelArt: true,
    render: {
        antialias: true,
        roundPixels: true,
        roundPixels: true
    },
    parent: 'game-container',
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade', 
        arcade: {
            gravity: { y: 0 },
            debug: true  // видеть границы объектов    
        }
    },
    fps: {
        target: 60,
        showChart: true,
    },
    backgroundColor: '#000000',
    scene: [Bootloader, ...allScenes],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config)
            
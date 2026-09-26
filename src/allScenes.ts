import Phaser from 'phaser'

/* scenes */
import Chapter1streetSceneStart from './scenes/Chapter1/street/sceneStart.ts'
import Chapter1apartamentScene1 from './scenes/Chapter1/apartament/scene1.ts'


const allScenes: Phaser.Scene[] = [
    new Chapter1streetSceneStart(),
    new Chapter1apartamentScene1()
]


export default allScenes
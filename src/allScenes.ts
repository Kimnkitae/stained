import Phaser from 'phaser'

/* scenes */
import Chapter1streetSceneStart from './scenes/Chapter1/street/sceneStart.ts'
import Chapter1apartamentScene1 from './scenes/Chapter1/apartament/scene1.ts'
import Chapter1kitchenScene1 from './scenes/Chapter1/kitchen/scene1.ts'
import Chapter1BalconyScene1 from './scenes/Chapter1/balcony/scene1.ts'


const allScenes: Phaser.Scene[] = [
    new Chapter1streetSceneStart(),
    new Chapter1apartamentScene1(),
    new Chapter1kitchenScene1(),
    new Chapter1BalconyScene1()
]


export default allScenes
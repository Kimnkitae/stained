import Phaser from 'phaser'

/* scenes */
import Chapter1streetSceneStart from './scenes/Chapter1/street/sceneStart.ts'
import Chapter1apartamentScene1 from './scenes/Chapter1/apartament/scene1.ts'
import Chapter1KitchenScene1 from './scenes/Chapter1/kitchen/scene1.ts'
import Chapter1BalconyScene1 from './scenes/Chapter1/balcony/scene1.ts'
import Chapter1RoomScene1 from './scenes/Chapter1/room/scene1.ts'
import Chapter1BathroomScene1 from './scenes/Chapter1/bathroom/scene1.ts'

/* games */

import TetrisGame from './miniGames/tetris/tetrisGame.ts'

const allScenes: Phaser.Scene[] = [
    new Chapter1streetSceneStart(),
    new Chapter1apartamentScene1(),
    new Chapter1KitchenScene1(),
    new Chapter1BalconyScene1(),
    new Chapter1RoomScene1(),
    new Chapter1BathroomScene1(),
    new TetrisGame()
]

export default allScenes
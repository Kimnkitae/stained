/* Sounds */

import MusicScene from './utils/music/MusicScene.js'

/* Chapter 1 */

import { Chapter1ApartamentScene1 } from './scenes/Chapter1/Apartament/scene1.ts'
import { Chapter1ApartamentScene2 } from './scenes/Chapter1/Apartament/scene2.ts'
import { Chapter1ApartamentScene3 } from './scenes/Chapter1/Apartament/scene3.js'
import { Chapter1ApartamentScene4 } from './scenes/Chapter1/Apartament/scene4.js'
import { Chapter1ApartamentScene5 } from './scenes/Chapter1/Apartament/scene5.js'
import { Chapter1ApartamentScene6 } from './scenes/Chapter1/Apartament/scene6.js'
import { Chapter1ApartamentScene7 } from './scenes/Chapter1/Apartament/scene7.js'
import { Chapter1ApartamentScene4Kitchen } from './scenes/Chapter1/Apartament/scene4Kitchen.js'
import { Chapter1ApartamentScene5Window } from './scenes/Chapter1/Apartament/scene5Window.js'
import { Chapter1ApartamentScene6Apartament } from './scenes/Chapter1/Apartament/scene6Apartament.js'
import { Chapter1ApartamentScene6Kitchen } from './scenes/Chapter1/Apartament/scene6Kitchen.js'
import { Chapter1End } from './scenes/Chapter1/Apartament/scene8.js'
import { Chapter1ApartamentScene7Apartament } from './scenes/Chapter1/Apartament/scene7Apartament.js'

/* Chapter2 */

import { Chapter2StreetScene1 } from './scenes/Chapter2/Street/scene1.js'
import { Chapter2StreetScene2 } from './scenes/Chapter2/Street/scene2.js'
import { Chapter2StreetScene3 } from './scenes/Chapter2/Street/scene3.js'
import { Chapter2StreetScene4 } from './scenes/Chapter2/Street/scene4.js'
import { BrokenHouseScene1 } from './scenes/Chapter2/BH/scene1.js'
import { BrokenHouseScene2 } from './scenes/Chapter2/BH/scene2.js'
import { BrokenHouseScene3 } from './scenes/Chapter2/BH/scene3.js'
import { BrokenHouseScene4 } from './scenes/Chapter2/BH/scene4.js'

export const allScenes = [
    /* Sounds */
    MusicScene,
    Chapter1ApartamentScene1,
    Chapter1ApartamentScene2,
    Chapter1ApartamentScene3,
    Chapter1ApartamentScene4,
    Chapter1ApartamentScene5,
    Chapter1ApartamentScene6,
    Chapter1ApartamentScene7,
    Chapter1ApartamentScene4Kitchen,
    Chapter1ApartamentScene5Window,
    Chapter1ApartamentScene6Apartament,
    Chapter1ApartamentScene6Kitchen,
    Chapter1End,
    Chapter1ApartamentScene7Apartament,

    /* chapter2 */
    Chapter2StreetScene1,
    Chapter2StreetScene2,
    Chapter2StreetScene3,
    Chapter2StreetScene4,
    BrokenHouseScene1,
    BrokenHouseScene2,
    BrokenHouseScene3,
    BrokenHouseScene4
]

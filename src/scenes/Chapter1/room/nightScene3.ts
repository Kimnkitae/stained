import Chapter1BaseNightRoomScene from '../../BaseScenes/nightRoom.ts'
import Player from '../../../utils/player/player.ts'
import Phaser from "phaser"
export default class Chapter1nightRoomScene2 extends Chapter1BaseNightRoomScene {
    player!: Player
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys

    constructor() {
        super({key: 'Chapter1nightRoomScene1'})
    }

    create() {

        this.cursors = this.input.keyboard!.createCursorKeys()

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.scene.start('Chapter1nightRoomScene3')
        }
    }
}
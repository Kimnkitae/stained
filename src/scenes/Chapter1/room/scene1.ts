import Chapter1BaseRoomScene from '../../BaseScenes/room'
import Player from '../../../utils/player/player.ts'

export default class Chapter1RoomScene1 extends Chapter1BaseRoomScene {
    player!: Player

    constructor() {
        super({key: 'Chapter1RoomScene1'})
    }

     create() {
    
         super.create()
        
         this.player = new Player(this)

         this.player.create(415, 470)

         this.add.existing(this.player.sprite)

         super.addColliders(
             this.player.sprite,
             () => {
                 this.player.isFrozen = true
             },
             
             () => {
                 this.player.isFrozen = false
             }
         )
     }
        
    update() {
        this.player.update()
        
        
    }
}
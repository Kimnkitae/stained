import Chapter1BaseKitchenScene from '../../BaseScenes/kitchen'
import Player from '../../../utils/player/player.ts'

export default class Chapter1kitchenScene1 extends Chapter1BaseKitchenScene {

    player!: Player

    constructor() {
        super({key: 'Chapter1kitchenScene1'})
    }

    create() {

         super.create()
        
         this.player = new Player(this)

         this.player.create(350, 360)

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
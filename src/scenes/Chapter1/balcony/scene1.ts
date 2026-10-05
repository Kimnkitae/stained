import Chapter1BaseBalconyScene from '../../BaseScenes/balcony'
import Player from '../../../utils/player/player.ts'

export default class Chapter1BalconyScene1 extends Chapter1BaseBalconyScene {

    player!: Player

    constructor() {
        super({key: 'Chapter1BalconyScene1'})
    }

    create() {

         super.create()
        
         this.player = new Player(this)

         this.player.create(625, 300)

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
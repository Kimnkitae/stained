import Chapter1BaseApartamentScene from '../../BaseScenes/apartament'
import Player from '../../../utils/player/player.ts'
import '../../../karma.ts'

export default class Chapter1ApartamentScene1 extends Chapter1BaseApartamentScene {

    player!: Player

    constructor() {
        super({key: 'Chapter1ApartamentScene1'})
    }

    create() {

        
         super.create()
        
         this.player = new Player(this)

         this.player.create(515, 320)

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
        
        
        super.update()
    }
}





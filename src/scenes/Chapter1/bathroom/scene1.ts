import Chapter1BaseBathroomScene from '../../BaseScenes/bathroom'
import Player from '../../../utils/player/player.ts'

export default class Chapter1BathroomScene1 extends Chapter1BaseBathroomScene {

    player!: Player

    constructor() {
        super({key: 'Chapter1BathroomScene1'})
    }

    create(playerPosition?: {x: number, y: number}) {

         super.create()

         const x = playerPosition?.x ?? 370
        const y = playerPosition?.y ?? 540

        
         this.player = new Player(this)

         this.player.create(x, y)

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
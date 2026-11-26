import Chapter1BasenightKitchenScene from '../../BaseScenes/kitchen.ts'
import Player from '../../../utils/player/player.ts'
import '../../../karma.ts' 

export default class Chapter1nightKitchenScene1 extends Chapter1BasenightKitchenScene {

    player!: Player

    constructor() {
        super({key: 'Chapter1nightKitchenScene1'})
    }

    create() {
        
        super.create()
        let darkOverlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000);
    
    // Сдвигаем точку привязки в левый верхний угол
    darkOverlay.setOrigin(0, 0);
    
    // Устанавливаем степень затемнения (0 — прозрачный, 1 — полностью черный)
    darkOverlay.setAlpha(0.5); 
        
         this.player = new Player(this)

         this.player.create(350, 460)

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
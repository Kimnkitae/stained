import Chapter1BaseNightRoomScene from '../../BaseScenes/nightRoom.ts'
import Player from '../../../utils/player/player.ts'

export default class Chapter1nightRoomScene3 extends Chapter1BaseNightRoomScene {
    player!: Player

    constructor() {
        super({key: 'Chapter1nightRoomScene3'})
    }

     create() {
    
        super.create()
        let darkOverlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000);
    
    // Сдвигаем точку привязки в левый верхний угол
    darkOverlay.setOrigin(0, 0);
    
    // Устанавливаем степень затемнения (0 — прозрачный, 1 — полностью черный)
    darkOverlay.setAlpha(0.5); 
         this.player = new Player(this)

         this.player.create(385, 170)

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

this.furniture.getChildren().forEach(child => {
    const sprite = child as Phaser.Physics.Arcade.Sprite
    sprite.setVisible(false)
    sprite.setActive(false)
    if (sprite.body) {
        (sprite.body as Phaser.Physics.Arcade.StaticBody).enable = false
    }
    sprite.setData('textKey', undefined) // чтобы interaction не находил диалог
})
     }
        
    update() {
        this.player.update()
        
        super.update()
    }
}
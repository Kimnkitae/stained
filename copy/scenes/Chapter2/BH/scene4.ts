import Phaser from 'phaser'
export class BrokenHouseScene4 extends Phaser.Scene {
    constructor() {
        super({key: 'BrokenHouseScene4'})
    }

    create() {
        const overlay = this.add.rectangle(
          this.scale.width / 2,
          this.scale.height / 2,
          this.scale.width,
          this.scale.height,
          0x000000,        
          0.5              
        )
        overlay.setDepth(100)
    }
}
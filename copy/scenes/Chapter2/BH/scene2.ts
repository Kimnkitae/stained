import Phaser from 'phaser'
export class BrokenHouseScene2 extends Phaser.Scene {
    constructor() {
        super({key: 'BrokenHouseScene2'})
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
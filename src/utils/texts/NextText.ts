import Phaser from 'phaser'
export default class NextText extends Phaser.GameObjects.Text {
    constructor(
        scene: Phaser.Scene,
        text: string,
        endAll: () => void
    ) {
        super(scene, 0, 0, text);

       
        scene.add.existing(this);

        endAll();
    }
}
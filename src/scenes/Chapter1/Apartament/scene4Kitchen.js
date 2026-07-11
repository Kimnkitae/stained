import BaseKitchenScene  from './kitchen.js'

export class Chapter1ApartamentScene4Kitchen extends BaseKitchenScene {
    constructor() {
        super({ key: 'Chapter1ApartamentScene4Kitchen'})
    }

    create() {
        super.create()
        super.initPlayer(150, 300)
        
        
    }
}
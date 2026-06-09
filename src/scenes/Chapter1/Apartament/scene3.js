import BaseApartamentScene from './apartament.js'

export class Chapter1ApartamentScene3 extends BaseApartamentScene {
    constructor() {
        super({ key: 'Chapter1ApartamentScene3'})
    }

    create(data) {
        super.create()
        

        this.add.image(300, 600, 'placeholder')

             
        if(data && data.spawnPoint === 'exit' && data.from == 'kitchen') {
            super.initPlayer(850, 150)  
        }
        if(data && data.spawnPoint === 'exit' && data.from == 'room') {
            super.initPlayer(180, 150)  
        }
        if(data && data.spawnPoint === 'exit' && data.from == 'street') {
            super.initPlayer(510, 130) 
        }
        
        
    }

}
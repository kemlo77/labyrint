import { Model } from './model/model';

export class Controller {

    private model: Model;

    constructor(model: Model) {        
        this.model = model;
    }

    public generateLabyrinth(): void {        
        this.model.generateLabyrinth();
    }
}
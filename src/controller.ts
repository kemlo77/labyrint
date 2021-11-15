import { Model } from './model';

export class Controller {

    private model: Model;

    constructor(model: Model) {        
        this.model = model;
    }

    public aMazeMe(): void {        
        this.model.generateLabyrinth();
    }
}
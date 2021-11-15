export class Cell {

    private xCoordinate: number;
    private yCoordinate: number;
    private hasBeenVisited: boolean = false;
    private neighbouringCells: Cell[] = [];

    constructor(x: number, y: number) {
        this.xCoordinate = x;
        this.yCoordinate = y;
    }

    get neighbours(): Cell[]  {
        return this.neighbouringCells;
    }

    addNeighbour(cell: Cell): void {
        this.neighbouringCells.push(cell);
    }

    get visited(): boolean {
        return this.hasBeenVisited;
    }

    set visited(visited: boolean) {
        this.hasBeenVisited = visited;
    }

}
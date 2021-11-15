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

    get unvisitedNeighbours(): Cell[] {
        return this.neighbouringCells.filter(cell => cell.visited == false);
    }

    get hasNoUnvisitedNeighbours(): boolean {
        return this.unvisitedNeighbours.length == 0;
    }

    get randomUnvisitedNeighbour(): Cell {
        return this.unvisitedNeighbours[Math.floor(Math.random()* this.unvisitedNeighbours.length)];
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

    get x(): number{
        return this.xCoordinate;
    }

    get y(): number {
        return this.yCoordinate;
    }

}
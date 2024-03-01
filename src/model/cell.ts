import { Coordinate } from './coordinate';

export class Cell {

    private _center: Coordinate;
    private _width: number;
    private hasBeenVisited: boolean = false;
    private neighbouringCells: Cell[] = [];
    private _connectedNeighbouringCells: Cell[] = [];

    constructor(center: Coordinate, width: number) {
        this._center = center;
        this._width = width;
    }

    get center(): Coordinate {
        return this._center;
    }

    get width(): number {
        return this._width;
    }

    get neighbours(): Cell[] {
        return this.neighbouringCells;
    }

    get unvisitedNeighbours(): Cell[] {
        return this.neighbouringCells.filter(cell => !cell.visited);
    }

    get hasNoUnvisitedNeighbours(): boolean {
        return this.unvisitedNeighbours.length == 0;
    }

    get randomUnvisitedNeighbour(): Cell {
        const randomIndex: number = Math.floor(Math.random() * this.unvisitedNeighbours.length);
        return this.unvisitedNeighbours[randomIndex];
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

    get connectedNeighbouringCells(): Cell[] {
        return this._connectedNeighbouringCells;
    }

    removeEstablishedConnections(): void {
        this._connectedNeighbouringCells = [];
    }

    private addConnection(toCell: Cell): void {
        this._connectedNeighbouringCells.push(toCell);
    }

    private removeConnection(toCell: Cell): void {
        const index: number = this._connectedNeighbouringCells.indexOf(toCell);
        if (index > -1) {
            this._connectedNeighbouringCells.splice(index, 1);
        }
    }

    interconnectToCell(cell: Cell): void {
        this.addConnection(cell);
        cell.addConnection(this);
    }

    removeInterConnectionsToCell(): void {
        const interConnectedCells: Cell[] = [...this.connectedNeighbouringCells];
        interConnectedCells.forEach(otherCell => {
            this.removeConnection(otherCell);
            otherCell.removeConnection(this);
        });
    }

}
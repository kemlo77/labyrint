import { Coordinate } from './coordinate';

export class Cell {

    private _center: Coordinate;
    private _width: number;
    private _visited: boolean = false;
    private _neighbours: Cell[] = [];
    private _connectedNeighbours: Cell[] = [];

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

    get visited(): boolean {
        return this._visited;
    }

    set visited(visited: boolean) {
        this._visited = visited;
    }

    get neighbours(): Cell[] {
        return this._neighbours;
    }

    get unvisitedNeighbours(): Cell[] {
        return this._neighbours.filter(cell => !cell.visited);
    }

    get hasNoUnvisitedNeighbours(): boolean {
        return this.unvisitedNeighbours.length == 0;
    }

    get randomUnvisitedNeighbour(): Cell {
        const randomIndex: number = Math.floor(Math.random() * this.unvisitedNeighbours.length);
        return this.unvisitedNeighbours[randomIndex];
    }

    addNeighbour(cell: Cell): void {
        this._neighbours.push(cell);
    }

    get connectedNeighbours(): Cell[] {
        return this._connectedNeighbours;
    }

    removeEstablishedConnections(): void {
        this._connectedNeighbours = [];
    }

    establishConnectionTo(cell: Cell): void {
        this.addConnection(cell);
        cell.addConnection(this);
    }

    private addConnection(toCell: Cell): void {
        this._connectedNeighbours.push(toCell);
    }

    removeConnectionsToCell(): void {
        const connectedCells: Cell[] = [...this.connectedNeighbours];
        connectedCells.forEach(otherCell => {
            this.removeConnection(otherCell);
            otherCell.removeConnection(this);
        });
    }

    private removeConnection(toCell: Cell): void {
        const index: number = this._connectedNeighbours.indexOf(toCell);
        if (index > -1) {
            this._connectedNeighbours.splice(index, 1);
        }
    }

}
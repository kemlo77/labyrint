import { Segment } from '../../segment';
import { Coordinate } from '../../coordinate';

export abstract class Cell {

    private _center: Coordinate;
    private _width: number;
    private _visited: boolean = false;
    private _neighbours: Cell[] = [];
    private _connectedNeighbours: Cell[] = [];
    protected _corners: Coordinate[];

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

    get corners(): Coordinate[] {
        return [... this._corners];
    }

    get borders(): Segment[] {
        const newBorders: Segment[] = [];
        for (let i: number = 0; i < this._corners.length; i++) {
            const lastCorner: boolean = i === this._corners.length - 1;
            if (lastCorner) {
                break;
            }
            newBorders.push(new Segment(this._corners[i], this._corners[i + 1]));
        }
        newBorders.push(new Segment(this._corners[this._corners.length - 1], this._corners[0]));
        return newBorders;
    }

    get closedBorders(): Segment[] {
        const closedBorders: Segment[] = [];
        const allConnectedNeighbourBorders: Segment[] =
            this.connectedNeighbours.reduce((acc, neighbour) => acc.concat(neighbour.borders), []);

        for (const border of this.borders) {
            let borderIsOpen: boolean = false;

            for (const neighbourBorder of allConnectedNeighbourBorders) {
                const distance: number = border.midpoint.distanceTo(neighbourBorder.midpoint);
                const borderIsCommonWithConnectedNeighbour: boolean = distance < 0.1;
                if (borderIsCommonWithConnectedNeighbour) {
                    borderIsOpen = true;
                    break;
                }
            }

            if (!borderIsOpen) {
                closedBorders.push(border);
            }
        }
        return closedBorders;
    }

}
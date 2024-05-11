import { Segment } from '../../segment';
import { Coordinate } from '../../coordinate';

export class Cell {

    private _center: Coordinate;
    private _visited: boolean = false;
    private _neighbours: Cell[] = [];
    private _connectedNeighbours: Cell[] = [];
    private _corners: Coordinate[];

    constructor(center: Coordinate, corners: Coordinate[]) {
        this._center = center;
        this._corners = corners;
    }

    get center(): Coordinate {
        return this._center;
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

    establishNeighbourRelationTo(cell: Cell): void {
        this.addNeighbour(cell);
        cell.addNeighbour(this);
    }

    private addNeighbour(cell: Cell): void {
        if (this._neighbours.includes(cell)) {
            return;
        }
        this._neighbours.push(cell);
    }

    get connectedNeighbours(): Cell[] {
        return this._connectedNeighbours;
    }


    establishConnectionTo(cell: Cell): void {
        this.addConnection(cell);
        cell.addConnection(this);
    }

    private addConnection(toCell: Cell): void {
        if (this._connectedNeighbours.includes(toCell)) {
            return;
        }
        this._connectedNeighbours.push(toCell);
    }

    removeEstablishedConnections(): void {
        this._connectedNeighbours = [];
    }

    removeConnectionsToCell(): void {
        const connectedCells: Cell[] = [...this.connectedNeighbours];
        connectedCells.forEach(otherCell => {
            this.removeConnection(otherCell);
            otherCell.removeConnection(this);
        });
    }

    private removeConnection(toCell: Cell): void {
        this._connectedNeighbours = this._connectedNeighbours.filter(cell => cell !== toCell);
    }

    hasCommonBorderWith(cell: Cell): boolean {
        return this.borders.some(border => {
            return cell.borders.some(otherBorder => {
                return this.bordersAreAdjacent(border, otherBorder);
            });
        });
    }

    commonCornersWith(cell: Cell): Coordinate[] {
        const commonCorners: Coordinate[] = [];
        for (const corner of this._corners) {
            for (const otherCorner of cell.corners) {
                if (corner.distanceTo(otherCorner) < 0.1) {
                    commonCorners.push(corner);
                }
            }
        }
        return commonCorners;
    }

    private bordersAreAdjacent(border: Segment, otherBorder: Segment): boolean {
        return border.midpoint.distanceTo(otherBorder.midpoint) < 0.1;
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
                if (this.bordersAreAdjacent(border, neighbourBorder)) {
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
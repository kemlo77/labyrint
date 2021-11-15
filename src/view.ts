import { Cell } from './cell';

export class View {



    plotNumberOfNeighbours(grid: Cell[][]): void {
        let totalString: string = '';
        grid.forEach( row => {
            let tempstr: string ='';
            row.forEach( cell => {
                tempstr+=' ' + cell.neighbours.length;
            });
            totalString+= tempstr + '\n';
        });
        console.log(totalString);
    }

    plotTheVisitCount(grid: Cell[][]): void {
        let totalString: string = '';
        grid.forEach( row => {
            let tempstr: string ='';
            row.forEach( cell => {
                tempstr+=' ' + cell.visited?1:0;
            });
            totalString+= tempstr + '\n';
        });
        console.log(totalString);
    }
}
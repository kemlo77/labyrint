export class MatrixOperations {

    private constructor() {
        //
    }


    static transpose<Type>(matrix: Type[][]): Type[][] {
        const newArrayOfArrays: Type[][] = [];
        for (let column: number = 0; column < matrix[0].length; column++) {
            const newRow: Type[] = [];
            for (let row: number = 0; row < matrix.length; row++) {
                newRow.push(matrix[row][column]);
            }
            newArrayOfArrays.push(newRow);
        }
        return newArrayOfArrays;
    }

    static printMatrix<Type>(matrix: Type[][], functionToPrint: (cell: Type) => number): void {
        console.log('');
        matrix.forEach(column => {
            console.log('\t' + column.map(cell => functionToPrint(cell)).join(', '));
        });
        console.log('');
    }

}
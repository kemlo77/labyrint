import { Grid } from '../grid/grid';
import { Segment } from '../segment';

export interface MazeGenerationAlgorithm {
    generateMaze(grid: Grid): Segment[];
}
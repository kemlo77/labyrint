export abstract class View {

    private canvasElement: HTMLCanvasElement = document.getElementById('myCanvas') as HTMLCanvasElement;
    protected canvasCtx: CanvasRenderingContext2D = this.canvasElement.getContext('2d');

    clearTheCanvas(): void {
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    abstract drawConnection(x1: number, y1: number, x2:number, y2: number): void;

    paintCellCenter(x: number, y: number): void {
        this.canvasCtx.fillStyle = 'rgba(255,0,0,1)';
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(x, y, 3, 0, 2 * Math.PI);
        this.canvasCtx.fill();
    }

}
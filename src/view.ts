export class View {

    private canvasElement: HTMLCanvasElement = document.getElementById('myCanvas') as HTMLCanvasElement;
    private canvasCtx: CanvasRenderingContext2D = this.canvasElement.getContext('2d');

    clearTheCanvas(): void {
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    drawConnection(x1: number, y1: number, x2:number, y2: number, width: number): void {
        this.canvasCtx.strokeStyle = 'rgba(255,255,255,1)';
        this.canvasCtx.lineWidth = width;
        this.canvasCtx.lineCap = 'round';
        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(x1, y1);
        this.canvasCtx.lineTo(x2, y2);
        this.canvasCtx.stroke();
    }

}
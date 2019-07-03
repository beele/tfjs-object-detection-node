import {yolov3, yolov3Tiny} from "./yolo/yolo";
import {createCanvas, Image} from "canvas";
import {createCocoModel, ObjectDetection} from "./coco/coco";

export async function loadYoloV3Lite(): Promise<Detector> {
    const model = await yolov3Tiny();
    const detector = {
        async detect(image: Image): Promise<Detection[]> {
            const start = Date.now();
            const results = await model(image);

            printProcessDuration('Tiny YOLO', start);
            printResults(results);

            return Promise.resolve(results);
        }
    };
    return Promise.resolve(detector);
}

export async function loadYoloV3(): Promise<Detector> {
    const model = await yolov3();
    const detector = {
        async detect(image: Image): Promise<Detection[]> {
            const start = Date.now();
            const results = await model(image);

            printProcessDuration('YOLO', start);
            printResults(results);

            return Promise.resolve(results);
        }
    };
    return Promise.resolve(detector);
}

export async function loadCoco(useLiteModel: boolean): Promise<Detector> {
    const model: ObjectDetection = await createCocoModel(useLiteModel);
    const detector = {
        async detect(image: Image): Promise<Detection[]> {
            const start = Date.now();

            const canvas = createCanvasFromImage(image);
            const results = await model.detect(canvas);

            printProcessDuration('COCO', start);
            printResults(results);

            return Promise.resolve(results);
        }
    };
    return Promise.resolve(detector);
}

function createCanvasFromImage(image: Image): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = createCanvas(image.width, image.height) as unknown as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image as unknown as HTMLImageElement, 0, 0, image.width, image.height);
    return canvas;
}

function printProcessDuration(name: string, start: number): void {
    console.log(name + ' processing took: ' + (Date.now() - start) + 'ms');
}

function printResults(results: any[]): void {
    console.log('---------------------------------------');
    for (const result of results) {
        console.log('==> Detected: ' + result.class + ' [' + Math.round(result.score * 100) + '%]');
    }
    console.log('');
}

export interface Detection {
    class: string;
    score: number;
}

export interface Detector {
    detect(image: Image): Promise<Detection[]>
}

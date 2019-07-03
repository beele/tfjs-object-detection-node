import {yolov3, yolov3Tiny} from "./yolo/yolo";
import {loadImage, createCanvas, Image} from "canvas";
import {createCocoModel, ObjectDetection} from "./coco/coco";

export async function loadYoloV3Lite(basePath?: string): Promise<Detector> {
    const model = await yolov3Tiny(basePath);
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

export async function loadYoloV3(basePath?: string): Promise<Detector> {
    const model = await yolov3(basePath);
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

export async function loadCoco(useLiteModel: boolean, basePath?:string): Promise<Detector> {
    const model: ObjectDetection = await createCocoModel(useLiteModel, basePath);
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

export async function createImage(pathOrUrl: string): Promise<Image> {
    return loadImage(pathOrUrl);
}

export function createCanvasFromImage(image: Image): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = createCanvas(image.width, image.height) as unknown as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image as unknown as HTMLImageElement, 0, 0, image.width, image.height);
    return canvas;
}

function printProcessDuration(name: string, start: number): void {
    console.log(name + ' processing took: ' + (Date.now() - start) + 'ms');
}

function printResults(results: any[]): void {
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

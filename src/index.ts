import {yolov3, yolov3Tiny} from "./yolo/yolo";
import {Image, loadImage} from "canvas";

async function start () {
    //const yolo = await yolov3Tiny();
    const yolo = await yolov3();

    //const image = await loadImage('./images/example.jpeg');
    setInterval(async () => {

        //Try online with: https://zqingr.github.io/tfjs-yolov3-demo/
        const image: Image = await loadImage('./resources/images/example.jpg');
        const boxes = await yolo(image);
        console.log(boxes);
    }, 2500);
}
start();
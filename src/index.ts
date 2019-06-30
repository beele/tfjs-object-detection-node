import {yolov3, yolov3Tiny} from "./yolo/yolo";
import {Image, loadImage} from "canvas";

async function start () {
    //const yolo = await yolov3Tiny();  // pre-load model (35M)
    const yolo = await yolov3();        // pre-load model (245M)

    //const image = await loadImage('./images/example.jpeg');
    setInterval(async () => {

        //Try online with: https://zqingr.github.io/tfjs-yolov3-demo/
        const image: Image = await loadImage('http://192.168.1.8/snap.jpeg');
        const boxes = await yolo(image);
        console.log(boxes);
    }, 2500);
}
start();
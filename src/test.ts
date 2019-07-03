import {createImage, Detector, loadCoco, loadYoloV3, loadYoloV3Lite} from "./index";

async function start () {

    let yoloV3Lite: Detector = await loadYoloV3Lite();
    let yoloV3: Detector = await loadYoloV3();
    let coco: Detector = await loadCoco(false);

    const images: string[] = ['example.jpg'];
    for (const imgName of images) {
        console.log('=======================================');
        console.log('Detecting objects in: ' + imgName);
        console.log('=======================================');

        const image = await createImage('./resources/images/' + imgName);
        await yoloV3Lite.detect(image);
        await yoloV3.detect(image);
        await coco.detect(image);

        console.log('');
    }
}
start();

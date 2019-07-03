#Tensorflow.js Object Detection for Node

This project brings Yolo V3 and Coco to node and can be run on a raspberry pi (only tested on 4GB raspberry pi 4).

For local testing just execute `npm install` and then `npm run exec` to test the program.
Make sure you have a recent version of node installed!

For running on the raspberry pi it is required to first execute: `npm run install-debs-raspberry` before running `npm install`

This project is based on: https://github.com/zqingr/tfjs-yolov3/blob/master/README_EN.md
and on: https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd

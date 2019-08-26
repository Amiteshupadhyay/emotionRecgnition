import React from 'react';
import Webcam from "react-webcam";
import tinyFaceDetector from '../models/tinyFaceDetector.json';
import faceLandmark68Net from '../models/faceLandmark68Net.json';
import faceRecognitionNet from '../models/faceRecognitionNet.json';
import faceExpressionNet from '../models/faceExpressionNet.json';
import * as faceapi from '../../src/face-api.min.js';
import check from '../Container/webcam'
// import Cam from './Presentational/cam';


class MainClass extends React.Component {
  setRef = Webcam => {
    this.Webcam = Webcam;
  };

  
    Promise.all([
        faceapi.nets.tinyFaceDetectortinyFaceDetector.loadFromUri('/model'),
        faceapi.nets.faceLandmark68Net.faceLandmark68Net('/model'),
        faceapi.nets.faceRecognitionNet.faceRecognitionNet('/model'),
        faceapi.nets.faceExpressionNet.faceExpressionNet('/model')
    ]);
  
  

  getVideo = () => {
    const video1 = document.getElementsByClassName("vid");
    const video = video1[0];
    console.log(video.width);
    video.addEventListener('play', () => {
      const canvas = window.createCanvasFromMedia(video)
      document.body.append(canvas)
      console.log(canvas);
      const displaySize = { width: video.width, height: video.height }
      //  console.log(width, height);
      window.faceapi.matchDimensions(canvas, displaySize)
      setInterval(async () => {
        const detections = await window.window.faceapi.detectAllFaces(video, new window.faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const resizedDetections = window.faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        window.faceapi.draw.drawDetections(canvas, resizedDetections)
        window.faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        window.faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
      }, 100)
    })
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    return (
      <div>

        <div id="video">
          <Webcam
            className="vid"
            ref={this.setRef}
            audio={false}
            videoConstraints={videoConstraints}
          />
        </div>
        <div>
          <button onClick={this.getVideo} />
        </div>
      </div>
    );
  }
}
export default MainClass;
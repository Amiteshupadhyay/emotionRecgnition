import React from 'react';
import Webcam from "react-webcam";

class Cam extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  video = document.getElementById("vid");

  startVideo = (video) => {
    const media = {
      video: {},
      audio: {}
    }
    navigator.getUserMedia(media,
      stream => media.video.srcObject = stream,
      err => console.error(err)
    )
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    return (

      <Webcam
        audio={false}
        videoConstraints={videoConstraints}
      />
    );
  }
}
export default Cam;

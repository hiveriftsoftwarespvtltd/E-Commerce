import React from "react";


const videos = [
  {
    poster:
      "https://pin.it/jERXxMHkH",
    src:
      "/videos/video1.mp4",
  },
  {
    poster:
      "https://pin.it/1Iq2fHeDQ",
    src:
      "/videos/video2.mp4",
  },
  {
    poster:
      "https://pin.it/1YRcEep0f",
    src:
      "/videos/video3.mp4",
  },
  {
    poster:
      "https://pin.it/xtXFCJnQj",
    src:
      "/videos/video4.mp4",
  },
  {
    poster:
      "https://pin.it/E99gZh5vI",
    src:
      "/videos/video5.mp4",
  },
  {
    poster:
      "https://pin.it/E99gZh5vI",
    src:
      "/videos/video6.mp4",
  },
  {
    poster:
      "https://pin.it/E99gZh5vI",
    src:
      "/videos/video7.mp4",
  },
  {
    poster:
      "https://pin.it/E99gZh5vI",
    src:
      "/videos/video8.mp4",
  },
  {
    poster:
      "https://pin.it/E99gZh5vI",
    src:
      "/videos/video9.mp4",
  },
  
];

const VideoSlider = () => {
  return (
    <div className="w-full py-10 overflow-hidden">
  <style>
    {`
      @keyframes scrollVideos {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}
  </style>

  <div className="flex w-max animate-[scrollVideos_40s_linear_infinite]">

    {/* ORIGINAL */}
    <div className="flex gap-6 shrink-0">
      {videos.map((v, idx) => (
        <video
          key={idx}
          className="w-[350px] h-[500px] object-cover rounded-xl cursor-pointer"
          muted
          loop
          autoPlay
          playsInline
          
        >
          <source src={v.src} type="video/mp4" />
        </video>
      ))}
    </div>

    {/* CLONE */}
    <div className="flex gap-6 shrink-0 ml-6">
      {videos.map((v, idx) => (
        <video
          key={idx + "clone"}
          className="w-[350px] h-[500px] object-cover rounded-xl cursor-pointer"
          muted
          loop
          autoPlay
          playsInline
          
        >
          <source src={v.src} type="video/mp4" />
        </video>
      ))}
    </div>

  </div>
</div>
  );
};

export default VideoSlider;

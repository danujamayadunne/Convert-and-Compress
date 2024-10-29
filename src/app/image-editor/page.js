"use client";

import React, { useRef, useState } from "react";

export default function ImageEditor() {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cropping, setCropping] = useState(false);
  const [startCrop, setStartCrop] = useState({ x: 0, y: 0 });
  const [croppingData, setCroppingData] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [rotation, setRotation] = useState(0);
  const [text, setText] = useState("");
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [isDraggingText, setIsDraggingText] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [textAdded, setTextAdded] = useState(false); // Track if text has been added

  const loadImage = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    imgRef.current = new window.Image();
    const img = imgRef.current;
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = () => {
      setImageLoaded(true);
      canvasRef.current.width = img.width;
      canvasRef.current.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
  };

  const startCropAction = (e) => {
    setIsCropping(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setStartCrop({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const performCropping = (e) => {
    if (isCropping) {
      const rect = canvasRef.current.getBoundingClientRect();
      setCroppingData({
        x: startCrop.x,
        y: startCrop.y,
        width: e.clientX - rect.left - startCrop.x,
        height: e.clientY - rect.top - startCrop.y,
      });
    }
  };

  const finishCropAction = () => {
    setIsCropping(false);
    applyCrop();
  };

  const applyCrop = () => {
    const ctx = canvasRef.current.getContext("2d");
    const { x, y, width, height } = croppingData;
    const img = imgRef.current;
    const croppedImage = ctx.getImageData(x, y, width, height);
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    ctx.putImageData(croppedImage, 0, 0);
  };

  const handleRotate = () => {
    const ctx = canvasRef.current.getContext("2d");
    const img = imgRef.current;
    canvasRef.current.width = img.height;
    canvasRef.current.height = img.width;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.translate(canvasRef.current.width / 2, canvasRef.current.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.resetTransform();
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const addTextToCanvas = () => {
    setTextAdded(true);
    renderCanvas();
  };

  const startTextDrag = () => {
    setIsDraggingText(true);
  };

  const dragText = (e) => {
    if (isDraggingText) {
      const rect = canvasRef.current.getBoundingClientRect();
      setTextPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const endTextDrag = () => {
    setIsDraggingText(false);
    renderCanvas();
  };

  const renderCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    const img = imgRef.current;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(img, 0, 0);
    if (textAdded) {
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(text, textPosition.x, textPosition.y);
    }
  };

  const exportImage = () => {
    renderCanvas();
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={loadImage} />
      <canvas style={{width: "300px", height: "300px"}}
        ref={canvasRef}
        onMouseDown={(e) => {
          if (!text || isCropping) {
            startCropAction(e);
          } else {
            startTextDrag(e);
          }
        }}
        onMouseMove={(e) => {
          if (isCropping) {
            performCropping(e);
          } else {
            dragText(e);
          }
        }}
        onMouseUp={(e) => {
          if (isCropping) {
            finishCropAction(e);
          } else {
            endTextDrag(e);
          }
        }}
      />
      {imageLoaded && (
        <div>
          <input
            type="range"
            min="0"
            max="360"
            value={rotation}
            onChange={(e) => setRotation(e.target.value)}
            onMouseUp={handleRotate}
          />
          <input type="text" value={text} onChange={handleTextChange} />
          <button onClick={addTextToCanvas}>Add Text</button>
          <button onClick={exportImage}>Export Image</button>
        </div>
      )}
    </div>
  );
}
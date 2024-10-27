import { useEffect, useRef, useState } from "react";
import "./index.css";
import canvasURL from "./canvas_to_img";

export default function BoundingBoxOnImage() {
  const imageDiseaseRef = useRef() as any;
  const canvasDiseaseRef = useRef() as any;
  const [canvasUrl, setCanvasUrl] = useState();

  const PaintCanvas = (
    annotationArray: {
      point: { x: number; y: number }[];
    }[]
  ) => {
    //initialize canvas
    const ctx = canvasDiseaseRef.current.getContext("2d");

    //get original image dimension
    const imgWidth = imageDiseaseRef.current.naturalWidth;
    const imgHeight = imageDiseaseRef.current.naturalHeight;

    //set canvas to be in the original dimension
    canvasDiseaseRef.current.width = imgWidth;
    canvasDiseaseRef.current.height = imgHeight;

    annotationArray.forEach((item) => {
      ctx.beginPath();
      item.point.forEach((annotationPoint) => {
        const xCoord = annotationPoint.x;
        const yCoord = annotationPoint.y;
        ctx.lineTo(xCoord, yCoord);
      });
      ctx.strokeStyle = "#FF0000";
      ctx.stroke();
      ctx.lineWidth = 3;
    });

    const imgUrl = canvasURL("canvas_id");
    setCanvasUrl(imgUrl);
  };

  useEffect(() => {
    PaintCanvas([
      {
        point: [
          {
            x: 173,
            y: 25,
          },
          {
            x: 592,
            y: 25,
          },
          {
            x: 646,
            y: 25,
          },
          {
            x: 79,
            y: 52,
          },
          {
            x: 173,
            y: 104,
          },
          {
            x: 340,
            y: 104,
          },
          {
            x: 555,
            y: 104,
          },
          {
            x: 688,
            y: 129,
          },
          {
            x: 763,
            y: 129,
          },
          {
            x: 512,
            y: 154,
          },
          {
            x: 541,
            y: 154,
          },
          {
            x: 663,
            y: 154,
          },
          {
            x: 228,
            y: 179,
          },
          {
            x: 272,
            y: 331,
          },
          {
            x: 366,
            y: 331,
          },
          {
            x: 420,
            y: 331,
          },
          {
            x: 634,
            y: 331,
          },
          {
            x: 663,
            y: 356,
          },
          {
            x: 748,
            y: 356,
          },
          {
            x: 777,
            y: 356,
          },
        ],
      },
    ]);
  }, []);
  return (
    <div className="aad-itt-w-full">
      <div className="aad-itt-w-full aad-itt-canvas-overlay-ctn">
        <img
          src={canvasUrl}
          alt="canvas overlay"
          className="aad-itt-w-full aad-itt-canvas-coords-img"
        />
        <img
          src={"./images/screengrab.png"}
          alt="crop"
          className="aad-itt-w-full"
        />
      </div>
      {/* get canvas and image properties */}
      <div className="aad-itt-d-none">
        <img
          src={"./images/screengrab.png"}
          alt="screengrab"
          title=""
          ref={imageDiseaseRef}
          className="aad-itt-w-full"
        />
        <canvas
          ref={canvasDiseaseRef}
          id="canvas_id"
          className="aad-itt-w-full"
        />
      </div>
      {/* get canvas and image properties */}
    </div>
  );
}

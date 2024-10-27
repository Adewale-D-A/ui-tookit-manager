import { ReactNode, useCallback, useEffect, useState } from "react";
import ChevronLeft from "../../assets/icons/chevron-left";
import ChevronRight from "../../assets/icons/chevron-right";
import "./index.css";

export default function ImageCarousel({
  images,
  classnames,
  autoTransitionOptions,
}: {
  images: { url: string; child?: ReactNode }[];
  classnames?: {
    parentContainer?: string;
    image?: string;
    counterContainer?: string;
    counterButton?: string;
    counterButtonActive?: string;
    counterButtonInactive?: string;
    navigationButtonContainer?: string;
    navigationButton?: string;
    childContainer?: string;
  };
  autoTransitionOptions?: {
    allow: boolean;
    seconds: number;
  };
}) {
  const [mouseOver, setMouseOver] = useState(false);
  const [seconds, setSeconds] = useState(autoTransitionOptions?.seconds || 5);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // productsArray next function
  const showNextImage = useCallback(() => {
    if (currentImgIndex + 1 < images?.length) {
      setCurrentImgIndex((prev) => prev + 1);
    } else {
      setCurrentImgIndex(0);
    }
  }, [images, currentImgIndex]);

  // productsArray next previous
  const showPrevImage = useCallback(() => {
    if (currentImgIndex > 0) {
      setCurrentImgIndex((prev) => prev - 1);
    } else {
      setCurrentImgIndex(images?.length - 1);
    }
  }, [currentImgIndex, images]);

  const changeImage = useCallback((index: number) => {
    setCurrentImgIndex(index);
  }, []);

  //set countdown timer
  useEffect(() => {
    if (autoTransitionOptions?.allow && !mouseOver) {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setSeconds(autoTransitionOptions?.seconds || 5);
        setCurrentImgIndex((prev) =>
          prev + 1 > images?.length - 1 ? 0 : prev + 1
        );
      }
    }
  });
  return (
    <div
      className={
        classnames?.parentContainer || "aad-ic-parent-ctn add-ic-bg-black"
      }
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <img
        src={images[currentImgIndex]?.url}
        alt={"carouse-image"}
        className={classnames?.image || "aad-ic-img"}
      />
      <div className={classnames?.counterContainer || "aad-ic-counter-ctn"}>
        {Array.from({ length: images?.length }, (_, index) => {
          return (
            <button
              type="button"
              title="change image"
              onClick={() => changeImage(index)}
              key={index}
              className={`${
                classnames?.counterButton || "aad-ic-counter-item"
              } ${
                index === currentImgIndex
                  ? classnames?.counterButtonActive ||
                    "aad-ic-counter-item-active"
                  : classnames?.counterButtonInactive ||
                    " aad-ic-counter-item-inactive"
              }`}
            ></button>
          );
        })}
      </div>
      <div
        className={
          classnames?.navigationButtonContainer || "aad-ic-nav-btn-ctn"
        }
      >
        <button
          title="previous"
          type="button"
          onClick={() => showPrevImage()}
          className={classnames?.navigationButton || "aad-ic-nav-btn"}
        >
          <ChevronLeft className="aad-ic-icon" />
        </button>
        <button
          type="button"
          title="next"
          onClick={() => showNextImage()}
          className={classnames?.navigationButton || "aad-ic-nav-btn"}
        >
          <ChevronRight className="aad-ic-icon" />
        </button>
      </div>
      <div className={classnames?.childContainer || "aad-ic-children-ctn"}>
        {images[currentImgIndex]?.child}
      </div>
    </div>
  );
}

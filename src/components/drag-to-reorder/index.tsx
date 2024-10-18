import "./index.css";
import { useCallback, useRef, useState } from "react";

export default function DragToReorder() {
  let destinationValue = "";
  let originValue = "";
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dataset, setDataset] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  // const containerChildrenOrder = useCallback(() => {
  //   const childrenCollection = containerRef.current?.children as HTMLCollection;
  //   const currentOrder = Array.prototype.slice
  //     .call(childrenCollection)
  //     ?.map((item) => item?.dataset?.index);
  //   return currentOrder;
  // }, [containerRef]);

  // drag destination dataset-index
  const dragEnter = useCallback((e: any) => {
    e?.preventDefault();
    const targetIndex = e?.target?.parentNode?.dataset?.index;
    return targetIndex || "";
  }, []);

  // drag origin dataset-index
  const dragEnd = useCallback((e: any) => {
    e?.preventDefault();
    const targetIndex = e?.target?.parentNode?.dataset?.index;
    return targetIndex || "";
  }, []);

  const dragHandler = useCallback((destination: any, origin: any) => {
    destinationValue = dragEnter(destination) || destinationValue;
    originValue = dragEnd(origin) || originValue;
    const destinationValueIndex = Number(destinationValue);
    const originValueIndex = Number(originValue);
    if (destinationValueIndex && originValueIndex) {
      setDataset((prev) => {
        const reorderedDeepCopy = [...prev];
        reorderedDeepCopy.splice(
          prev.indexOf(destinationValueIndex),
          1,
          prev[prev.indexOf(originValueIndex)]
        );
        reorderedDeepCopy.splice(
          prev.indexOf(originValueIndex),
          1,
          prev[prev.indexOf(destinationValueIndex)]
        );
        return reorderedDeepCopy;
      });
    }
  }, []);

  return (
    <div className="aad-dr-d-grid" draggable ref={containerRef}>
      {dataset?.map((item) => (
        <div
          key={item}
          className="aad-dr-grid-item aad-dr-w-full add-dr-grabbable"
          data-index={item}
          draggable
          onDragEnter={(e) => dragHandler(e, undefined)} //get destination index
          onDragEnd={(e) => dragHandler(undefined, e)} //get drag origin
        >
          <img
            src={`https://placehold.co/40x40/0fb/fff?text=${item}`}
            alt={`${item}`}
            className=" aad-dr-w-full"
          />
        </div>
      ))}
    </div>
  );
}

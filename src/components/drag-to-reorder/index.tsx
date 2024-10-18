import BinIcon from "../../assets/icons/bin";
import "./index.css";
import { useCallback, useRef } from "react";

export default function DragToReOrder({
  data,
  setData,
  classnames,
  allowDelete,
}: {
  data: { id: string; image?: string; text?: string }[];
  setData: Function;
  classnames?: {
    parentContainer?: string;
    childContainer?: string;
    image?: string;
    text?: string;
    binButton?: string;
    binIcon?: string;
  };
  allowDelete?: boolean;
}) {
  let destinationValue = "";
  let originValue = "";
  const containerRef = useRef<HTMLDivElement | null>(null);

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

    if (destinationValue && originValue) {
      setData((prev: { id: string }[]) => {
        const destinationValueIndexPosition = prev.findIndex(
          (item) => item?.id === destinationValue
        ); //destination index
        const originValueIndexPosition = prev.findIndex(
          (item) => item?.id === originValue
        ); //origin index

        // only return the rearranged value when operation is done without any  errors, else return the original values
        if (
          destinationValueIndexPosition >= 0 &&
          originValueIndexPosition >= 0
        ) {
          const reorderedDeepCopy = [...prev];
          // replace dropped position with dragged value using ID matching
          reorderedDeepCopy.splice(
            destinationValueIndexPosition, //replace index where destionation value matches the item ID
            1, // Only replace one item
            prev[originValueIndexPosition] //replace with value  from origin where original value matches  the item ID
          );
          // replace original position with the value in the dropped position to complete swapping
          reorderedDeepCopy.splice(
            originValueIndexPosition, //replace index where original value matches the item ID
            1, // Only replace one item
            prev[destinationValueIndexPosition] //replace with value from destination where destination value matches  the item ID
          );
          return reorderedDeepCopy;
        } else return prev;
      });
    }
  }, []);

  const removeItem = useCallback((index: number) => {
    setData((prev: { id: string }[]) => {
      const deepCopy = [...prev];
      deepCopy.splice(index, 1);
      return deepCopy;
    });
  }, []);
  return (
    <div
      className={classnames?.parentContainer || "aad-dr-d-grid"}
      draggable
      ref={containerRef}
    >
      {data?.map((item, index) => (
        <div
          key={item?.id}
          className={
            classnames?.childContainer ||
            "aad-dr-grid-item aad-dr-w-full add-dr-grabbable"
          }
          data-index={item?.id}
          draggable
          onDragEnter={(e) => dragHandler(e, undefined)} //get destination index
          onDragEnd={(e) => dragHandler(undefined, e)} //get drag origin
        >
          {item?.image && (
            <img
              src={item?.image}
              alt={`${item?.id}`}
              className={classnames?.image || " aad-dr-w-full"}
            />
          )}
          {item?.text && (
            <span className={classnames?.text || "aad-dr-tex"}>
              {item?.text}
            </span>
          )}
          {allowDelete && (
            <button
              onClick={() => removeItem(index)}
              className={classnames?.binButton || "aad-dr-bin-icon-button"}
            >
              <BinIcon className={classnames?.binIcon || "aad-dr-bin-icon"} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

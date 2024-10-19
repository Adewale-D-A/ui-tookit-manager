import { ChangeEvent, useCallback } from "react";
import BinIcon from "../../assets/icons/bin";
import InputFieldIcon from "../../assets/icons/input";
import "./index.css";

export default function DragToReOrder({
  data,
  setData,
  classnames,
  allowDelete,
  inputConfigration,
}: {
  data: {
    id: string;
    image?: string;
    text?: string;
    inputFieldText?: string;
    showInputField?: boolean;
  }[];
  setData: Function;
  classnames?: {
    parentContainer?: string;
    childContainer?: string;
    image?: string;
    text?: string;
    binButton?: string;
    binIcon?: string;
    input?: string;
    inputIcon?: string;
    enableInputIcon?: string;
  };
  allowDelete?: boolean;
  inputConfigration?: {
    allowField?: boolean;
    rows?: number;
  };
}) {
  let destinationValue = "";
  let originValue = "";
  // const containerRef = useRef<HTMLDivElement | null>(null);

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

  // handle drag and drop logic
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

  // handle user input
  const handleUserInput = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>, index: number) => {
      setData((prev: { inputFieldText: string }[]) => {
        const originalContent = prev[index];
        const deecopy = [...prev];
        deecopy.splice(
          index, //position to replace
          1, // number of items to replace
          { ...originalContent, inputFieldText: e?.target?.value } //replacement value
        );
        return deecopy;
      });
    },
    []
  );

  // remove item from list
  const removeItem = useCallback((index: number) => {
    setData((prev: { id: string }[]) => {
      const deepCopy = [...prev];
      deepCopy.splice(index, 1);
      return deepCopy;
    });
  }, []);

  // toggle input field display
  const showTextInputField = useCallback((index: number) => {
    setData((prev: { showInputField: boolean }[]) => {
      const originalContent = prev[index];
      const deecopy = [...prev];
      deecopy.splice(
        index, //position to replace
        1, // number of items to replace
        {
          ...originalContent,
          showInputField: Boolean(!originalContent?.showInputField),
        } //replacement value
      );
      return deecopy;
    });
  }, []);

  return (
    <div
      className={classnames?.parentContainer || "aad-dr-d-grid"}
      draggable
      // ref={containerRef}
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
          {/* only for image */}
          {item?.image && (
            <img
              src={item?.image}
              alt={`${item?.id}`}
              className={classnames?.image || " aad-dr-w-full"}
            />
          )}
          {/* only for text */}
          {item?.text && (
            <span className={classnames?.text || "aad-dr-tex"}>
              {item?.text}
            </span>
          )}
          {/* only for feature to delete  */}
          {allowDelete && (
            <button
              onClick={() => removeItem(index)}
              className={classnames?.binButton || "aad-dr-bin-icon-button"}
              title="delete item"
            >
              <BinIcon className={classnames?.binIcon || "aad-dr-bin-icon"} />
            </button>
          )}
          {/* only when input field is anabled by each item */}
          {inputConfigration?.allowField && (
            <button
              onClick={() => showTextInputField(index)}
              className={
                classnames?.binButton || "aad-dr-text-field-icon-button"
              }
              title="toggle input field display"
            >
              {/* use default class,  if no class is provided. if text field is enabled for 
              this item and custom class is passed, use custom class, else us ddefault class 
              and if field is not enabled, remove icon styling              
              */}

              <InputFieldIcon
                className={`${classnames?.inputIcon || "aad-dr-bin-icon"} ${
                  item?.showInputField && classnames?.enableInputIcon
                    ? classnames?.enableInputIcon
                    : item?.showInputField
                    ? "add-dr-input-icon-enabled"
                    : ""
                }`}
              />
            </button>
          )}
          {/* show input field when option is enabled and item contains field for input text */}
          {inputConfigration?.allowField && item?.showInputField && (
            <textarea
              id={item?.id}
              value={item?.inputFieldText || ""}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                handleUserInput(e, index)
              }
              rows={inputConfigration?.rows || 1}
              className={classnames?.input || "aad-dr-input-field"}
            />
          )}
        </div>
      ))}
    </div>
  );
}

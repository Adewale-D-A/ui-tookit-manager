import { useState } from "react";
import DragToReOrder from "../../components/drag-to-reorder";

export default function DragToReorderExample() {
  const [dataset, setDataset] = useState<
    { id: string; image?: string; text?: string; inputFieldText?: string }[]
  >([
    { id: "rand-1", image: "https://placehold.co/40x40/0fb/fff?text=1" },
    { id: "rand-2", image: "https://placehold.co/40x40/0fb/fff?text=2" },
    { id: "rand-3", image: "https://placehold.co/40x40/0fb/fff?text=3" },
    { id: "rand-4", image: "https://placehold.co/40x40/0fb/fff?text=4" },
    { id: "rand-5", image: "https://placehold.co/40x40/0fb/fff?text=5" },
    {
      id: "rand-6",
      image: "https://placehold.co/40x40/0fb/fff?text=6",
    },
  ]);

  return (
    <div className="">
      <DragToReOrder
        data={dataset}
        setData={setDataset}
        allowDelete={true}
        inputConfigration={{
          allowField: true,
          rows: 2,
        }}
      />
    </div>
  );
}

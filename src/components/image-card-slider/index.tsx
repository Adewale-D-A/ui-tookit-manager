import { useCallback, useState } from "react";
import NavigateNext from "../../assets/icons/navigate-next";
import NavigateBefore from "../../assets/icons/navigate-prev";
import "./styles/index.css";

export default function ImageCardSlider({
  staffs,
}: {
  staffs: {
    id: number;
    name: string;
    image: string;
    position: string;
  }[];
}) {
  const per_page = 3;
  const testimonialsTotalPgCnt =
    Math.ceil(staffs?.length / per_page) < 1
      ? 1
      : Math.ceil(staffs?.length / per_page);
  // testimonials sectin pagination states
  const [testimonialPgVisited, setTestimonialsPgVisited] = useState(0);
  const [testimonialCurrPg, setTestimonialCurrPg] = useState(1);

  // testimonials next function
  const showNextTestimonials = useCallback(() => {
    if (!(testimonialsTotalPgCnt <= testimonialCurrPg)) {
      setTestimonialCurrPg((prev) => prev + 1);
      setTestimonialsPgVisited((prev) => {
        return prev + per_page;
      });
    }
  }, [testimonialsTotalPgCnt, testimonialCurrPg]);

  // testimonials next previous
  const showPrevTestimonials = useCallback(() => {
    if (!(testimonialPgVisited < 1)) {
      setTestimonialCurrPg((prev) => prev - 1);
      setTestimonialsPgVisited((prev) => {
        return prev - per_page;
      });
    }
  }, [testimonialPgVisited]);

  return (
    <div className=" w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
        {staffs
          ?.slice(testimonialPgVisited, testimonialPgVisited + per_page)
          .map?.((item) => {
            return (
              <div
                key={item?.id}
                className={`w-full rounded-sm shadow-md flex flex-col items-center justify-center gap-2 p-3`}
              >
                <div className="text-primary w-full">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="w-full h-auto aspect-square object-cover object-top"
                  />
                </div>
                <div className=" text-center flex flex-col gap-2">
                  <h5 className=" text-lg font-semibold ">{item?.name}</h5>
                  <span>{item?.position}</span>
                </div>
              </div>
            );
          })}
      </div>

      <div className="flex justify-center items-center gap-5 mt-10 text-white">
        <button
          title="previous"
          type="button"
          className={`${
            testimonialPgVisited < 1 ? "bg-gray-300" : "bg-primary"
          }  p-5 rounded-full`}
          onClick={() => showPrevTestimonials()}
        >
          <NavigateBefore className=" w-6 h-6" />
        </button>
        <button
          type="button"
          title="next"
          className={`${
            testimonialsTotalPgCnt <= testimonialCurrPg
              ? "bg-gray-300"
              : "bg-primary"
          }  p-5 rounded-full w-fit`}
          onClick={() => showNextTestimonials()}
        >
          <NavigateNext className=" w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

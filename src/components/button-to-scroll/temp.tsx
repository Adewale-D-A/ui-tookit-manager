// import { useCallback } from "react";

// function ButtonToScroll() {
//   const handleScroll = useCallback(() => {
//     const buttonRight = document.getElementById("slideRight");
//     const buttonLeft = document.getElementById("slideLeft");

//     buttonRight.onclick = function () {
//       document.getElementById("container").scrollLeft += 20;
//     };
//     buttonLeft.onclick = function () {
//       document.getElementById("container").scrollLeft -= 20;
//     };
//   }, []);
//   return (
//     <div>
//       <div id="container">
//         <div id="content">Click the buttons to slide horizontally!</div>
//       </div>
//       <button id="slideLeft" type="button">
//         Slide left
//       </button>
//       <button id="slideRight" type="button">
//         Slide right
//       </button>
//     </div>
//   );
// }

export default function Nothing() {
  return <></>;
}

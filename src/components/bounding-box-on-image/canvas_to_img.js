export default function canvasURL(id) {
  let canvas = document.getElementById(id);
  return canvas.toDataURL();
}

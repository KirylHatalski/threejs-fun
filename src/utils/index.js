import {
  THREE
} from 'three'

// export function renderRec(scene, camera, callback) {
//   requestAnimationFrame(renderRec);
//
//   renderer.render(scene, camera);
// }

export function getRandomColor() {
  return THREE.setRGB(Math.random(), Math.random(), Math.random())
}

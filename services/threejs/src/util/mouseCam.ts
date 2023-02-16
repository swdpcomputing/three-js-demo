import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface cursorLocation {
  x: number;
  y: number;
}

export default class MouseCam {
  width: number;
  height: number;
  camera: THREE.PerspectiveCamera;
  cursor: cursorLocation = {
    x: 0,
    y: 0,
  };
  controls: OrbitControls;

  constructor(
    width: number,
    height: number,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer
  ) {
    this.width = width;
    this.height = height;
    this.camera = camera;
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.maxPolarAngle = Math.PI / 2; // Stops at floor
    this.controls.enableDamping = true;
  }

  public updateCursor = (): cursorLocation => {
    window.addEventListener("mousemove", (event) => {
      this.cursor.x = event.clientX / this.width - 0.5;
      this.cursor.y = -(event.clientY / this.height - 0.5);
    });

    return this.cursor;
  };

  public updateCamera = (focus: THREE.Object3D | null = null): void => {
    // this.camera.lookAt(focus.position);
    this.controls.update();
  };
}

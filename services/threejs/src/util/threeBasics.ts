import * as THREE from 'three';
import MouseCam from './mouseCam';
import getScreenSize from './getScreenSize';

interface IParameters {
  showAxesHelpers?: boolean;
}

export default class ThreeBasics {
  _width: number;
  _height: number;
  _originalAspectRatio: number;
  _aspectRatio: number;
  _scene: THREE.Scene;
  _camera: THREE.PerspectiveCamera;
  // _axesHelper: THREE.AxesHelper;
  _renderer: THREE.WebGLRenderer;
  _mouseCam: MouseCam;
  _showAxesHelpers: boolean | undefined;

  constructor() // parameters: IParameters = {
  //   showAxesHelpers: false,
  // }
  {
    const { width, height } = getScreenSize();
    this._width = width;
    this._height = height;
    this._originalAspectRatio = this._width / this._height;
    this._aspectRatio = this._originalAspectRatio;
    // this._showAxesHelpers = parameters.showAxesHelpers;
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(
      75,
      this._aspectRatio,
      0.1,
      1000,
    );
    // this._axesHelper = new THREE.AxesHelper(5);
    this._renderer = new THREE.WebGLRenderer();
    this._mouseCam = new MouseCam(
      this._width,
      this._height,
      this._camera,
      this._renderer,
    );

    this._camera.position.z = 6;
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // if (this._showAxesHelpers) this._scene.add(this._axesHelper);
  }

  getThreeBasics = () => {
    return {
      width: this._width,
      height: this._height,
      mouseCam: this._mouseCam,
      aspectRatio: this._aspectRatio,
      scene: this._scene,
      camera: this._camera,
      // axesHelper: this._axesHelper,
      renderer: this._renderer,
    };
  };

  animateFunctions() {
    this._renderer.render(this._scene, this._camera);
  }

  updateScreenSize() {
    const screenSize = getScreenSize();
    this._width = screenSize.width;
    this._height = screenSize.height;
    this._aspectRatio = this._width / this._height;
    this._renderer.setSize(this._width, this._height);
    return this._aspectRatio - this._originalAspectRatio;
  }

  windowResize() {
    this.updateScreenSize();

    return () => {
      this._camera.aspect = this._width / this._height;
      this._renderer.setSize(this._width, this._height);
      this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
  }
}

import * as THREE from "three";

export default class SquareBasedPyramid {
  private _geometry: THREE.BufferGeometry;
  private _count: number;
  private _positionsArray: Float32Array;
  private _bufferMaterial: THREE.MeshBasicMaterial;
  private _bufferMesh: THREE.Mesh;

  constructor() {
    this._geometry = new THREE.BufferGeometry();
    this._count = 150;
    this._positionsArray = new Float32Array(this._count * 3 * 3);

    for (let i = 0; i < this._count; i++) {
      const newPositionsArray = [
        0,
        0,
        0,
        (Math.random() - 0.5) * 2,
        0,
        (Math.random() - 0.5) * 2,
        0,
        1,
        0,
      ];
      this._positionsArray.set(newPositionsArray, i * 9);
    }

    const positionsAttribute = new THREE.BufferAttribute(
      this._positionsArray,
      3
    );

    this._geometry.setAttribute("position", positionsAttribute);

    this._bufferMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });

    this._bufferMesh = new THREE.Mesh(this._geometry, this._bufferMaterial);
  }

  public get mesh() {
    return this._bufferMesh;
  }
}

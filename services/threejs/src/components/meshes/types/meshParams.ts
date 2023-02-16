import * as THREE from "three";

export default interface MeshParams {
  mesh: THREE.Mesh;
  rotationSpeeds: { x: number; y: number; z: number };
}

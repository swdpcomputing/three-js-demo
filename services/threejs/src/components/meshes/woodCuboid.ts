import * as THREE from "three";
import Textures from "../../util/textures";

export default class WoodCuboid {
  private _geometry: THREE.BufferGeometry;
  private _material: THREE.MeshBasicMaterial;
  private _mesh: THREE.Mesh;

  constructor() {
    this._geometry = new THREE.BoxGeometry(1, 1, 1);

    this._material = new THREE.MeshBasicMaterial({
      map: Textures.textures.doorColorTexture,
    });

    this._mesh = new THREE.Mesh(this._geometry, this._material);

    this._mesh.scale.x = 2;
    this._mesh.scale.y = 0.25;
    this._mesh.scale.z = 0.5;
  }

  public get mesh(): THREE.Mesh {
    return this._mesh;
  }

  public get material(): THREE.MeshBasicMaterial {
    return this._material;
  }
}

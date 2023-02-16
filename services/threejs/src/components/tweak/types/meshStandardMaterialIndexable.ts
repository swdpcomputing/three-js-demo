import { MeshStandardMaterial } from "three";

export default interface MeshStandardMaterialIndexable
  extends MeshStandardMaterial {
  [key: string]: any;
}

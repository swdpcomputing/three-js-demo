import { Material } from "three";
import Textures from "../../util/textures";
import Tweak from "./tweak";

export default abstract class MaterialTweak extends Tweak {
  protected abstract _material: Material;
  protected abstract _textures: Textures;
  public abstract get material(): Material;
}

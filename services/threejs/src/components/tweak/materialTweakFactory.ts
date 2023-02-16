import  MaterialTweak from "./materialTweak";
import { Material } from "three";

export abstract class TweakFactory {
  public abstract createTweak(material: Material): MaterialTweak;
}

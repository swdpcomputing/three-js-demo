import { MeshStandardMaterialTweak } from "./meshStandardMaterialTweak";
import { TweakFactory } from "./materialTweakFactory";

export class MeshStandardMaterialTweakFactory extends TweakFactory {
  public createTweak(): MeshStandardMaterialTweak {
    return new MeshStandardMaterialTweak();
  }
}

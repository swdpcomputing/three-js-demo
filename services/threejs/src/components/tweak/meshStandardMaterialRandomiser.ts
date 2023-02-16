import { MeshStandardMaterial } from "three";
import Textures from "../../util/textures";
import meshStandardMaterialParameters from "./meshStandardMaterialParameters.json";
import MeshStandardMaterialParameters from "./types/meshStandardMaterialParameters";
import MeshStandardMaterialIndexable from "./types/meshStandardMaterialIndexable";

export class MeshStandardMaterialRandomiser {
  public randomise(material: MeshStandardMaterialIndexable) {
    Object.entries(meshStandardMaterialParameters).forEach(
      ([k, v]: [string, MeshStandardMaterialParameters]) => {
        if (v.type === "scale") {
          material[k] =
            Math.random() * ((v.max || 1) - (v.min || 0)) + (v.min || 0);
        }

        if (v.type === "map") {
          const textureFilename: string =
            Textures.textureFilenames[
              Math.floor(Math.random() * Textures.textureFilenames.length)
            ];
          material[k] = Textures.textures[textureFilename];
        }

        if (v.type === "boolean") {
          material[k] = Math.random() > 0.5 ? true : false;
        }
      }
    );

    material.displacementScale = 0;
    material.displacementBias = 0;
    material.opacity = 1;
  }

  public newRandomisedMeshStandardMaterial() {
    const newMaterial = new MeshStandardMaterial();
    this.randomise(newMaterial);
    return newMaterial;
  }
}

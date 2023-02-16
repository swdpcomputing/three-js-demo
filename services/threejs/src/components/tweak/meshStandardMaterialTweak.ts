import * as dat from 'lil-gui';
import {
  MeshStandardMaterial,
  ObjectSpaceNormalMap,
  TangentSpaceNormalMap,
  Texture,
  Vector2,
} from 'three';
import MaterialTweak from './materialTweak';
import Textures from '../../util/textures';
import meshStandardMaterialParameters from './meshStandardMaterialParameters.json';
import MeshStandardMaterialParameters from './types/meshStandardMaterialParameters';
import { MeshStandardMaterialRandomiser } from './meshStandardMaterialRandomiser';
import Controllers from './types/controllers';
import MeshStandardMaterialIndexable from './types/meshStandardMaterialIndexable';
var randomColor = require('randomcolor');

const parameters = {
  color: 0xffffff,
};

const mapParameters: Array<string> = [
  'map',
  'alphaMap',
  'metalnessMap',
  'roughnessMap',
  'bumpMap',
  'displacementMap',
  'aoMap',
  'emissiveMap',
  'envMap',
  'lightMap',
  'normalMap',
];

export class MeshStandardMaterialTweak extends MaterialTweak {
  protected _tweak: dat.GUI;
  protected _material: MeshStandardMaterialIndexable =
    new MeshStandardMaterial();
  protected _textures: Textures;
  protected _controllers: Controllers = {};
  protected texture: Texture = new Texture();

  private _folders: any = {};
  private normalScaleLeft: number = 0;
  private normalScaleRight: number = 0;

  // PUBLIC

  public get material(): MeshStandardMaterialIndexable {
    return this._material;
  }

  // PROTECTED

  protected updateTweak(): void {
    Object.entries(meshStandardMaterialParameters).forEach(
      ([k, _]: [string, MeshStandardMaterialParameters]) => {
        if (this._controllers[k])
          this._controllers[k].controller.setValue(this._material[k]);
      },
    );
  }

  // CONSTRUCTOR

  constructor() {
    super();
    this._tweak = new dat.GUI();
    this._textures = new Textures();
    this.initialiseMapsConstructor();
    this.populateTweak();
    if (process.env.NEXT_PUBLIC_ENV === 'prod') this._tweak.hide();
  }

  // PRIVATE

  private initialiseMapsConstructor(): void {
    mapParameters.forEach((mp) => {
      this._material[mp] = this.texture;
    });
  }

  private initialiseMapsPopulate(): void {
    mapParameters.forEach((mp) => {
      this._material[mp] = Textures.textures['_blank.png'];
    });
  }

  private addFolderIfDoesNotExist(folderId: string) {
    if (!this._folders.hasOwnProperty(folderId)) {
      this._folders[folderId] = this._tweak.addFolder(folderId);
    }
  }

  protected async populateTweak(): Promise<void> {
    this.initialiseMapsPopulate();
    this._tweak.title('MeshStandardMaterial');
    this.addControllers();
    this.addCustomNormalScaleControls();
    this.addRandomise();
    this._tweak.onChange((event) => this.addCustomTweakEvents(event));
    this.eventRandomise();
    this.setInitialValues();
    // The below line requires uncommenting for wireframe to work.
    // For some reason, upon initialising a bumpMap, wireframe stops working,
    // and instead makes the mesh disappear.

    // this._material.bumpMap = null;
  }

  private addControllers(): void {
    this._folders['none'] = this._tweak;

    Object.entries(meshStandardMaterialParameters).forEach(
      ([k, v]: [string, MeshStandardMaterialParameters]) => {
        this.addFolderIfDoesNotExist(v.category);
        if (v.type === 'color') this.addColor(this._folders[v.category], k);
        if (v.type === 'scale') this.addScale(this._folders[v.category], k);
        if (v.type === 'map') this.addMap(this._folders[v.category], k);
        if (v.type === 'boolean') this.addBoolean(this._folders[v.category], k);
        if (v.type === 'dropdown')
          this.addDropdown(this._folders[v.category], k, v.items || []);

        Object.entries(this._folders).forEach(([_, v]: [String, any]) => {
          v.close();
        });
      },
    );
  }

  private addColor(folder: any, command: string): void {
    this._controllers[command] = {
      controller: folder.addColor(parameters, 'color').onChange(() => {
        this._material[command].set(parameters.color);
      }),
      type: 'color',
    };
  }

  private addScale(
    folder: any,
    command: string,
    min: number = 0,
    max: number = 1,
    step: number = 0.0001,
  ): void {
    this._controllers[command] = {
      controller: folder
        .add(this._material, command)
        .min(min)
        .max(max)
        .step(step),
      type: 'scale',
      min: min,
      max: max,
    };
  }

  private addMap(folder: any, command: string): void {
    this._controllers[command] = {
      controller: folder.add(this._material, command, Textures.textures),
      type: 'map',
    };
  }

  private addBoolean(folder: any, command: string): void {
    this._controllers[command] = {
      controller: folder.add(this._material, command),
      type: 'boolean',
    };
  }

  private addDropdown(
    folder: any,
    command: string,
    menuItems: Array<string>,
  ): void {
    this._controllers[command] = {
      controller: folder.add(this._material, command, menuItems),
      type: 'dropdown',
    };
  }

  private addCustomNormalScaleControls(): void {
    const normalScale = { normalScaleLeft: 0, normalScaleRight: 0 };
    this._folders['normal']
      .add(normalScale, 'normalScaleLeft')
      .min(0)
      .max(1)
      .step(0.0001);
    this._folders['normal']
      .add(normalScale, 'normalScaleRight')
      .min(0)
      .max(1)
      .step(0.0001);
  }

  private addCustomTweakEvents(event: any): void {
    if (event.property === 'normalScaleLeft')
      this.eventNormalScale(event, this.normalScaleLeft);
    if (event.property === 'normalScaleRight')
      this.eventNormalScale(event, this.normalScaleRight);
    if (event.property === 'normalMapType') this.eventNormalMapType(event);
    if (event.property === 'randomise') this.eventRandomise();
  }

  private addRandomise(): void {
    const randomise = { randomise: false };
    this._tweak.add(randomise, 'randomise');
  }

  private eventNormalScale(event: any, scale: any) {
    scale = event.value;
    this.updateNormalScale();
  }

  private eventNormalMapType(event: any) {
    const normalMapTypes: { [key: string]: any } = {
      TangentSpaceNormalMap: TangentSpaceNormalMap,
      ObjectSpaceNormalMap: ObjectSpaceNormalMap,
    };
    this._material.normalMapType = normalMapTypes[event.value];
  }

  private updateNormalScale(): void {
    this._material.normalScale = new Vector2(
      this.normalScaleLeft,
      this.normalScaleRight,
    );
  }

  private eventRandomise() {
    const randomiser = new MeshStandardMaterialRandomiser();
    randomiser.randomise(this._material);
    this.updateTweak();
    this.randomiseColor();
  }

  private randomiseColor() {
    const newColorInteger: number = parseInt(randomColor().substring(1), 16);
    const newColorHex = '#' + newColorInteger.toString(16);
    parameters.color = newColorInteger;

    this._material['color'].set(parameters.color);
    (
      this._controllers['color'].controller as dat.ColorController
    )._setValueFromHexString(newColorHex);
  }

  private setInitialValues() {
    this._material.displacementScale = 0;
    this._material.displacementBias = 0;
    this._material.wireframe = false;
    this._material.transparent = false;
    this._material.opacity = 1;
  }
}

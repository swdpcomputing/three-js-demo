import { Texture, TextureLoader } from "three";
const axios = require("axios").default;

interface ITextures {
  [key: string]: Texture | null;
}

const textureUrls: Array<string> = [
  "",
  "door/",
  "environmentMaps/0/",
  "environmentMaps/1/",
  "environmentMaps/2/",
  "environmentMaps/3/",
  "gradients/",
  "matcaps/",
  "stones/",
];

export default class Textures {
  private static _instance: Textures;
  private static _textureLoader: TextureLoader = new TextureLoader();
  private static _textures: ITextures = {};
  private static _cloudTextureFilelistDomain: string;
  private static _textureFilenames: Array<string> = [];
  private static _localTextureFilenames: Array<string> = [];
  private static _cloudTextureFilenames: Array<string> = [];
  private static _textureDomain: string;
  private static _localTextureDomain: string;
  private static _cloudTextureDomain: string;

  public constructor() {
    Textures._cloudTextureFilelistDomain =
      process.env.NEXT_PUBLIC_CLOUD_TEXTURES_FILELIST_URL!;
    Textures._localTextureDomain =
      process.env.NEXT_PUBLIC_LOCAL_TEXTURES_DOMAIN!;
    Textures._cloudTextureDomain =
      process.env.NEXT_PUBLIC_CLOUD_TEXTURES_DOMAIN!;

    Textures._textureDomain =
      process.env.NEXT_PUBLIC_ENV === "dev"
        ? Textures._localTextureDomain
        : Textures._cloudTextureDomain;
  }

  public static initialise = async () => {
    if (process.env.NEXT_PUBLIC_ENV === "dev") {
      await Textures.localTextureLoad();
      Textures._textureFilenames = Textures._localTextureFilenames;
    }

    if (process.env.NEXT_PUBLIC_ENV === "prod") {
      await Textures.cloudTextureLoad();
      Textures._textureFilenames = Textures._cloudTextureFilenames;
    }
  };

  public static get instance(): Textures {
    return Textures._instance || (this._instance = new Textures());
  }

  public static get textures(): ITextures {
    return Textures._textures;
  }

  public static get textureFilenames(): Array<string> {
    return Textures._textureFilenames;
  }

  private static localTextureLoad = async () => {
    const promises: Array<Promise<any>> = [];

    textureUrls.forEach(async (endpoint) => {
      promises.push(Textures.getLocalFileNames(endpoint));
    });

    await Promise.all(promises);

    Textures.loadTextures(Textures._localTextureFilenames);
  };

  private static cloudTextureLoad = async () => {
    let cloudFilenames: Array<string> = [];

    const response = await axios
      .get(Textures._cloudTextureFilelistDomain)
      .then((response: any) => {
        cloudFilenames = response.data.data.fileNames;

        Textures._cloudTextureFilenames = response.data.data.fileNames;
      });

    Textures._cloudTextureFilenames = cloudFilenames.map((ctu) => ctu.slice(9));
    Textures.loadTextures(Textures._cloudTextureFilenames);
  };

  private static loadTextures(filenames: Array<string>): void {
    filenames.forEach((tf) => {
      Textures._textures[tf] = Textures.loadTexture(tf);
    });
    Textures._textures["_none"] = null;
  }

  private static loadTexture(endpoint: string): Texture {
    return Textures._textureLoader.load(
      `${Textures._textureDomain}${endpoint}`
    );
  }

  private static getLocalFileNames = async (endpoint: string): Promise<any> => {
    await axios
      .get(`${Textures._textureDomain}${endpoint}`)
      .then((response: any) => {
        Textures.addLocalFilenamesFromFolders(response.data, endpoint);
      });
  };

  private static addLocalFilenamesFromFolders = (
    responseData: object,
    folder: string
  ) => {
    Object.values(responseData).forEach(async (item) => {
      if (item.type === "file") {
        Textures._localTextureFilenames.push(`${folder}${item.name}`);
      }
    });
  };
}

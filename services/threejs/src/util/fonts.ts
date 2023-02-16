import { Texture} from "three";
const axios = require("axios").default;

const fontUrls: Array<string> = [""];

export default class Fonts {
  private static _instance: Fonts;
  private static _url: string = "http://localhost:3002/fonts/";
  private static _fontFilenames: Array<string> = [];

  public constructor() {}

  public static initialise = async () => {
    const promises: Array<Promise<any>> = [];

    fontUrls.forEach(async (endpoint) => {
      promises.push(Fonts.getFileNames(endpoint));
    });

    await Promise.all(promises);
  };

  public static get instance(): Fonts {
    return Fonts._instance || (this._instance = new Fonts());
  }

  public static get fontFilenames(): Array<string> {
    return Fonts._fontFilenames;
  }

  private static getFileNames = async (endpoint: string): Promise<any> => {
    await axios.get(`${Fonts._url}${endpoint}`).then((response: any) => {
      Fonts.addFilenamesFromFolders(response.data, endpoint);
    });
  };

  private static addFilenamesFromFolders = (
    responseData: object,
    folder: string
  ) => {
    Object.values(responseData).forEach(async (item) => {
      if (item.type === "file") {
        Fonts._fontFilenames.push(`${folder}${item.name}`);
      }
    });
  };
}

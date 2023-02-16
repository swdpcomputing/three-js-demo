import * as dat from "lil-gui";
import Controllers from "./types/controllers";

export default abstract class Tweak {
  protected abstract _tweak: dat.GUI;
  protected abstract _controllers: Controllers;
  protected abstract populateTweak(): void;
  protected abstract updateTweak(): void;
}

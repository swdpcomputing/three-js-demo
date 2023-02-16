import { BufferGeometry } from "three";

export interface IGeometryParams {}

export abstract class GeometryCreator {
  public abstract getGeometry(geometryParams: IGeometryParams): BufferGeometry;
}

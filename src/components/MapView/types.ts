import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import TileSource from "ol/source/Tile";

export type TMapState = {
  mapContext?: IMapContext;
}

export type ITLContext = TileLayer<TileSource>
export interface IMapContext {
  map: Map;
}
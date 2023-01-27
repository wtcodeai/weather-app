import { FC, useEffect, useRef, createContext, createRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setGeolocation } from '../../store/slice';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';
import XYZ from "ol/source/XYZ";
import { IMapContext } from "./types";
import "ol/ol.css";
import styles from './styles.module.css';

export const WeatherMap: FC = (() => {

  const MapContext = createContext<IMapContext | void>(undefined);
  let state = useRef({})
  let mapDivRef = createRef<HTMLDivElement>()

  


  useEffect(() => {
    if (!mapDivRef.current) {
      return;
    }
    const map = new Map({
      target: mapDivRef!.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 3,
      }),
    });
    console.log('MAP')
    const mapContext: IMapContext = { map };

    state.current = { mapContext }

  }, []);

  return (
    <div 
      style={{height:'100%',width:'100%'}} 
      ref={mapDivRef} 
      className={styles.mapContainer}
    />
  );
})
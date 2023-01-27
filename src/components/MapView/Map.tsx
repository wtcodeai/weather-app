import { FC, useEffect, useRef, createRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setLayer, selectLayerUrl, Layers, selectCurrentLayer } from './slice';
import { getCurrentGeolocation } from '../../store/slice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCircleDot,
  faCloud,
  faDroplet,
  faWater,
  faWind,
  faTemperatureFull
} from '@fortawesome/free-solid-svg-icons'

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import { Map, View } from 'ol';
import { useGeographic } from 'ol/proj';
import { IMapContext, ITLContext } from "./types";
import TileLayer from 'ol/layer/Tile';
import XYZ from "ol/source/XYZ";
import 'ol/ol.css';

import styles from './styles.module.css';

export const WeatherMap: FC = (() => {
  interface MapReference {
    mapContext?: IMapContext
  }

  interface TileLayerReference {
    tileLayer?: ITLContext
  }

  const mapRef = useRef<MapReference>({})
  const tileRef = useRef<TileLayerReference>({})
  const mapDivRef = createRef<HTMLDivElement>()

  const layerUrl = useAppSelector(selectLayerUrl)
  const currentLayer = useAppSelector(selectCurrentLayer)
  const geo = useAppSelector(getCurrentGeolocation)
  const dispatch = useAppDispatch()

  useGeographic()

  useEffect(() => {
    if (!mapDivRef.current) {
      return;
    }
    const layer = new TileLayer({
      source: new XYZ({
        url: layerUrl
      }),
    })
    tileRef.current = { tileLayer: layer}

    const view = new View({
      zoom: 6,
    })
    const map = new Map({
      target: mapDivRef!.current,
      layers: [layer],
      view: view
    });

    const mapContext: IMapContext = { map };
    mapRef.current = { mapContext }

  }, []);

  const setCenter = () => {
    const view = mapRef.current?.mapContext?.map.getView()
    view?.setCenter([geo.lon, geo.lat]);
    view?.setZoom(6)
  }

  useEffect(() => setCenter(), [geo])

  useEffect(() => {
    if (!tileRef.current?.tileLayer?.getSource() && !currentLayer) return
    tileRef.current.tileLayer?.setSource(new XYZ({
      url: layerUrl
    }))
  }, [layerUrl, currentLayer])

  return (
    <div 
      ref={mapDivRef} 
      className={styles['map-container']}
    >
      <div className={styles['map-toolbar']}> 
        <ButtonToolbar aria-label="Toolbar">
          <ButtonGroup aria-label="Geoloc">
            <Button
              variant="secondary"
            >
              <FontAwesomeIcon 
                icon={faCircleDot}
                onClick={() => setCenter()}
              />
            </Button>
          </ButtonGroup>
          <ButtonGroup 
            className="ms-2" 
            aria-label="Layers"
          >
            <Button
              variant="light"
              active={currentLayer === Layers.temp_new}
              onClick={() => dispatch(setLayer(Layers.temp_new))}
            >
              <FontAwesomeIcon 
                icon={faTemperatureFull}
              />
            </Button> 
            <Button
              variant="light"
              active={currentLayer === Layers.precipitation_new}
              onClick={() => dispatch(setLayer(Layers.precipitation_new))}
            >
             <FontAwesomeIcon 
                icon={faDroplet}
              />
            </Button>
            <Button
              variant="light"
              active={currentLayer === Layers.wind_new}
              onClick={() => dispatch(setLayer(Layers.wind_new))}
            >
             <FontAwesomeIcon 
                icon={faWind}
              />
            </Button> 
            <Button
              variant="light"
              active={currentLayer === Layers.pressure_new}
              onClick={() => dispatch(setLayer(Layers.pressure_new))}
            >
             <FontAwesomeIcon 
                icon={faWater}
              />
            </Button>
            <Button
              variant="light"
              active={currentLayer === Layers.clouds_new}
              onClick={() => dispatch(setLayer(Layers.clouds_new))}
            >
              <FontAwesomeIcon 
                icon={faCloud}
              />
            </Button> 
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    </div>
  );
})
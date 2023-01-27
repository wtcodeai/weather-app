import  { FC } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { WeatherMap } from '../../components/MapView'
import { WeatherView } from "../../components/WeatherView";
import { ForecastView } from "../../components/ForecastView";

export const HomePage: FC = () => {
  return (
    <MainLayout>
      <Row className="my-4 h-50">
        <Col>
          <WeatherView />
        </Col>
        <Col>
          <WeatherMap />
        </Col>
      </Row>
      <Row className="my-4 h-50">
        <Col>
          <ForecastView />
        </Col>
      </Row>
    </MainLayout>
  )
}
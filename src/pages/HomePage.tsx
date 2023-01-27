import  { FC } from "react";
import { MainLayout } from "../layouts/MainLayout";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { WeatherMap } from '../components/Map'

export const HomePage: FC = () => {
  return (
    <MainLayout>
      <Row>
        <Col>
          Test
        </Col>
        <Col>
          <WeatherMap />
        </Col>
      </Row>
      <Row>
        <Col>
          Test
        </Col>
      </Row>
    </MainLayout>
  )
}
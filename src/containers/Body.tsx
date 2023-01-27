import  { FC, PropsWithChildren } from "react";
import Container from 'react-bootstrap/Container';

export const Body: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container style={{ height: 'calc(100% - (4.5rem + 56px))'}}>
      {children}
    </Container>
  )
}
import  { FC, PropsWithChildren } from "react";
import Container from 'react-bootstrap/Container';

export const Body: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}
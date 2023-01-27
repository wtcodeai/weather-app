import { FC, PropsWithChildren } from 'react'
import { Header } from '../containers/Header'
import { Body } from '../containers/Body'

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <Body>
        {children}
      </Body>
    </>
  )
}
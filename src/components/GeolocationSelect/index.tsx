import { FC, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectCities, getCities, setQuery, getQuery } from './slice';
import { setGeolocation } from '../../store/slice';
import Dropdown from 'react-bootstrap/Dropdown';

interface IProps {
  resetState?: boolean
}

export const GeolocationSelect: FC<IProps> = (({ resetState }) => {

  const dispatch = useAppDispatch()
  const cities = useAppSelector(selectCities);
  const query = useAppSelector(getQuery)

  useEffect(() => { 
    dispatch(getCities(query))
  }, [query, dispatch])

  return (
    <>
      <Form.Control
        autoFocus
        className="mx-3 my-2 w-auto"
        placeholder="Введите для поиска..."
        onChange={(e) => dispatch(setQuery(e.target.value))}
        value={query} 
      />
      <ul className="list-unstyled">
        {cities.map((c, index: number) => {
          return (
            <Dropdown.Item 
              key={index}
              eventKey={index}
              onClick={() => dispatch(setGeolocation(c))}
            >
              {c.name} 
            </Dropdown.Item>
          )
        })}
      </ul>
    </>
  )
})
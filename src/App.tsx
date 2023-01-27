import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useAppDispatch } from './store/hooks';
import { defineGeolocation } from './store/slice';

import { HomePage } from './pages/HomePage';

function App() {

  const dispatch = useAppDispatch()
  dispatch(defineGeolocation())

  return (
    <HomePage />
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store, persistor } from '../src/store/store';
import { Provider } from 'react-redux';
import { PersistGate} from 'redux-persist/integration/react';

import Login from './view/login/login';
import Home from './view/home/home';
import EditarPerfil from './view/perfil/perfil';
import ErrorPage from './view/errorPage/errorPage';

function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/inicio' element={<Home />} />
          <Route path='/editarPerfil' element={<EditarPerfil/>} />

          {/* Rota coringa para lidar com rotas inexistentes */}
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
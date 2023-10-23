import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store, persistor } from '../src/store/store';
import { Provider } from 'react-redux';
import { PersistGate} from 'redux-persist/integration/react';

import Login from './view/login/login';
import Home from './view/home/home';
import EditarPerfil from './view/perfil/perfil';


function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route path='/editarPerfil' element={<EditarPerfil/>} />
        </Routes>
      </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
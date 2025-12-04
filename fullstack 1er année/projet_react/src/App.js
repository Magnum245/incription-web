// // import react from 'react';
// Dans index.js ou App.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/utilisateur/Accueil.js';
import Logclient from './pages/utilisateur/Logclient.js';
import Info from './pages/utilisateur/Info.js';
import Inscription from './pages/utilisateur/Inscription.js';
// import Dashboard from './pages/Admin/Dashboard.js';
import Login from './pages/utilisateur/Login.js';
import MonCompte from './pages/utilisateur/MonCompte.js';
import Dashboard from './pages/Admin/Dashboard.js';
import Logadmin from './pages/Admin/Logadmin.js';
import Formulairemanagement from './pages/Admin/Formulairemanagement.js';
import Setting from './pages/Admin/Setting.js';
import StatusForm from './pages/utilisateur/StatusForm.js';
// import Film from './pages/Film/Film.js';
// import Detail from './pages/Film/Detail.js';

function App() {
  return (
    // <Router> 
    //   <Routes>
    //     {/*Accueil*/}
    //     <Route path="/" element={<Film/>} />
    //     <Route path="/films/:id" element={<Detail/>} />
    //   </Routes>
    // </Router>




      <Router>
        <Routes>
          {/*pour utilisateur*/}
          <Route path="/" element={<Accueil />} />
          <Route path='/login' element={<Login/>}/>
          <Route path="/logclient" element={<Logclient />} />
          <Route path="/info" element={ <Info />} />
          <Route path="/inscription" element={ <Inscription />} />
          <Route path='/mon-compte' element={ <MonCompte />} />
          <Route path='/statusformulaire' element={ <StatusForm />} />
          {/*pour admin*/}
          <Route path='/dashbord' element={<Dashboard />} /> 
          <Route path='/logadmin' element={<Logadmin />} />
          <Route path='/dossier' element={<Formulairemanagement />} />
          <Route path='/setting' element={<Setting />} />
          {/* <Route path='/login' element={<Login />} /> */}
        </Routes>
      </Router>

      
  
  );
}

export default App;

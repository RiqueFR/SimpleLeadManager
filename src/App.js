import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import './App.css';

import HomePage from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import Lead from './pages/Lead/Lead';
import NewLead from './pages/NewLead/NewLead';
import NavController from './controllers/Nav';

function App() {
  return (
	  <Router>
		  <NavController />
		  <div className="App">
			  <Routes>
				  <Route exact path="/" element={<HomePage />} />
				  <Route path="/lead/new" element={<NewLead />} />
				  <Route path="/lead" element={<Lead />} />
				  <Route path="/cadastro" element={<SignUp />} />
			  </Routes>
		  </div>
	  </Router>
  );
}

export default App;

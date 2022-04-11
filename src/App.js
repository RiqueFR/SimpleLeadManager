import NewLead from './pages/NewLead';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import './App.css';

import SignUp from './pages/SignUp';
import Lead from './pages/Lead';
import NavController from './controllers/Nav';

function App() {
  return (
	  <Router>
		  <NavController />
		  <div className="App">
			  <Routes>
				  <Route exact path="/" element={<h1>Home</h1>} />
				  <Route path="/lead/new" element={<NewLead />} />
				  <Route path="/lead" element={<Lead />} />
				  <Route path="/cadastro" element={<SignUp />} />
			  </Routes>
		  </div>
	  </Router>
  );
}

export default App;

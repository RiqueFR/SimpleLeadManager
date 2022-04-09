import logo from './logo.svg';
import SignUp from './pages/SignUp';
import NewLead from './pages/NewLead';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import './App.css';
import Lead from './components/Lead';

function App() {
  return (
	  <Router>
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

import SignUp from './pages/SignUp';
import NewLead from './pages/NewLead';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation
} from 'react-router-dom';
import './App.css';
import Lead from './pages/Lead';

const Nav = () => {
	const location = useLocation();
	const getTitle = () => {
		if (location.pathname === "/lead/new") return "Cadastro Lead";
		if (location.pathname === "/lead") return "Leads";
		if (location.pathname === "/cadastro") return "Cadastro de Usuários";
		if (location.pathname === "/") return "Home";
	};
	const title = getTitle();

	return (
		<div className="nav-bar">
				<img src={process.env.PUBLIC_URL + "/elo.svg"} alt="logo" />
				<h1>{title}</h1>
		</div>
	);
}

function App() {
  return (
	  <Router>
		  <Nav />
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

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ListReservations from "./views/list";
import AddReservation from "./views/create";
import UpdateReservation from "./views/update";
import Searchbar from "./components/search";

import "./App.css";

function App() {
	return (
		<div className="App">
			<Router>
				<header className="menu">
					<Link to="/reservations" className={"App-link"}>
						Reservations
					</Link>
					{/* GET all reservations */}
					<Link to="/add_reservation" className="App-link">
						Make reservation
					</Link>{" "}
					{/* POST reservation*/}
					<Link to="/update_reservation" className="App-link">
						Change reservation
					</Link>{" "}
					{/* PATCH change reservation detail*/}
					<Link to="/delete_reservation" className="App-link">
						Delete reservation
					</Link>{" "}
					{/* DELETE resevation */}
					<Searchbar />
				</header>
				<hr />
				<Switch>
					<Route path="/reservations">
						<ListReservations />
					</Route>
					<Route path="/add_reservation">
						<AddReservation />
					</Route>
					<Route path="/update_reservation">
						<UpdateReservation />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;

import React, { Component } from "react";

class Searchbar extends Component {
	render() {
		return (
			<div className="search-bar">
				<form>
					<input type="text" value="Search Reservations"></input>
					<input type="submit" value="search"></input>
				</form>
			</div>
		);
	}
}
export default Searchbar;

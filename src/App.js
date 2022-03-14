import "./App.css";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

function App() {
	const [token, setToken] = useState();
	const [columns, setColumns] = useState([
		{ field: "id", headerName: "ID", width: 70 },
		{
			field: "fullName",
			headerName: "Full name",
			description: "This column has a value getter and is not sortable.",
			sortable: false,
			width: 160,
			valueGetter: (params) =>
				`${params.row.firstName || ""} ${params.row.lastName || ""}`,
		},
	]);
	const [rows, setRows] = useState([
		{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
	]);
	function getToken() {
		fetch( "https://dev.auth.blinkhash.com/oauth/token" ,{
			//body: '{ "client_id":"uHd5O8hMOsjgZZ9IMxDmLJFrEefOcVtw", "client_secret":"fFN1Q-iHxtDbzCzF6QkUzLNUuLo58r1PqitaOUgFlx5hXJAzA2Fwi9RMN6_PeLVY", "audience":"https://api.aperfectbracket.com", "grant_type":"client_credentials" }',
			headers: {
			  "cache-control": "no-cache",
			  "content-type": "application/json",
			},
			method: "POST"
		  })
		.then((response)=> console.log(response))
	}
	function getBrackets(filter) {
		var url= "https://api.aperfectbracket.com/brackets"
		if (filter) {
			var data = {
				submitter: filter.submitter,
				perfect: filter.perfect
				//we'll figire this out later
			}; //could also just get all of them then update in state

			for (let k in data) {
				url += k + "=" + data[k] + "&";
			}
		}
		fetch(url,{
			headers: {
			  "cache-control": "no-cache",
			  "content-type": "application/json",
			  "authorization": token
			},
			method: "GET"
		  })
		  .then((resp)=> console.log(resp))
		
		var rows = [];
		fetch(url).then((result) => {
			result.forEach((r) => {
				rows.push({
					id: r.id,
					lastname: r.lastname,
				});
			});
			setRows(result.json());
		});
	}
	function getABracket(ID){
		var url= "https://api.aperfectbracket.com/bracket/"+ID
		fetch(url,{
			headers: {
			  "cache-control": "no-cache",
			  "content-type": "application/json",
			  "authorization": token
			},
			method: "GET"
		  })
		  .then((resp)=> console.log(resp))
	}

	useEffect(() => {
		console.log("starting");
		getToken();
		//getBrackets();
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
			</header>
			<div style={{ height: 300, width: "100%" }}>
				<DataGrid rows={rows} columns={columns} />
			</div>
		</div>
	);
}

export default App;

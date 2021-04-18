import { Component } from 'react';
import './CarsDisplay.css'
import { getOccupiedSpots } from '../../helpers/apis'

class CarsDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cars: []
        }

        this.setCars = this.setCars.bind(this);
        this.insertSpotInTable = this.insertSpotInTable.bind(this);
        this.sortTable = this.sortTable.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        getOccupiedSpots(this.setCars);
    }

    setCars(data) {
        this.setState({cars: data});

        for(let i = 0; i < data.length; i++) {
            this.insertSpotInTable(this.state.cars[i]);
        }
    }

    insertSpotInTable(elem) {
        
        let table = document.getElementById("spotsTable");
        let row, cell0, cell1, cell2;

        row = table.insertRow(1);
        cell0 = row.insertCell(0);
        cell1 = row.insertCell(1);
        cell2 = row.insertCell(2);

        cell0.innerHTML = parseInt(elem.spot) + 1;
        cell1.innerHTML = elem.name;
        cell2.innerHTML = elem.registrationNumber;

        this.sortTable(0);
    }

    sortTable(n) {
        let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("spotsTable");

        if(table) {
            switching = true;
            dir = "asc"; 

            while (switching) {
                switching = false;
                rows = table.rows;

                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[n];
                    y = rows[i + 1].getElementsByTagName("TD")[n];

                    if (dir === "asc") {
                        if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                            shouldSwitch= true;
                            break;
                        }
                    } else if (dir === "desc") {
                        if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                    switchcount ++;      
                } else {
                    if (switchcount === 0 && dir === "asc") {
                        dir = "desc";
                        switching = true;
                    }
                }
            }
        }
    }

    search() {
        let input, filter, table, tr, td, i, txtValue, j, check = 0;

        input = document.getElementById("searchInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("spotsTable");
        tr = table.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            check = 0;

            for(j = 0; j < td.length; j++) {
                txtValue = td[j].textContent || td[j].innerText;

                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    check = 1;
                } 
            }

            if(check) {
                for(j = 0; j < td.length; j++) {
                    td[j].style.display = "";
                }
            } else {
                for(j = 0; j < td.length; j++) {
                    td[j].style.display = "none";
                }
            }
        }
    }

    render() {
        return(
            <>
                <div className="input-group rounded" id="searchContainer">
                    <label id="searchLabel">Car search</label> 
                    <input id="searchInput" onKeyUp={this.search} type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                        aria-describedby="search-addon" />
                    <span className="input-group-text border-0" id="search-addon">
                        <ion-icon name="search-outline"></ion-icon>
                    </span>
                </div>
                <div id="tableDiv">
                    <table id="spotsTable">
                        <tr>
                            <th>Parking spot</th>
                            <th>Name</th>
                            <th>Registration Number</th>
                        </tr>
                        
                    </table>
                </div>
            </>
        )
    }
}

export default CarsDisplay;
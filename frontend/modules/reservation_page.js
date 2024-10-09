import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  try{
    const response = await fetch(`${config.backendEndpoint}/reservations/`);
    const data = await response.json();

    return data;
  }catch(error){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

    console.log(reservations, 'reservations');
    const noReservationBannerElement = document.getElementById("no-reservation-banner");
    const reservationTableparentElement =document.getElementById("reservation-table-parent");
    const reservationTableElement = document.getElementById("reservation-table");

    if(reservations.length > 0){
      noReservationBannerElement.style.display = "none"
      reservationTableparentElement.style.display ="block"
    }else{
      noReservationBannerElement.style.display ="block"
      reservationTableparentElement.style.display ="none"
    }

    reservations.forEach(reservation => {

      const {adventureName, date, id, name, person, price, time, adventure } = reservation;
      
      const tableRowElement = document.createElement("tr");

      const formattedDate = new Date(date).toLocaleDateString("en-IN");
      const formattedTime = new Date(time).toLocaleString("en-IN", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      }).replace(' at', ',');
      
      tableRowElement.innerHTML =`
      
      <th>${id}</th>
      <td>${name}</td>
      <td>${adventureName}</td>
      <td>${person}</td> 
      <td>${formattedDate}</td>
      <td>${price}</td>
      <td>${formattedTime}</td>
      
      <td>
      <div class="reservation-visit-button" id=${id}>
      <a href="../detail/?adventure=${adventure}"> Visit Adventure </a>
      </div>
      </td>

      `;

      reservationTableElement.append(tableRowElement);


})
}
export { fetchReservations, addReservationToTable };

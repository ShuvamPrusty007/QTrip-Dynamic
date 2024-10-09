import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  try{
    const params = new URLSearchParams(search);
    return params.get('adventure');
  }catch(error){
    return null;
  }
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  try {
    const response = await fetch(`${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  // const id  =adventure.id;
  // const content = adventure.content;
  // const images = adventures.imaes;
  // const subtitle = adventure.subtitle;


  console.log(adventure, 'adventure debug');
  const {id, name, content, images = [], subtitle} = adventure;

  document.getElementById("adventure-name").innerHTML ="asdasdaada";

  const adventureNameElement = document.getElementById("adventure-name");
  const adventureContentElement =document.getElementById("adventure-content");
  const adventureSubtitleElement = document.getElementById("adventure-subtitle");

  const photoGalleryElement = document.getElementById("photo-gallery");

  adventureNameElement.textContent = name;
  adventureContentElement.textContent = content;
  adventureSubtitleElement.textContent = subtitle;

  images.forEach(image => {
    const imageContainer = document.createElement("div");
    imageContainer.className ="col-xs-9 col-lg-8 w-100"

    imageContainer.innerHTML =`
    <img
     src=${image}
     alt="image";
     class = "activity-card-image w-100"
     />

    `;

    photoGalleryElement.append(imageContainer);
    
  });


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

const photoGalleryElement = document.getElementById("photo-gallery");
const carouselInnerContainer = document.createElement("div");
carouselInnerContainer.classList.add("carousel-inner");

images.forEach((image, index) => {
  const divContainer = document.createElement("div");
  divContainer.className = `carousel-item ${index === 0 ? 'active' : ''}`;

  const imgElement = document.createElement("img");
  imgElement.src = image;
  imgElement.alt = "Adventure Image";
  imgElement.classList.add("activity-card-image", "w-100");

  divContainer.appendChild(imgElement);
  carouselInnerContainer.appendChild(divContainer);
});

const carouselIndicatorsButtonElement = document.createElement("div");
carouselIndicatorsButtonElement.classList.add("carousel-indicators");

images.forEach((image, index) => {
  const newButton = document.createElement("button");
  newButton.className = `${index === 0 ? 'active' : ''}`;
  newButton.type = "button";
  newButton.dataset.bsTarget = "#carouselExampleIndicators";
  newButton.dataset.bsSlideTo = index;

  carouselIndicatorsButtonElement.appendChild(newButton);
});

const outerBody =`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    ${carouselIndicatorsButtonElement.outerHTML}
    ${carouselInnerContainer.outerHTML}
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
`;

photoGalleryElement.innerHTML = outerBody;

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const {available, costPerHead} = adventure;
 
  
  const reservationPersonCostElement = document.getElementById("reservation-person-cost");
  reservationPersonCostElement.innerHTML = costPerHead;
  
  const reservationPanelAvailableElement = document.getElementById("reservation-panel-available");
   const reservationPanelSoldOutElement = document.getElementById("reservation-panel-sold-out");
  
  
  if(available) {
  reservationPanelAvailableElement.style.display = "block" ;
  reservationPanelSoldOutElement.style.display = "none";
 } else {
  reservationPanelAvailableElement.style.display = "none";
  reservationPanelSoldOutElement.style.display = "block";
  
 }
}  

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const {costPerHead} = adventure;
    const totalCost = Number (costPerHead) * Number(persons);
  
    const reservationCostElement = document.getElementById("reservation-cost");
    reservationCostElement.textContent = totalCost;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  try{
    const formElement = document.getElementById("myForm");
    
    formElement.addEventListener("submit", async(event) => { 
      // Prevent the default nature to the fore which is the sumission event.preventDefault()
      event.preventDefault();

      const name = formElement.elements["name"].value;
      const date = formElement.elements["date"].value;
      const person =formElement.elements["person"].value;
      // const adventure = adventure.id;
      const adventureid = adventure.id;

      const payload ={
        name,
        date,
        person,
        adventure: adventureid,
      }
      console.log("payload",payload)

      const url = `${config.backendEndpoint}/reservations/new`;
      const response =await fetch(url,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json();

      return data;

      })
  }catch(error){
    return null;
  }
    
}
    
  
//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  const {reserved} = adventure;
  const reservedBannerElement = document.getElementById("reserved-banner");

  if(reserved){
    reservedBannerElement.style.display ="block";
  }else{
    reservedBannerElement.style.display ="none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};





 /*
  const outerBody =`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div id="carousel-indicators-button" class="carousel-indicators">
   
  </div>
  <div class="carousel-inner-container" class="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
`;

const photoGalleryElement =document.getElementById("photo-gallery");
photoGalleryElement.innerHTML = outerBody;

const carouselInnerConatiner = document.getElementById("carousel-inner-container");

images.forEach((image, index) =>{
  const divContainer = document.createElement("div");

  divContainer.className =`carousel-item ${index ===0 ? 'active' : ''}`;

  divContainer.innerHTML =`
  <img 
   src=${image}
   alt="image"
   class="activty-card-image w-100"
   />

  `
  carouselInnerConatiner.append(divContainer);
});

const carouselIndiactorsButtonElement = document.getElementById("carousel-indicators-button");

images.forEach((image, index) => {
  const newButton = document.createElement("button");
  newButton.className=`${index === 0 ? 'active' : ''}`;
  newButton.type = "button";
  newButton.dataset.bsTarget = "#carouselExampleIndicators";
  newButton.dataset.bsSlideTo = index;

  carouselIndiactorsButtonElement.append(newButton);

})
*/

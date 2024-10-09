
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  try{
    const params = new URLSearchParams(search);
    // const city = params.get('city');
    return params.get('city');
  }catch(error){
    return null;
  }
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
  
    const response = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
     // Check if the response is successful
     if (!response.ok) {
      throw new Error(`Failed to fetch adventures: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched adventures data:", data);
    return data;

  } catch (error) {
    console.error("Error fetching adventures:", error);
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
 
  const container = document.getElementById("data"); 
  // Clear existing content in the container
  container.innerHTML = "";

  // Ensure adventures is an array before proceeding
  if (!Array.isArray(adventures)) {
    console.error("Adventures data is not an array:", adventures);
    return; // Exit the function if adventures is not an array
  }

  adventures.forEach(adventure => {
    const {id, image, duration, costPerHead, category, name} = adventure;

    const card = document.createElement("div");
    card.className ="col-6 col-lg-3 mt-3 position-relative";

    card.innerHTML = `
    <a  href="detail/?adventure=${id}" id=${id}>

    <div class ="category-banner">
    
    ${category}

    </div>

    <div class="activity-card">
    <img  src=${image} alt="image" />

    <div class="w-100 mt-2 px-3">
    
    <div class="d-flex justify-content-between">
    <h5>${name}</h5>
    <h5>${costPerHead}</h5>
    </div>

    <div class="d-flex justify-content-between">
    <h5>Duration</h5>
    <h5>${duration}</h5>
    </div>


    </div>
    </div>
    </a>

    `

    container.append(card);
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(adventureList, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  return adventureList.filter(adventure => {
    let duration = Number(adventure.duration);

    if(duration >= Number(low) && duration <= Number(high)){
      return true;
    }else{
      return false;
    }
  })

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(adventureList, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  const filterList = adventureList.filter(adventure => categoryList.includes(adventure.category));
  return filterList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(allAdventures, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  console.log(filters, 'filters');

  if(filters["duration"].length && filters["category"].length){
    const duration = filters["duration"];//filter.duration
    const splitDuration = duration.split("-");//2-4
    const low =splitDuration[0];//2
    const high =splitDuration[1];//6

    let filterAdventureFromDuration = filterByDuration(allAdventures,low,high);

    //filter for category
    const categoryList = filters["category"];
    const filterAdventureFromCategory = filterByCategory(filterAdventureFromDuration,categoryList);

    return filterAdventureFromCategory;

  }else if(filters["duration"].length){
    const duration = filters["duration"];//filter.duration
    const splitDuration = duration.split("-");//2-4
    const low =splitDuration[0];//2
    const high =splitDuration[1];//6

    let filterAdventureFromDuration = filterByDuration(allAdventures,low,high);

    // Place holder for functionality to work in the Stubs
  return filterAdventureFromDuration;
  
  } else if(filters["category"].length){

    const categoryList =filters["category"];
    let filterAdventureFromCategory = filterByCategory(allAdventures,categoryList);

    return filterAdventureFromCategory;
  }else{
    return allAdventures;
  }

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  // return true;
}
//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const stringFilter = localStorage.getItem("filters");
  return JSON.parse(stringFilter);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  const categoryFilter = filters["category"];
  categoryFilter.forEach(category => {
    let newElem = document.createElement("div");
    newElem.className = "category-filter";
    newElem.innerHTML =`
  
    <div> ${category} </div>` 
    
    document.getElementById("category-list").appendChild(newElem);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};

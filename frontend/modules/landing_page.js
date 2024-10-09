import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

  //use await with fetch
  //use the correct url to get data,put this url inside fetch()
  //put the return data into variable
  //return this variable

  try {
    const response = await fetch(config.backendEndpoint + "/cities");
    const data = await response.json();
    // console.log(data); // Output the data
    
    return data;
  } catch (error) {;
    return null;
  }

    // const dataPromise = await fetch("http://13.201.177.207:8082/cities");
    // dataPromise.then((response)=>{
    //   const output =response.json();
    //   console.log(output);
    //   output.then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) =>{
    //     console.log(err)
    //   })
    // })
    // .catch((err) => {
    //   console.log(err);
    // }) 


}


//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  console.log('cities',city)

  let cards =document.getElementById("data");
  let newDiv =document.createElement("div");
  newDiv.className = "col-sm-6 col-lg-3 mb-4";

  let anchor = document.createElement("a");
  anchor.href = `pages/adventures/?city=${id}`;
  anchor.id = id;

  let tileDiv = document.createElement("div");
  tileDiv.className = "tile";

  let cityImage = document.createElement("img");
  cityImage.src = image;
  cityImage.alt = "image";
  cityImage.className = "activity-card-image";

  let infoDiv = document.createElement("div");
  infoDiv.className = "tile-text text-center";

  let cityName = document.createElement("h5");
  cityName.textContent = city;

  let cityDesc = document.createElement("p");
  cityDesc.textContent = description;

  infoDiv.append(cityName,cityDesc);
  tileDiv.append(cityImage,infoDiv);
  anchor.appendChild(tileDiv);
  newDiv.appendChild(anchor);

  cards.appendChild(newDiv);


   // let cards =document.getElementById("data");
  // let newDiv =document.createElement("div");
  // newDiv.className = "col-sm-6 col-lg-3 mb-4";

  // newDiv.innerHTML = `
  // <a herf="pages/adventures/?city=${id}" id=${id}>

  // <div class="tile" >
  
  // <img src=${image} alt="image"  />

  // <div class="tile-text text-center">
  // <h5>${city}</h5>
  // <p>${description}</p>
  // </div>

  // </div>

  // </a>
  // `

  // cards.append(newDiv);




//   let card=document.getElementById("data")
//   let content=document.createElement("div")
//   content.className="col-6 col-md-4 col-lg-3 mb-4"
//   content.innerHTML=`
//   <a href="pages/adventures/?city=${id}" id="${id}">

//   <div class="tile">
//   <div class="tile-text text-center" >
//   <h5>${city}</h5>
//   <p>${description}</p>
// </div>
// <img class="img-responsive" src="${image}">

//   </div>

//   </div>

//   </a>

//   `
//   card.appendChild(content)
}

export { init, fetchCities, addCityToDOM };

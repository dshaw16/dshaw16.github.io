function newImage() {
  let count = "1";
  let id = "gujYqKBTnRU"; //"8894005"; //gujYqKBTnRU
  let clientID = "3wfMQye9GHnpQX1qYxRbw8RecrIb03zj-IQq2Bp2qv8";
  let orientation = "landscape"
  let endpoint = `https://api.unsplash.com/photos/random/?collections=${id}&count=${count}&orientation=${orientation}&client_id=${clientID}`;
  let imageDescription = document.querySelector("#description");
  let imageElement = document.querySelector("#unsplashImage");
  let imageLink = document.querySelector("#imageLink");
  let creator = document.querySelector("#creator");

  fetch(endpoint)
    .then((response) => response.json())
    .then((jsonData) => {
      //console.log(jsonData);
      const source = jsonData[0].urls.small;
      imageElement.src = jsonData[0].urls.small;
      const link = jsonData[0].links.html;
      imageLink.setAttribute("href", jsonData[0].links.html);
      
      localStorage.source = source; //stores src of picture
      localStorage.href = link; //stores link to picture

      creator.innerText = jsonData[0].user.name;
      const nameHref = jsonData[0].user.links.html; //create variable
      creator.setAttribute("href", jsonData[0].user.links.html);

      localStorage.name = creator.innerText; // stores name of artist
      localStorage.nameHref = nameHref; // stores link to artist 

      if(jsonData[0].alt_description != null) {
          imageDescription.innerText = `"` + jsonData[0].alt_description + `"`;
      } else if (jsonData[0].description != null) {
          imageDescription.innerText = `"` + jsonData[0].description + `"`;
      } else {
          imageDescription.innerText = "";
      }
      localStorage.description = imageDescription.innerText; //stores description of picture.
    })
    .catch((error) => {
        console.log("Error: " + error);
    });
}

// checks if one day has passed. 
function resetAtMidnight() {
  var now = new Date();
  var night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // the next day, ...
      0, 0, 0 // ...at 00:00:00 hours
  );
  var msToMidnight = night.getTime() - now.getTime();
  localStorage.setItem("time", msToMidnight)
  console.log(msToMidnight);

  setTimeout(function() {
      newImage();
      resetAtMidnight();
  }, msToMidnight);
}

// This is what it will do each refresh;

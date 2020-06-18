// laEZee sorting program
// by nomad

// version 2.0 - remade in js
// dude to inhearent failures of trying to write an easy to use program in
// python, laEZee is being remade in js

// version 2.0 - will be able to do:
// - sort people into rooms given their name, gender, and top 3 room mates
// - recieve that information as JSON but will import it from the a local json
//   file, until a proper interface is made, this idk what we will do, but it
//   ain't my problem
// - output the sorted people in JSON as arrays

// welp here we go again



// chapter 1, importing member lists

function loadJSON(dataURL) {
  var loadedJSON = require(dataURL); // import the resident data

  // while that worked, it doesn't feel right
  // ...
  // well it works on my machine, and thats why its in a function anyway
  // imagine the following in italics:
  return loadedJSON;
}

// well that was easier than expected, before we move on, a quick word about the
// json format, stored in a large array are smaller arrays that reperesent each
// hotel-goer, within those smaller arrays are their names, gender, and top 3
// roommate picks, look at `example.json` to get an idea of what it looks like



// chapter 2 - global varible decliration

// room storage: an array of arrays
// let maleRooms = [ ['jake', 'john', 'ron'], ['ake', 'ohn', 'don'] ];
let maleRooms = [];
let femaleRooms = [];
// yeah thats right, there are only two genders, come at me bro

// establish the comparison weights for ease of change
var primaryWeight = 3;
var secondaryWeight = 2;
var thridWeight = 1; // idk what the thingy is for three



// chapter 3 - uh no, i actully have to start programming now
// (its the sort driver functions)

// note: the residents var will be used outside of funtions and the
// residentsList will be used on the inside to help seperate the two

// sort the genders
function genderSort(residentsList, targetGender) {
  let genderMatch = []; // init the return array
  // loop throught all residents
  for (i = 0; i < residentsList.length; i++) {
    // run if the gender matches the specified gender
    if (residentsList[i].gender === targetGender) {
      // append the matching array to the output array
      genderMatch.push(residentsList[i]);
    }
  }
  // return the output array
  return genderMatch;
}



function roomCompare(roomArrayList) {
  // define a function that compres two residents
  function compareResidents(activeResident, compResident) {
    let weight = 0;
    // check to see if compResident is on activeResident's list
    switch(compResident.name) {
      case activeResident.roommateOne:
        weight += primaryWeight;
        break;
      case activeResident.roommateTwo:
        weight += secondaryWeight;
        break;
      case activeResident.roommateThree:
        weight += thridWeight;
        break;
    }
    // return the set weight
    return weight;
  }


  var returnWeight = 0; // init the returning value
  // compare all roommates in a room

  // loop to specify roommate one
  for (i = 0; i < roomArrayList.length; i++) {
    // loop to specify roommante two
    for (n = (i + 1); n < roomArrayList.length; n++) {
      // compare the roommates
      returnWeight += compareResidents(roomArrayList[i], roomArrayList[n]);
      returnWeight += compareResidents(roomArrayList[n], roomArrayList[i]);
    }
  }
  // above code does the following comarisons:
  // 0 - 1  0 - 2  0 - 3
  // 1 - 2  1 - 3
  // 2 - 3
  
  // return the found value
  return returnWeight;
}


// sort the residents
function sortResidents(residentsList) {
  // how the f is this gonna work?
 
  // maybe take all the residents in a list and compare them, taking the highest
  // weighted pair of each comparion and comparing them against each other

  // to be used in the recursive sort function, removes elements from an array
  // by their value
  function arrayRemove(sourceList, elementsToRemove) {
    for (i = 0; i < sourceList.length; i++) {
      for (n = 0; n < elementsToRemove.length; n++) {
        if (sourceList[i] === elementsToRemove[n]) {
          sourceList.splice(i,1);
        }
      }
    }
    return sourceList;
  }



  function recursiveSort(resList, roomWeight, returnList) {
    // this function will be recursive and call itself until all the rooms have
    // been sorted
    let residentsAmount = resList.length;
    let bestroom = [], bestroomIndex = [];
    roomWeight = 0;

    if (resList.length > 3) {
      // compare every possible room
      for (rOne = 0; rOne < residentsAmount; rOne++) {
        for (rTwo = (rOne + 1); rTwo < residentsAmount; rTwo++) {
          for (rThree = (rTwo + 1); rThree < residentsAmount; rThree++) {
            for (rFour = (rThree + 1); rFour < residentsAmount; rFour++) {
              // get the current room's weight
              let roomArray = [resList[rOne], resList[rTwo], resList[rThree], resList[rFour]];
              let currentWeight = roomCompare(roomArray);
              // compare the previous room's weight to the current one
              if (currentWeight >= roomWeight) {
                // if the new weight is greater
                bestroomIndex = [rOne, rTwo, rThree, rFour];
                bestroom = roomArray;
                roomWeight = currentWeight;
              }
              
            }
          }
        }
      }
      returnList.push(bestroom);

      // for ( i = 0; i < 4; i++) { 
      //   resList.splice(bestroomIndex[i],1); 
      // }

      resList = arrayRemove(resList, bestroom);

      returnList.push(recursiveSort(resList, resList.length, returnList));
    }


    else {
      // put remaining residents in a room and exit the function
      let roomArray = [];
      for (i = 0; i < resList.length; i++) {
        roomArray.push(resList[i]);
      }
      returnList.push(roomArray);
      return returnList;
    }
  }


  var exportArray = [];
  var returnList = recursiveSort(residentsList, 0 ,exportArray);
  return returnList;
}

// the main program function, ima put most of the program code in this bc I feel
// like thats how it should be, don't got any real reason
function init() {
  var residents = loadJSON("./residents.json");          // load in our data
  var maleResidents = genderSort(residents, "male");     // separate males 
  var femaleResidents = genderSort(residents, "female"); // separate females
  var maleRooms = sortResidents(maleResidents);
}

init(); // call the main function
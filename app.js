/*
  Build all of your functions for the application below.
	Some functions have been stubbed out.
*/
function beginSearch(people) {
	var input = prompt("Enter name to search by name, or traits to search by trait.");
	if (input.toLowerCase() == "name"){
		filterByName(people);
	}
	else if (input.toLowerCase() == "traits") {
		filterByTraits(people);
	}
	else{
		alert("Please enter name or traits please.");
		beginSearch(people);
	}
}

function filterByName(people) {
	var inputFirst = prompt("Enter first name.");
	var inputLast = prompt("Enter last name.");
	var filteredPeople = people.filter(function(el){
		if (el.firstName.toLowerCase() == inputFirst.toLowerCase() && el.lastName.toLowerCase() == inputLast.toLowerCase()) {
                return true;
            }
            else {
                return false;
            }
	});

	if(filteredPeople.length === 1){
		displaySoloResults(filteredPeople[0]);
		getFamily(filteredPeople[0], people);
	}
	else if (filteredPeople.length < 1) {
		var multipleResult = people.filter(function(el){
			if (el.firstName.toLowerCase() == inputFirst.toLowerCase() && el.lastName.toLowerCase() == inputLast.toLowerCase()) {
					return true;
				}
				else {
					return false;
				}
		});
		displayResults(multipleResult);
		alert("Narrow your search more by name.");
		filterByName(people);
	}
	else{
		alert("Narrow your search more by name.");
		filterByName(people);
	}
}

function filterByTraits(people) {
	var input = prompt("Enter the traits you would wish to search by, each in one word and separated by a comma! (THE OPTIONS ARE: age, height, weight, eyecolor & occupation.\n");
    var lowercaseInput = input.toLowerCase();
    var searchCriteria = lowercaseInput.replace(" ", "");
	specificTraitSearch(people, searchCriteria, people);
}

function specificTraitSearch(people, search, results){
	var allResults = results;

    if(search.includes("age")){
		var ageInput = prompt("Enter an age to search by.");
        allResults = allResults.filter(function (el) {
        if (getAge(el.dob) == ageInput) {
            return true;
        }
        else {
            return false;
        }
    });
    }
    if(search.includes("height")){
		var heightInput = prompt("Enter a height to search by in inches.");
        allResults = allResults.filter(function (el) {
        if (el.height == heightInput) {
            return true;
        }
        else {
            return false;
        }
    });
    }
    if(search.includes("weight")){
		var weightInput = prompt("Enter a weight to search by in lbs.");
        allResults = allResults.filter(function (el) {
        if (el.weight == weightInput) {
            return true;
        }
        else {
            return false;
        }
    });
    }
    if(search.includes("eyecolor")){
		var eyeInput = prompt("Enter an eyecolor to search by.");
        allResults = allResults.filter(function (el) {
        if (el.eyeColor == eyeInput) {
            return true;
        }
        else {
            return false;
        }
    });
    }
    if(search.includes("occupation")){
		var occupationInput = prompt("Enter an occupation to search by.");
        allResults = allResults.filter(function (el) {
        if (el.occupation == occupationInput) {
            return true;
        }
        else {
            return false;
        }
    });
    }
if(allResults.length === 1){
		displaySoloResults(allResults[0]);
        getFamily(allResults[0], people);
	}
	else{
		displayResults(allResults);
		var input = prompt("Type new to return to initial search screen, otherwise press enter.");
		if(input.toLowerCase() == "new"){
			beginSearch(people);
		}
		else {
			var keywords = prompt("Enter the traits you would wish to search by, each in one word and separated by a comma! (THE OPTIONS ARE: age, height, weight, eyecolor & occupation.\n");
			var lowercaseInput = keywords.toLowerCase();
			var searchCriteria = lowercaseInput.replace(" ", "");
			specificTraitSearch(people, searchCriteria, allResults);
		}
	}
}
function getFamily(person, people){
	var parents = people.filter(function (el) {
	return person.parents.includes(el.id);
	});
	var spouse = people.filter(function (el) {
	return el.currentSpouse == person.id;}
	);
	var children = people.filter(function (el) {
	return el.parents.includes(person.id);
	});
	var siblings = people.filter(function (el) {
    return el.parents.includes(person.parents);
    });
	var allFamily = [];
	allFamily.push(...parents);
	allFamily.push(...spouse);
	allFamily.push(...children);
	allFamily.push(...siblings);
	alert(person.firstName + " " + person.lastName + "'s immediate family:");
	displayResults(allFamily);
	getDescendants(person, people);
}

function getDescendants(person, people,counter=-1, descendants=[]){
    if(person != undefined) {
        var results = people.filter(function (el) {
            return el.parents.includes(person.id);
        });
        descendants.push(...results);

        counter++;
        getDescendants(descendants[counter],people,counter,descendants);
    }
	alert("Descendants List:");
    displayResults(descendants);
	alert("Conduct a new search.");
	filterByName(people);
}

function displayResults(people){
	var names = [];
	for(var i = 0; i < people.length; i++){
		var fullName = people[i].firstName + " " + people[i].lastName;
		names.push(fullName);

	}
	var joinedNames = names.join("\n");
    alert(joinedNames);
}

function displaySoloResults(person){

    alert(person.firstName + " " + person.lastName + "\n\n" + "GENDER: " + person.gender + "\n" + "AGE: " + getAge(person.dob) + "\n" + "HEIGHT: " + convertInchesToFootInches(person.height) + "\n" + "WEIGHT: " + person.weight + "lbs\n" + "EYE COLOR: " + person.eyeColor + "\n" + "OCCUPATION: " + person.occupation + "\n");
}

function getAge(dateString){
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
}

function convertInchesToFootInches(height){
    var convertedHeight = ((height/12).toString().split(/[.]/)[0]) + "'" + (height % 12) + "''";
    return convertedHeight;
}

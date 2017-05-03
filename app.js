/*
  Build all of your functions for the application below.
	Some functions have been stubbed out.
*/
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
		displayResults(filteredPeople);
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

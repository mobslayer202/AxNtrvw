
// Init
var customers = [];
var pets = [];
var Name = 1;

function addData(id, name, bd, color, pet){

    let c = {'id': id, 'name':name, 'bd':bd, 'color': color, 'pets': pet};
    customers.push(c);

    for(let i = 0; i < pet.length; i++){

        pets.push(pet[i]);

    }
}

document.addEventListener("DOMContentLoaded", bootup);

    
function bootup(){


    addData(1, "Mohammad Smith", [1,1,2010], "Blue", [{"type": "Bird", "name": "Tweety"}]);

    addData(2, "Ilya Chang", [2,1,1980], "N/A", [{"type": "Bird", "name": "Fluffy"}, {"type": "Cat", "name": "Leon"}])

    addData(3, "Chris", [10,31,19870], "N/A", [{"type": "Dog", "name": "Corky"}, {"type": "Cat", "name": "Bella"}])

    addData(4, "Sanjay Grant", [10,31,1987], "N/A", [])

    addData(5, "Anna Kang", [11,30,2004], "N/A", [{"type": "Lizard", "name": "Kermit"}, {"type": "Lizard", "name": "Dino"}])

    addData(6, "Smith Adebayo", [11,30,2004], "N/A", [{"type": "Cat", "name": "Walter"}, {"type": "Lizard", "name": "Lizzo"}, {"type": "Bird", "name": "Ladybird"}])

    sortBday();
    sortPName();
}

// Sorting part
function compBday(a, b){
    if (a.bd[2] != b.bd[2]){
        return b.bd[2] - a.bd[2];
    }
    else{
        if (a.bd[0] != b.bd[0]){
            return b.bd[0] - a.bd[0];
        }

        else{
            if (a.bd[1] != b.bd[1]){
                return b.bd[1] - a.bd[1];
            }
            else{
                return 0;
            }
        }
    }
}

function sortBday(){
    customers.sort(compBday);
    displaySort(1);
}

function compPName(a, b){
    return a.name.localeCompare(b.name);
}

function sortPName(){
    pets.sort(compPName);
    displaySort(0);
}

function compPType(a, b){
    return a.type.localeCompare(b.type);
}

function sortPType(){
    pets.sort(compPType);
    displaySort(0);
}

function displaySort(c){
    if(c == 1){
        for(let i = 0; i < customers.length; i++){
            let entry = document.createElement('tr');

            let id = document.createElement('td');
            id.innerHTML = customers[i].id;

            let name = document.createElement('td');
            name.innerHTML = customers[i].name;

            let bd = document.createElement('td');
            bd.innerHTML = `${customers[i].bd[0]}/${customers[i].bd[1]}/${customers[i].bd[2]}`;

            let color = document.createElement('td');
            color.innerHTML = customers[i].color;

            let pets = document.createElement('td');
            let p = [];
            for(let x = 0; x < customers[i].pets.length; x++){
                let current = customers[i].pets[x];
                let s = "Name: " + current.name + " / Type: " + current.type + "\n";
                p.push(s);
            }

            if(customers[i].pets.length == 0){
                p.push("N/A");
            }
            pets.innerHTML = p;

            entry.appendChild(id);
            entry.appendChild(name);
            entry.appendChild(bd);
            entry.appendChild(color);
            entry.appendChild(pets);

            let result = document.querySelector("#customer tbody");
            result.appendChild(entry);

        }
    }
    else{

        document.querySelector("#pet tbody").innerHTML = "";
        for(let i = 0; i < pets.length; i++){
            let entry = document.createElement('tr');

            let name = document.createElement('td');
            name.innerHTML = pets[i].name;

            let type = document.createElement('td');
            type.innerHTML = pets[i].type;

            entry.appendChild(name);
            entry.appendChild(type);

            let result = document.querySelector("#pet tbody");
            result.appendChild(entry);

        }
    }

}

document.getElementById('sortName').addEventListener('click', sortPName);
document.getElementById('sortType').addEventListener('click', sortPType);

// Searching part
document.getElementById("searchOp").addEventListener('click', changeOp);

function changeOp(){
    let n = document.getElementById("searchOp").innerHTML;

    if(n == 'Name'){
        document.getElementById("searchOp").innerHTML = 'Type';
        Name = 0;
    }
    else{
        document.getElementById("searchOp").innerHTML = 'Name';
        Name = 1;
    }
}

function searchName(q){

    let result = [];

    for(let i = 0; i < pets.length; i++){
        if(pets[i].name == q){
            result.push(pets[i]);
        }
    }


    displaySearch(result);
}

function searchType(q){

    let result = [];
    for(let i = 0; i < pets.length; i++){
        if(pets[i].type == q){
            result.push(pets[i]);
        }
    }

    displaySearch(result);
}

function displaySearch(result){

    document.querySelector('#result').innerHTML = "<table><thead><tr><th>Name</th><th>Type</th></tr></thead></table>";

    for(let i = 0; i < result.length; i++){
        let entry = document.createElement('tr');

        let name = document.createElement('td');
        name.innerHTML = result[i].name;

        let type = document.createElement('td');
        type.innerHTML = result[i].type;

        entry.appendChild(name);
        entry.appendChild(type);

        
        let output = document.querySelector("#result table");
        output.appendChild(entry);

    }

    if (result.length == 0){
        let n = document.getElementById('result');
        n.innerHTML = 'No values matching this query';
    }
    document.getElementById('result').showModal();
}

document.getElementById('searchBar').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      let input = document.getElementById('searchBar').value;
      let check = input.match(/^[A-Za-z]*$/);

      if(Boolean(check)){
        if(Name == 1){
            console.log(input);
            searchName(input);
        }
        else{
            searchType(input);
        }
      }
      else{
        alert("Alphabetic Characters Only");
      }
    }
});





import {CvERepo} from "./Repo/CvERepo";
import {Test} from './test/test';
import "../styles/style.css";

import { GenerateParagraph } from "./paragraph generation/generateParagraph";
let domainButton = document.getElementById('domain-request-button');
let listArea = document.getElementById('list-area');
let input = document.getElementById('user-request');
let generateButton = document.getElementById('generate-request-button');
let filterEmptyDocs = document.getElementById('user-checkbox');
let ApiParagraphButton = document.getElementById('api-paragraph-request-button');
let completedParagraphsArea = document.getElementById('completed-paragraph');
let cvERepo = new CvERepo();
let test = new Test();


//resets window to original state//
function resetMainWindow(){
    completedParagraphsArea.innerHTML = '';
    filterEmptyDocs.style.display = 'none';
    filterEmptyDocs.childNodes[1].checked = false;
    listArea.innerHTML = '';
}

///autocomplete input functionality///
input.addEventListener('input', function() {
    
    var a, b, i, domainNames = cvERepo.getDomainNames(), valueBeforeLastComma = '', val = this.value, lastCommaIdx = val.lastIndexOf(' ');
    if (lastCommaIdx !== -1){
        valueBeforeLastComma = val.slice(0, lastCommaIdx + 1);
        val = val.replace(valueBeforeLastComma, '');
    }
    closeAllLists();
    if (!val) {return  false;}
    // currentFocus = -1;
    
    a = document.createElement('div');
    a.setAttribute('id', `${this.id}-autocomplete-list`);
    a.setAttribute('class', 'autocomplete-items');
    this.parentNode.appendChild(a);

    for (i = 0; i < domainNames.length; i++) {
        if (domainNames[i].substr(0, val.length).toUpperCase() == val.toUpperCase() && domainNames[i].toUpperCase() !== val.toUpperCase() ) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + domainNames[i].substr(0, val.length) + "</strong>";
          b.innerHTML += domainNames[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + domainNames[i] + "'>";
              b.addEventListener("click", function(e) {
              input.value = valueBeforeLastComma + this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
    
});

function closeAllLists(elmnt){
    var x = document.getElementsByClassName('autocomplete-items');
    for (let i = 0; i < x.length; i++){
        if (elmnt != x[i] && elmnt != input){
            x[i].parentNode.removeChild(x[i]);
        }
    }
}
//Generates experience based on the requested domains//
generateButton.addEventListener('click', function(){
    resetMainWindow();
    let value = input.value.split(', ');
    let pArray = [];
    value.forEach(string => pArray.push(cvERepo.domains.find(x => x.name.match(string))));
    let generateParagraph = new GenerateParagraph(pArray, 5);
    generateParagraph.get();
});

//Gets list of domains with documents//
domainButton.addEventListener('click', function(){
        resetMainWindow();
        printDomains();
        functionalityForCollapsibles();
    });

    //creates and appends domain elements to list-area
    function printDomains(){
        let domains = cvERepo.domains;
        domains.forEach(d =>{
            let domainListArea = createCollapsible(d.name);
    
            if (d.documents.length > 0){
                d.documents.forEach(o => {
                    let element = document.createElement('li');
                    element.textContent = o.name;
                    domainListArea.childNodes[3].appendChild(element);
                });
            }
            else{
                let element = document.createElement('span');
                element.textContent = `There is no available list of documents for ${d.name} at the moment :(`;
                domainListArea.classList.add('empty');
                domainListArea.childNodes[3].appendChild(element);
            }
        });
        filterEmptyDocs.style.display = 'inline-block';
    }
    
    //creates collapsible element
    function createCollapsible(name){
        
        let parent = document.getElementById('example-list-area').cloneNode(true);
        parent.id = `${name}-list-area`;
        parent.childNodes[1].textContent = name;
        parent.classList.add('domain-container');
        let node = listArea.appendChild(parent);
        return node;
    }
    
    //adds event listener for each domain element
    function functionalityForCollapsibles(){
        var coll = document.getElementsByClassName("collapsible");
        var i;
    
        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                this.style.borderBottomRightRadius = '0px';
                this.style.borderBottomLeftRadius = '0px';
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                content.style.display = "none";
                this.style.borderBottomRightRadius = '4px';
                this.style.borderBottomLeftRadius = '4px';
                } else {
                content.style.display = "block";
                }
        });
        }
    }
    //hides domain elements with empty documents list
    filterEmptyDocs.childNodes[1].addEventListener('click', function(){
        let emptyLists = listArea.getElementsByClassName('empty');
            for (let i = 0; i < emptyLists.length; i++){
                if (this.checked){
                emptyLists[i].style.display = 'none';
                }
                else{
                    emptyLists[i].style.display = 'block';
                }
            }
        });
//

//functionality for 'Get completed paragraph from API' button//
ApiParagraphButton.addEventListener('click', function(){
    resetMainWindow();
    displayCompletedParagraph();
});

    //generates a random paragraph from API if all input keywords match
    function getRandomApiParagraph(){
        let value = input.value.split(', ');
        let pArray = cvERepo.completedParagraphs.filter(x => {
            let noMatch = true;
            value.forEach(v => {
                if (!x.name.match(v)) 
                {
                    noMatch = false;
                }
            });
            return noMatch;
        });
        let randomNumber = Math.floor(Math.random() * pArray.length);
        if (pArray.length === 0){
            return 'The requested domain or domain combination could not be retrieved from the API';
        }
        else{
            return pArray[randomNumber].name;
        }
    }
    
    //display paragraph
    function displayCompletedParagraph(){
        var paragraph = document.createElement('p');
        paragraph.textContent = getRandomApiParagraph();
        completedParagraphsArea.appendChild(paragraph);
    }
//











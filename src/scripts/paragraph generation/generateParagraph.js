import { Specialization } from "./specialization";
import { Header } from "./header";

export class GenerateParagraph{
    constructor(domainArray, yearsOfExperience){
        this.domainArray = domainArray;
        this.yearsOfExperience = yearsOfExperience;
        this.specialization = new Specialization(this.domainArray);
        this.header = new Header(this.yearsOfExperience);
    }

    get(){
        let paragraph = document.getElementById('completed-paragraph');
        let head = document.createElement('h4');
        let spec = document.createElement('p');

        head.innerText = this.header.createTitle();
        spec.innerText = this.specialization.createListOfDomains();


        paragraph.appendChild(head);
        paragraph.appendChild(document.createElement('br'));
        paragraph.appendChild(spec);
    }
    
}
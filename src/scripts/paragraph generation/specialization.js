import {CvERepo} from '../Repo/CvERepo';
import {Common} from '../common/common';
import {ApplyFormating} from './applyFormatting';

export class Specialization{
    constructor(domainArray){
        this.domainArray = domainArray;
    }

    createListOfDomains(){
        let generatedString;
        let stringArray = [];

        for (let i = 0; i < this.domainArray.length; i++){
            let domain = this.domainArray[i];
            let docs = this.createDocumentsForDomains(domain.documents);
            stringArray.push(`${domain.name} (${docs})`);
        }
        generatedString = ApplyFormating.commaSeparated(stringArray, stringArray.length);
        return generatedString;
    }

    createDocumentsForDomains(docs){
        Common.shuffleArray(docs);
        let generatedString = ``;
        let stringArray = [];
        docs.forEach(d => stringArray.push(d.name));
        generatedString = ApplyFormating.commaSeparated(stringArray, docs.length);
        return generatedString;
    }

}
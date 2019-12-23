import {Domain} from "../models/domain";
import {Document} from "../models/document";
import {Title} from "../models/title";
import {CompletedParagraph} from "../models/completedParagraph";
import $ from 'jquery';
import { OfflineStore } from "./offlineStore";

export class DataFromApi{
    constructor(){
       this.offlineStore = new OfflineStore;
    }


    getDomains(){
        let promise = $.get('http://localhost:10412/api/domains/');
        let objectArray = [];
        promise.then(data => {
            data.forEach(o => {
                objectArray.push(new Domain(o.name, o.id));
                let currentDomain = objectArray[objectArray.length -1];
                currentDomain.documents = this.getDocuments(currentDomain.id);
            });
        },
        error => {
            console.log(error);
            alert('Api offline, please try again later.');
        }
        );
        return objectArray;
        // this.domains = data;
    }


    getDocuments(id){
        let promise = $.get(`http://localhost:10412/api/domains/${id}/documents`);
        let objectArray = [];
        promise.then(data => {
            data.forEach(d => {
                objectArray.push(new Document(d.name, d.id));
            });
        });
        return objectArray;
    }

    getTitles(){
        let promise = $.get('http://localhost:10412/api/titles/');
        let objectArray = [];
        promise.then(data => {

            data.forEach(o => {
                objectArray.push(new Title(o.name, o.id));
            });
        });
        return objectArray;
    }

    getCompletedParagraphs(){
        let promise = $.get('http://localhost:10412/api/mainbody/');
        let objectArray = [];
        promise.then(data => {
            data.forEach(o => {
                objectArray.push(new CompletedParagraph(o.name, o.id));
            });
        });
        return objectArray;
    }
}
import {Document} from "../models/document";

export class Domain{
    constructor(name, id){
        this.name = name;
        this.id = id;
        this.documents = [Document];
    }
}
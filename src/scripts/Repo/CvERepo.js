import {DataFromApi} from "./dataFromApi";

export class CvERepo{
    constructor(){
        if (!!CvERepo.instance){
            return CvERepo.instance;
        }
        let dataFromApi = new DataFromApi();
        this.domains = dataFromApi.getDomains();
        this.titles = dataFromApi.getTitles();
        this.completedParagraphs = dataFromApi.getCompletedParagraphs();

        CvERepo.instance = this;
        return this;
    }

    getDomainNames(){
        let domainNames = [];
        this.domains
            .filter(d => d.documents.length > 0)
            .forEach(d => domainNames.push(d.name));
        return domainNames;
    }
}
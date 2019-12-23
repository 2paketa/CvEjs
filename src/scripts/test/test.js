import {Specialization} from "../paragraph generation/specialization";
import {Header} from "../paragraph generation/header";

export class Test{


    testSpecializationDoms(domainArray){
        let specialization = new Specialization(domainArray);
        return specialization.concatDomains();
    }

    testTitles(){
        let header = new Header(10);
        return header.createTitle();
    }

}


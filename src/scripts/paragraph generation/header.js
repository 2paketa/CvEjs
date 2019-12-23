import {CvERepo} from '../Repo/CvERepo';
import {Common} from '../common/common';

export class Header{
    constructor(yearsOfExperience){
        this.cvERepo = new CvERepo();
        this.yearsOfExperience = parseInt(yearsOfExperience);
        this.currentYear = parseInt(new Date().getFullYear());
        this.startingYear = this.currentYear - this.yearsOfExperience;
    }

    createTitle(){
        var titles = this.cvERepo.titles;
        Common.shuffleArray(titles);
        let temp = titles[0].name;
        let title;
        if (temp.includes('startingYear')){
            title = temp.replace('startingYear', this.startingYear);
        }
        else if (temp.includes('yearsOfExperience')){
            title = temp.replace('yearsOfExperience', this.yearsOfExperience);
        }
        return title;
    }

}
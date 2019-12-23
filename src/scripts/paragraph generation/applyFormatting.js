export class ApplyFormating{
    constructor(){
    }
    
    static commaSeparated(array, numberOfDocs){
        let string = '';
        for (let i = 0; i < numberOfDocs; i++){
            if (i === numberOfDocs - 1){
                string += `${array[i]}`;
            }
            else{
                string += `${array[i]}, `;
            }
        }
        return string;
    }
}
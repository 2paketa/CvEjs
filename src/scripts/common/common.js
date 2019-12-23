export class Common{
    static shuffleArray(array){
        for (let i = 0; i < array.length; i++){
          let swapIdx = Math.trunc(Math.random() * array.length);
          let tmp = array[swapIdx];
          array[swapIdx] = array[i];
          array[i] = tmp;
        }
    }
}
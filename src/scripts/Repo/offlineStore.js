export class OfflineStore{
    constructor(){
        this._domains;
        this.documents;
        this.titles;
        this.completedParagraphs;
    }

    get domains(){
        var result = document.cookie.match(new RegExp(domains + '=([^;]+)'));
        result && (result = JSON.parse(result[1]));
        return result;
    }

    set domains(domains){
        var cookie = [name, '=', JSON.stringify(domains), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
        document.cookie = cookie;
    }
}
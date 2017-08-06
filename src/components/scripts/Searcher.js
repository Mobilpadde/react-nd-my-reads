class Searcher{
    constructor(id) {
        const call = this._func(id);

        window.addEventListener("keyup", call);
    }

    destroy(id) {
        const call = this._func(id);

        window.removeEventListener("keyup", call);
    }

    _func(id) {
        const elm = document.getElementById(id);

        return e => {
            console.log(e.key);
            if(e.key.length === 1){
                if(window.location.hash.indexOf("search") < 0) {
                    window.location.hash = "/search";
                }
            }
        }
    }
}

export default Searcher;

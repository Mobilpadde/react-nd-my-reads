class Searcher{
    constructor() {
        const call = this._func();
        window.addEventListener("keyup", call);
    }

    destroy() {
        const call = this._func();
        window.removeEventListener("keyup", call);
    }

    _func() {
        return e => {
            if(
                [13, 32].indexOf(e.keyCode) > -1 &&
                window.location.hash.indexOf("search") < 0
            ){
                window.location.hash = "/search";
            } else if (
                [27].indexOf(e.keyCode) > -1 &&
                window.location.hash.indexOf("search") > -1
            ) {
                window.location.hash = "/";
            }
        }
    }
}

export default Searcher;

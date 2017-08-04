class SideScroller {
    constructor(id) {
        const elm = document.getElementById(id);

        let momentum = 0;
        const speed = 8;

        elm.addEventListener("mousewheel", e => {
            if(e.deltaX  + e.deltaY > 0)
                momentum += speed;
            else if(e.deltaX + e.deltaY < 0)
                momentum -= speed;
        });

        const scroller = _ => {
            if(momentum !== 0) {
                elm.scrollLeft += momentum;
                momentum += momentum > 0 ? -1 : 1;
            }

            window.requestAnimationFrame(scroller);
        };

        window.requestAnimationFrame(scroller);
    }
}

export default SideScroller;

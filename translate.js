/*
    @name:          translateJS
    @author:        Eoussama
    @version:       1.0.0
*/

function translate(__element, __dictionary, __language) {
    if(!__element || !__dictionary || !__language)
        console.error('Make sure you pass the right arguments');
    else {
        const __elements = __element.querySelectorAll('.trnsjs');
    
        __elements.forEach(__ele => {
            for(let __term in __dictionary) {
                if(__term === __ele.textContent && __dictionary[`${__term}`].hasOwnProperty(__language))
                    __ele.textContent = __dictionary[`${__term}`][`${__language}`];
                else {
                    for(let ___term in __dictionary[`${__term}`]) {
                        if(__dictionary[`${__term}`][`${___term}`] === __ele.textContent && __dictionary[`${__term}`].hasOwnProperty(__language))
                            __ele.textContent = __dictionary[`${__term}`][`${__language}`];
                    }
                }
            }
        });
    }
}
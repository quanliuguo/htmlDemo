/* console.log('全局中的this->', this)
function foo () {
    // 'use strict' 严格 
    console.log('this->', this)
}
foo() */

/* 默认绑定指向全局的this */

/* function fn1() {
    let fn2 = function () {
        console.log('fn1->fn2->', this); //window
        fn3();
    };
    console.log('fn1->', this); //window
    fn2();
};

function fn3() {
    console.log('fn1->fn2->fn3->', this); //window
};

fn1(); */


/* 严格模式下不会默认绑定 */

/* function fn() {
    console.log('fn->', this);
    console.log('fn->', this.name);
};

function fn1() {
    "use strict";
    console.log('fn1->', this);
    console.log('fn1->', this.name);
};

var name = 'NAME';

fn(); 
fn1() */

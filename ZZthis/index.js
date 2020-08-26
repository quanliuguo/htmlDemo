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

/* 开始 */
/* ;(function() {
    function identify() {
        console.log('identify->', this.name)
        return this.name.toUpperCase()
    }
    function speak() {
        console.log('speak->', this)
        var greeting = "Hello, I am " + identify.call(this) 
        console.log(greeting)
    }
    var me = {
        name: 'Kyle'
    }
    var you = {
        name: 'Xuebi'
    }
    
    identify.call(me)
    identify.call(you)
    
    speak.call(me)
    speak.call(you)
})(); */


/* ;(function() {
    // this 是否指向自身
    function foo(i) {
        console.log('i', i)
        this.count++
    }
    
    foo.count = 0
    // console.dir(foo)
    var i;
    for(i=0; i<10; i++) {
        if(i>5) {
            foo(i)
        }
    }
    
    console.log( 'foo.count->', foo.count)
}()); */

;(function(){
    // 
    function foo() {
        console.log(this)
        this.count = 4
        console.dir(foo)
    }
    
    // setTimeout(foo, 4000)
    foo()
}());


// ;(function(){
//     console.log(this)
// }());

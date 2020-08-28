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

// var name = 'NAME';

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

/* ;(function() {
    function foo(i) {
        console.log('i', i)
        foo.count++
    }
    
    foo.count = 0
    console.log( 'foo.count->', foo.count)
    // console.dir(foo)
    var i;
    for(i=0; i<10; i++) {
        if(i>5) {
            foo.call(foo,i)
        }
    }
    
    console.log( 'foo.count->', foo.count)
}()); */


    
/* {
    // this 是否指向 函数的作用域
    function foo () {
        var a = 2
        this.bar()
    }

    function bar() {
        console.log(this.a)
    }

    foo()
    // this在任何情况下都不会指向函数的词法作用域
} */

/* this既不指向函数自身也不指向函数的词法作用域 */

/* ;(function(){
    // 分析函数的调用位置 调用栈
    function baz() {
        console.log('baz')
        bar()
    }

    function bar() {
        console.log('bar')
        foo()
    }

    function foo() {
        console.log('foo')
    }
    baz()
}()); */



/* ;(function(){
    // 分析函数的调用位置
    function baz(pos = '') {
         pos += 'baz->'
         console.log('baz内部的调用栈', pos)
        bar(pos)
    }

    function bar(pos = '') {
        pos += 'bar->'
        console.log('bar内部的调用栈', pos)
        foo(pos)
    }

    function foo(pos = '') {
        pos += 'foo->'
        console.log('foo内部的调用栈', pos)
    }
    baz()
}()); */


/* ;(function(){
    // 分析函数的调用位置 调用栈

    var objFoo ={
        name: 'fooName',
        foo: function() {
            console.log('foo', this.name)
        },
        attr: {
            a: 1
        }
    }

    var objBar ={
        name: 'barName',
        bar: function() {
            console.log('bar', this.name)
        },
        attr: {
            b: 2
        }
    }

    var objBaz ={
        baz: function() {
            console.log('baz')
            objBar.bar()
        }
    }
    
    // console.log(objBar.bar === objFoo.foo, objBar.attr === objFoo.attr)

    objBaz.baz()
}()); */




/* {
    // 绑定方式: 默认绑定
    // 只有在foo() 运行在非严格模式下 ，默认绑定才能绑定到全局对象
    // 'use strict'
    function foo() {
        // 'use strict'
        console.log(this.a)
    }
    var a = 3
    foo()
} */

/* 
  要尽量避免在代码中混合使用严格模式和非严格模式.
  有时候程序中需要用到第三方库,可能他们的严格程度和我们自己写的代码有所不同,需要兼容
*/

/* {
    // 绑定方式: 隐式绑定
    var a = 1
    function foo() {
        // 'use strict'
        console.log(this.a)
    }
    var obj = {
        // t: this, 
        a:2,
        foo:foo
    }
    // console.log(obj) 
    obj.foo()

    
    //   首先需要注意的是foo()的声明方式,及其之后是如何被当作引用属性添加到obj中的
    //   但是无论是直接在obj中定义还是先定义再添加为引用属性,这个函数严格来说都不属于obj对象。
    //   然而,调用位置会使用obj上下文来引用函数,因此你可以说函数被调用时obj对象“拥有”或者“包含”函数引用
    // 无论你如何称呼这个模式,当foo()被调用时,它的前面确实加上了对obj的引用。
    //当函数引用有上下文对象时,隐式绑定规则会把函数调用中的thts绑定到这个上下文对象,因为调用foo()时this被绑定到obj,因此this.a和obj,a是一样的。
   
} */

/* {
    // 对象属性引用链中只有上一层或者说最后一层在调用位置中起作用。举例来说:

    function foo() {
        console.log(this.a)
    }
    var obj2 = {
        a: 42,
        foo: foo
    }
    var obj1 = {
        a:2,
        obj2: obj2
    }
    obj1.obj2.foo()
} */

/* {
    // 隐式绑定(丢失)
    // 隐式绑定会丢失,而且很常见,当隐式绑定丢失时他会应用默认绑定(当然此时也会受到严格模式的限制)

    function foo() {
        // 'use strict'
        console.log(this.a)
    }
    var obj = {
        a:'obj scoped',
        foo:foo
    }
    var bar = obj.foo
    var a = 'global'
    obj.foo()
    bar()

    //虽然bar是obj.foo 的一个引用,但它引用的是foo函数本身,所以当调用bar()的时候应用了默认绑定
} */

/* {
    // 隐式绑定丢失 的另一种情况,  传入回调函数

    function foo() {
        console.log(this.a)
    }
    function doFoo(fn){
        fn()
    }
    var obj={
        a:2, 
        foo:foo
    }
    var a = 'global'
    obj.foo()
    doFoo(obj.foo)

    // 参数传递就是一种隐式赋值
} */

/* {
    // 函数当做回调函数传入 浏览器的内置函数
    function foo() {
        console.log(this.a)
    }

    var obj={
        a:2, 
        foo:foo
    }
    var a = 1
    // setTimeout(obj.foo, 0)
    // 另一种况
    // setTimeout(() => {
    //     obj.foo()
    // }, 0)

    // var fn= function() {
    //     obj.foo()
    // }

    // setTimeout(fn, 0)
} */

{
    // 显式绑定
    // 1.硬绑定 call apply bind


    // 2. jsAPI调用的上下文
    function fn(ele) {
        console.log(this)
    }
    var obj ={
        name: 'objname'
    }
    // for(var i =0 ;i<3;i++ ) {
    //     fn()
    // }
    var arr =[0,1]
    arr.forEach(fn, obj);
    // arr.forEach(function(){
    //     console.log(this)
    // }, obj);
    arr.forEach((ele) =>{
        console.log(this.name)
    }, obj);

}


// ;(function(){
    
// }());
// ;(function(){
//     console.log(this)
// }());
// ;(function(){
//     console.log(this)
// }());
// ;(function(){
//     console.log(this)
// }());

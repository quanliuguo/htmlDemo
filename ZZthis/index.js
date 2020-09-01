/* console.log('全局中的this->', this)*/

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
/* 对于默认绑定来说,决定this的绑定对象 不是函数调用时是否处于严格模式, 而是函数体是否处于严格模式 */
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

/* {
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
    // arr.forEach(fn);
    var fn2 = fn.bind(this) //可以看出bind优先级更高
    arr.forEach(fn2, obj);
    // arr.forEach(function(){
    //     console.log(this)
    // }, obj);
    // arr.forEach((ele) =>{
    //     console.log(this.name)
    // }, obj);

} */

/* {
    // new 绑定
    // 用new来调用函数
    // 1.创建一个全新的对象
    // 2.这个新对象会被执行[[Prototype]]连接
    // 3.这个新对象会绑定到this
    // 4.如果这个函数没有返回其他对象,就会自动返回一个新对象
} */


/* {
    // 几种绑定的优先级
    // 显式绑定和隐式绑定的优先级比较   
    function foo() {
        console.log(this.a)
    }

    obj1={
        a:1,
        foo:foo
    }
    obj2={
        a:2,
        foo:foo
    }

    obj1.foo()
    obj2.foo()
    obj1.foo.call(obj2)
    obj2.foo.call(obj1)
    // 显式绑定>隐式绑定
    
} */

/* {
    // 几种绑定的优先级
    // new绑定和隐式绑定的优先级比较
    function foo(something) {
        console.log('this->', this)
        this.a = something
    }
    function foo1(something) {
        console.log('this->', this)
        this.a = something
    }
    var obj1 = {
        foo: foo,
        name:'obj1'
    }
    var obj2 = {
        name:'obj2'
    }
    obj1.foo(2)


    var bar = new obj1.foo(3)
    console.log('bar->', bar)
    // new绑定>隐式绑定

} */

/* {
    // 几种绑定的优先级
    // new绑定和显式绑定的优先级比较
    function foo(params) {
        console.log(this)
        this.a = params
    }
    var obj1 = {}
    var bar = foo.bind(obj1) // bind 属于硬绑定

    bar(2)
    console.log(obj1)

    var baz = new bar(3)
    console.log(obj1)
    console.log(baz)

} */

/* 
    判断this的规则(按照下面顺序判断)
    1.函数是否在new中被调用, 如果是,this绑定的是新创建的对象
    2.函数是否通过call,apply或bind 这种被显式绑定调用,如果是的话,this绑定的是那个指定的对象
    3.函数是否在某个上下文对象中调用, 如果是,this绑定的是那个上下文对象(注意隐士绑定丢失的清况)
    4.如果都不是, 使用默认绑定, 如果函数内处于严格模式,就绑定到undefined,否则绑定到全局对象

    

*/

// 但是总会有例外


{
    // 如果你把null或者undefined作为this的绑定对象传入call,apply,bind,这些值在调用时会被忽略,实际引用的是默认绑定规则
    // function foo() {
    //     // 'use strict'
    //     console.log(this.a)
    // }
    // var a =2
    // foo.call(null)
    
    // 其实,相比在call中传入null不是很常见的情况
    // 更常见的是在bind函数的参数中传入null来实现柯里化的目的

    // function foo(a, b) {
    //     console.log('a:', a , ' b:', b)
    // }

    // // foo.apply(null, [2, 3])

    // var bar = foo.bind(null, 2)

    // bar(3)
}
/* {
    // 隐式丢失 (创建函数的间接引用时)
    function foo() {
        console.log(this.a)
    }
    
    var a = 2
    var o = {
        a:3,
        foo:foo
    }
    var p = {
        a:4
    }

    // o.foo()

    // (p.foo = o.foo)()
    // var bar = (p.foo = o.foo)
    // bar()
    // p.foo()
} */


/* {
//   自制软绑定
    // 硬绑定可以把this强制绑定到指定的对象,(除了使用new)
    // 好处是防止函数调用应用默认绑定的规则,
    // 坏处是硬绑定会降低函数的灵活性,使用硬绑定之后就无法使用隐式绑定和显式绑定
    
    // 扩展一下bind函数,实现一个在call和apply的基础上实现一个软绑定,如果可以给默认绑定指定一个除了全局对象或undefined以外的值,那就可以实现和硬绑定相同的效果,同时保留隐式绑定或者显示绑定修改this的能力
    // 

    if(!Function.prototype.softBind) {
        Function.prototype.softBind = function(obj) {
            var fn = this
            console.log('this1->', this)
            var curried = [].slice.call(arguments, 1)
            var bound = function() {
                console.log('this2->', this)
                return fn.apply(
                    (!this || this===(window || global)) ? obj : this,
                    curried.concat.apply(curried, arguments)
                )
            }
            bound.prototype = Object.create(fn.prototype)
            return bound
        }
    }

    // 除了软绑定之外,softBind的其他原理和 bind函数类似.它会对指定的函数进行封装,首先检查调用时的this, 如果this绑定到全局对象或者undefined,那就把指定的默认对象obj绑定到this,否则不会修改this. 此外,这段代码还支持可选的柯里化

    function foo() {
        console.log('this->',  this)
        console.log('name:', this.name)
    }
    var obj = {name:'obj'}
    var obj2 = {name:'obj2'}
    var obj3 = {name:'obj3'}
    var name = 'globalName'
    var fooOBJ = foo.softBind(obj)
    fooOBJ()
    obj2.foo = foo.softBind(obj3)
    obj2.foo()

    setTimeout(obj2.foo, 0)
} */

/* {
    // es6中无法使用上述规则的函数: 箭头函数
    // 箭头函数不使用上述的四种规则,而是根据外层(函数或全局)的作用域来决定this

    function foo() {
        console.log('fooThis->', this)
        return (a) => {
            console.log('this->', this.a)
        }
    }

    var obj1 = {
        a: 2
    }
    var obj2 = {
        a:3
    }
    var bar = foo.call(obj1)
    console.log('bar->', bar)
    bar.call(obj2)

    // foo()内部创建的箭头函数会捕获调用时foo()的this.由于foo() 的this绑定到obj1, bar(引用箭头函数)的this也会绑定到obj1.箭头函数的绑定无法被修改（new 也不行）
} */

/* {
    // 箭头函数最常用于回调函数中
    function foo() {
        return setTimeout(()=>{
        //   可以说this在词法上继承自foo()
            console.log(this.a)
        }, 100)
    }
    var obj = {
        a:2
    }
    foo.call(obj)
    
} */

{
    // 箭头函数可以像bind(...)一样确保函数的this被绑定到指定对象，此外，其重要性还体现在它用更常见的词法作用域取代了传统的this机制
    // 在es6以前，我们就已将在使用和箭头函数几乎完全一样的模式
    function foo() {
        var self = this
        setTimeout(function() {
            console.log(self.a)
        }, 100)
    }

    var obj = {
        a:2
    }
    foo.call(obj)

    //这种模式是想替代this机制
    // 如果你经常编写this风格的代码， 但是绝大部分都会使用self = this 或者箭头函数来否定this机制，那你或许应当
    // 1.只使用词法作用域并完全抛弃错误this风格的代码;
    // 2.完全采用this风格,在必要的时候使用bind(),尽量避免使用self= this 和箭头函数
    // 就是,为了规范和可维护性,尽量别混着用
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

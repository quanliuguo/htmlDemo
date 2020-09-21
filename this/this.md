# this

>
>
>this关键字是 JavaScript 中最复杂的机制之一. 它是一个很特别的关键字.被自动定义在所有函数的作用域中. 但是即使是非常有经验的 JavaScript 开发者也很难说清楚它到底指向什么.



### 为什么要使用this?

```javascript
// 不使用this
var me = {
    name: 'Kele'
}
var you = {
    name: 'Xuebi'
}
function identify(context) {
    return context.name
}
function speak(context) {
    var greeting = 'hello, I`m ' + identify(context) 
    console.log(greeting)
}

identify(you)
identify(me)

speak(you)
speak(me)
```

```javascript
// 使用this
var me = {
    name: 'Kele'
}
var you = {
    name: 'Xuebi'
}
function identify(){
    return this.name
}
function speak() {
    var greeting = 'hello, I`m ' + identify().call(this) 
    console.log(greeting) 
}
identify(you)
identify(me)

speak(you)
speak(me)
```

**this提供了一种更优雅的方式来隐式 "传递" 一个对象引用,** 因此可以将API设计的更加简洁并且易于复用



### 对this 的误解

####   1. this指向自身?

*this从字面意思看好像意为指向自身*

```javascript
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

/*
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
            //foo.call(foo,i)
            foo(i)
        }
    }
    
    console.log( 'foo.count->', foo.count)
*/
```

#### 2. this指向函数的作用域吗?

> 看一段来自公共社区互助论坛的代码

``` javascript
    function foo () {
        var a = 2
        this.bar()
    }

    function bar() {
        console.log(this.a)
    }

    foo()
```

​      首先这段代码试图通过 `this.bar()` 来引用 `bar()` 函数。(这样能调用成功纯属意外，调用 `bar`最自然的方法式省略前面的 `this` ,直接使用词法引用标识符)

​       此外，编写这段代码的人还试图使用`this` 联通 `foo()`和 `bar()`的词法作用域， 从而使`bar()`可以访问`foo()`作用域里面的变量 `a`。这是不可能实现的。

#### 3.this到底是什么？

​       this是在运行时绑定的， 不是在编写时绑定，它的上下文取决于函数调用时的各种条件。 this的绑定和函数声明没有任何关系，只取决于函数的调用方式。

​        当一个函数被调用时， 会创建一个活动记录（有时也称为执行上下文）。这个记录会包含函数在哪里被调用（调用栈），函数的调用方式、传入的参数等信息。 this就是这个记录的一个属性，会在函数执行的过程中用到。



### this解析

#### 函数的调用位置

```javascript
    function baz(pos = '') {
         pos += 'baz->'
         console.log('baz内部的调用栈', pos)
        // 当前调用栈是baz,因此,当前调用位置在全局作用域
        bar(pos)
    }

    function bar(pos = '') {
        pos += 'bar->'
        console.log('bar内部的调用栈', pos)
        // 当前调用栈是baz->bar,因此,当前调用位置在bar中
        foo(pos)
    }

    function foo(pos = '') {
        pos += 'foo->'
        // 当前调用栈是baz->bar->foo,因此,当前调用位置在baz中
        console.log('foo内部的调用栈', pos)
    }
    baz()
```

​        你可以把调用栈想象成一个函数调用链,就像我们在前面代码段的注释中所写的一样,但是这种方法非常麻烦并且容易出错。

​       另一个查看调用栈的方法。是使用浏览器的调试工具。绝大多数现代桌面浏览器都内置了开发者工具，其中包含 JavaScript调试器。就本例来说,你可以在工具中给`foo()`函数的第一行代码设置一个断点,或者直接在第一行代码之前插入一条 debugger语句。运行代码时,调试器会在那个位置暂停,同时会展示当前位置的函数调用列表,这就是你的调用栈。如果你想要分析ths的绑定,使用开发者工具得到调用栈,然后找到栈中第二个元素,这就是真正的调用位置。

#### this绑定的四种规则

##### 1.默认绑定

```javascript
    function foo() {
        // 'use strict'
        console.log(this.a)
    }
    var a = 3
    foo()
```

  在本例中函数调用时应用了this的默认绑定，因此this指向了全局对象

 可以通过分析调用位置来看看`foo()`是如何调用的。在代码中，foo（）是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则。



  

  **只有在foo() 运行在非严格模式下 ，默认绑定才能绑定到全局对象。如果运行在严格模式（strict mode）下, 则不能将全局对象用于默认绑定，因此this会绑定到undefined**

`foo()运行在严格模式下`和`在严格模式下调用foo()`是两个概念

   *要尽量避免在代码中混合使用严格模式和非严格模式.*

   有时候程序中需要用到第三方库,可能他们的严格程度和我们自己写的代码有所不同,需要格外注意。



##### 2. 隐式绑定

另一条需要考虑的规则是调用位置是否有上下文对象。

```javascript
    var a = 1
    function foo() {
        console.log(this.a)
    }
    var obj = {
        a:2,
        foo:foo
    }
    // console.log(obj) 
    obj.foo()
```

*  首先需要注意的是foo()的声明方式,及其之后是如何被当作引用属性添加到obj中的

*  但是无论是直接在obj中定义还是先定义再添加为引用属性,**这个函数严格来说都不属于obj对象。但是,调用位置会使用obj上下文来引用函数,**因此你可以说函数被调用时obj对象“拥有”或者“包含”函数引用

无论你如何称呼这个模式 , 在上面代码中，当foo()被调用时,它的前面确实加上了对obj的引用。当函数引用有上下文对象时,隐式绑定规则会把函数调用中的thts绑定到这个上下文对象,因为调用foo()时this被绑定到obj,因此this.a和obj,a是一样的。

> *对象属性引用链中只有上一层或者说最后一层在调用位置中起作用。举例来说:*

```javascript
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
```

*  隐式绑定丢失

  *隐式绑定会丢失,而且很常见,当隐式绑定丢失时他会应用默认绑定(当然此时也会受到严格模式的限制)*

```javascript
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
```

**虽然bar是obj.foo 的一个引用,但它引用的是foo函数本身,所以当调用bar()的时候应用了默认绑定**

*  隐式绑定丢失 的另一种情况, 传入回调函数

```javascript
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

```

**参数传递就是一种隐式赋值**

* 函数当做回调函数传入浏览器的内置函数

```javascript
 function foo() {
        console.log(this.a)
    }

    var obj={
        a:2, 
        foo:foo
    }
    var a = 1
    setTimeout(obj.foo, 0)
```



##### 3.显式绑定

1. 硬绑定 call apply bind

```javascript

function foo() {
    console.log(this)
}
var obj = {
	name: 'objName'
}
var bar = function() {
    foo.call(obj)
}

bar()
setTimeout(bar, 100)

bar.call(window)
```

*另一个应用场景*

```javascript
function foo(something) {
    console.log(this.a, something)
    return this.a + something
}
var obj = {
	a:2
}
var bar = foo.bind(obj)
var b = bar(3)
console.log(b)
```

`bind(...)`会返回一个硬编码的新函数，它会把你指定的参数设置为`this`的上下文并调用原始函数。

2. API调用的上下文

   ```javascript
   function fn(ele) {
       console.log(this)
   }
   var obj = {
       name: 'objname'
   }
   var arr = [0,1,2]
   arr.forEach(fn)
   arr.forEach(fn, obj)
   
   // 试一下箭头函数
   // 试一下与bind混合
   ```

   

#####  4. new 绑定

构造函数：

  javascript中的构造函数只是一些使用 new 操作符时被调用的函数。 它们不属于某一个类， 也不会实例化一个类。 实际上它们甚至都不能说是一种特殊的函数类型。 它们只是被 new 操作符调用的普通函数。所以不存在所谓的构造函数，只有对函数的构造调用。

使用new调用函数时会执行下面的操作

1. 创建一个全新的对象
2. 这个新对象会被执行[[Prototype]]连接
3. 这个新对象会绑定到this
4. 如果这个函数没有返回其他对象,就会自动返回一个新对象

```javascript
function foo(a) {
    this.a = a
}
var bar = new foo(2)
console.log(bar.a)
```



#### 这四种规则的优先级

> 首先默认绑定的优先级是最低的，当满足其他规则的情景不存在的时候就会应用默认绑定规则。 我们只需要比较**隐式绑定、显示绑定、new绑定**的优先级。



*  比较隐式绑定和显式绑定

  ```javascript
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
  
  ```

  

* 比较new 绑定和隐式绑定

  ```javascript
      function foo(something) {
          console.log('this->', this)
          this.a = something
      }
  
      var obj1 = {
          foo: foo,
          name:'obj1'
      }
      var obj2 = {}
      obj1.foo(2)
  	console.log('1->', obj1.a)
  
  	obj1.foo.call(obj2, 3)
  	console.log(obj2.a)
  
      var bar = new obj1.foo(3)
      console.log('bar->', bar)
      console.log('bar->', obj1)
  ```

  

* 比较new 绑定 和 显式绑定

  > 这里用bind 演示硬绑定

  ```javascript
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
  ```

  

结果 :  new 好像修改了bar中的this, 又好像没有

`new bar(3)`并没有把`obj1.a` 变成 3 。  

但是 new 出来的新对象baz里面的 a 的值是3



ES5内置的`Function.prototype.bind(..)`比较复杂，下面是MDN 提供的一种 `bind(..)` 实现

```javascript
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
            throw new TypeError(
             'Function.prototype.bind - what is trying to be bound is not callable'
            )
        }
        
        var aArgs = Array.prototype.slice.call(arguments, 1)
        var fToBind = this
        var fNOP = function() {}
        var fBound = function() {
            return fToBind.apply(
            	( 
                    this instanceof fNOP && oThis ? this : oThis
                ),
                aArgs.concat(Array.prototype.slice.call(arguments))
            )
        }
        fNOP.prototype = this.prototype
        fBound.prototype = new fNOP()
        return fBound
       
    }
}
```



下面是new 修改 this 的相关代码：

```javascript
this instanceof fNOP &&
oThis ? this : oThis
// ....
fNOP.prototype = this.prototype;
fBound.prototype = new fNOP()
```

具体的代码非常复杂，简单来说， 这段代码会判断硬绑定函数是否被new 调用， 如果是的话就会使用新创建的this 替换硬绑定的 this.

**简单总结一下**

1. 函数是否在 new 中调用（new 绑定）？ 如果是的话，this 绑定的是新创建的对象。

   `var bar = new foo()`

2.  函数是否通过 call 、apply (显式绑定)  或者 bind(硬绑定)调用？如果是的话， this 绑定的就是指定的对象。

   `var bar = foo.call(obj2)`

3. 函数是否在某个上下文对象中调用（隐式绑定）？ 如果是的话, this绑定的就是那个上下文对象

   `var bar = obj1.foo()`

4. 如果都不是，就使用默认绑定。 如果严格模式下，就绑定到undefined ,否则绑定到全局对象。



###  一些例外的情况

#### 1.  用null忽略this 绑定

​       **如果你把null或者undefined作为this的绑定对象传入call,apply,bind,这些值在调用时会被忽略,实际引用的是默认绑定规则**

```javascript
    function foo() {
        // 'use strict'
        console.log(this.a)
    }
    var a =2
    foo.call(null)
```

​         更常见的情景是如果你在bind函数的参数中传入null来实现柯里化的目的

```javascript
    // bind 有柯里化功能
    function foo(a, b) {
        console.log('a:', a , ' b:', b)
    }

    // foo.apply(null, [2, 3])

    var bar = foo.bind(null, 2)

    bar(3)
```

这些场景有这样的共同点：

​		 需要传入一个参数当做this的绑定对象，同时也必须用这个参数站位，而假如你的函数内部的操作并不关系this.

> 如果你总是用null 来忽略this绑定有时候也会有副作用 。比如某个函数确实用到了this(比如是第三方库的一个函数)， 那默认绑定规则会把this 绑定到全局对象，这会导致不可预见的后果，（比如修改全局对象）



#### 2. 间接引用

之前说过了this在隐式赋值的时候可能会出现**隐式丢失**的情况，可能是**赋值或传入回调函数**导致的，其实可以总结为：  当创建一个函数的 “**间接引用**”（有意或者无意地）时，调用这个函数会出现隐式丢失，从而应用默认绑定规则。

```javascript
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

    o.foo() //  隐式绑定
	var baz = o.foo
    baz() // 赋值通常是有意地创建函数的引用
    // (p.foo = o.foo)()
    var bar = (p.foo = o.foo) // 无意地创建函数的引用
    bar()
```



#### 3. 软绑定

​      先说说硬绑定 bind

     *  硬绑定可以把this强制绑定到指定的对象,(除了使用new）
     *  好处是防止函数调用应用默认绑定的规则
     *  坏处是硬绑定会降低函数的灵活性,使用硬绑定之后就无法使用隐式绑定和显式绑定

**尝试自制一个软绑定函数**

>扩展一下bind函数,实现一个在call和apply的基础上实现一个软绑定,如果可以给默认绑定指定一个除了全局对象或undefined以外的值,那就可以实现和硬绑定相同的效果,同时保留隐式绑定或者显式绑定修改this的能力



```javascript
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
```

​        *除了软绑定之外,softBind的其他原理和 bind函数类似.它会对指定的函数进行封装,首先检查调用时的this, 如果this绑定到全局对象或者undefined,那就把指定的默认对象obj绑定到this,否则不会修改this. 此外,这段代码还支持可选的柯里化*

```javascript
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
```

#### 4. ES6箭头函数

​    **箭头函数不使用上述的四种规则,而是根据外层(函数或全局)的作用域来决定this**

```javascript
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
    
```

> ​        foo()   内部创建的箭头函数会捕获调用时 foo() 的  this.  由于  foo()   的 this 绑定到  obj1,  bar(引用箭头函数)的this也会绑定到obj1.箭头函数的绑定无法被修改（new 也不行）

​     

​    **箭头函数最常用于回调函数中**

 ```javascript
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
 ```

 

  **箭头函数可以像bind(...)一样确保函数的this被绑定到指定对象，此外，其重要性还体现在它用更常见的词法作用域取代了传统的this机制**

  就好比：

```javascript
 // 这种模式是想替代this机制   
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
```



​         如果你经常编写this风格的代码， 但是绝大部分都会使用self = this 或者箭头函数来否定this机制，建议下面两种风格你二选一:

*  只使用词法作用域并完全抛弃错误this风格的代码;

* 完全采用this风格,在必要的时候使用bind(),尽量避免使用self= this 和箭头函数

  **就是,为了规范和可维护性,尽量别混着用**







练习：

```javascript
// 练习一
var length = 10;
function fn() {
    console.log(this.length);
}
 
var obj = {
  length: 5,
  method: function() {
    fn();
  }
};
 
obj.method();
```



```javascript
// 练习二
var length = 10;
function fn() {
    console.log(this.length);
}
 
var obj = {
  length: 5,
  method: function(fn) {
    console.log(this)
    fn();
    arguments[0]();
  }
};
 
obj.method(fn, 1);
```



```javascript
var x = 0;
function test(){
　　console.log(this.x)
}
var obj = {}
obj.x = 1
obj.m = test
obj.m.apply() //0，apply()的参数为空时，默认调用全局对象
obj.m.apply(obj); //1
```



```javascript
function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}

//请写出以下输出结果：
Foo.getName(); // 2 2
getName(); // 4 4
Foo().getName(); // 4 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 1 3
new new Foo().getName(); // 0 3
```

```javascript
    function A() {
        this.n= 0;
    }
    A.prototype.callMe = function(){
        console.log(this.n)
    }
    let a = new A()
    document.addEventListener('click', a.callMe)
    document.addEventListener('click', () => {
        a.callMe()
    })

    document.addEventListener('click',function() {
        a.callMe()
    })
```

```javascript
var a = 0
function foo() {
    console.log(this)
	var test = () => {
        console.log(this)
    }
    test()
}
var obj = {
    a: 1,
    foo: foo
}
obj.foo()

```


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

​       此外，编写这段代码的人还试图使用`this` 联通 `foo()`和 `bar()`的词法作用域， 从而使`bar()`可以访问`foo()`作用域里面的变量 `a`。




"use strict";
// class Person {
//     protected name:string;
//     // age:number;
//     constructor(name:string){
//         this.name=name;
//         // this.age=age;
//     }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//     setName(name:string):string{
//         return this.name=name;
//     }
//     getName():string{
//         return this.name;
//     }
//     run():void{
//         console.log(`${this.name} running!`)
//     }
// }
// let p= new Person('xiaoming')
// p.setName('xiaohong')
// let pp=p.getName()
// // let pp=p.name
// console.log(pp)
// class Web extends Person{
//     constructor(name:string){
//         super(name)
//     }
//     // run():void{
//     //     console.log(`${this.name} running!!!!`)
//     // }
// }
// let w = new Web('xiaohong')
// w.run()
/*
    public :共有            类里面\字类\类外面  都能访问
    protected :受保护       类里面\字类  可以访问
    pravite :私有           类里面  可以访问
*/
/*
 static 关键词
*/
// class Person{
//     name:string;
//     age:number;
//     static name1:string;
//     constructor(name:string, age:number){
//         this.name=name;
//         this.age=age;
//     }
//     work(){
//         console.log(this.name+' is working hard !!!')
//     }
//     static walk(){
//         console.log(this.name1+' is walking ...')
//     }
// }
// let p= new Person('xiaoming', 20)
// p.work()
// Person.name1= 'xiaoming111111'
// Person.walk()
var Animal = /** @class */ (function () {
    function Animal(name) {
        if (name === void 0) { name = 'xiaoming'; }
        this.name = name;
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name) {
        return _super.call(this, name) || this;
    }
    Dog.prototype.eat = function () {
        console.log(this.name + ' 吃狗粮');
        // return this.name + ' 吃狗粮'
    };
    return Dog;
}(Animal));
var dog = new Dog('gougou');
dog.eat();
// class Cat extends Animal{
//     constructor(name:string){
//         super(name)
//     }
//     eat(){
//         console.log(this.name + ' 吃猫粮')
//     }
// }

// class Person {
//     protected name:string;
//     // age:number;
//     constructor(name:string){
//         this.name=name;
//         // this.age=age;
//     }

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









abstract class Animal{
    name:string| undefined;
    constructor(name:string = 'xiaoming'){
        this.name=name;
    }
    abstract eat():any
}

class Dog extends Animal{
    constructor(name:string){
        super(name)
    }
    eat(){
        console.log(this.name + ' 吃狗粮')
        // return this.name + ' 吃狗粮'
    }
}
let dog =new Dog('gougou')
dog.eat()

// class Cat extends Animal{
//     constructor(name:string){
//         super(name)
//     }
//     eat(){
//         console.log(this.name + ' 吃猫粮')
//     }
// }

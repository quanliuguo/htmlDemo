function run():string{
    return 'run'
}

// console.log(run())

let run2= function():number{
    return 123
}
// console.log(run2())

function getInfo(name:string, age:number):void{
    console.log(`${name}--${age}`)
}

let info = getInfo('zhangsan', 20)
// console.log(info)

let getInfo2 = function (name:string, age:number){
    return `${name}--${age}`
}
let info2 = getInfo2('zhangsan', 20)
// console.log(info2)

// 可选参数
// 可选参数必须配置在参数的最后面
function getInfo3(name:string, age?:number){
    if(age){
        return `${name}--${age}`
    }else{
        return `${name}--保密`
    }
}

// 可选参数
function getInfo4(name:string, age:number =21):string{
        return `${name}--${age}`
}
console.log(getInfo4('lisi'))

// 剩余参数
function sum(...result:number[]):number {
    let sum =0;
    for(let i=0;i<result.length;i++){
        sum+=result[i]
    }
    return sum
}
// console.log(sum(1,2,3,4))

function getInfo5(name:string):string;
function getInfo5(name:string, age:number):string;
function getInfo5(name:any, age?:any):any{
    if(age){
        return `我叫${name},我${age}岁了`
    }else{
        return `我叫${name}` 
    }
}
console.log(getInfo5('xiaoming',18))

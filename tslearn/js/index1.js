"use strict";
function run() {
    return 'run';
}
// console.log(run())
var run2 = function () {
    return 123;
};
// console.log(run2())
function getInfo(name, age) {
    console.log(name + "--" + age);
}
var info = getInfo('zhangsan', 20);
// console.log(info)
var getInfo2 = function (name, age) {
    return name + "--" + age;
};
var info2 = getInfo2('zhangsan', 20);
// console.log(info2)
// 可选参数
// 可选参数必须配置在参数的最后面
function getInfo3(name, age) {
    if (age) {
        return name + "--" + age;
    }
    else {
        return name + "--\u4FDD\u5BC6";
    }
}
// 可选参数
function getInfo4(name, age) {
    if (age === void 0) { age = 21; }
    return name + "--" + age;
}
console.log(getInfo4('lisi'));
// 剩余参数
function sum() {
    var result = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        result[_i] = arguments[_i];
    }
    var sum = 0;
    for (var i = 0; i < result.length; i++) {
        sum += result[i];
    }
    return sum;
}
function getInfo5(name, age) {
    if (age) {
        return "\u6211\u53EB" + name + ",\u6211" + age + "\u5C81\u4E86";
    }
    else {
        return "\u6211\u53EB" + name;
    }
}
console.log(getInfo5('xiaoming', 18));

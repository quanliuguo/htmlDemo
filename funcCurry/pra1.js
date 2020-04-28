var upperCase = function(str) {
    return str.toUpperCase()
}

var split = function (reg) {
    return function (str){
        str.split(reg)
    }
}
var compose = function(f, g) {
    return function(x) {
        return f();
    };
};


var t = compose (split(' '), upperCase)
 var res= t("abcd efgh")
 console.log(res)
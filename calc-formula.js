// simple formula calculator (not full featured)
var formula="2+11*2" // (2+11)*2 // 2+(11*2)
//calculate(formula)
calculate("-31*2")
function calculate(formula){
console.log("formula:",formula)

var digits=""
var value
var operator,operand=null

for(var i in formula){
    var char=formula[i]
    console.log(char,numeric(char), "char debug")

    if(numeric(char)){
        digits+=char
    }
    if(!numeric(char) || i==(formula.length-1)){
        value=parseInt(digits)
        digits=""

        console.log(value,"value!") // !!!
        
        if(operand!=null){
            if(operator=="+"){
                value=operand+value
            }else if(operator=="*"){
                value=operand*value
            }else if(operator=="-"){
                value=operand-value
            }
            operand=null
        
            console.log("calc!",value)
        }

        if(char=="+" || char=="*"){
            operator=char
            operand=value
        }else if(char=="-"){
            operator=char
            operand=(operand!=null)?value:0
        }
    }
}

function numeric(char){
    return char>="0" && char<="9"
}
}
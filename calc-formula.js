// simple formula calculator (not full-featured, but it does pass some tests)

console.log("TEST #0", calculate("123") == 123) // WORKS!
console.log("TEST #1", calculate("-31*2") == -62) // WORKS!
console.log("TEST #2", calculate("-31*(-2)") == 62) // WORKS!
console.log("TEST #3", calculate("1-(2+3+6)") == -10) // WORKS!
console.log("TEST #4", calculate("-(2+3+6)") == -11) // WORKS!
console.log("TEST #5", calculate("10+(2*(1+2)+3)") == 19) // WORKS!
console.log("TEST #6", calculate("5/2") == 2.5) // division

function calculate(formula) {
    console.log("!formula:", formula)

    var digits = ""
    var value

    var operator = "", operand = null
    var oper_stack = []

    oper_push()
    function oper_push() {
        oper_stack.push({ operator: "", operand: null })
    }

    for (var i in formula) {

        function oper_last() {
            return oper_stack[last(oper_stack)]
        }

        var char = formula[i]
        console.log(char, numeric(char) || char == ".", "char debug")

        if (numeric(char) || char == ".") {
            digits += char
        }

        if (char == "(") {
            oper_push()
            value = undefined
        }

        if (is_operator(char) || i == last(formula) || char == ")") {

            value = parse(char, value)
            if (char == ")") {
                oper_stack.pop()
                value = parse(char, value)
            }

            function parse(char, value) {

                operator = oper_last().operator
                operand = oper_last().operand

                if (digits != "") {
                    value = parseFloat(digits)
                    digits = ""
                }

                if (char == "-" && value === undefined) value = 0

                console.log(value, "value!")

                if (operand !== null) {
                    if (operator == "+") {
                        value = operand + value
                    } else if (operator == "*") {
                        value = operand * value
                    } else if (operator == "-") {
                        value = operand - value
                    } else if (operator == "/") {
                        value = operand / value
                    }
                    operand = null
                }
                console.log("calc!", value)

                if (is_operator(char)) {
                    operator = char
                    operand = value
                }

                oper_last().operator = operator
                oper_last().operand = operand

                return value
            } //- function parse(char){
        } //- if

    } //- for
    return value

    function numeric(char) {
        return char >= "0" && char <= "9"
    }
    function last(sequence) {
        return sequence.length - 1
    }
    function is_operator(char) {
        return char == "+" || char == "*" || char == "-" || char == "/"
    }

} //- function

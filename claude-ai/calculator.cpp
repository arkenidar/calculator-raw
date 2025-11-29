// Simple formula calculator in modern C++
// Equivalent to the JavaScript version by arkenidar

#include <iostream>
#include <string>
#include <vector>
#include <optional>

struct OperContext {
    char op = '\0';
    std::optional<int> operand;
};

int calculate(const std::string& formula) {
    std::string digits;
    std::optional<int> value;

    std::vector<OperContext> oper_stack;
    oper_stack.push_back({});  // initial context

    auto oper_last = [&]() -> OperContext& {
        return oper_stack.back();
    };

    auto numeric = [](char c) { return c >= '0' && c <= '9'; };
    auto is_operator = [](char c) { return c == '+' || c == '*' || c == '-'; };

    auto parse = [&](char c) {
        char op = oper_last().op;
        std::optional<int> operand = oper_last().operand;

        if (!digits.empty()) {
            value = std::stoi(digits);
            digits.clear();
        }

        if (c == '-' && !value.has_value()) {
            value = 0;
        }

        if (operand.has_value()) {
            if (op == '+') value = *operand + *value;
            else if (op == '*') value = *operand * *value;
            else if (op == '-') value = *operand - *value;
        }

        if (is_operator(c)) {
            op = c;
            operand = value;
        } else {
            operand.reset();
        }

        oper_last().op = op;
        oper_last().operand = operand;
    };

    for (size_t i = 0; i < formula.size(); ++i) {
        char c = formula[i];

        if (numeric(c)) {
            digits += c;
        }

        if (c == '(') {
            oper_stack.push_back({});
            value.reset();
        }

        bool is_last = (i == formula.size() - 1);

        if (is_operator(c) || is_last || c == ')') {
            parse(c);
            if (c == ')') {
                oper_stack.pop_back();
                parse(c);
            }
        }
    }

    return value.value_or(0);
}

int main() {
    std::cout << std::boolalpha;
    std::cout << "TEST #0: calculate(\"123\") == 123        -> " << (calculate("123") == 123) << "\n";
    std::cout << "TEST #1: calculate(\"-31*2\") == -62     -> " << (calculate("-31*2") == -62) << "\n";
    std::cout << "TEST #2: calculate(\"-31*(-2)\") == 62   -> " << (calculate("-31*(-2)") == 62) << "\n";
    std::cout << "TEST #3: calculate(\"1-(2+3+6)\") == -10 -> " << (calculate("1-(2+3+6)") == -10) << "\n";
    std::cout << "TEST #4: calculate(\"-(2+3+6)\") == -11  -> " << (calculate("-(2+3+6)") == -11) << "\n";
    std::cout << "TEST #5: calculate(\"10+(2*(1+2)+3)\") == 19 -> " << (calculate("10+(2*(1+2)+3)") == 19) << "\n";
    return 0;
}

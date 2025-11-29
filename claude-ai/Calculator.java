// Simple formula calculator in Java
// Equivalent to the JavaScript version by arkenidar

import java.util.ArrayList;
import java.util.List;

public class Calculator {

    static class OperContext {
        char op = '\0';
        Integer operand = null;
    }

    public static int calculate(String formula) {
        System.out.println("!formula: " + formula);

        StringBuilder digits = new StringBuilder();
        Integer value = null;

        List<OperContext> operStack = new ArrayList<>();
        operStack.add(new OperContext());  // initial context

        for (int i = 0; i < formula.length(); i++) {
            char c = formula.charAt(i);
            System.out.println(c + " " + isNumeric(c) + " char debug");

            if (isNumeric(c)) {
                digits.append(c);
            }

            if (c == '(') {
                operStack.add(new OperContext());
                value = null;
            }

            boolean isLast = (i == formula.length() - 1);

            if (isOperator(c) || isLast || c == ')') {
                value = parse(c, value, digits, operStack);
                if (c == ')') {
                    operStack.remove(operStack.size() - 1);
                    value = parse(c, value, digits, operStack);
                }
            }
        }

        return value != null ? value : 0;
    }

    private static Integer parse(char c, Integer value, StringBuilder digits, List<OperContext> operStack) {
        OperContext last = operStack.get(operStack.size() - 1);
        char op = last.op;
        Integer operand = last.operand;

        if (digits.length() > 0) {
            value = Integer.parseInt(digits.toString());
            digits.setLength(0);
        }

        if (c == '-' && value == null) {
            value = 0;
        }

        System.out.println((value != null ? value : "undefined") + " value!");

        if (operand != null && value != null) {
            if (op == '+') value = operand + value;
            else if (op == '*') value = operand * value;
            else if (op == '-') value = operand - value;
        }
        System.out.println("calc! " + (value != null ? value : "undefined"));

        if (isOperator(c)) {
            op = c;
            operand = value;
        } else {
            operand = null;
        }

        last.op = op;
        last.operand = operand;

        return value;
    }

    private static boolean isNumeric(char c) {
        return c >= '0' && c <= '9';
    }

    private static boolean isOperator(char c) {
        return c == '+' || c == '*' || c == '-';
    }

    public static void main(String[] args) {
        System.out.println("TEST #0 " + (calculate("123") == 123));
        System.out.println("TEST #1 " + (calculate("-31*2") == -62));
        System.out.println("TEST #2 " + (calculate("-31*(-2)") == 62));
        System.out.println("TEST #3 " + (calculate("1-(2+3+6)") == -10));
        System.out.println("TEST #4 " + (calculate("-(2+3+6)") == -11));
        System.out.println("TEST #5 " + (calculate("10+(2*(1+2)+3)") == 19));
    }
}

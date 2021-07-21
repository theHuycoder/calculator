export class NumKey {
    type = "number";
    digit;
    keyName;
    className = "normal-key";
    constructor(digit) {
        this.digit = digit;
        this.keyName = digit.toString();
    }

    addDigit = (currentNumb) => {
        return currentNumb !== "0"
            ? `${currentNumb}${this.digit}`
            : `${this.digit}`;
    };
}

export class OperatorKey {
    type = "operator";
    keyName;
    className = "normal-key";
    constructor(keyName) {
        this.keyName = keyName;
    }

    setCurrentOperator = () => {
        return this.keyName;
    };
}

export class DeleteKey {
    type = "func";
    keyName = "DEL";
    className = "func-key";
    doFunc = (currentNum) => {
        return Math.floor(Number(currentNum) / 10).toString();
    };
}

export class ResetKey {
    type = "func";
    keyName = "RESET";
    className = "func-key";
    doFunc = (currentNum) => "0";
}

export class PunkKey {
    type = "func";
    keyName = ".";
    className = "normal-key";
    doFunc = (currentNum) => {
        if (!currentNum.includes(".")) {
            return [...String(currentNum).split(""), "."].join("");
        }
        return currentNum;
    };
}
export class EqualKey {
    keyName = "=";
    className = "equal-key";
    type = "=";
    calculate = (currentNum = "0", lastNumb = "0", operator) => {
        let result = lastNumb;
        switch (operator) {
            case "+":
                result = (Number(lastNumb) + Number(currentNum)).toString();
                break;
            case "-":
                result = (
                    Number(lastNumb) +
                    -1 * Number(currentNum)
                ).toString();
                break;
            case "x":
                result = (Number(lastNumb) * Number(currentNum)).toString();
                break;
            case "/":
                if (currentNum === "0") {
                    throw new Error("Cannot divide 0");
                }
                result = (
                    Number(lastNumb) *
                    (1 / Number(currentNum))
                ).toString();
                break;
            default:
                return currentNum;
        }
        return result;
    };
}

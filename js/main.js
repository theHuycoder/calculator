// @ts-nocheck
import {
    NumKey,
    DeleteKey,
    OperatorKey,
    EqualKey,
    PunkKey,
    ResetKey,
} from "./key-classes.js";

window.addEventListener("load", () => {
    const screen = document.getElementById("screen");
    const keysContainerDOM = document.getElementById("keys-container");
    let currentNumb = "0";
    let lastNumb = "0";
    let currentOperator = "";
    screen.innerHTML = currentNumb;
    const keysList = [
        [new NumKey(7), new NumKey(8), new NumKey(9), new DeleteKey()],
        [new NumKey(4), new NumKey(5), new NumKey(6), new OperatorKey("+")],
        [new NumKey(1), new NumKey(2), new NumKey(3), new OperatorKey("-")],
        [
            new PunkKey(),
            new NumKey(0),
            new OperatorKey("/"),
            new OperatorKey("x"),
        ],
    ];
    const lastRow = [new ResetKey(), new EqualKey()];
    for (const row of keysList) {
        for (const key of row) {
            const keyDOM = document.createElement("div");
            keyDOM.setAttribute("data-type", key.type);
            keyDOM.classList.add("key-style");
            keyDOM.classList.add(key.className);
            keyDOM.classList.add("col-span-3");
            keyDOM.innerHTML = key.keyName;
            if (key.type === "func") {
                keyDOM.onclick = () => {
                    currentNumb = key.doFunc(currentNumb);
                    screen.innerHTML = currentNumb;
                    console.log(currentNumb);
                };
            }
            if (key.type === "number") {
                keyDOM.onclick = () => {
                    currentNumb = key.addDigit(currentNumb);
                    screen.innerHTML = currentNumb;
                };
            }
            if (key.type === "operator") {
                keyDOM.onclick = () => {
                    lastNumb = currentNumb;
                    currentNumb = "0";
                    screen.innerHTML = currentNumb;
                    currentOperator = key.keyName;
                };
            }
            keysContainerDOM.appendChild(keyDOM);
        }
    }
    for (const key of lastRow) {
        const keyDOM = document.createElement("div");
        keyDOM.setAttribute("data-type", key.type);
        keyDOM.classList.add("key-style");
        keyDOM.classList.add(key.className);
        keyDOM.classList.add("col-span-6");
        keyDOM.innerHTML = key.keyName;
        if (key.type === "func") {
            keyDOM.onclick = () => {
                currentNumb = "0";
                lastNumb = "0";
                currentOperator = "";
                screen.innerHTML = currentNumb;
            };
        }
        if (key.type === "=") {
            keyDOM.onclick = () => {
                const allKeysDOM = document.querySelectorAll(".key-style");
                currentNumb = key.calculate(
                    currentNumb,
                    lastNumb,
                    currentOperator
                );
                screen.innerHTML = currentNumb;
                lastNumb = "0";
                currentOperator = "";
                allKeysDOM.forEach((otherKey) => {
                    if (otherKey.classList.contains("is-active")) {
                        otherKey.classList.remove("is-active");
                    }
                });
            };
        }
        keysContainerDOM.appendChild(keyDOM);
    }
    const allKeysDOM = document.querySelectorAll(".key-style");
    allKeysDOM.forEach((keyDOM) => {
        keyDOM.addEventListener("mousedown", () => {
            keyDOM.classList.add("click-effect");
        });
        keyDOM.addEventListener("mouseup", () => {
            keyDOM.classList.remove("click-effect");
        });
        if (keyDOM.getAttribute("data-type") === "operator") {
            keyDOM.addEventListener("click", () => {
                allKeysDOM.forEach((otherKey) => {
                    if (otherKey.classList.contains("is-active")) {
                        otherKey.classList.remove("is-active");
                    }
                });
                keyDOM.classList.add("is-active");
            });
        }
    });
});


const input = document.getElementById("input");
const expression = document.getElementById("expression");

function addValue(value) {
    if (input.value === "Error") {
        input.value = "";
    }

    input.value += value;
    expression.textContent = "Calculation";
}

function allClear() {
    input.value = "";
    expression.textContent = "Ready to calculate";
}

function valueClear() {
    input.value = input.value.slice(0, -1);
}

function calculate() {
    const original = input.value;

    if (!original.trim()) return;

    try {
        // Allow only calculator characters
        if (!/^[0-9+\-*/%.()\s]+$/.test(original)) {
            throw new Error("Invalid");
        }

        // Evaluate the arithmetic expression
        const result = Function(
            '"use strict"; return (' + original + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid");
        }

        expression.textContent = original + " =";
        input.value = String(
            Math.round((result + Number.EPSILON) * 1e10) / 1e10
        );
    } catch {
        expression.textContent = "Invalid calculation";
        input.value = "Error";
    }
}

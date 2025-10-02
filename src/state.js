export let currentUnit = "F";

export function toggleUnit() {
    currentUnit = currentUnit === "F" ? "C" : "F";
}

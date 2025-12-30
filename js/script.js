const barsContainer = document.getElementById("barsContainer");
const newArrayBtn = document.getElementById("newArray");
const arrSize = document.getElementById("arr_sz");
const speedInput = document.getElementById("speed_input");

const bubbleBtn = document.querySelector(".bubble.sort");
const selectionBtn = document.querySelector(".selection.sort");
const insertionBtn = document.querySelector(".insertion.sort");
const quickBtn = document.querySelector(".quick.sort");
const mergeBtn = document.querySelector(".merge.sort");

let DELAY = speedInput.value;

// ================= BARS =================
function createBars() {
    barsContainer.innerHTML = "";
    let count = arrSize.value;

    for (let i = 0; i < count; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${Math.floor(Math.random() * 100 + 1) * 3}px`;
        barsContainer.appendChild(bar);
    }
}

function swap(a, b) {
    let temp = a.style.height;
    a.style.height = b.style.height;
    b.style.height = temp;
}

function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

// ================= BUBBLE SORT =================
async function bubbleSort() {
    let bars = document.querySelectorAll(".bar");

    for (let i = 0; i < bars.length; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            bars[j].style.background = "red";
            bars[j+1].style.background = "red";

            await delay(DELAY);

            if (parseInt(bars[j].style.height) > parseInt(bars[j+1].style.height)) {
                swap(bars[j], bars[j+1]);
            }

            bars[j].style.background = "#38bdf8";
            bars[j+1].style.background = "#38bdf8";
        }
        bars[bars.length - i - 1].style.background = "green";
    }
}

// ================= SELECTION SORT =================
async function selectionSort() {
    let bars = document.querySelectorAll(".bar");

    for (let i = 0; i < bars.length; i++) {
        let min = i;
        bars[min].style.background = "yellow";

        for (let j = i + 1; j < bars.length; j++) {
            bars[j].style.background = "red";
            await delay(DELAY);

            if (parseInt(bars[j].style.height) < parseInt(bars[min].style.height)) {
                bars[min].style.background = "#38bdf8";
                min = j;
                bars[min].style.background = "yellow";
            } else {
                bars[j].style.background = "#38bdf8";
            }
        }

        swap(bars[i], bars[min]);
        bars[min].style.background = "#38bdf8";
        bars[i].style.background = "green";
    }
}

// ================= INSERTION SORT =================
async function insertionSort() {
    let bars = document.querySelectorAll(".bar");

    for (let i = 1; i < bars.length; i++) {
        let j = i;
        while (j > 0 && parseInt(bars[j-1].style.height) > parseInt(bars[j].style.height)) {
            bars[j].style.background = "red";
            bars[j-1].style.background = "red";
            await delay(DELAY);

            swap(bars[j], bars[j-1]);

            bars[j].style.background = "#38bdf8";
            bars[j-1].style.background = "#38bdf8";
            j--;
        }
    }
    bars.forEach(b => b.style.background = "green");
}

// ================= QUICK SORT =================
async function partition(bars, l, r) {
    let pivot = parseInt(bars[r].style.height);
    bars[r].style.background = "purple";
    let i = l - 1;

    for (let j = l; j < r; j++) {
        bars[j].style.background = "red";
        await delay(DELAY);

        if (parseInt(bars[j].style.height) < pivot) {
            i++;
            swap(bars[i], bars[j]);
        }
        bars[j].style.background = "#38bdf8";
    }

    swap(bars[i+1], bars[r]);
    bars[r].style.background = "#38bdf8";
    return i + 1;
}

async function quickSortHelper(bars, l, r) {
    if (l < r) {
        let pi = await partition(bars, l, r);
        await quickSortHelper(bars, l, pi - 1);
        await quickSortHelper(bars, pi + 1, r);
    }
}

async function quickSort() {
    let bars = document.querySelectorAll(".bar");
    await quickSortHelper(bars, 0, bars.length - 1);
    bars.forEach(b => b.style.background = "green");
}

// ================= MERGE SORT =================
async function merge(bars, l, m, r) {
    let left = [], right = [];

    for (let i = l; i <= m; i++) left.push(parseInt(bars[i].style.height));
    for (let i = m+1; i <= r; i++) right.push(parseInt(bars[i].style.height));

    let i=0, j=0, k=l;

    while (i < left.length && j < right.length) {
        bars[k].style.background = "red";
        await delay(DELAY);
        bars[k].style.height = (left[i] <= right[j] ? left[i++] : right[j++]) + "px";
        bars[k].style.background = "#38bdf8";
        k++;
    }

    while (i < left.length) bars[k++].style.height = left[i++] + "px";
    while (j < right.length) bars[k++].style.height = right[j++] + "px";
}

async function mergeSortHelper(bars, l, r) {
    if (l >= r) return;
    let m = Math.floor((l + r) / 2);
    await mergeSortHelper(bars, l, m);
    await mergeSortHelper(bars, m+1, r);
    await merge(bars, l, m, r);
}

async function mergeSort() {
    let bars = document.querySelectorAll(".bar");
    await mergeSortHelper(bars, 0, bars.length - 1);
    bars.forEach(b => b.style.background = "green");
}

// ================= EVENTS =================
arrSize.addEventListener("input", createBars);
speedInput.addEventListener("input", () => DELAY = speedInput.value);
newArrayBtn.addEventListener("click", createBars);

bubbleBtn.addEventListener("click", bubbleSort);
selectionBtn.addEventListener("click", selectionSort);
insertionBtn.addEventListener("click", insertionSort);
quickBtn.addEventListener("click", quickSort);
mergeBtn.addEventListener("click", mergeSort);

createBars();

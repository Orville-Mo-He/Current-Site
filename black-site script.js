let root = document.documentElement;
let rem = window.getComputedStyle(root, null).getPropertyValue("--base-font-size");
console.log(rem);

let body = document.body;
let width = body.clientWidth;
console.log(width);
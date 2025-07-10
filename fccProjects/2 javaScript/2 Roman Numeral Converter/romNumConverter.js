

const input = document.getElementById('number');

const button = document.getElementById('convert-btn');

const output = document.getElementById('output');

button.addEventListener("click", toRoman)

function toRoman() {
  const map = [
    {ara: 1000, rom: "M" },
    {ara: 900, rom: "CM"},
    {ara: 500, rom: "D"},
    {ara: 400, rom: "CD"},
    {ara: 100, rom: "C"},
    {ara: 90, rom: "XC"},
    {ara: 50, rom: "L"},
    {ara: 40, rom: "XL"},
    {ara: 10, rom: "X"},
    {ara: 9, rom: "IX"},
    {ara: 5, rom: "V"},
    {ara: 4, rom: "IV"},
    {ara: 1, rom: "I"}
  ]

  const inputValue = parseInt(input.value);
  
  

  if(!inputValue || isNaN(inputValue)) {
    output.innerText = "Please enter a valid number";
    return;
  }

  if(inputValue <= 0) {
    output.innerText = "Please enter a number greater than or equal to 1";
    return;}

if(inputValue >= 4000) {
      output.innerText = "Please enter a number less than or equal to 3999";
      return;
    }
    
let result = "";
let num = inputValue;

for(let i = 0; i < map.length; i++) {
  /* while loop checks whether currrent Roman numeral value can fit into the remaining num */ 
  

  while (num >= map[i].ara) {
    result += map[i].rom;
    num -= map[i].ara;

  }

}

  output.innerText = result;
};





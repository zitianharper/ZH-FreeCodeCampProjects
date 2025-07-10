
const input = document.getElementById('user-input');

const check = document.getElementById('check-btn');

const clear = document.getElementById('clear-btn');

const results = document.getElementById('results-div');


check.addEventListener("click", () => {
  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/
 
  if(!input.value) {
    alert("Please provide a phone number")
  }
  else if(regex.test(input.value)) {
    results.innerText = "Valid US number: " + input.value
    }
  else {
    results.innerText = "Invalid US number: " + input.value
    }
  
});

clear.addEventListener("click", () => results.innerText = "")

 

/* 

Regex
  Optional 1 with a space => (1\s?)?
  Three digits with optional parentheses => (\(\d{3}\)|\d{3})
  Optional hyphen or space => ([\s-]?)
  Three digtis \d{3}
  Optional hyphen or space => ([\s-]?)
  Four digtis \d{4}


*/
  


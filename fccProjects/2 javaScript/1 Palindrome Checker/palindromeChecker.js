
/*This bit takes the input, checks if it's valid, puts it in lower case, and splits it into an array where each letter is a value */
const button = document.getElementById('check-btn');
const inputValue = document.getElementById('text-input');

button.addEventListener("click", () => {
  if (inputValue.value.trim() === "") {
    alert("Please input a value");
    return;
  }

/*This provides the result in the result section instead of in the console */
const result = document.getElementById('result');


/*
clean the input by converting to lower case, removing spaces, punctuation, and symbols, but keping alphabnumeric characters
*/
const cleanedInput = inputValue.value.toLowerCase().replace(/[^a-z0-9]/g, "");

  //Split into an array 
  const inputArray = cleanedInput.split("");

  /*This function checks firstChar and lastChar until characters <= 1 (one or fewer characters remaining) */
  const palinCheck = (inputArray) => {
    for (let i = 0; i < inputArray.length / 2; i++) {
      /* this bit takes the first and last characters from the array on a loop */
      const start = inputArray[i];
      const end = inputArray[inputArray.length - 1 - i];
      /* - 1 - i because indices start at 0 */

      // If letters do not match → stop immediately
      if (start !== end) {
        result.textContent = inputValue.value + " is not a palindrome";
        return; // stops further iteration and function execution
      }
    }
    result.textContent = inputValue.value + " is a palindrome";
  };

  palinCheck(inputArray); // Pass the inputArray directly
});

// create arrays containing pool of chars allowed
const lowerArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const upperArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const specialArray = ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", ">", "=", "?", "@", "[", "]", "^", "_", "`", "{", "}", "|", "~", String.fromCharCode(34), String.fromCharCode(92)];

// function to make sure at least one option for char types is selected
var CheckForAtLeastOne = function(responses) {
  if (responses.lowerCase || responses.upperCase || responses.number || responses.specialChar) {
    return true;
  }
  else {
    return false;
  }
}

// main gemerate password function - lunched when generate password button is selected
function generatePassword() {

  //  create object to keep track of which options were selected
  var responses = {
    lowerCase: false,
    upperCase: false,
    number: false,
    specialChar: false
  }

  const minLen = 8;
  const maxLen = 128;
  var pswd = "";
  var allTypesArray = [];
  var pswdLen = 0;
  var lenLeft = 0;

  // keep in a loop until at least one option is selected for password generation
  while (!CheckForAtLeastOne(responses)) {

    // make sure a valid password length is selected
    while (pswdLen < minLen || pswdLen > maxLen) {
      pswdLen = prompt("How many characters do you want for your password?  Enter a number from 8 to 128.", "8");
      lenLeft = pswdLen;
    }

    // ask if lower case chars are desired
    if (confirm("Would you like your password to include lowercase letters?")) {
      responses.lowerCase = true;
    }
   
    // ask if upper case chars are desired
    if (confirm("Would you like your password to include uppercase letters?")) {
      responses.upperCase = true;
    }

    // ask if lower numbers are desired
    if (confirm("Would you like your password to include numbers?")) {
      responses.number = true;
    }
    
    // ask if special chars are desired
    if (confirm("Would you like your password to include special characters?")) {
      responses.specialChar = true;
    }
  }

  //  make sure we get at least one char or each type selected
  if (responses.lowerCase) {
    pswd = lowerArray[Math.floor(Math.random()*lowerArray.length)];
    allTypesArray.push(...lowerArray);
    lenLeft --;
  }
  if (responses.upperCase) {
    pswd += upperArray[Math.floor(Math.random()*upperArray.length)];
    allTypesArray.push(...upperArray);
    lenLeft --;
  }
  if (responses.number) {
    pswd += numberArray[Math.floor(Math.random()*numberArray.length)];
    allTypesArray.push(...numberArray);
    lenLeft --;
  }
  if (responses.specialChar) {
    pswd += specialArray[Math.floor(Math.random()*specialArray.length)];
    allTypesArray.push(...specialArray);
    lenLeft --;
  }

  // now get the rest out of the pool of types selected
  for (var i=0; i < lenLeft; i++) {
    pswdRandom = allTypesArray[Math.floor(Math.random()*allTypesArray.length)];
    pswd += pswdRandom;
  }

  return pswd;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate")

// Write password to the #password input
function writePassword() {
  let pswd = generatePassword()
  var pswdText = document.querySelector("#password")

  pswdText.value = pswd

}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

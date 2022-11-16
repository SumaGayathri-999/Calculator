function calc_internal(a, op, b) {
  a = a * 1;
    b = b * 1;
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return a / b;
    default:
      return 0;
  }
}

function calc(input) {
  let output;
  let midOp = [
    [["×"], ["÷"]],
    [["+"], ["-"]]
  ];
  for (var i = 0; i < midOp.length; i++) {
    const regexExp =
      "(-?\\d+\\.?\\d*)([\\" + midOp[i].join("\\") + "])(-?\\d+\\.?\\d*)";
    while (input?.toString().match(regexExp)) {
      const matchedWords = input.match(regexExp);
      console.log(matchedWords[0]);
      output = calc_internal(matchedWords[1], matchedWords[2], matchedWords[3]);
      input = input.replace(matchedWords[0], output);
    }
  }
  return output ?? "";
}

function onEnterValue(value) {
  const inputElem = document.getElementById("input");
  const resultElem = document.getElementById("calculated-result");
  let curValue = inputElem.innerHTML;
  const inputElemClassList = inputElem.classList;
  const resultElemClassList = resultElem.classList;
  if (inputElemClassList.contains("text-small")) {
    inputElem.classList.remove("text-small");
    inputElem.classList.add("text-big");
  }
  if (resultElemClassList.contains("text-big")) {
    resultElem.classList.remove("text-big");
    resultElem.classList.add("text-small");
  }
  if (value === "AC") {
    curValue = "";
  } 
  else if (value === "x") {
    curValue = curValue.substring(0, curValue.length - 1);
  } 
  else if (value === "=") {
         resultElem.classList.add("active");
         inputElem.classList.remove("text-big");
         inputElem.classList.add("text-small");
         resultElem.classList.remove("text-small");
         resultElem.classList.add("text-big");
       
  } 
  else if (value === "+" || value === "-" || value === "×" || value === "÷") {
      if (resultElemClassList.contains("active")) {
        resultElem.classList.remove("active");
        curValue = resultElem.innerHTML + value;
      } else {
        curValue = curValue + value;
      }
    
    if(curValue.length - 1 === 0 && value != "-"){
      curValue = "";
    }
    
  }
  else
  {
    if (resultElemClassList.contains("active"))
     {
        resultElem.classList.remove("active");
         curValue = 0 + value;
    } 
    else {
      curValue = curValue + value;
    }
  }
  inputElem.innerHTML = curValue;
  resultElem.innerHTML = calc(curValue);
}

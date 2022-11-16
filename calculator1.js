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
    var output;
    var ooo = [
      [["×"], ["÷"]],
      [["+"], ["-"]]
    ];
    for (var i = 0; i < ooo.length; i++) {
      const regexExp =
        "(-?\\d+\\.?\\d*)([\\" + ooo[i].join("\\") + "])(-?\\d+\\.?\\d*)";
      while (input?.toString().match(regexExp)) {
        const matchedWords = input.match(regexExp);
        output = calc_internal(matchedWords[1], matchedWords[2], matchedWords[3]);
        input = input.replace(matchedWords[0], output);
      }
    }
    return output ?? "";
  }
  
  function onEnterValue(value) {
    const inputElem = document.getElementsByClassName("input");
    const resultElem = document.getElementsByClassName("calculated-result");
    let curValue = inputElem[0].innerHTML;
    const inputElemClassList = inputElem[0].classList;
    const resultElemClassList = resultElem[0].classList;
    if (inputElemClassList.contains("text-small")) {
      inputElem[0].classList.remove("text-small");
      inputElem[0].classList.add("text-big");
    }
    if (resultElemClassList.contains("text-big")) {
      resultElem[0].classList.remove("text-big");
      resultElem[0].classList.add("text-small");
    }
  
    if (value === "AC") {
      curValue = "";
    } else if (value === "x") {
      curValue = curValue.substring(0, curValue.length - 1);
    } else if (value === "=") {
      const inputElemClassList = inputElem[0].classList;
      const resultElemClassList = resultElem[0].classList;
      resultElem[0].classList.add("active");
      if (inputElemClassList.contains("text-big")) {
        inputElem[0].classList.remove("text-big");
        inputElem[0].classList.add("text-small");
      }
      if (resultElemClassList.contains("text-small")) {
        resultElem[0].classList.remove("text-small");
        resultElem[0].classList.add("text-big");
      }
    } else if (value === "+" || value === "-" || value === "×" || value === "÷") {
      if (value !== curValue.at(curValue.length - 1)) {
        if (resultElemClassList.contains("active")) {
          resultElem[0].classList.remove("active");
          curValue = resultElem[0].innerHTML + value;
        } else {
          curValue = curValue + value;
        }
      }
    } else {
      if (resultElemClassList.contains("active")) {
        resultElem[0].classList.remove("active");
        curValue = 0 + value;
      } else {
        curValue = curValue + value;
      }
    }
    inputElem[0].innerHTML = curValue;
    resultElem[0].innerHTML = calc(curValue);
  }
  
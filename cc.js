// const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// const dropdown = document.querySelectorAll(".dropdown select");

// const btn = document.querySelector("form button");

// const fromCurr = document.querySelector(".from select");

// const toCurr = document.querySelector(".to select");

// for (let select of dropdown) {
//     for(currCode in countryList) {
//         let newOption = document.createElement("option");
//         newOption.innerText = currCode;
//         newOption.value = currCode;
//         if(select.name ==="from" && currCode ==="USD") {
//             newOption.selected = "selected";
//         }else if (select.name ==="to" && currCode ==="INR") {
//             newOption.selected = "selected";
//         }
//         select.append(newOption);
//     }
//     select.addEventListener("change",(evt)=> {
//         updateFlag(evt.target);
//     })
// }

// const updateFlag = (element) => {
//     let currCode = element.value;   
//     console.log(currCode);
//     let countryCode = countryList[currCode];
//     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//     let img = element.parentElement.querySelector("img");
//     img.src = newSrc;
// }

// btn.addEventListener("click", (evt)=> {
//     evt.preventDefault();
//     let amount = document.querySelector(".amount input");
//     let amtVal = amount.value;
//     if(amtVal === " " || amtVal < 1) {
//         amtVal = 1;
//         amount.value = "1";
//     }
//     console.log(amtVal);
//     const URL = `${BASE_URL}/${fromCurr}.json`;

// })

const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"//usd.min.json"
// "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    // console.log(select); check out what select is
  for (currCode in countryList) {
    // console.log(currCode+" "+countryList[currCode]); check out what currCode is and its value
    let newOption = document.createElement("option");//create an element in HTML - Option
    newOption.innerText = currCode;
    // newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.min.json`;///${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  console.log(response);
  let data = await response.json();//actual data of page is displayed after json() is called
  console.log(data);
  let from = fromCurr.value.toLowerCase();
  console.log(from);
  let to = toCurr.value.toLowerCase();
  console.log(to);

  let rate = data[from][to];//because the site is an object under an object. i.e. first call the object "data" here. then its key data[from] here. then call the key of the key like this data[from][to]
  console.log(data[from][to]);
  

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (select) => {
  let currCode = select.value;
  console.log(currCode);
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = select.parentElement.querySelector("img");//bcuz under same div parentElement called so that when one element changes other element also changes. img is selected therefore.
  img.src = newSrc;
};

btn.addEventListener("click",(evt) => {
  evt.preventDefault();
//   let amount = document.querySelector(".amount input");
//   let amtVal = amount.value;
//   if(amtVal === "" || amtVal < 1)
//   {
//     amtVal = 1;
//     amount.value = "1";
//   }
  

// const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
// let response = await fetch(URL);
// let data = await response.json;
// let rate = data[toCurr.value.to.toLowerCase()];
// let finalAmount = amtVal*rate;
// msg.innerText = `${amtVal} ${fromCurr} = ${finalAmount} ${toCurr.value}`



  updateExchangeRate();
});

window.addEventListener("load",() => {//loads/reloads latest currency data as per default value
  updateExchangeRate();
});

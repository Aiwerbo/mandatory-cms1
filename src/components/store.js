import { BehaviorSubject } from 'rxjs';

export const basket$ = new BehaviorSubject(JSON.parse(window.localStorage.getItem("basket") || "[]"));

export function updateBasket(newBasket) {

let obj = basket$.value;
let objPrice = basket$.value
let newObj = {};
let newObj2 = {};

obj.forEach(function(x) {
if (newObj[x.value.product]) {
  newObj[x.value.product] = newObj[x.value.product] + parseInt(x.value.amount);
} else {
  
  newObj[x.value.product] = parseInt(x.value.amount);
}
});

objPrice.forEach(function(x) {
 
    newObj2[x.value.product] = parseInt(x.value.price);
  
  });

let obj2 = [];
let obj3 = []

for (let x in newObj) {

obj2.push({ product: x, amount: newObj[x]});
}

for(let x in newObj2){
  obj3.push({price: newObj2[x]})
}

let finalObj = {}
let finalArr = [];

  for(let i = 0; i < obj2.length; i++){
    finalArr.push(finalObj = {...obj2[i], ...obj3[i]})

  }
  console.log(finalArr)

  newBasket = finalArr;

  if(!newBasket){
    window.localStorage.removeItem("basket");
  }
  else {
    window.localStorage.setItem("basket", JSON.stringify(newBasket));
  }
  basket$.next(newBasket)
}
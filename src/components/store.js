import { BehaviorSubject } from 'rxjs';

export const basket$ = new BehaviorSubject(JSON.parse(window.localStorage.getItem("basket") || "[]"));

export function updateBasket(newBasket) {



  if(!newBasket){
    window.localStorage.removeItem("basket");
  }
  else {
    window.localStorage.setItem("basket", JSON.stringify(newBasket));
  }
  basket$.next(newBasket)
}
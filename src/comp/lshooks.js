import { useEffect, useState, useReducer } from "react";

function getSaved(key, init) {
 const savedValue = JSON.parse(localStorage.getItem(key));

 if (savedValue) return savedValue;

 return init;
}

export function useLocal(key, init) {
 //const realVal=localStorage.getItem(key) ?? init;
 const [val, setVal] = useState(() => {
  return getSaved(key, init);
 });

 useEffect(() => {
  localStorage.setItem(key, JSON.stringify(val));
 }, [val]);

 // const save=(nVal) => {
 //     setVal(nVal);
 //     localStorage.setItem(key,nVal);
 // };
 return [val, setVal];
}

export function useLocalr(key, reducer, init) {
 //     const [value,setValue]=useState();
 //  function getvalue (){
 //     const savedValue=JSON.parse(localStorage.getItem(key));

 //     if(savedValue) setValue(savedValue);
 //     else setValue(init);
 //  }

 const realVal = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : init;

 //const realVal=localStorage.getItem(key) ?? init;
 const [val, dispatch] = useReducer(reducer, realVal);

 useEffect(() => {
  localStorage.setItem(key, JSON.stringify(val));
 }, [val]);

 // const save=(nVal) => {
 //     setVal(nVal);
 //     localStorage.setItem(key,nVal);
 // };
 return [val, dispatch];
}

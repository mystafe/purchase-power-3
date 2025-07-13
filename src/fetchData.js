//import data from './data.json'; with fetch using plain JavaScript

const fetchData = async () => {
  const response = await fetch('./data/data.json');
  const data = await response.json();
  return data;
}


export default fetchData;

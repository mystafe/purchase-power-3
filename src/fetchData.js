//import data from './data.json'; wıth fetch pure javascript

const fetchData = async () => {
  const response = await fetch('./data/data.json');
  const data = await response.json();
  return data;
}


export default fetchData;

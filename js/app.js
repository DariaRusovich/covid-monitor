
async function getData(url) {
  const response= await fetch(url)
  const DATA = await response.json()
  console.log(DATA.ukraine);
}

getData('https://api-covid19.rnbo.gov.ua/data?to=2021-07-23')
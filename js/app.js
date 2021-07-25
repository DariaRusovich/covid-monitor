fetch('https://api-covid19.rnbo.gov.ua/data?to=2021-07-23')
  .then((response) => response.json())
  .then((json) => console.log(json));
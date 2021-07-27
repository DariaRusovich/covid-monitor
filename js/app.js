
async function getResponse() {
  const response = await fetch('https://api-covid19.rnbo.gov.ua/data?to=2021-07-23')
  const data = await response.json()
  console.log(data.ukraine);
  console.log(data);
}
getResponse()
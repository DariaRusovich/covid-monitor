const tabs = document.getElementById('tabs')
console.log(tabs);



async function getResponse() {
  const response = await fetch(
    "https://api-covid19.rnbo.gov.ua/data?to=2021-07-23"
  );
  let data = await response.json();

  console.log(data); //Object

  const confirmed = data.ukraine.map((key) => {
    return key.confirmed;
  });
  console.log(confirmed);
  renderTableRow(createTableRow(data.ukraine), rowList);
}

tabs.addEventListener('click', event => {
  //console.log(event.target);
  const tab = event.target.closest('.tab-item')
  if (tab) {
    
  }


  console.log(tab);
})


const rowList = document.getElementById("rowList");
getResponse();

// confirmed: 71341
// country: 4907
// deaths: 1699
// delta_confirmed: 8
// delta_deaths: 0
// delta_existing: -9
// delta_recovered: 17
// delta_suspicion: 0
// existing: 194
// id: 105
// label: Object { en: "Vinnytsia", uk: "Вінницька область" }
// lat: 48.920517
// lng: 28.685484
// recovered: 69448
// suspicion: 59638
function createTableRow(dataArray) {
  let tableRowHtml = "";
  dataArray.forEach((rowElem) => {
    tableRowHtml += getTableData(rowElem);
  });
  return tableRowHtml;
}

function renderTableRow(tableRowHtml, data) {
  data.innerHTML = tableRowHtml;
}

function getTableData(tableData) {
  return ` <tr>
<td class="region">${tableData.label.en}</td>
<td class="confirmed"> ${tableData.confirmed} </td>
<td class="deaths">${tableData.deaths}</td>
<td class="recovered">${tableData.recovered}</td>
<td class="existing">${tableData.existing}</td></tr>

  `;
}

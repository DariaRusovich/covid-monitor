const tabs = document.getElementById("tabs");
console.log(tabs);
const searchForm = document.getElementById("searchForm");
const sortTable = document.getElementById("sortTable");
//const sortRegion = document.getElementById("sortRegion");
const tableHeads = Array.from(sortTable.children)
console.log(tableHeads);

async function getResponse() {
  const response = await fetch(
    "https://api-covid19.rnbo.gov.ua/data?to=2021-07-23"
  );
  let data = await response.json();
  console.log(data);
  let dataUA = data.ukraine;
  let dataWorld = data.world;
  //let dataLabel = dataUA[0].label.en
  //console.log(dataLabel);

  //Object
  const confirmed = data.ukraine.map((key) => {
    return key.confirmed;
  });
  //console.log(confirmed);

  renderTableRow(createTableRow(dataUA), rowList);

  sortTable.addEventListener("click", (e) => {
    const th = e.target.closest("th");
    tableHeads.forEach(siblingTh =>{
      if (siblingTh !== th) {
        siblingTh.dataset.sorting = "false"
      }
      else {
        siblingTh.dataset.sorting = "true"
      }
    })
    if (th) {
      th.dataset.order *= -1;
      const { key, order } = th.dataset;
      console.log(order);
      dataUA.sort((a, b) => {
        //console.log(b[key]);
        return (a[key] - b[key]) * order;
      });
      renderTableRow(createTableRow(dataUA), rowList);
    }
  });

  searchForm.addEventListener("input", function (e) {
    const query = this.search.value
      .trim()
      .toLowerCase()
      .split(" ")
      .filter((word) => !!word);
    console.log(query);
    const searchField = ["en"];
    const filteredRegion = searchRegion(query, searchField, dataUA);
    //console.log(searchRegion(query, searchField, dataUA));
  });

  function searchRegion(query, field, data) {
    const filteredRegion = data.filter((region) => {
      return query.every((word) => {
        return field.some((field) => {
          return region[field]?.trim()?.toLowerCase()?.includes(word);
        });
      });
    });
    //console.log(data);
    return filteredRegion;
  }

  const tabUA = document.getElementById("tabUA");
  const tabWorld = document.getElementById("tabWorld");
  tabUA.addEventListener("click", (e) => {
    async function getResponse() {
      const response = await fetch(
        "https://api-covid19.rnbo.gov.ua/data?to=2021-07-23"
      );
      let data = await response.json();
      renderTableRow(createTableRow(data.ukraine), rowList);
    }

    getResponse();
  });
  tabWorld.addEventListener("click", (e) => {
    async function getResponse() {
      const response = await fetch(
        "https://api-covid19.rnbo.gov.ua/data?to=2021-07-23"
      );
      let data = await response.json();

      renderTableRow(createTableRow(data.world), rowList);
    }
    getResponse();
  });
}

const rowList = document.getElementById("rowList");
getResponse();

tabs.addEventListener("click", (event) => {
  //console.log(event.target);

  const tab = event.target.closest(".tab-item");

  tab.classList.remove("none-active");
  tab.classList.add("active");

  if (tab) {
    const tabSiblings = findSiblings(tab);
    tabSiblings.forEach((tabSibling) => {
      tabSibling.classList.remove("active");
      tabSibling.classList.add("none-active");
    });
  }
});
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
<td class="confirmed"> ${tableData.confirmed} <br>
<span class="${(tableData.delta_confirmed > 0) ? "arrow" : (tableData.delta_confirmed < 0) ? "arrow-down" : " "}">${
  (tableData.delta_confirmed > 0 || tableData.delta_confirmed < 0) ? tableData.delta_confirmed : "-"
  }</span> </td>
<td class="deaths">${tableData.deaths} <br>
<span class="${(tableData.delta_deaths > 0) ? "arrow" : (tableData.delta_deaths < 0) ? "arrow-down" : " "}">${
  (tableData.delta_deaths > 0 || tableData.delta_deaths < 0) ? tableData.delta_deaths : "-"
  }</span></td>
<td class="recovered">${tableData.recovered} <br>
<span class="${(tableData.delta_recovered > 0) ? "arrow" : (tableData.delta_recovered < 0) ? "arrow-down" : " "}"> ${
  (tableData.delta_recovered > 0 || tableData.delta_recovered < 0) ? tableData.delta_recovered : "-"
  }</span></td>
<td class="existing">${tableData.existing} <br>
<span class="${(tableData.delta_existing > 0) ? "arrow" : (tableData.delta_existing < 0) ? "arrow-down" : " "}"> ${
   (tableData.delta_existing > 0 || tableData.delta_existing < 0) ? tableData.delta_existing : "-"
  }</span></td></tr>

  `;
}

//utils

function findSiblings(node) {
  const parent = node.parentElement;
  const children = parent.children;
  const childrenArray = Array.from(children);
  const siblingsArray = childrenArray.filter((child) => child !== node);
  return siblingsArray;
}

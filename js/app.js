
const tabs = document.getElementById("tabs");
const searchForm = document.getElementById("searchForm");
const sortTable = document.getElementById("sortTable");
const totalNum = document.getElementById('totalNum')
const tableHeads = Array.from(sortTable.children)
const modalBackdrop = document.getElementById('modalBackdrop')
const modalWindow = document.getElementById('modalWindow')
const closeModalBtn = document.getElementById('closeModalBtn')
const rowListModal = document.getElementById('rowListModal')

const numFormatter = new Intl.NumberFormat(undefined, {
  useGrouping: 'true'
});

async function getResponse() {
  const response = await fetch(
    "https://api-covid19.rnbo.gov.ua/data?to=2021-07-23"
  );
  let data = await response.json();
  console.log(data);
  let dataUA = data.ukraine;
  let dataWorld = data.world;

  const confirmed = dataUA.map((key) => {
    return key.confirmed;
  });
  const confirmedWorld = dataWorld.map((key) => {
    return key.confirmed
  });
  const worldNum = confirmedWorld.reduce((a,b) => a + b);
  console.log(confirmed);
  const deaths = dataUA.map((key) => {
    return key.deaths;
  });
  const recovered = dataUA.map((key) => {
    return key.recovered;
  });
  const existing = dataUA.map((key) => {
    return key.existing;
  });

  const keys = [confirmed, deaths, recovered, existing].map(el => el.reduce((a,b) => a + b))
  //console.log(keys[0]);
  const total = [keys[0], worldNum]
  console.log(total);
  renderTotalNum(keys)
  renderTotalCount(total)
  function renderTotalNum(totalData) {
  totalNum.innerHTML = `<div>
  <div>Confirmed:</div>
  <div class="info-item confirmed">
    <span class="count">${numFormatter.format(totalData[0])}</span>
    <span>1</span>
  </div>
  </div>
  <div>
  <div>Deaths:</div>
  <div class="info-item deaths">
    <span class="count">${numFormatter.format(totalData[1])}</span>
    <span>2</span>
  </div>
</div>
<div>
  <div>Recovered:</div>
  <div class="info-item recovered">
    <span class="count">${numFormatter.format(totalData[2])}</span>
    <span>4</span>
  </div>
</div>
<div>
  <div>Existing:</div>
  <div class="info-item existing">
    <span class="count">${numFormatter.format(totalData[3])}</span>
    <span>5</span>
  </div>
</div>`
  }

  function renderTotalCount(data) {
   tabs.innerHTML = ` <div class="tab-item active" id="tabUA">
   <h2 class="title">Ukraine</h2>
   <span>${numFormatter.format(data[0])}</span>
 </div>
 <div class="tab-item none-active" id="tabWorld">
   <h2 class="title">World</h2>
   <span>${numFormatter.format(data[1])}</span>
 </div>`
  }

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
    document.addEventListener("click", (event) => {
      const rowListModal = event.target.closest(".rowListModal")
      const closeModalBtn = document.getElementById('closeModalBtn')
      //console.log(rowListModal);
      if (rowListModal){
      const rowListId = rowListModal.dataset.id
      console.log(rowListId);
      const rowListData = dataWorld.find(region => region.id === +rowListId)
  console.log(rowListData);
      createModalWindowHtml(rowListData)
        openModal()
      }
      else if(event.target === modalBackdrop || (event.target === closeModalBtn)) {
        closeModal();
      } 
      
      })






  });

  document.addEventListener("click", (event) => {
    const rowListModal = event.target.closest(".rowListModal")
    const closeModalBtn = document.getElementById('closeModalBtn')
    //console.log(rowListModal);
    if (rowListModal){
    const rowListId = rowListModal.dataset.id
    console.log(rowListId);
    const rowListData = dataUA.find(region => region.id === +rowListId)
    createModalWindowHtml(rowListData)
      openModal()
    }
    else if(event.target === modalBackdrop || (event.target === closeModalBtn)) {
      closeModal();
    } 
    
    })
    document.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });
 
}

function openModal() {
  document.body.classList.add("show-modal");
 
}
function closeModal() {
  document.body.classList.remove("show-modal");
}

const rowList = document.getElementById("rowList");
getResponse();

tabs.addEventListener("click", (event) => {
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
  return ` 
  <tr class="rowListModal" data-id="${tableData.id}">
<td class="region">${tableData.label.en}</td>
<td class="confirmed"> ${numFormatter.format(tableData.confirmed)} <br>
<span class="${(tableData.delta_confirmed > 0) ? "arrow" : (tableData.delta_confirmed < 0) ? "arrow-down" : " "}">${
  (tableData.delta_confirmed > 0 || tableData.delta_confirmed < 0) ? numFormatter.format(tableData.delta_confirmed) : "-"
  }</span> </td>
<td class="deaths">${numFormatter.format(tableData.deaths)} <br>
<span class="${(tableData.delta_deaths > 0) ? "arrow" : (tableData.delta_deaths < 0) ? "arrow-down" : " "}">${
  (tableData.delta_deaths > 0 || tableData.delta_deaths < 0) ? numFormatter.format(tableData.delta_deaths) : "-"
  }</span></td>
<td class="recovered">${numFormatter.format(tableData.recovered)} <br>
<span class="${(tableData.delta_recovered > 0) ? "arrow" : (tableData.delta_recovered < 0) ? "arrow-down" : " "}"> ${
  (tableData.delta_recovered > 0 || tableData.delta_recovered < 0) ? numFormatter.format(tableData.delta_recovered) : "-"
  }</span></td>
<td class="existing">${numFormatter.format(tableData.existing)} <br>
<span class="${(tableData.delta_existing > 0) ? "arrow" : (tableData.delta_existing < 0) ? "arrow-down" : " "}"> ${
   (tableData.delta_existing > 0 || tableData.delta_existing < 0) ? numFormatter.format(tableData.delta_existing) : "-"
  }</span></td></tr>

  `;
}

function createModalWindowHtml(modalData) {
  modalWindow.innerHTML = createModalWindow(modalData)
}

function createModalWindow(modalData) {

  return `
  <h2 class="modal-title">${modalData.label.en}</h2>
  <div class="modal-content">
  <div>
    <div>Confirmed:</div>
    <div class="info-item confirmed">
      <span class="count">${numFormatter.format(modalData.confirmed)}</span>
      <span class="${(modalData.delta_confirmed > 0) ? "arrow" : (modalData.delta_confirmed < 0) ? "arrow-down" : " "}">${
        (modalData.delta_confirmed > 0 || modalData.delta_confirmed < 0) ? numFormatter.format(modalData.delta_confirmed) : "-"
        }</span>
    </div>
  </div>
  <div>
    <div>Deaths:</div>
    <div class="info-item deaths">
      <span class="count">${numFormatter.format(modalData.deaths)}</span>
      <span class="${(modalData.delta_deaths > 0) ? "arrow" : (modalData.delta_deaths < 0) ? "arrow-down" : " "}">${
        (modalData.delta_deaths > 0 || modalData.delta_deaths < 0) ? numFormatter.format(modalData.delta_deaths) : "-"
        }</span>
    </div>
  </div>
  <div>
    <div>Recovered:</div>
    <div class="info-item recovered">
      <span class="count">${numFormatter.format(modalData.recovered)}</span>
      <span class="${(modalData.delta_recovered > 0) ? "arrow" : (modalData.delta_recovered < 0) ? "arrow-down" : " "}">${
        (modalData.delta_recovered > 0 || modalData.delta_recovered < 0) ? numFormatter.format(modalData.delta_recovered) : "-"
        }</span>
    </div>
  </div>
  <div>
    <div>Existing:</div>
    <div class="info-item existing">
      <span class="count">${numFormatter.format(modalData.existing)}</span>
      <span class="${(modalData.delta_existing > 0) ? "arrow" : (modalData.delta_existing < 0) ? "arrow-down" : " "}">${
        (modalData.delta_existing > 0 || modalData.delta_existing < 0) ? numFormatter.format(modalData.delta_existing) : "-"
       }</span>
    </div>
  </div>
  </div>
  <button class="close-modal-btn" id="closeModalBtn">&times;</button>
  `
}

//utils

function findSiblings(node) {
  const parent = node.parentElement;
  const children = parent.children;
  const childrenArray = Array.from(children);
  const siblingsArray = childrenArray.filter((child) => child !== node);
  return siblingsArray;
}




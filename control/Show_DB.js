class dbShown {
  filter(guitarType) {
    let rows = document.getElementsByClassName("guitar-row");
    for (let i = 0; i < rows.length; i++) {
      let type = rows[i].querySelectorAll("td")[3].textContent;
      if (type === guitarType) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }

  filterForAcc(guitarType) {
    let rows = document.getElementsByClassName("guitar-row");
    for (let i = 0; i < rows.length; i++) {
      let type = rows[i].querySelectorAll("td")[0].textContent;
      if (type === guitarType) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }

  showAll() {
    let rows = document.getElementsByClassName("guitar-row");
    for (let i = 0; i < rows.length; i++) {
      rows[i].style.display = "";
    }
  }
}

function filterTable(guitarType) {
  let db = new dbShown();
  db.filter(guitarType);
}

function filterForAcc(guitarType) {
  let db = new dbShown();
  db.filterForAcc(guitarType);
}

function showAll() {
  let db = new dbShown();
  db.showAll();
}

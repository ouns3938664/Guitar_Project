class Instrument {
  constructor() {
    this.cost = 0;
  }
  setCost() {
    let cost = 1000;
    this.cost = cost;
  }
  getCost() {
    return this.cost;
  }
}

class Guitar extends Instrument {
  constructor() {
    super();
    this.color = "";
    this.pickup = "";
    this.neck = "";
    this.type = "";
  }
  setColor(color) {
    this.color = color;
  }
  setPickup(pickup) {
    this.pickup = pickup;
  }
  setNeck(neck) {
    this.neck = neck;
  }
  setType(type) {
    this.type = type;
  }
  getColor() {
    return this.color;
  }
  getPickup() {
    return this.pickup;
  }
  getNeck() {
    return this.neck;
  }
  setCost() {
    super.setCost();
    if (this.color == "Sunburst") {
      this.cost += 1000;
    } else if (this.color == "Black") {
      this.cost += 800;
    } else if (this.color == "Red") {
      this.cost += 700;
    }
    if (this.pickup == "Humbucker") {
      this.cost += 200;
    } else if (this.pickup == "Trembucker") {
      this.cost += 150;
    }
    if (this.neck == "Maple") {
      this.cost += 400;
    } else if (this.neck == "Ebony") {
      this.cost += 300;
    }
  }
}

class Bass extends Instrument {
  constructor() {
    super();
    this.color = "";
    this.pickup = "";
    this.neck = "";
    this.type = "";
  }
  setColor(color) {
    this.color = color;
  }
  setPickup(pickup) {
    this.pickup = pickup;
  }
  setNeck(neck) {
    this.neck = neck;
  }
  setType(type) {
    this.type = type;
  }
  getColor() {
    return this.color;
  }
  getPickup() {
    return this.pickup;
  }
  getNeck() {
    return this.neck;
  }
  setCost() {
    super.setCost();
    if (this.color == "Purple") {
      this.cost += 1000;
    } else if (this.color == "Black") {
      this.cost += 800;
    } else if (this.color == "Blue") {
      this.cost += 700;
    }
    if (this.pickup == "Fender") {
      this.cost += 200;
    } else if (this.pickup == "Hipshot") {
      this.cost += 150;
    }
    if (this.neck == "Maple") {
      this.cost += 400;
    } else if (this.neck == "Ebony") {
      this.cost += 300;
    }
  }
}

class Acoustic extends Instrument {
  constructor() {
    super();
    this.top = "";
    this.body = "";
    this.neck = "";
    this.bridge = "";
  }
  setTop(top) {
    this.top = top;
  }
  setBody(body) {
    this.body = body;
  }
  setNeck(neck) {
    this.neck = neck;
  }
  setBridge(bridge) {
    this.bridge = bridge;
  }
  setType(type) {
    this.type = type;
  }
  getTop() {
    return this.top;
  }
  getBody() {
    return this.body;
  }
  getNeck() {
    return this.neck;
  }
  getBridge() {
    return this.bridge;
  }
  setCost() {
    super.setCost();
    if (this.top == "Maple") {
      this.cost += 500;
    } else if (this.top == "Mahogany") {
      this.cost += 550;
    } else if (this.top == "Walnut") {
      this.cost += 400;
    } else if (this.top == "Acacia") {
      this.cost += 600;
    }
    if (this.body == "Maple") {
      this.cost += 600;
    } else if (this.body == "Mahogany") {
      this.cost += 700;
    } else if (this.body == "Walnut") {
      this.cost += 450;
    } else if (this.body == "Acacia") {
      this.cost += 650;
    }
    if (this.neck == "Maple") {
      this.cost += 400;
    } else if (this.neck == "Ebony") {
      this.cost += 300;
    } else if (this.neck == "Mahogany") {
      this.cost += 400;
    }
    if (this.bridge == "Bone") {
      this.cost += 100;
    } else if (this.bridge == "Wood") {
      this.cost += 80;
    } else if (this.bridge == "Plastic") {
      this.cost += 50;
    }
  }
}

function changeGuitarE() {
  const myGuitar = new Guitar();
  const colorSelect = document.getElementById("colorSelect");
  const pickupSelect = document.getElementById("pickupSelect");
  const neckSelect = document.getElementById("neckSelect");

  if (colorSelect.value === "Select Color" || pickupSelect.value === "Select Pickup" || neckSelect.value === "Select Neck") {
    return;
  }

  myGuitar.setColor(colorSelect.value);
  myGuitar.setPickup(pickupSelect.value);
  myGuitar.setNeck(neckSelect.value);

  document.getElementById("gColor").innerHTML = myGuitar.getColor();
  document.getElementById("gPickup").innerHTML = myGuitar.getPickup();
  document.getElementById("gNeck").innerHTML = myGuitar.getNeck();

  colorSelect.value = "";
  pickupSelect.value = "";
  neckSelect.value = "";

  myGuitar.setType("Electric Guitar");
  console.log(myGuitar.type);

  myGuitar.setCost();
  document.getElementById("gCost").value = myGuitar.getCost();
  document.getElementById("gCost").innerHTML = myGuitar.getCost();
  document.getElementById("colorDisplay").value = myGuitar.color;
  document.getElementById("pickupDisplay").value = myGuitar.pickup;
  document.getElementById("neckDisplay").value = myGuitar.neck;
  document.getElementById("gCostDisplay").value = myGuitar.cost;
}
////////////////////////////////
function changeGuitarB() {
  const myBass = new Bass();
  const colorSelect = document.getElementById("colorSelect");
  const pickupSelect = document.getElementById("pickupSelect");
  const neckSelect = document.getElementById("neckSelect");

  if (colorSelect === "Select Color" || pickupSelect === "Select Pickup" || neckSelect === "Select Neck") {
    return;
  }

  myBass.setColor(colorSelect.value);
  myBass.setPickup(pickupSelect.value);
  myBass.setNeck(neckSelect.value);

  document.getElementById("gColor").innerHTML = myBass.getColor();
  document.getElementById("gPickup").innerHTML = myBass.getPickup();
  document.getElementById("gNeck").innerHTML = myBass.getNeck();

  colorSelect.value = "";
  pickupSelect.value = "";
  neckSelect.value = "";

  myBass.setType("Bass");
  console.log(myBass.type);

  myBass.setCost();
  document.getElementById("gCost").innerHTML = myBass.getCost();
  document.getElementById("gCost").innerHTML = myBass.getCost();
  document.getElementById("colorDisplay").value = myBass.color;
  document.getElementById("pickupDisplay").value = myBass.pickup;
  document.getElementById("neckDisplay").value = myBass.neck;
  document.getElementById("gCostDisplay").value = myBass.cost;
  console.log(myBass.cost);
}
///////////////////////////////////////
function changeGuitarA() {
  const myAcoustic = new Acoustic();
  const topSelect = document.getElementById("topSelect");
  const bodySelect = document.getElementById("bodySelect");
  const neckSelect = document.getElementById("neckSelect");
  const bridgeSelect = document.getElementById("bridgeSelect");

  if (topSelect === "Select Top" || bodySelect === "Select Body" || neckSelect === "Select Neck" || bridgeSelect === "Select Bridge") {
    return;
  }

  myAcoustic.setTop(topSelect.value);
  myAcoustic.setBody(bodySelect.value);
  myAcoustic.setNeck(neckSelect.value);
  myAcoustic.setBridge(bridgeSelect.value);

  document.getElementById("gTop").innerHTML = myAcoustic.getTop();
  document.getElementById("gBody").innerHTML = myAcoustic.getBody();
  document.getElementById("gNeck").innerHTML = myAcoustic.getNeck();
  document.getElementById("gBridge").innerHTML = myAcoustic.getBridge();

  topSelect.value = "";
  bodySelect.value = "";
  neckSelect.value = "";
  bridgeSelect.value = "";

  myAcoustic.setType("Acoustic");
  console.log(myAcoustic.type);

  myAcoustic.setCost();
  document.getElementById("gCost").innerHTML = myAcoustic.getCost();
  document.getElementById("gCost").innerHTML = myAcoustic.getCost();
  document.getElementById("topDisplay").value = myAcoustic.top;
  document.getElementById("bodyDisplay").value = myAcoustic.body;
  document.getElementById("neckDisplay").value = myAcoustic.neck;
  document.getElementById("bridgeDisplay").value = myAcoustic.bridge;
  document.getElementById("gCostDisplay").value = myAcoustic.cost;
  console.log(myAcoustic.cost);
}

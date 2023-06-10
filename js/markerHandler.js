AFRAME.registerComponent("markerhandler", {
  init: async function () {
    var toys = await this.getToys();

    this.el.addEventListener("markerFound", () => {
      var markerID = this.el.ID;
      this.handleMarkerFound(toys, markerID);
    });

    this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
    });
  },
  handleMarkerFound: function (toys, markerID) {
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "flex";

    var ratingButton = document.getElementById("rating-button");
    var orderButtton = document.getElementById("order-button");

    ratingButton.addEventListener("click", function () {
      swal({
        icon: "warning",
        title: "Rate Toy",
        text: "Work In Progress",
      });
    });

    orderButtton.addEventListener("click", () => {
      swal({
        icon: "https://i.imgur.com/4NZ6uLY.jpg",
        title: "Thanks For Order !",
        text: "Your order will serve soon on your table!",
      });
    });

    var toy = toys.filter((toy) => toy.ID === markerID)[0];

    var model = document.querySelector(`#model-${toy.ID}`);
    model.setAttribute("position", toy.MODEL_GEOMETRY.POSN);
    model.setAttribute("rotation", toy.MODEL_GEOMETRY.ROTN);
    model.setAttribute("scale", toy.MODEL_GEOMETRY.SCALE);
  },

  handleMarkerLost: function () {
    // Changing button div visibility
    var buttonDiv = document.getElementByID("button-div");
    buttonDiv.style.display = "none";
  },

  getToys: async function () {
    return await firebase
      .firestore()
      .collection("TOYS")
      .get()
      .then((snap) => {
        return snap.docs.map((doc) => doc.data());
      });
  },
});

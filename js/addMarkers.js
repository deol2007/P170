AFRAME.registerComponent("create-markers", {
  
  init: async function() {

    var mainScene = document.querySelector("#main-scene");

    var toys = await this.getToys();
   
    toys.map(toy => {
      var marker = document.createElement("a-marker");   
      marker.setAttribute("id", toy.ID);
      marker.setAttribute("type", "pattern");
      marker.setAttribute("url", toy.MARKER_PATTERN_URL);

      marker.setAttribute("cursor", {
        rayOrigin: "mouse"
      });

      marker.setAttribute("markerhandler", {});

      mainScene.appendChild(marker);

      var model = document.createElement("a-entity");    

      model.setAttribute("id", `model-${toy.ID}`);
      model.setAttribute("position", toy.MODEL_GEOMETRY.POSN);
      model.setAttribute("rotation", toy.MODEL_GEOMETRY.ROTN);
      model.setAttribute("scale", toy.MODEL_GEOMETRY.SCALE);
      model.setAttribute("gltf-model", `url(${toy.MODEL_URL})`);
      model.setAttribute("gesture-handler", {});

      marker.appendChild(model);

      var mainPlane = document.createElement("a-plane");
      mainPlane.setAttribute("id", `main-plane-${toy.ID}`);
      mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
      mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
      mainPlane.setAttribute("width", 1.7);
      mainPlane.setAttribute("height", 1.5);
      marker.appendChild(mainPlane);

      var titlePlane = document.createElement("a-plane");
      titlePlane.setAttribute("id", `title-plane-${toy.ID}`);
      titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
      titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
      titlePlane.setAttribute("width", 1.69);
      titlePlane.setAttribute("height", 0.3);
      titlePlane.setAttribute("material", { color: "#F0C30F" });
      mainPlane.appendChild(titlePlane);

    
      var toyTitle = document.createElement("a-entity");
      toyTitle.setAttribute("id", `toy-title-${toy.ID}`);
      toyTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 });
      toyTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
      toyTitle.setAttribute("text", {
        font: "monoid",
        color: "black",
        width: 1.8,
        height: 1,
        align: "center",
        value: toy.toy_name.toUpperCase()
      });
      titlePlane.appendChild(toyTitle);

     
      var lists = document.createElement("a-entity");
      lists.setAttribute("id", `lists-${toy.ID}`);
      lists.setAttribute("position", { x: 0.3, y: 0, z: 0.1 });
      lists.setAttribute("rotation", { x: 0, y: 0, z: 0 });
      lists.setAttribute("text", {
        font: "monoid",
        color: "black",
        width: 2,
        align: "left",
        value: `${toy.LIST.join("\n\n")}`
      });
      mainPlane.appendChild(lists);
    });
  },
  
  getToys: async function() {
    return await firebase
      .firestore()
      .collection("TOYS")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  }
});


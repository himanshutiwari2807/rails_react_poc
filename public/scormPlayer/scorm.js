class ScormManifest {
  constructor(xml) {
    this.xml = xml;
    this.resources = [];
    this.parseManifest();
  }

  parseManifest() {
    let $xml = $(this.xml);

    // Parse resources from the manifest XML
    $xml.find("resources resource").each((index, resource) => {
      this.resources.push({
        id: $(resource).attr("identifier"),
        href: $(resource).attr("href"),
        type: $(resource).attr("type"),
      });
    });
  }

  getResourceById(id) {
    return this.resources.find((resource) => resource.id === id);
  }
}

function loadSCORM(callback) {
  console.log("Loading SCORM...");

  $.ajax({
    url: "/scormPlayer/Leadingscorm/imsmanifest.xml",
    dataType: "xml",
    success: function (result) {
      console.log("Manifest loaded successfully.");
      window.manifest = new ScormManifest(result);

      // Get the resource by ID
      let resource = window.manifest.getResourceById("ALLRESOURCES");
      if (resource) {
        // Call the callback function with the resource URL
        if (typeof callback === "function") {
          callback(resource.href);
        }
      } else {
        console.log("Resource not found.");
      } s
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log("Error loading manifest.");
      console.log(xhr.status);
      console.log(thrownError);
    },
  });
}

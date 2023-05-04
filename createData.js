// let clients = ['EDPR', 'Van Oord', 'Jet Star', 'Appolo'];
// let instances = ['Production', 'UAT/Beta', 'QA', 'Dev'];
// let products = ['xAssist', 'xAuthor', 'xAdmin', 'xViewer', 'Q&A engine'];
// let projects = ['Prairie Queen', 'Vestas', 'Lonestar', 'Suzlon'];
var fs = require('fs');

let clients = ['Van Oord'];
let instances = ['Production', 'UAT/Beta', 'QA', 'Dev'];
let products = ['Q&A engine'];
let projects = [''];

// let featureList = [
//       {
//         featureId: "dashboard",
//         state: "enabled"
//       },
//       {
//         featureId: "my-team",
//         state: "enabled"
//       },
//       {
//         featureId: "my-schedule",
//         state: "disabled"
//       },
//       {
//         featureId: "my-tasks",
//         state: "disabled"
//       },
//       {
//         featureId: "my-sessions",
//         state: "enabled"
//       },
//       {
//         featureId: "my-reports",
//         state: "disabled"
//       },
//       {
//         featureId: "tools",
//         state: "disabled"
//       },
//       {
//         featureId: "my-profile",
//         state: "enabled"
//       },
//       {
//         featureId: "qr-scanner",
//         state: "disabled"
//       },
//       {
//         featureId: "settings",
//         state: "disabled"
//       },
//       {
//         featureId: "add-a-solution",
//         state: "disabled"
//       },
//       {
//         featureId: "voice-to-text",
//         state: "disabled"
//       },
//       {
//         featureId: "notifications",
//         state: "disabled"
//       },
//       {
//         featureId: "performance",
//         state: "disabled"
//       },
//       {
//         featureId: "fix-a-problem",
//         state: "enabled"
//       },
//       {
//         featureId: "look-up",
//         state: "enabled"
//       },
//       {
//         featureId: "help-from-someone",
//         state: "disabled"
//       }
// ];

let featureList = [
  {
    featureId: "filter",
    state: "enabled"
  },
  {
    featureId: "side-bar",
    state: "enabled"
  },
  {
    featureId: "feedback",
    state: "enabled"
  },
  {
    featureId: "x-auther-doc-search",
    state: "enabled"
  },
  {
    featureId: "add-document",
    state: "enabled"
  },
  {
    featureId: "notifications",
    state: "enabled"
  },
  {
    featureId: "feedback",
    state: "enabled"
  },
  {
    featureId: "x-auther-app-filter",
    state: "enabled"
  }
];


let ClientFeature = [];
    for (let i=0; i<clients.length; i++) {
        for (let j=0; j<instances.length; j++) {
            for (let k=0; k<products.length; k++) {
                for (let l=0; l<projects.length; l++) {
                    ClientFeature.push({
                        client: clients[i],
                        instance: instances[j],
                        product: products[k],
                        project: projects[l],
                        features: featureList
                    })
                }
            }
        }
    }

fs.writeFile("./clientFeatureData/vanoord.json", JSON.stringify(ClientFeature), function(err) {
      if (err) {
          console.log(err);
      }
});

console.log(ClientFeature);

const cds = require("@sap/cds");
const application=require("@sap/cds-odata-v2-adapter-proxy");
cds.on("bootstrap",(app)=>app.use(application()));
module.exports=cds.server;
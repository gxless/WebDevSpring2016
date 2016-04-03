module.exports = function (app, db, mongoose, q) {

    var UserModel = require("./models/user/user.model.server.js")(mongoose, q);
    var FormModel = require("./models/form/form.model.server.js")(mongoose, q);
    var FieldModel = require("./models/form/field.model.server.js")(mongoose, q);

    require("./services/user.service.server.js")(app, UserModel);
    require("./services/form.service.server.js")(app, FormModel);
    require("./services/field.service.server.js")(app, FieldModel);

};
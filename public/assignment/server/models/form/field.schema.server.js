module.exports = function (mongoose) {

    var FieldSchema = mongoose.Schema({
        label: String,
        type: {type: String,
            enum: ["TEXT", "TEXTAREA", "CHECKBOXES", "RADIOS", "OPTIONS", "DATE"],
            default: "TEXT"},
        placeholder: String,
        options: [{_id: false, label: String, value: String}]
    });

    return FieldSchema;
};
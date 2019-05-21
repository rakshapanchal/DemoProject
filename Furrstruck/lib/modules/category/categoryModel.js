/**Importing mongoose */
var mongoose = require("mongoose");
/**Importing constants file */
var constant = require('../../constants')
/**Importing categoryConstants file */
var status = require('../../constants').STATUS

var mongoosePaginate = require('mongoose-paginate');
var type = require('./categoryConstants').types

var Schema = mongoose.Schema;
var categorySchema = new Schema({
    name: { type: String, trim: true, required: true },
    status: { type: String, enum: [status.ACTIVE, status.INACTIVE, status.DELETE], default: status.ACTIVE },
    type: { type: String, enum: [type.category, type.subCategory], default: type.category },
    category: { type: mongoose.Schema.Types.ObjectId, ref: constant.DB_MODEL_REF.CATEGORY },
    metaTags: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId },
    editedBy: { type: mongoose.Schema.Types.ObjectId },
    createdAt: { type: Date, default: Date.now() }
})

categorySchema.plugin(mongoosePaginate)

//Export Category module
Category = module.exports = mongoose.model(constant.DB_MODEL_REF.CATEGORY, categorySchema)
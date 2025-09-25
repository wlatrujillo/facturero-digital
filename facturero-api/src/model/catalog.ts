import { Document, Schema, Model, model, Types } from "mongoose";


interface Item {
    code: String,
    value: String
}
export interface ICatalog extends Document {
    name: String;
    active: Boolean;
    items: Item[];
    company: Types.ObjectId;
}


let CatalogSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true

    },
    items: {
        type: [{ code: String, value: String }],
        required: true
    }

});


CatalogSchema.index({ name: 1 }, { unique: true });

export const Catalog: Model<ICatalog> = model<ICatalog>("Catalog", CatalogSchema);


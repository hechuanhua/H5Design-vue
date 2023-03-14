import { Application } from "egg";

export default (app: Application) => {
  const { mongoose } = app;
  const templateSchema = new mongoose.Schema(
    {
      _id: { type: String, required: true, unique: true },
      title: { type: String, required: true },
      layout_data: { type: String, required: true },
      create_date: { type: Date, required: true },
      update_date: { type: Date },
      // __v: { type: String, select: false },
    },
    { versionKey: false }
  );
  templateSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      ret.tid = doc._id;
      delete ret.id;
      delete ret._id;
    },
  });
  return mongoose.model("Template", templateSchema, "template");
};

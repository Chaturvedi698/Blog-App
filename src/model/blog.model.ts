import mongoose,{Schema} from "mongoose";

const schema = new Schema({
    title : String,
    description : String,
    image : {
        filename: String,
        data: Buffer,
        mimetype:String,
        url:String
    }
});

const BlogModel = mongoose.model("Blog",schema);

export default BlogModel;
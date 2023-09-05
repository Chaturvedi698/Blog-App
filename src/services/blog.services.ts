import { IncomingMessage, ServerResponse } from "http";
import url from "url";
import BlogModel from "../model/blog.model";
import * as formidable from "formidable";
import fs from 'fs';

export async function getblogs(req: IncomingMessage, res: ServerResponse) {
  try {
    const { page = 1, limit = 10 ,sort,asc=1}:Record<string,any> = url.parse("" + req.url, true).query;
    const skip = (Number(page) - 1) * 10;
    const Blogs = await BlogModel.find().skip(skip).limit(Number(limit)).sort({[sort]:asc});

    res.statusCode = 200;
    res.end(JSON.stringify({ page: page, limit: limit, skips: skip, Blogs }));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: "Internal Server Error " }));
  }
}

export async function createblog(req: IncomingMessage, res: ServerResponse) {
  let formadata = new formidable.IncomingForm();

  formadata.parse(req,async(err:any,fields:any,files:any)=>{
    const title = fields.title;
    const Users = await BlogModel.findOne({ title: title });
    if(Users!=null){
      res.statusCode = 409;
      res.end(JSON.stringify({message : "Blog Already present with the same title"}))
    }
    if(err){
      res.statusCode = 500;
      res.end(JSON.stringify({mesaage: "Failed to parse form"}))
    }

    const imageFile = files.image;
    if(!imageFile){
      res.statusCode = 400;
      res.end(JSON.stringify({message : "No file selected"}));
    }
    try{

      const bufferdata = await fs.promises.readFile(imageFile[0].filepath);
      const base64ImageData = bufferdata.toString('base64');
      const mimeType = imageFile[0].mimetype;
      const dataURL = `data:${mimeType};base64,${base64ImageData}`;
      await BlogModel.create({
      title: fields.title[0], 
      description: fields.description[0],
      image: { filename: imageFile[0].originalFilename, data: bufferdata, mimetype: imageFile[0].mimetype,url:dataURL},
    });
    res.statusCode= 200;
    res.end(JSON.stringify({message : "Blog created Successfully"}));
    }
    catch(err){
      res.statusCode = 500;
      res.end(JSON.stringify({message : "Internal Server Error"}));
    }
  });
}

export async function deleteblog(req: IncomingMessage, res: ServerResponse) {
  try {
    const id = req.url?.slice(6);
    await BlogModel.deleteOne({ _id: id });
    res.statusCode = 200;
    res.end(JSON.stringify({ id, message: `User of ${id} is deleted` }));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

export async function updateblog(req: IncomingMessage, res: ServerResponse) {
  let BlogId = req.url?.slice(6);

  const form = new formidable.IncomingForm();

  form.parse(req, async (err: any, fields: any, files: any) => {
    if (err) {
      res.statusCode =500;
      res.end(JSON.stringify({message : 'Failed to parse the Form'}));
    }


    const imageFile = files.image;

    if (!imageFile) {
      res.statusCode = 400;
      res.end(JSON.stringify({message : "No file selected"}));
    }

    try {
      const imageBuffer = await fs.promises.readFile(imageFile[0].filepath);
      const base64ImageData = imageBuffer.toString('base64');
      const mimeType = imageFile[0].mimetype;
      const dataURL = `data:${mimeType};base64,${base64ImageData}`;
      await BlogModel.findOneAndUpdate({_id : BlogId},{
      title: fields.title[0], 
      description: fields.description[0],
      image: { filename: imageFile.name, data: imageBuffer, mimetype: imageFile[0].mimetype,url:dataURL},
    });
    res.statusCode = 200;
    res.end(JSON.stringify({message : "Blog updated successfully" }));
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
    res.end(JSON.stringify({message : "Internal Server Error" }));
    }
  });
}

export async function findblog(req: IncomingMessage, res: ServerResponse) {
  try {
    const id = req.url?.slice(9);
    const Users = await BlogModel.findOne({ _id: id });
    res.statusCode = 200;
    res.end(JSON.stringify(Users));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: "User you requested is not present" }));
  }
}

export async function searchblog(req: IncomingMessage, res: ServerResponse) {
  try {
    const title = url.parse("" + req.url, true).query.title;
    const Users = await BlogModel.findOne({ title: title });
    if (Users === null) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "User you requested is not present" }));
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify(Users));
    }
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: "User you requested is not present" }));
  }
}

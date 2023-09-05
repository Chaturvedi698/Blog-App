import { IncomingMessage, ServerResponse } from "http";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  updateBlog,
  findBlog,
  searchBlog
} from "../controller/blog.controller";

export async function handleRequest(req: IncomingMessage, res: ServerResponse) {
  if (req.url === "/getBlog" && req.method === "GET") {
    getBlogs(req, res);
  } 
  else if(req.url?.startsWith("/page/") && req.method ==='GET'){
    getBlogs(req,res);
  }
  else if (req.url === "/blog" && req.method === "POST") {
    createBlog(req, res);
  } else if (req.url?.startsWith("/blog/") && req.method === "DELETE") {
    deleteBlog(req, res);
  } else if (req.url?.startsWith("/blog/") && req.method === "PUT") {
    updateBlog(req, res);
  } else if (req.url?.startsWith("/getBlog/") && req.method === "GET") {
    findBlog(req, res);
  } else if(req.url?.startsWith("/search/?title=") && req.method == "GET"){
    searchBlog(req,res);
  }
  else {
    res.statusCode = 400;
    res.end("The url you requested is not available");
  }
}
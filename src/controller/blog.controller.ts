import { IncomingMessage, ServerResponse } from "http";
import {
  getblogs,
  deleteblog,
  updateblog,
  createblog,
  findblog,
  searchblog
} from "../services/blog.services";

export async function getBlogs(req: IncomingMessage, res: ServerResponse) {
  await getblogs(req, res);
}

export async function createBlog(req: IncomingMessage, res: ServerResponse) {
  await createblog(req, res);
}

export async function deleteBlog(req: IncomingMessage, res: ServerResponse) {
  await deleteblog(req, res);
}

export async function updateBlog(req: IncomingMessage, res: ServerResponse) {
  await updateblog(req, res);
}

export async function findBlog(req: IncomingMessage, res: ServerResponse) {
  await findblog(req, res);
}

export async function searchBlog(req: IncomingMessage, res: ServerResponse){
  await searchblog(req,res);
}
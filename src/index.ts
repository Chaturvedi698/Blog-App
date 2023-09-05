import http from "http";
import { handleRequest } from "./route/blog.routes";
// import { connection } from './databae/dbConfig';
import { connection } from "./config/db";

const server = http.createServer(handleRequest);

connection();

const PORT = 3010;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// For get all the blog data --> Make GET Request with the url     -------    http://localhost:3000/show
// For creating the blog --> Make POST Request with the url  ------ http://localhost:3000/create
// For updating the blog --> Make PUT Request with the url ----- http://localhost:3000/update/:id
// For deleting the blog --> Make DELETE Request with the url ---- http://localhost:3000/delete/:id
// For search the blog --> Make GET Request with the url ---- http://localhost:3000/search/:id

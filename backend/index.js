/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { object, string, number, date, boolean } from 'yup';
import jwtDecode from 'jwt-decode';


// database schema
const todoYup = object({
  user: string().required(),
  item: string().required(),
  details: string().optional(),
  complete: boolean().required(),
  category: string().optional(),
  createDate: date().default(() => new Date()),
});


const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ','');
      const token_parsed = jwtDecode(token);
      req.user_token = token_parsed;
    }
    next();
  } catch (error) {
    next(error);
  } 
}
app.use(userAuth)

// Used codes from 'Tech-Stack-2-Kluver-Demo' (https://github.com/csci5117s23/Tech-Stack-2-Kluver-Demo)
// some extra logic for GET / and POST / requests.
app.use('/todos', (req, res, next) => {
  if (req.method === "POST") {
      req.body.userId = req.user_token.sub
  } else if (req.method === "GET") {
      req.query.userId = req.user_token.sub
  }
  next();
})

// some extra logic for GET /id and PUT /id DELETE /id PATCH /id requests.
// side effect here will break patch patch by query, but that's OK for my purposes.
app.use('/todos/:id', async (req, res, next) => {
  const id = req.params.ID;
  const userId = req.user_token.sub
  // let's check access rights for the document being read/updated/replaced/deleted
  const conn = await Datastore.open();
  try {
      const doc = await conn.getOne('todos', id)
      if (doc.userId != userId) {
          // authenticate duser doesn't own this document.
          res.status(403).end(); // end is like "quit this request"
          return
      }
  } catch (e) {
      console.log(e);
      // the document doesn't exist.
      res.status(404).end(e);
      return;
  }
  // if we don't crash out -- call next and let crudlify deal with the details...
  next();
})



crudlify(app, {todo: todoYup})

export default app.init(); // export app to a runtime server engine




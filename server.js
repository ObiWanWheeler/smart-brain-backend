import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt-nodejs';
import { handleRegister } from './controllers/register.js';
import { handleSignin } from './controllers/signin.js';
import { handleProfile } from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js';
import { handleRoot } from './controllers/root.js';

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl:  {
        rejectUnauthorized: false
      }
    }
});


const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => handleRoot(req, res, db));

app.get('/profile/:id', (req, res) => handleProfile(req, res, db));

app.post('/signin', (req, res) => handleSignin(req, res, db, bcrypt));

app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));

app.put('/image', (req, res) => handleImage(req, res, db));

app.post('/imageurl', (req, res) => handleApiCall(req, res));

app.listen(process.env.PORT || 5000);
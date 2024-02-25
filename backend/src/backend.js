import { auth } from "./firebase/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    res.status(200).json({ uid: user.uid, email: user.email });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/', (req, res) => { 
    res.status(200).json({
        message: 'Hello World'
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on ${port}`));
export default app;
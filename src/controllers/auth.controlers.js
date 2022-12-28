import { connectionDB } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export default async function SignUp(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("Preencha todos os campos corretamente!");
    }
    const userExists = await connectionDB.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).send("Email já existente!");
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await connectionDB.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashPassword]
    );
    return res.status(200).send("Usuário criado com sucesso");
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

export async function SignIn(req, res) {
  const {email, password} = req.body
  try {
    const userExists = await connectionDB.query('SELECT * FROM users WHERE email = $1',[email]);
    if(!userExists){
      return res.status(422).send("Usuário não cadastrado no nosso banco de dados");
    }
    const passwordOk = bcrypt.compareSync(password, userExists.rows[0].password)
    if(!passwordOk){
      return res.status(422).send("Usuário ou senha não conferem!")
    }
    const token = uuidV4()
    await connectionDB.query('INSERT INTO sessions (user_id, token) VALUES ($1, $2)', [userExists.rows[0].id,token])
  return res.sendStatus(200);
  }catch (err){
    res.status(400).send(err.message)
  }
}
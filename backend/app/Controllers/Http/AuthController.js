"use strict";

const User = use("App/Models/User");

class AuthController {
  async register({ request, response }) {
    const data = request.only([
      "username",
      "name",
      "role",
      "email",
      "password",
    ]);
    if (request.only(["key"]).key === `${process.env.REGISTER_KEY}`) {
      const user = await User.create(data);
      return user;
    }
    return response.status(401).json({ Error: "Invalid key" });
  }
  async login({ request, response, auth }) {
    const { authorization } = request.headers();
    const data = await Buffer.from(
      authorization.split(" ")[1],
      "base64"
    ).toString("utf-8");
    let [username, password] = data.split(":");
    console.log(username);
    console.log(password);
    const token = await auth.attempt(username, password);
    console.log("não veio aqui");
    return token;
  }
  async auto_authenticate({ auth }) {
    const getUser = await auth.getUser();
    const verify = await User.findBy("username", getUser.username);
    return { name: verify.name, username: verify.username, role: verify.role };
  }
}

module.exports = AuthController;

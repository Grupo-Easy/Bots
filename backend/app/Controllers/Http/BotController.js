"use strict";

const ViaVerde = use("App/Models/ViaVerde");
const FreeNow = use("App/Models/FreeNow");
const User = use("App/Models/User");
const Prio = use("App/Models/Prio");
const Uber = use("App/Models/Uber");
const Bp = use("App/Models/Bp");

class BotController {
  async index({ request, response }) {
    // const getUser = await auth.getUser();
    // const user = getUser.$originalAttributes;
    if (request.only(["key"]).key === `${process.env.REGISTER_KEY}`) {
      const VVDB = await ViaVerde.all();
      const FFDB = await FreeNow.all();
      const PRDB = await Prio.all();
      const UBDB = await Uber.all();
      const BPDB = await Bp.all();
      const ViaVerdeDB = VVDB.rows;
      const FreeNowDB = FFDB.rows;
      const PrioDB = PRDB.rows;
      const UberDB = UBDB.rows;
      const BpDB = BPDB.rows;

      try {
        for (var i = 0; ViaVerdeDB.length; i++) {
          await ViaVerdeDB[i].delete();
        }
      } catch (err) {
        console.log(err);
      }

      try {
        for (let i = 0; i < FreeNowDB.length; i++) {
          await FreeNowDB[i].delete();
        }
      } catch (err) {
        console.log(err);
      }

      try {
        for (let i = 0; i < PrioDB.length; i++) {
          await PrioDB[i].delete();
        }
      } catch (err) {
        console.log(err);
      }

      try {
        for (let i = 0; i < UberDB.length; i++) {
          await UberDB[i].delete();
        }
      } catch (err) {
        console.log(err);
      }

      try {
        for (let i = 0; i < BpDB.length; i++) {
          await BpDB[i].delete();
        }
      } catch (err) {
        console.log(err);
      }

      return { status: "success" };
    } else {
      return response.status(401).json({ Error: "Invalid key" });
    }
  }
}

module.exports = BotController;

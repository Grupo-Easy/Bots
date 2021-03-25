"use strict";

const User = use("App/Models/User");
const Uber = use("App/Models/Uber");
const FreeNow = use("App/Models/FreeNow");
const fs = require("fs");

const axios = require("axios").default;

class GetDataController {
  async index({ request, response, auth }) {
    const getUser = await auth.getUser();
    const getName = await User.findBy("username", getUser.username);
    if (getName.role != "Admin") {
      const getDatas = await Uber.findBy("Nome", getName.name);

      async function despesas() {
        const Viagem = await parseFloat(
          getDatas.GanhosDeViagens.replace(",", ".")
        );

        const Despesas = await parseFloat(getDatas.Despesas);
        return Viagem + Despesas;
      }
      const despeas = await despesas();
      const ganhos = await getDatas.Ganhos;

      return {
        Despesas: `${despeas.toString().replace(".", ",")}`,
        Ganhos: getDatas.Ganhos,
      };
    } else {
      const Ubers = await Uber.all();
      const Viagens = await FreeNow.all();
      var GanhosTotais = 0;
      var DespesasTotais = 0;

      for (let i = 0; i < Ubers.rows.length; i++) {
        const { Ganhos, GanhosDeViagens } = Ubers.rows[i];
        var calc = GanhosTotais + parseFloat(Ganhos.replace(",", "."));
        GanhosTotais = calc;
        calc = DespesasTotais + parseFloat(GanhosDeViagens.replace(",", "."));
        DespesasTotais = calc;
      }

      return {
        Ganhos: `${new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        })
          .format(GanhosTotais)
          .replace("€ ", "")}`,

        Despesas: `${new Intl.NumberFormat("de-De", {
          style: "currency",
          currency: "EUR",
        })
          .format(DespesasTotais)
          .replace("€ ", "")}`,
        Viagens: Viagens.rows.length,
      };
    }
  }

  async admin({ request, response, auth }) {
    const rotas = await FreeNow.all();
    const { role } = await auth.getUser();

    if (role !== "Admin") {
      return response
        .status(401)
        .json({ Error: "You do not have permission." });
    }

    var data = [];
    var requestData = [];
    // console.log(.length);
    for (let i = 0; i < rotas.rows.length; i++) {
      // console.log(i);
      const rota = rotas.rows[i].rotas.split(", ");
      const state = rotas.rows[i].rotas.split(". ");
      var backNumber = 0;

      while (true) {
        if (state[backNumber]) {
          backNumber++;
        } else {
          backNumber -= 1;
          break;
        }
      }

      // console.log(rota);
      if (rota[0] != "") {
        requestData.push({ rota: rota[0], state: state[backNumber] });
      }
    }
    function Valid(requestData, data, index) {
      // console.log(requestData);
      // console.log(data[index].rota);
      for (var i = 0; i < data.length; i++) {
        if (data[i].rota == requestData && i != index) {
          // console.log(i);
          // console.log(data[i].rota);
          // console.log(requestData);
          return data[i].rota;
        }
      }
      return false;
    }
    for (let i = 0; i < requestData.length; i++) {
      const datas = await Valid(requestData[i].rota, data, i);
      if (datas == false) {
        data.push({
          rota: requestData[i].rota,
          state: requestData[i].state,
          index: 1,
        });
      } else {
        for (var j = 0; j < data.length; j++) {
          if (datas == data[j].rota) {
            data[j].index++;
          }
        }
      }
    }

    async function Cords(data) {
      var datasOfCords = [];
      var page = 0;
      // console.log(data);
      while (true) {
        if (page != 20) {
          for (let i = 0; i < data.length; i++) {
            const { rota, state, index } = data[i];
            if (index) {
              console.log(rota);
              console.log(state);
              await axios
                .get(`https://nominatim.openstreetmap.org/search.php`, {
                  params: {
                    q: `Rua bela vista 659 avaré`,
                    polygon_geojson: "1",
                    limit: "1",
                    format: "jsonv2",
                  },
                  headers: {
                    "User-Agent":
                      "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:84.0) Gecko/20100101 Firefox/84.0",
                    Accept: "*/*",
                    "Accept-Language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3",
                    Referer:
                      "https://nominatim.openstreetmap.org/ui/search.html?q=Avenida+do+Brasil+151&limit=1",
                    "X-Requested-With": "XMLHttpRequest",
                    Connection: "keep-alive",
                    TE: "Trailers",
                  },
                })
                .then(async (responseData) => {
                  if (responseData.data.length != 0) {
                    console.log(datasOfCords);
                    datasOfCords.push({
                      lat: responseData.data[0].lat,
                      lon: responseData.data[0].lon,
                      name: `${rota} ${state}`,
                    });
                  }
                  console.log(response.data);
                  const sleep = (milliseconds) => {
                    return new Promise((resolve) =>
                      setTimeout(resolve, milliseconds)
                    );
                  };
                  await sleep(1000);
                })
                .catch(async (err) => {
                  console.log(err);
                  // break;
                  const sleep = (milliseconds) => {
                    return new Promise((resolve) =>
                      setTimeout(resolve, milliseconds)
                    );
                  };
                  await sleep(1000);
                  datasOfCords += err;
                });
              const sleep = (milliseconds) => {
                return new Promise((resolve) =>
                  setTimeout(resolve, milliseconds)
                );
              };
              await sleep(1000);
              page++;
              console.log(page);
              if (page >= 20) {
                break;
              }
            }
          }
        } else {
          break;
        }
      }
      return datasOfCords;
    }
    const cords = await Cords(data);
    console.log(cords);
    return response.json(cords);
  }
  async store({ request, response }) {
    const FreeNowList = await FreeNow.all();
    const data = FreeNowList.rows;
    const dados = [];

    function getLastDate(prefix) {
      var day = new Date().getDate() + 1;
      var mes = new Date().getMonth() + 1;
      var ano = new Date().getFullYear();
      function diasNoMes(mes, ano) {
        var data = new Date(ano, mes, 0);
        return data.getDate();
      }
      for (let i = 7; i > 0; i--) {
        if (day > 0) {
          day--;
        } else {
          if (mes + 1 - 1 === 0) {
            day = diasNoMes(mes + 1, ano - 1);
          } else {
            day = diasNoMes(mes + 1, ano);
          }
          day--;
        }
      }
      if (day.toString().length != 2) {
        if (mes.toString().length != 2) {
          return `${ano}${prefix}${mes}${prefix}${day}`;
        }
        return `${ano}${prefix}${mes}${prefix}${day}`;
      }
      return `${ano}${prefix}${mes}${prefix}${day}`;
    }
    function getCurrentDay(prefix) {
      var day = new Date().getDate();
      var mes = new Date().getMonth() + 1;
      var ano = new Date().getFullYear();
      if (day.toString().length != 2) {
        if (mes.toString().length != 2) {
          return `${ano}${prefix}${mes}${prefix}${day}`;
        }
        return `${ano}${prefix}${mes}${prefix}${day}`;
      }
      if (mes.toString().length != 2) {
        return `${ano}${prefix}${mes}${prefix}${day}`;
      }
      return `${ano}${prefix}${mes}${prefix}${day}`;
    }

    for (var i = 0; i < data.length; i++) {
      const getData = data[i].horas.split(" ")[0].split("/")[0];
      // console.log(getData);
      // console.log(parseInt(getLastDate("/").split("/")[2]));
      // console.log(parseInt(getCurrentDay("/").split("/")[2]));
      if (
        parseInt(getData) < parseInt(getCurrentDay("/").split("/")[2]) &&
        parseInt(getData) > parseInt(getLastDate("/").split("/")[2])
      ) {
        dados.push(data[i]);
        // console.log(data[i]);
      }
    }
    return dados;
  }
  async show({ request, response, auth }) {
    const Ubers = await Uber.all();
    const getUser = await auth.getUser();
    if (getUser.role == "Admin") {
      return Ubers;
    }
  }
  async showFreeNow({ request, response, auth }) {
    const FreeNowList = await FreeNow.all();
    const getUser = await auth.getUser();
    const dataList = FreeNowList.rows;
    var data = [];

    function getLastDate(prefix) {
      var day = new Date().getDate() + 1;
      var mes = new Date().getMonth() + 1;
      var ano = new Date().getFullYear();
      function diasNoMes(mes, ano) {
        var data = new Date(ano, mes, 0);
        return data.getDate();
      }
      for (let i = 7; i > 0; i--) {
        if (day > 0) {
          day--;
        } else {
          if (mes + 1 - 1 === 0) {
            day = diasNoMes(mes + 1, ano - 1);
          } else {
            day = diasNoMes(mes + 1, ano);
          }
          day--;
        }
      }
      if (day.toString().length != 2) {
        if (mes.toString().length != 2) {
          return `${ano}${prefix}0${mes}${prefix}0${day}`;
        }
        return `${ano}${prefix}${mes}${prefix}0${day}`;
      }
      return `${ano}${prefix}${mes}${prefix}${day}`;
    }
    function getCurrentDay(prefix) {
      var day = new Date().getDate();
      var mes = new Date().getMonth() + 1;
      var ano = new Date().getFullYear();
      if (day.toString().length != 2) {
        if (mes.toString().length != 2) {
          return `${ano}${prefix}0${mes}${prefix}0${day}`;
        }
        return `${ano}${prefix}${mes}${prefix}0${day}`;
      }
      if (mes.toString().length != 2) {
        return `${ano}${prefix}0${mes}${prefix}${day}`;
      }
      return `${ano}${prefix}${mes}${prefix}${day}`;
    }
    // console.log("?");
    if (getUser.role === "Admin") {
      for (let i = 0; i < dataList.length; i++) {
        // const LastDate = await getLastDate("/").split("/");
        // const CurrentDate = await getCurrentDay("/").split("/");
        const CurrentDay = parseInt(getCurrentDay("/").split("/")[2]);
        const LastDay = parseInt(getLastDate("/").split("/")[2]);
        const CurrentMother = parseInt(getCurrentDay("/").split("/")[1]);
        const LastMother = parseInt(getLastDate("/").split("/")[1]);
        // console.log(getCurrentDay().split("/"));
        // console.log(`${LastDay} ${CurrentDay}`);

        const dataListDay = parseInt(
          dataList[i].horas.split(" ")[0].split("/")[0]
        );

        const dataListMother = parseInt(
          dataList[i].horas.split(" ")[0].split("/")[1]
        );

        if (CurrentMother == LastMother) {
          if (dataListDay <= CurrentDay && dataListDay >= LastDay) {
            data.push(dataList[i]);
          }
        } else {
          var currentDateF = CurrentDay;
          for (let index = 7; index > 0; index--) {
            if (
              CurrentMother == dataListMother &&
              dataListDay <= currentDateF
            ) {
              data.push(dataList[i]);
            } else if (
              LastMother == dataListMother &&
              dataListDay >= LastMother
            ) {
              data.push(dataList[i]);
            }
            currentDateF--;
          }
        }
      }
      var dataT = [];
      for (var i = 0; i < data.length; i++) {
        data[i].preco = data[i].preco
          .replace("Total € ", "")
          .replace(" NIF 6%", "");
        dataT.push(data[i]);
      }
      return data;
    }
  }
}

module.exports = GetDataController;

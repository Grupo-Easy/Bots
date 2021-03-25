const { Run1, Run2, Run3 } = require("./src/Uber");
const Prio = require("./src/Prio");
// const BP = require("./src/BP");
const ViaVerde = require("./src/ViaVerde");
const FreeNow = require("./src/FreeNow");
const api = require("./src/api");

var UberList = {};
var PrioList = {};
var BPList = {};
var ViaVerdeList = {};
var FreeNowList = {};

async function RunData(priodata, priodate) {
  async function Uber() {
    var Names = [];
    var Despesas = [];
    var GanhosDeViagens = [];
    var Ganhos = [];

    await Run1()
      .then((response) => {
        if (response != undefined || response != null) {
          Names = [...Names, ...response.names];
          Ganhos = [...Ganhos, ...response.ganhos];
          Despesas = [...Despesas, ...response.despesas];
          GanhosDeViagens = [...GanhosDeViagens, ...response.ganhosDeViagens];
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await Run2()
      .then((response) => {
        if (response != undefined || response != null) {
          Names = [...Names, ...response.names];
          Ganhos = [...Ganhos, ...response.ganhos];
          Despesas = [...Despesas, ...response.despesas];
          GanhosDeViagens = [...GanhosDeViagens, ...response.ganhosDeViagens];
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await Run3()
      .then((response) => {
        if (response != undefined || response != null) {
          Names = [...Names, ...response.names];
          Ganhos = [...Ganhos, ...response.ganhos];
          Despesas = [...Despesas, ...response.despesas];
          GanhosDeViagens = [...GanhosDeViagens, ...response.ganhosDeViagens];
        }
      })
      .catch((err) => {
        console.log(err);
      });
    UberList = {
      Names,
      Ganhos,
      Despesas,
      GanhosDeViagens,
    };
    return UberList;
  }
  await Uber();

  async function prio() {
    await Prio(priodata, priodate)
      .then((response) => {
        if (response != undefined || response != null) {
          PrioList = response;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  await prio();

  // async function BPRun() {
  //   await BP()
  //     .then((response) => {
  //       BPList = response;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // await BPRun();

  async function ViaVerdeRun() {
    await ViaVerde()
      .then((response) => {
        ViaVerdeList = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  await sleep(5000);
  await ViaVerdeRun();

  async function FreeNowRun() {
    await FreeNow()
      .then((response) => {
        FreeNowList = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  await FreeNowRun();
  return { UberList, PrioList, FreeNowList, ViaVerdeList };
}

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

RunData(getLastDate("-"), getCurrentDay("-"))
  .then(async (response) => {
    const { UberList, PrioList, FreeNowList, ViaVerdeList } = response;
    const { Names, Ganhos, Despesas, GanhosDeViagens } = UberList;
    await api
      .get("/bot/reset", {
        data: {
          key: "pq8Hga34WszMa33Bw0XrRSQcS4G0j0QR",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    for (var i = 0; i < Names.length; i++) {
      await api
        .post("/bot/uber", {
          Nome: Names[i].replace("\n", " ").replace("{}", "null"),
          Despesas: Despesas[i].replace("\n", " ").replace("{}", "null"),
          GanhosDeViagens: GanhosDeViagens[i]
            .replace("\n", " ")
            .replace("{}", "null"),
          Ganhos: Ganhos[i].replace("\n", " ").replace("{}", "null"),
          key: "pq8Hga34WszMa33Bw0XrRSQcS4G0j0QR",
        })
        .then((response) => {
          console.log(response.data);
          console.log("foi krl");
        })
        .catch((err) => {
          console.log(err);
          console.log("deu ruim");
        });
    }

    console.log(PrioList);
    if (PrioList != null) {
      const {
        Posto,
        Rede,
        Data,
        Cartao,
        Litros,
        Combustivel,
        Recibo,
        Kms,
        Idcond,
        Fatura,
        ValorUnit,
        Total,
      } = PrioList;
      if (Posto != null) {
        for (var i = 0; i < Posto.length; i++) {
          await api
            .post("/bot/prio", {
              Posto: Posto[i].replace("\n", " ").replace("{}", "null"),
              Rede: Rede[i].replace("\n", " ").replace("{}", "null"),
              Data: Data[i].replace("\n", " ").replace("{}", "null"),
              Cartao: Cartao[i].replace("\n", " ").replace("{}", "null"),
              Litros: Litros[i].replace("\n", " ").replace("{}", "null"),
              Combustivel: Combustivel[i]
                .replace("\n", " ")
                .replace("{}", "null"),
              Recibo: Recibo[i].replace("\n", " ").replace("{}", "null"),
              Kms: Kms[i].replace("\n", " ").replace("{}", "null"),
              Idcond: Idcond[i],
              Fatura: Fatura[i].replace("\n", " ").replace("{}", "null"),
              ValorUnit: ValorUnit[i].replace("\n", " ").replace("{}", "null"),
              Total: Total[i].replace("\n", " ").replace("{}", "null"),
              key: "pq8Hga34WszMa33Bw0XrRSQcS4G0j0QR",
            })
            .then((response) => {
              console.log(response.data);
              console.log("foi krl");
            })
            .catch((err) => {
              console.log(err);
              console.log("deu ruim");
            });
        }
      }
    }

    const { Contrato, Matricula, Descricao, Pagamento, Valor } = ViaVerdeList;
    for (var i = 0; i < Contrato.length; i++) {
      await api
        .post("/bot/viaverde", {
          Contrato: Contrato[i].replace("\n", " ").replace("{}", "null"),
          Matricula: Matricula[i].replace("\n", " ").replace("{}", "null"),
          Descricao: Descricao[i].replace("\n", " ").replace("{}", "null"),
          Pagamento: Pagamento[i].replace("\n", " ").replace("{}", "null"),
          Valor: Valor[i],
          key: "pq8Hga34WszMa33Bw0XrRSQcS4G0j0QR",
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // const {
    //   id,
    //   motorista,
    //   rotas,
    //   horas,
    //   viagem,
    //   preco,
    //   extra,
    //   servico,
    //   metodo,
    // } = FreeNowList;
    // for (var i = 0; i < id.length; i++) {
    //   await api
    //     .post("/bot/freenow", {
    //       id_freenow: id[i],
    //       motorista: motorista[i].replace("\n", " ").replace("{}", "null"),
    //       rotas: rotas[i].replace("\n", " ").replace("{}", "null"),
    //       horas: horas[i].replace("\n", " ").replace("{}", "null"),
    //       viagem: viagem[i].replace("\n", " ").replace("{}", "null"),
    //       preco: preco[i].replace("\n", " ").replace("{}", "null"),
    //       extra: extra[i].replace("\n", " ").replace("{}", "null"),
    //       servico: servico[i].replace("\n", " ").replace("{}", "null"),
    //       metodo: metodo[i].replace("\n", " ").replace("{}", "null"),
    //       key: "pq8Hga34WszMa33Bw0XrRSQcS4G0j0QR",
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
    // const {
    //   Datas,
    //   Cartao,
    //   Km,
    //   Posto,
    //   Items,
    //   Produto,
    //   Quantidade,
    //   ValorTotal,
    //   Numero,
    //   TipoDeTransacao,
    //   EstadoDeConfirmacao,
    //   ValorDoIssuer,
    //   NomePerfil,
    //   Resultado,
    //   Status,
    //   ValorDoSupplier,
    // } = BPList;\
    // for (var i = 0; i < id.length; i++) {
    //   console.log(Datas[i]);
    //   if (Datas[i][0] == undefined) {
    //     Datas[i] = "NULL";
    //   }
    //   await api
    //     .post("/bot/bp", {
    //       Datas: Datas[i].replace("\n", " ").replace("{}", "NULL"),
    //       Cartao: Cartao[i].replace("\n", " ").replace("{}", "NULL"),
    //       Km: Km[i].replace("\n", " ").replace("{}", "NULL"),
    //       Posto: Posto[i].replace("\n", " ").replace("{}", "NULL"),
    //       Items: Items[i].replace("\n", " ").replace("{}", "NULL"),
    //       Produto: Produto[i].replace("\n", " ").replace("{}", "NULL"),
    //       Quantidade: Quantidade[i].replace("\n", " ").replace("{}", "NULL"),
    //       ValorTotal: ValorTotal[i].replace("\n", " ").replace("{}", "NULL"),
    //       NumeroDoNegocio: Numero[i].replace("\n", " ").replace("{}", "NULL"),
    //       TipoDeTransacao: TipoDeTransacao[i]
    //         .replace("\n", " ")
    //         .replace("{}", "null"),
    //       EstadoDeConfirmacao: EstadoDeConfirmacao[i]
    //         .replace("\n", " ")
    //         .replace("{}", "null"),
    //       ValorDoIssuer: ValorDoIssuer[i]
    //         .replace("\n", " ")
    //         .replace("{}", "null"),
    //       NomePerfil: NomePerfil[i].replace("\n", " ").replace("{}", "null"),
    //       Resultado: Resultado[i].replace("\n", " ").replace("{}", "null"),
    //       Status: Status[i].replace("\n", " ").replace("{}", "null"),
    //       ValorDoSupplier: ValorDoSupplier[i]
    //         .replace("\n", " ")
    //         .replace("{}", "null"),
    //       key: "pq8Hga34WszMa33Bw0XrRSQcS4G0j0QR",
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  })
  .catch((err) => {
    console.log(err);
  });

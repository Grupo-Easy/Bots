const puppeteer = require("puppeteer");
const settings = require("./settings-BP.json");

const Run = async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.goto("https://www.bpplus.com/site/formlogin.asp?err=1&", {
    waitUntil: "networkidle0",
  });

  const popup = await page.waitForXPath("/html/body/div[5]/div[3]/div/button");
  await popup.click();
  await page.on("dialog", async (dialog) => {
    await dialog.dismiss();
  });
  const username = await page.waitForXPath(
    "/html/body/div[4]/div[1]/div[2]/form/table/tbody/tr[1]/td[3]/div/div/div[2]/input"
  );
  await username.type(`${settings.username}`);

  const password = await page.waitForXPath(
    "/html/body/div[4]/div[1]/div[2]/form/table/tbody/tr[1]/td[3]/div/div/div[3]/input"
  );
  await password.type(`${settings.password}`);

  await page.click("#Login");

  page.goto("https://www.bpplus.com/pages/am/View_transactions_oac.asp");
  await page.waitForSelector(
    "#View_transactions_OAC > tbody > tr:nth-child(2) > td:nth-child(1) > span"
  );

  var index = 1;
  var Datas = [];
  var Cartao = [];
  var Km = [];
  var Posto = [];
  var Items = [];
  var Produto = [];
  var Quantidade = [];
  var ValorTotal = [];
  var Numero = [];
  var TipoDeTransacao = [];
  var EstadoDeConfirmacao = [];
  var ValorDoIssuer = [];
  var NomePerfil = [];
  var Resultado = [];
  var Status = [];
  var ValorDoSupplier = [];

  const options = await page.evaluate(() => {
    const options = document.querySelectorAll("option").length;
    console.log(options);
    return options;
  });
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  while (index <= options) {
    await page.evaluate(async (i) => {
      document.querySelector("#lstPage").value = i;
      document.querySelector("#submitgo").click();
      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      await sleep(2000);
    }, index);
    await Promise.all([page.waitForNavigation()]);
    await sleep(2000);

    const TotalOfData = await page.evaluate(async () => {
      var Total = [];
      const tables = document.querySelectorAll("tr").length - 3;
      var ix = 2;
      while (ix < tables) {
        const data = document.querySelector(
          `#View_transactions_OAC > tbody > tr:nth-child(${ix}) > td:nth-child(1) > span`
        );
        Total.push(data.innerText || data);

        console.log("estou aqui");

        ix++;
      }
      console.log(Total);
      return Total;
    });
    const TotalOfCartao = await page.evaluate(async () => {
      var Total = [];
      const tables = document.querySelectorAll("tr").length - 3;
      var ix = 2;
      while (ix < tables) {
        const data = document.querySelector(
          `#View_transactions_OAC > tbody > tr:nth-child(${ix}) > td:nth-child(2) > span`
        );
        Total.push(data.innerText || data);

        console.log("estou aqui");

        ix++;
      }
      console.log(Total);
      return Total;
    });
    const TotalOfKm = await page.evaluate(async () => {
      var Total = [];
      const tables = document.querySelectorAll("tr").length - 3;
      var ix = 2;
      while (ix < tables) {
        const data = document.querySelector(
          `#View_transactions_OAC > tbody > tr:nth-child(${ix}) > td:nth-child(3) > span`
        );
        Total.push(data.innerText || data);

        console.log("estou aqui");

        ix++;
      }
      console.log(Total);
      return Total;
    });
    const TotalOfPosto = await page.evaluate(async () => {
      var Total = [];
      const tables = document.querySelectorAll("tr").length - 3;
      var ix = 2;
      while (ix < tables) {
        const data = document.querySelector(
          `#View_transactions_OAC > tbody > tr:nth-child(${ix}) > td:nth-child(4) > span`
        );
        Total.push(data.innerText || data);

        console.log("estou aqui");

        ix++;
      }
      console.log(Total);
      return Total;
    });
    const TotalOfItems = await page.evaluate(async () => {
      var Total = [];
      const tables = document.querySelectorAll("tr").length - 3;
      var ix = 2;
      while (ix < tables) {
        const data = document.querySelector(
          `#View_transactions_OAC > tbody > tr:nth-child(${ix}) > td:nth-child(5) > span`
        );
        Total.push(data.innerText || data);

        console.log("estou aqui");

        ix++;
      }
      console.log(Total);
      return Total;
    });
    const TotalOfProduto = await page.evaluate(async () => {
      var Total = [];
      const tables = document.querySelectorAll("tr").length - 3;
      var ix = 2;
      while (ix < tables) {
        const data = document.querySelector(
          `#View_transactions_OAC > tbody > tr:nth-child(${ix}) > td:nth-child(6) > span`
        );
        Total.push(data.innerText || data);

        console.log("estou aqui");

        ix++;
      }
      console.log(Total);
      return Total;
    });
    const TotalOfQuantidade = await page.evaluate(async () => {
      var Total = [];
      const tables = document.querySelectorAll("tr").length - 3;
      var ix = 2;
      while (ix < tables) {
        const data = document.querySelector(
          `#View_transactions_OAC > tbody > tr:nth-child(${ix}) > td:nth-child(7) > span`
        );
        Total.push(data.innerText || data);

        console.log("estou aqui");

        ix++;
      }
      console.log(Total);
      return Total;
    });
    const TotalOfValorTotal = await page.evaluate(async () => {
      var Total = [];
      const tables = document.querySelectorAll("tr").length - 3;
      var ix = 2;
      while (ix < tables) {
        const data = document.querySelector(
          `#View_transactions_OAC > tbody > tr:nth-child(${ix}) > td:nth-child(8) > span`
        );
        Total.push(data.innerText || data);

        console.log("estou aqui");

        ix++;
      }
      console.log(Total);
      return Total;
    });
    const TotalOfNumero = await page.evaluate(async () => {
      var Total = [];
      const tables = document.querySelectorAll("tr").length - 3;
      var ix = 2;
      while (ix < tables) {
        const data = document.querySelector(
          `#View_transactions_OAC > tbody > tr:nth-child(${ix}) > td:nth-child(9) > span`
        );
        Total.push(data.innerText || data);

        console.log("estou aqui");

        ix++;
      }
      console.log(Total);
      return Total;
    });
    const TotalOfTipoDeTransacao = await page.evaluate(async () => {
      var Total = [];
      const tables = document.querySelectorAll("tr").length - 3;
      var ix = 2;
      while (ix < tables) {
        const data = document.querySelector(
          `#View_transactions_OAC > tbody > tr:nth-child(${ix}) > td:nth-child(10) > span`
        );
        Total.push(data.innerText || data);

        console.log("estou aqui");

        ix++;
      }
      console.log(Total);
      return Total;
    });
    const TotalOfEstadoDeConfirmacao = await page.evaluate(async () => {
      var Total = [];
      const tables = document.querySelectorAll("tr").length - 3;
      var ix = 2;
      while (ix < tables) {
        const data = document.querySelector(
          `#View_transactions_OAC > tbody > tr:nth-child(${ix}) > td:nth-child(11) > span`
        );
        Total.push(data.innerText || data);

        console.log("estou aqui");

        ix++;
      }
      console.log(Total);
      return Total;
    });
    const TotalOfValorDoInssuer = await page.evaluate(async () => {
      var Total = [];
      const tables = document.querySelectorAll("tr").length - 3;
      var ix = 2;
      while (ix < tables) {
        const data = document.querySelector(
          `#View_transactions_OAC > tbody > tr:nth-child(${ix}) > td:nth-child(12) > span`
        );
        Total.push(data.innerText || data);

        console.log("estou aqui");

        ix++;
      }
      console.log(Total);
      return Total;
    });
    const TotalOfNomePerfil = await page.evaluate(async () => {
      var Total = [];
      const tables = document.querySelectorAll("tr").length - 3;
      var ix = 2;
      while (ix < tables) {
        const data = document.querySelector(
          `#View_transactions_OAC > tbody > tr:nth-child(${ix}) > td:nth-child(13) > span`
        );
        Total.push(data.innerText || data);

        console.log("estou aqui");

        ix++;
      }
      console.log(Total);
      return Total;
    });
    const TotalOfResultado = await page.evaluate(async () => {
      var Total = [];
      const tables = document.querySelectorAll("tr").length - 3;
      var ix = 2;
      while (ix < tables) {
        const data = document.querySelector(
          `#View_transactions_OAC > tbody > tr:nth-child(${ix}) > td:nth-child(14) > span`
        );
        Total.push(data.innerText || data);

        console.log("estou aqui");

        ix++;
      }
      console.log(Total);
      return Total;
    });
    const TotalOfStatus = await page.evaluate(async () => {
      var Total = [];
      const tables = document.querySelectorAll("tr").length - 3;
      var ix = 2;
      while (ix < tables) {
        const data = document.querySelector(
          `#View_transactions_OAC > tbody > tr:nth-child(${ix}) > td:nth-child(15) > span`
        );
        Total.push(data.innerText || data);

        console.log("estou aqui");

        ix++;
      }
      console.log(Total);
      return Total;
    });
    const TotalOfValorDoSupplier = await page.evaluate(async () => {
      var Total = [];
      const tables = document.querySelectorAll("tr").length - 3;
      var ix = 2;
      while (ix < tables) {
        const data = document.querySelector(
          `#View_transactions_OAC > tbody > tr:nth-child(${ix}) > td:nth-child(16) > span`
        );
        Total.push(data.innerText || data);

        console.log("estou aqui");

        ix++;
      }
      console.log(Total);
      return Total;
    });
    Datas = [...TotalOfData, ...Datas];
    Cartao = [...TotalOfCartao, ...Cartao];
    Km = [...TotalOfKm, ...Km];
    Posto = [...TotalOfPosto, ...Posto];
    Items = [...TotalOfItems, ...Items];
    Produto = [...TotalOfProduto, ...Produto];
    Quantidade = [...TotalOfQuantidade, ...Quantidade];
    ValorTotal = [...TotalOfValorTotal, ...ValorTotal];
    Numero = [...TotalOfNumero, ...Numero];
    TipoDeTransacao = [...TotalOfTipoDeTransacao, ...TipoDeTransacao];
    EstadoDeConfirmacao = [
      ...TotalOfEstadoDeConfirmacao,
      ...EstadoDeConfirmacao,
    ];
    ValorDoIssuer = [...TotalOfValorDoInssuer, ...ValorDoIssuer];
    NomePerfil = [...TotalOfNomePerfil, ...NomePerfil];
    Resultado = [...TotalOfResultado, ...Resultado];
    Status = [...TotalOfStatus, ...Status];
    ValorDoSupplier = [...TotalOfValorDoSupplier, ...ValorDoSupplier];
    index++;
  }
  await browser.close();
  return {
    Datas,
    Cartao,
    Km,
    Posto,
    Items,
    Produto,
    Quantidade,
    ValorTotal,
    Numero,
    TipoDeTransacao,
    EstadoDeConfirmacao,
    ValorDoIssuer,
    NomePerfil,
    Resultado,
    Status,
    ValorDoSupplier,
  };
};
// Run()
//   .then((response) => {
//     console.log(response);
//     const datas = response.Datas;
//     for (var i = 0; i < datas.length; i++) {
//       console.log(datas[i]);
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//   });
module.exports = Run;

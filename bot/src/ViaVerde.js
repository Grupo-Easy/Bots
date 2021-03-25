const puppeteer = require("puppeteer");
const settings = require("./settings-ViaVarejo.json");

const Run = async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: {
      width: 1500,
      height: 500,
    },
  });
  const page = await browser.newPage();
  await page.goto("https://www.viaverde.pt/empresas");
  await page.click(
    "#Form > div.site-header > header > div > div.col-laptop-3.col-xl-3.nav-header-user > div > div > ul > li:nth-child(1) > button"
  );
  const email = await page.waitForXPath(
    "/html/body/form/div[6]/div/div/div[2]/div[1]/div[2]/label[1]/input"
  );
  await email.type(settings.username);
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  await sleep(2000);
  const password = await page.waitForXPath(
    "/html/body/form/div[6]/div/div/div[2]/div[1]/div[2]/label[2]/input"
  );
  await password.type(settings.passowrd);

  await page.click("#btnLogin");
  await page.waitForNavigation();
  await page.goto(
    "https://www.viaverde.pt/empresas/minha-via-verde/movimentos-e-extratos"
  );
  await page.click("#Items-4202 > div:nth-child(3) > ul > li:nth-child(2) > a");
  while (true) {
    const sleep = (milliseconds) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    await sleep(1000);
    var ExistButton = await page.evaluate(() => {
      if (document.querySelector("#btnMoreTransactions") != null) {
        return true;
      } else {
        return false;
      }
    });

    if (ExistButton) {
      await page.click("#btnMoreTransactions");
    } else {
      break;
    }
    await sleep(2000);
  }
  const ItemsTotal = await page.evaluate(() => {
    var index = 1;
    while (true) {
      if (
        document.querySelector(
          `#tblMovements > div > table > tbody > tr:nth-child(${index}) > td:nth-child(1)`
        ) != null
      ) {
        index++;
      } else {
        index--;
        break;
      }
    }
    return index;
  });

  const Contrato = await page.evaluate((itens) => {
    const ContratosList = [];
    for (let i = 1; i < itens; i++) {
      const ContratoItem = document.querySelector(
        `#tblMovements > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`
      );
      ContratosList.push(ContratoItem.innerText || ContratoItem);
    }
    return ContratosList.reverse();
  }, ItemsTotal);

  const Matricula = await page.evaluate((itens) => {
    const ContratosList = [];
    for (let i = 1; i < itens; i++) {
      const ContratoItem = document.querySelector(
        `#tblMovements > div > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`
      );
      ContratosList.push(ContratoItem.innerText || ContratoItem);
    }
    return ContratosList.reverse();
  }, ItemsTotal);

  const Descricao = await page.evaluate((itens) => {
    const ContratosList = [];
    for (let i = 1; i < itens; i++) {
      const ContratoItem = document.querySelector(
        `#tblMovements > div > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`
      );
      ContratosList.push(ContratoItem.innerText || ContratoItem);
    }
    return ContratosList.reverse();
  }, ItemsTotal);

  const Pagamento = await page.evaluate((itens) => {
    const ContratosList = [];
    for (let i = 1; i < itens; i++) {
      const ContratoItem = document.querySelector(
        `#tblMovements > div > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`
      );
      ContratosList.push(ContratoItem.innerText || ContratoItem);
    }
    return ContratosList.reverse();
  }, ItemsTotal);

  const Valor = await page.evaluate((itens) => {
    const ContratosList = [];
    for (let i = 1; i < itens; i++) {
      const ContratoItem = document.querySelector(
        `#tblMovements > div > table > tbody > tr:nth-child(${i}) > td:nth-child(6)`
      );
      ContratosList.push(ContratoItem.innerText || ContratoItem);
    }
    return ContratosList.reverse();
  }, ItemsTotal);
  await browser.close();
  return { Contrato, Matricula, Descricao, Pagamento, Valor };
};
// Run()
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
module.exports = Run;

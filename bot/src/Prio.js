const puppeteer = require("puppeteer");
const settings = require("./settings-Prio.json");

async function GetValues(de, at) {
  console.log(de, at);
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: {
      width: 1000,
      height: 500,
    },
  });

  const page = await browser.newPage();

  page.goto("https://www.myprio.com/");

  const inputUsername = await page.waitForXPath(
    "/html/body/form/div[3]/div[1]/div[1]/div[2]/div[1]/input"
  );
  await inputUsername.type(settings.username, { delay: 100 });

  const inputPassword = await page.waitForXPath(
    "/html/body/form/div[3]/div[1]/div[1]/div[2]/div[2]/input"
  );

  await inputPassword.type(settings.password, { delay: 100 });

  await page.click("#WebPatterns_wt15_block_wtAction_wtLoginButton");
  await page.waitForXPath("/html/body/form/div[3]/div[2]/div");
  page.goto("https://www.myprio.com/MyPrio/Transactions.aspx");

  const inputStart = await page.waitForXPath(
    "/html/body/form/div[3]/div[3]/div[1]/div[2]/span/div/div[1]/div/div[1]/div[1]/input"
  );
  await page.focus(
    "#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtInput_StartDate"
  );
  await page.evaluate(
    (de, at) => {
      document.querySelectorAll(
        "#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtInput_StartDate"
      )[0].value = de;
      document.querySelectorAll(
        "#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtInput_EndDate"
      )[0].value = at;
    },
    de,
    at
  );
  const ButtonSearch = await page.waitForXPath(
    "/html/body/form/div[3]/div[3]/div[1]/div[2]/span/div/div[1]/div/div[7]/input[1]"
  );
  await ButtonSearch.click();
  await sleep(2000);
  await page.evaluate(async () => {
    var stop;

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    while (stop != "none") {
      stop = document.querySelectorAll(
        "#DublinTheme_wt13_block_WebPatterns_wt10_block_wt13_wtdivWait"
      )[0].style.display;

      await sleep(2000);
    }
  });
  const valid = await page.evaluate(async () => {
    if (
      document.querySelector(
        "#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr > td"
      ).innerText == "Sem registos..."
    ) {
      return true;
    }
    return false;
  });
  if (valid) {
    await browser.close();
    return null;
  }
  var Total = await page.evaluate(async () => {
    const TotalOfTr = document.querySelectorAll("tr").length + 3;
    var Total = [];
    for (var i = 3; i < TotalOfTr; i++) {
      if (i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable_ctl0${i}_wtTotalValue`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      } else {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable_ctl${i}_wtTotalValue`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      }
    }
    return Total.reverse();
  });
  var ValorUnit = await page.evaluate(async () => {
    const TotalOfTr = document.querySelectorAll("tr").length + 3;
    var Total = [];
    for (var i = 1; i < TotalOfTr; i++) {
      if (i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(11)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      } else {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(11)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      }
    }
    return Total.reverse();
  });
  const Fatura = await page.evaluate(async () => {
    const TotalOfTr = document.querySelectorAll("tr").length + 3;
    var Total = [];
    for (var i = 1; i < TotalOfTr; i++) {
      if (i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(10)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      } else {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(10)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      }
    }
    return Total.reverse();
  });
  const Idcond = await page.evaluate(async () => {
    const TotalOfTr = document.querySelectorAll("tr").length + 3;
    var Total = [];
    for (var i = 1; i < TotalOfTr; i++) {
      if (i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(9)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      } else {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(9)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      }
    }
    return Total.reverse();
  });
  const Kms = await page.evaluate(async () => {
    const TotalOfTr = document.querySelectorAll("tr").length + 3;
    var Total = [];
    for (var i = 1; i < TotalOfTr; i++) {
      if (i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(8)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      } else {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(8)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      }
    }
    return Total.reverse();
  });
  const Recibo = await page.evaluate(async () => {
    const TotalOfTr = document.querySelectorAll("tr").length + 3;
    var Total = [];
    for (var i = 1; i < TotalOfTr; i++) {
      if (i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(7)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      } else {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(7)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      }
    }
    return Total.reverse();
  });
  const Combustivel = await page.evaluate(async () => {
    const TotalOfTr = document.querySelectorAll("tr").length + 3;
    var Total = [];
    for (var i = 1; i < TotalOfTr; i++) {
      if (i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(6)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      } else {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(6)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      }
    }
    return Total.reverse();
  });
  const Litros = await page.evaluate(async () => {
    const TotalOfTr = document.querySelectorAll("tr").length + 3;
    var Total = [];
    for (var i = 1; i < TotalOfTr; i++) {
      if (i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(5)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      } else {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(5)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      }
    }
    return Total.reverse();
  });
  const Cartao = await page.evaluate(async () => {
    const TotalOfTr = document.querySelectorAll("tr").length + 3;
    var Total = [];
    for (var i = 1; i < TotalOfTr; i++) {
      if (i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(4)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      } else {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(4)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      }
    }
    return Total.reverse();
  });
  const Data = await page.evaluate(async () => {
    const TotalOfTr = document.querySelectorAll("tr").length + 3;
    var Total = [];
    for (var i = 1; i < TotalOfTr; i++) {
      if (i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(3)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      } else {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(3)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      }
    }
    return Total.reverse();
  });
  const Rede = await page.evaluate(async () => {
    const TotalOfTr = document.querySelectorAll("tr").length + 3;
    var Total = [];
    for (var i = 1; i < TotalOfTr; i++) {
      if (i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(2)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      } else {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(2)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      }
    }
    return Total.reverse();
  });
  const Posto = await page.evaluate(async () => {
    const TotalOfTr = document.querySelectorAll("tr").length + 3;
    var Total = [];
    for (var i = 1; i < TotalOfTr; i++) {
      if (i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(1)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      } else {
        const text = document.querySelector(
          `#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_wtConsumptionTable > tbody > tr:nth-child(${i}) > td:nth-child(1)`
        );
        if (text == null || text == undefined) {
        } else {
          if (text.innerText == null || text.innerText == undefined) {
            Total.push(null);
          } else {
            Total.push(text.innerText || text);
          }
        }
      }
    }
    return Total.reverse();
  });

  const repeat = await page.evaluate(() => {
    const next = document.querySelector(
      "#DublinTheme_wt13_block_wtMainContent_wtTransactionsWB_RichWidgets_wt63_block_wt28"
    );
    if (next) {
      return true;
    } else {
      return false;
    }
  });
  if (repeat) {
    GetValues()
      .then((response) => {
        Posto = [...Posto, ...response.Posto];
        Rede = [...Rede, ...response.Rede];
        Data = [...Data, ...response.Data];
        Cartao = [...Cartao, ...response.Cartao];
        Litros = [...Litros, ...response.Litros];
        Combustivel = [...Combustivel, ...response.Combustivel];
        Recibo = [...Recibo, ...response.Recibo];
        Kms = [...Kms, ...response.Kms];
        Idcond = [...Idcond, ...response.Idcond];
        Fatura = [...Fatura, ...response.Fatura];
        ValorUnit = [...ValorUnit, ...response.ValorUnit];
        Total = [...Total, ...response.Total];
      })
      .catch((err) => {
        console.log(err);
      });
  }
  await browser.close();
  return {
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
  };
}

module.exports = GetValues;

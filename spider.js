const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express()

const fethHtml = async url => {
  try {
    // const { data } = await axios.get(url);
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch {
    console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`);
  }
};

const webScrapper = async () => {
  const steamUrl =
    "https://www.saopaulo.sp.gov.br/";

  const html = await fethHtml(steamUrl);

  const selector = cheerio.load(html);
  const searchResults = selector(".container-numeros-vacinados");

  const extractInfo = selector => {
    const vacina = selector
      .find(".tableauPlaceholder p")
      .text()
      .trim();

      return vacina;
  }

//   searchResults.map((item, el) => {
//     const elementSelector = selector(el);

//     console.log('Ja foi: ', extractInfo(elementSelector));
//     return await extractInfo(elementSelector);
//   });

const getData = async () => {
    return Promise.all(searchResults.map((item, el) => {
        const elementSelector = selector(el);

//     console.log('Ja foi: ', extractInfo(elementSelector));
    return extractInfo(elementSelector);
    }))
  }

  return getData().then(res => res)


};

// webScrapper()
//     .then(res => console.log(res));

    app.get('/vacina', async (req, res) => {
        res.send(await webScrapper())
    })

    app.listen(3000);

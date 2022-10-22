const globalContainer = makeElement('div', { className: 'global-container' });
const profileContainer = makeElement('div', { className: 'profile-container' });
const chartContainer = makeElement('div', { className: 'chart-container' });

globalContainer.append(profileContainer, chartContainer);
document.body.append(globalContainer);

function getSymbolFromQuery() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const symbolValue = urlSearchParams.get('symbol') || 'AAPL';
  return symbolValue;
}

function createProfileElements(compProfile) {
  const titleContainer = makeElement('div', {
    className: 'title-container',
  });

  const infoContainer = makeElement('div', {
    className: 'info-container',
  });

  const companyImg = makeElement('img', {
    className: 'company-img',
    src: compProfile.image,
    alt: 'Company Image',
  });

  fixMissingImage(companyImg);

  let companyNameText;
  if (compProfile.industry)
    companyNameText = `${compProfile.companyName} (${compProfile.industry})`;
  else companyNameText = `${compProfile.companyName}`;

  const companyNameIndustry = makeElement('h1', {
    className: 'company-name-industry',
    innerText: companyNameText,
  });

  let currency;
  if (compProfile.currency == 'USD') currency = '$';
  else currency = compProfile.currency;
  const companyPrice = makeElement('p', {
    className: 'company-price',
    innerText: `Stock Price: ${currency}${compProfile.price} `,
  });

  let percentage = getPrecentInfo(compProfile.changesPercentage);

  const companyPercentage = makeElement('span', {
    className: `company-percentage ${percentage.Css}`,
    innerText: `(${percentage.Sign}${percentage.text})`,
  });

  const companyDescription = makeElement('p', {
    className: 'company-description',
    innerText: compProfile.description,
  });

  companyPrice.append(companyPercentage);
  infoContainer.append(companyNameIndustry, companyPrice);
  titleContainer.append(infoContainer, companyImg);
  profileContainer.append(titleContainer, companyDescription);
}

const getStockPriceHistory = async symbol => {
  const searchUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line&timeseries=60`;
  const data = await getJsonFromServer(searchUrl);
  if (!data || !data.historical) {
    return console.warn("Not Found Result - Data Historical");
  }
  const historical = data.historical;
  printStockHistory(historical);
};

function printStockHistory(historical) {
  historical = historical.reverse();
  closePrice = historical.map(x => x.close);
  closeDate = historical.map(x => x.date);

  const chartConfig = {
    type: 'line',
    data: {
      labels: closeDate,
      datasets: [
        {
          fill: {
            target: 'origin',
          },
          label: 'Stock Price History',
          backgroundColor: 'rgba(156, 120, 100, 0.8)',
          borderColor: 'rgb(156, 120, 100)',
          data: closePrice,
        },
      ],
    },
  };

  const chartArea = makeElement('canvas');
  chartContainer.append(chartArea);
  const myChart = new Chart(chartArea, chartConfig);
};

window.onload = async function () {
  const symbolParam = getSymbolFromQuery();
  const profile = await getCompanyProfile(symbolParam);
  createProfileElements(profile);
  const stock = getStockPriceHistory(symbolParam);
  Promise.all([profile, stock]).then(() => {
    document.querySelector('.cssload-jumping').classList.add('hidden');
  });
};
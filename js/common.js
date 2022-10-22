function fixMissingImage(domImage) {
  domImage.addEventListener('error', () => {
    domImage.src = './img/missing-img.png';
    return true;
  });
}

function makeElement(type, elOptions) {
    const elDom = document.createElement(type);
    if (!elOptions) return elDom;
    Object.assign(elDom, elOptions);
    return elDom;
  }
  
  const getPrecentInfo = profileNum => {
    let percentage = {};
    percentage.num = profileNum; //;
    percentage.text = parseFloat(percentage.num).toFixed(2) + '%';
    percentage.Sign;
    percentage.Css;
    if (percentage.num >= 0) {
      percentage.Sign = '+';
      percentage.Css = 'positive';
    } else {
      percentage.Sign = '';
      percentage.Css = 'negative';
    }
    return percentage;
  };
  
  const getCssSign = num => {
    let sign;
    if (num >= 0) {
      sign = 'positive';
    } else {
      sign = 'negative';
    }
    return sign;
  };
  
  const getCompanyProfile = async symbol => {
    const searchUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
    const data = await getJsonFromServer(searchUrl);
    if (!data || !data.profile) {
      return console.warn("Not Found Result - Data Profile");
    }
    const profile = data.profile;
    return profile;
  };
  
  async function getJsonFromServer(apiUrl) {
    let response = await fetch(apiUrl);
    if (!response.ok) {
      return alert('Poor server response', response); 
    }
    let data = await response.json();
    if (!data) {
      return console.warn('No data coming from the server');
    }
    return data;
  }
  
  const splitSearch = (text, pattern) => {
    const regex = new RegExp(pattern, 'ig');
    const matches = text.matchAll(regex);
  
    const allMatched = [];
    let endOfPrev = 0;
  
    for (const hit of matches) {
      let pos = hit.index;
      let end = pos + pattern.length;
  
      let before = text.substring(endOfPrev, pos);
      let inside = hit[0]; 
  
      allMatched.push({ before, inside, pos });
      endOfPrev = end;
    }
  
    let after = text.substring(endOfPrev);
  
    return {
      hits: allMatched,
      after,
      text,
    };
  };
  

  
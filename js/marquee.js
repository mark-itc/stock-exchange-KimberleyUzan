class Marquee {
    constructor(element) {
      this.container = element;
      this.data;
      this.container;
    }
  
    start() {
      this.MarqueeData();
    }
  
    async MarqueeData() {
      const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/`;
      const data = await getJsonFromServer(url);
      if (data) {
        this.printMarquee(data);
      }
      
      return console.log('Error');
    }
  
    printMarquee(data) {
      const containerMarq = makeElement('div');
  
      for (const element of data) {
        const symbolMarquee = makeElement('p', {
          className: 'symbol-marquee',
          innerHTML: `${element.symbol} &nbsp;`,
        });
        const sign = getCssSign(element.changesPercentage);
        const symbolPrice = makeElement('span', {
          className: `symbol-price ${sign}`,
          innerText: `${element.price}`,
        });
  
        symbolMarquee.append(symbolPrice);
        containerMarq.append(symbolMarquee);
      }
  
      const element = this.container;
  
      element.innerHTML = '';
  
      element.style = `animation-duration: ${1.5 * data.length}s ;`;
      element.append(containerMarq);
    }
  }
  
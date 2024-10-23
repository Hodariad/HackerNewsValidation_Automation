const { chromium } = require("playwright"); 

async function validateArticleOrder() { 
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://news.ycombinator.com/newest");

  
  async function getDates() {
    
    const dateElements = await page.$$('span.age'); 

 
    const dates = []; 

    
    for (const el of dateElements) {
      
      const date = new Date(await el.getAttribute('title'));
      dates.push(date); 
    }

    return dates; 
  }

  
  let allDates = []; 
  let totalLoaded = 0; 

  
  while (totalLoaded < 100) {
    const currentDates = await getDates(); 
    allDates = allDates.concat(currentDates); 
    totalLoaded += currentDates.length; 

   
    if (totalLoaded < 100) { 
      await page.click('a.morelink'); 
      await page.waitForTimeout(2000); 
    }
  }

  
  allDates = allDates.slice(0, 100);
  
  console.log(allDates);   
  console.log(allDates.length); 

  
let isSorted = true;


for (let i = 1; i < allDates.length; i++) {
 
  if (allDates[i - 1] < allDates[i]) {
    
    isSorted = false;
    
    break;
  }
}
 
  console.log( isSorted);

  await browser.close(); 
}


validateArticleOrder();


let getData = (interval,currency) =>{
  const url = `https://api.binance.com/api/v3/klines?symbol=${currency}USDT&interval=${interval}&limit=1`;
  fetch(url)
  .then(res=>res.json())
  .then(data =>{
    data.forEach(element => {
    let openPrice = element[1];
    let closePrice = element[4];
    
    let avg = calculateAverage(openPrice,closePrice);
    var priceSection = $('#price');
    doColor(avg,priceSection)
  });
})
.catch(function(error) {
    console.log('Fetch Error:', error);
});
setTimeout(function(){
  getCurrencies();
}, 2000);
}


let doColor = (average,divPrices) => {
  if (average>0){
      divPrices.css("color","green");
      $(`#${divPrices.attr('id')}`).html(`+${average}`)
  }
  else{
      divPrices.css("color","red");
      $(`#${divPrices.attr('id')}`).html(`${average}`)
  }
}

let calculateAverage = (openPrice,closePrice) => ((closePrice-openPrice)/openPrice)*100;

getCurrencies = () => {
  let interval = $('#intervals').val();
  let currency = $('#currencies').val();
  getData(interval,currency);
  $('#btnGetData').hide(500);
};
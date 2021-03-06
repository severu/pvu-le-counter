//document.getElementById("my-button").addEventListener("click", calculate);
const inputLe = document.querySelector('.inputLe');
const inputHour = document.querySelector('.inputHour');
let sum = 0;
let entries = [];
let baseUrl = "https://api.coinranking.com/v2/coin/wnOdC0P0b/price"
//var baseUrl = "https://api.coinranking.com/v2/reference-currencies?types[]=coin&types[]=fiat"
let proxyUrl = "https://cors-anywhere.herokuapp.com/"
let apiKey = "coinranking8fab761404007b0a7ea973f2ed6d1a08b3ad2ab4cba09e79"
let coinPrice = 0;
let pvuConversion = 0;

fetch(`${proxyUrl}${baseUrl}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${apiKey}`,
        'Access-Control-Allow-Origin': '*'
    }
})
  .then(function(response) {
    if(response.ok){
        response.json().then((json) => {
            console.log(json.data.price)

            coinPrice = json.data.price
        })
    }
  })
  .catch(function(response) {
    console.log(response);
  });

document.getElementById("my-button").addEventListener("click", calculate);

        function calculate() {
          let leCount = document.getElementById("NumLe").value;
          let hours = document.getElementById("hour").value;
          let dividedHour = hours / 24;
          let finalResult = leCount / dividedHour;  
          
          //entries.push(finalResult)
                try{
                    //Check if there are inputs or the inputs are within reason.
                    if(hours < 24 || hours == 0) throw "Invalid number of hours";
                    if(leCount < 24 || leCount == 0) throw "Invalid number of LE";
                    //sumOfResults(entries);
                    displayResult(finalResult, hours, entries);
                    
                    document.getElementById("hideMe").style.visibility = "visible";  

                   
                } catch(err){
                    alert(err);                   
                }
                   
        }
        function displayResult(finalResult, hours, entries){
            //displays the result
            //console.log(entries)
            convertToDay(hours);
            sumOfResults(entries, finalResult);
            dailyIncome(sum, coinPrice);
                     
            document.getElementById("result").innerHTML += finalResult + '<br>';
            document.getElementById("hours").innerHTML = hours;
            document.getElementById("dayInformation").innerHTML = convertedDay;
            document.getElementById("sumTotal").innerHTML = sum;
            document.getElementById("income").innerHTML = '$' + income;

            //clear both input 
            inputLe.value = '';
            inputHour.value = '';
        }

        function convertToDay(hours){
            //converts the input hours into days
            return convertedDay = hours / 24;
        }

        function sumOfResults(entries, finalResult){
            //stores the results into an array then add them all up.
            sum = 0;
            entries.push(finalResult)
                for( let i=0; i < entries.length; i++ ){
                    
                    sum += entries[i];
                }
            
            return sum;
       
        }

        function dailyIncome(sum, coinPrice){
                pvuConversion = sum / 731;
                return income = pvuConversion * coinPrice;
        }
        

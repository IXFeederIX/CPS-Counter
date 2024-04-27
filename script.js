const htmlCounter = document.querySelector(".counter")
const difficultyPic = document.querySelector(".difficulty-pic")
const avgResult = document.querySelector(".avg")
const lowestResult = document.querySelector(".lowest")
const highestResult = document.querySelector(".highest")
const finalResultPic = document.querySelector(".finalresultpic")
const timerEl = document.getElementById("timer");
const time = document.querySelector(".time")
const resultCtn = document.querySelector(".result")

const scoreboardTable = document.querySelector(".scoreboard")
const score = document.querySelector(".score")
/////////////// important stuff
let counterCps = 0;
let cpsRate = []
let hasTriggered = false;

let scoreboardHistory = [
    
]
let avg; 
let highest;
let timer;
let lowest;
let result = 0;
let countdown= 3;
let finalpic;
let totalSec;
let totalMin;
let cpsCounter = true;

let ele = document.getElementById('timer');
let started, resetTimeoutHandle, resetTimeout = 1000,
 containerBody = document.querySelector(".counter-ctn"),
    cps = document.querySelector('.cps'),
    clicks = 0;

function setTimer() {
    
        let sec = 0;

        const timer = setInterval(() => {
          const minutes = Math.floor(sec / 60);

          const seconds = sec % 60;
  
          timerEl.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
          totalMin = `${minutes.toString().padStart(2, "0")}`
          totalSec = `${seconds.toString().padStart(2, "0")}`
          sec++;
          
          if(cpsCounter === false){
           setTimeout(() => {
            sec = 0;
           }, 1500);
            

          }
        }, 995);
     
   

  }
///////////// 

containerBody.addEventListener("click",(e)=>{

    
    function setCountDown() {
        clearInterval(timer); // Clear previous interval
        timer = setInterval(function() {
            if (countdown !== 0 && !hasTriggered) {
                countdown--;
                console.log(countdown);
            } else if (countdown === 0 && !hasTriggered) {
                countdown = 3;
                hasTriggered = true;
                giveCpsAvg();
            }
        }, 500);
        
     

            function giveCpsAvg() {
                console.log("hi")
   if (hasTriggered === true) {
                resultCtn.style.display = "flex";
                console.log("Time's up!");
                finalpic =  difficultyPic.src;
                finalResultPic.src = finalpic;
              containerBody.style.display = "none";
              cpsCounter = false;
  
                score.innerHTML = counterCps
              
            
                time.innerHTML = ele.innerHTML

                getAvg = () =>{
                   
                    avgResult.innerHTML = ""
               
                    let sum = 0;
                    const length = cpsRate.length;
                  
                    for (let i = 0; i < length; i++) {
                      sum += cpsRate[i];
                    }
                
                    return (sum / length).toFixed(3);
                }
               getHighest = () => {
             
                highestResult.innerHTML = ""
              return Math.max(...cpsRate)
               }
               getLowest = () =>{
         
                lowestResult.innerHTML = ""
                return Math.min(...cpsRate)
               }
               
              
              
            avg = getAvg(); // Average CPS
                highest = getHighest(); // Highest CPS
                lowest = getLowest();
                avgResult.innerHTML = "Average: " + avg + " | "
               highestResult.innerHTML = "Highest: " + highest + " | "
               lowestResult.innerHTML = "Lowest: " + lowest + " | "
       
               let date = new Date()
               let current_date = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds() + " " + date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
               let scoreboardNow = [
                   {
                     time: current_date,
                     score: counterCps,
                     elapsed: [totalMin + " : " + totalSec],
                     avg: avg,
                     highest: highest,
                     lowest: lowest,
                     icon: finalpic
                   }
                 ]
   
         
   
           setTimeout(() => {
               scoreboardHistory.unshift(scoreboardNow)
               avg = ""
               highest = ""
               lowest = ""
               cpsRate = []
               cpsCounter = false;
            counterCps = 0;
            finalpic = ""
            
            
             
           }, 1000);
           setTimeout(() => {
              

               function pushScoreboard() {
                scoreboardTable.innerHTML = ""
   
                let scoreboardTag = [
                      "timeDate",
                      "scoreSet",
                      "elapsed",
                      "avg",
                      "highest",
                      "lowest",
                  ]
    
    
                scoreboardHistory.forEach(scoreboard => {
                    let index = 0;
                            let scoreSet = 
                            [
        "Date: " + scoreboard[index].time,
        "Score: " + scoreboard[index].score,
        "Time: " + scoreboard[index].elapsed,
        "Avg.: " + scoreboard[index].avg,
        "Lowest: " + scoreboard[index].lowest,
        "Highest: " + scoreboard[index].highest
        ]
          
                    const scoreBox = document.createElement("div");
                       scoreBox.classList.add("score-box");
                       scoreboardTable.appendChild(scoreBox);
                    // Append scoreBox to scoreboard
               const cardPic = document.createElement("img")
               scoreBox.appendChild(cardPic)
               cardPic.src = scoreboard[index].icon
               cardPic.classList.add("pic-table")
               
                       const scoreRecord = document.createElement("ul");
                       scoreRecord.classList.add("score-record");
                       scoreBox.appendChild(scoreRecord);
for (let i = 0; i < 6; i++) {
    const scoreList = document.createElement("li")
    scoreList.classList.add(scoreboardTag[i])
    scoreList.innerHTML = scoreSet[i]
    scoreRecord.appendChild(scoreList)
    
}


index++;

                   });

               }
               pushScoreboard()
           }, 2000);
           
         } 
       

            }
 
                
        
        
       
      
            ///// returns results & scoreboard
            
            
          
            ///////////
            
         
           
          
     
     
       
      
      
            const restart = document.querySelector(".restart").addEventListener("click",(e)=>{
              
                countdown = 3
                setTimeout(() => {
                hasTriggered = false;
            }, 500);
             
            
                e.preventDefault()
               difficultyPic.src = "./img/0.webp"
                cpsCounter = true;
                containerBody.style.display = "flex"
                resultCtn.style.display = "none"
                score.innerHTML = 0
    setCountDown()
  
    
                   })
   

    }
    countdown = 3
    
setCountDown()

    containerBody.onseclect = containerBody.onselectstart = function() {
        return false;
    };


    ////////gives Cps avg
    function clicksPerSecond(started, clicks) {
        if(cpsCounter === true){
            const timeDiff = (new Date()) - started;
            const cpsCount = clicks / timeDiff * 1000;
          
            if (!isFinite(cpsCount)) {
              return 0;
            }
        let arrayCount = cpsCount.toFixed(3)
        cpsRate.push(parseInt(arrayCount))
            return cpsCount.toFixed(3);
        }else{
//// do nothing
        }
      
        
      }
////////////

    ////////////// Sums Count
    function count() {
        clearTimeout(resetTimeoutHandle);
        clicks++;
        updateCount = () =>{
            cps.innerHTML = clicksPerSecond(started, clicks);
        }

        setInterval(updateCount, 1000);
        resetTimeoutHandle = setTimeout(reset, resetTimeout);
        return false;
        
    }
    
    function start() {
       
        started = new Date();
        clicks = 0;
        this.onmousedown = count;
        this.onmousedown();
        return false;
    }
    
    function reset() {
     containerBody.onmousedown = start;

      
    }
////////////////
    
    
    
function createShake() {
   
    if(!containerBody.classList.contains("shake")){
        setTimer()
        reset();
        containerBody.classList.add("shake")
   
}
   
}
    createShake();
    


htmlCounter.innerHTML = counterCps
    e.preventDefault()

increaseCounter()

})

    increaseCounter = () => {
        counterCps++;
        switch (counterCps) {
            case 50:
                difficultyPic.src = "./img/1.webp";
                break;
                case 100:
                    difficultyPic.src = "./img/2.webp"
                    break;
                    case 200:
                        difficultyPic.src = "./img/3.webp"
                        break;  
                         case 250:
                        difficultyPic.src = "./img/4.webp"
                        break;  
                         case 300:
                        difficultyPic.src = "./img/5.webp"
                        break;
                        case 350:
                            difficultyPic.src = "./img/6.webp"
                            break;
                            case 400:
                                difficultyPic.src = "./img/7.webp"
                                break;
                                case 450:
                                    difficultyPic.src = "./img/8.webp"
                                    break;
                                    case 600:
                                        difficultyPic.src = "./img/9.webp"
                                        break;
        }
    }
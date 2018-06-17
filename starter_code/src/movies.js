/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes 


function turnHoursToMinutes (arr) {
    var newArr=arr.map(function(element) {
      if (element.duration.includes("h") && element.duration.includes("min")) {
        var hoursToMinutes = element.duration.split(" ");
        var hours = parseInt(hoursToMinutes[0].slice(0,1));
        var minutes = parseInt(hoursToMinutes[1].slice(0,-3));
        element = ((hours * 60) + minutes);
      } else if (element.duration.includes("h")) {
        var hours = parseInt(element.duration.slice(0,1));
        element = (hours * 60);
      } else {
        var minutes = parseInt(element.duration.slice(0,-3));
        element =  minutes;
      }
      return {duration: element};
    }); 
    return newArr; 
}   

// Get the average of all rates with 2 decimals 
function ratesAverage(arr){
    var average=arr.reduce(function(acc, element){
      acc+=parseFloat(element.rate);
      return acc;
    }, 0);
    return parseFloat((average/arr.length).toFixed(2));
  }

// Get the average of Drama Movies

function dramaMoviesRate(arr){
    var count = 0;
    var average=arr.reduce(function(acc, element){    
      if (element.genre.includes("Drama")) {
        count++;
        if (element.rate!=""){
          acc+=parseFloat(element.rate);
        }
        console.log(count);
      }
      console.log(acc);
      return acc;
      }, 0);
      if (average === 0) {
          return;
      }
      return parseFloat((average/count).toFixed(2));
    }

// Order by time duration, in growing order
function orderByDuration (arr) {
    return arr.sort(function(a,b){
        if(a.duration===b.duration){
            return 1;
        }
        return a.duration-b.duration;
    })
}

// How many movies did STEVEN SPIELBERG
function howManyMovies(arr){
    if (arr.length===0){
      return;
    }
    number = arr.filter(function(e){
      return (e.director=="Steven Spielberg") && (e.genre.includes("Drama"));
    })

    return "Steven Spielberg directed " + number.length + " drama movies!";
}

// Order by title and print the first 20 titles

function orderAlphabetically (arr) {
  var answer = arr.map(function(e){
    return e.title;
  });
  answer.sort();
  console.log (answer);
  return answer.slice(0,20);
}

// Best yearly rate average

function bestYearAvg(arr){
  if (arr.length === 0){
    return;
  }

  if (arr.length === 1){
    return "The best year was " + arr[0].year + " with an average rate of " + arr[0].rate;

  }
  var tempArr=arr.map(function (e, i, a){
    var filmYear=e.year;
    var filmRate=parseFloat(e.rate);
    count=1;
    for (var j=0; j<a.length; j++){
      if ((i!=j) && (a[j].year === filmYear)){
        count++;
        filmRate+=parseFloat(a[j].rate);
      }
    }
    filmRate/=count.toFixed(2);
    return {year: filmYear, rate: filmRate+""};
  });
  console.log(tempArr);
  arr = tempArr.filter(function (e, i, a){
    for (var j=i+1; j<a.length; j++){
      if (e.filmYear === a[j].filmYear){
        return true;
      }
    }
    return false;
  });

  var maxRate = 0;
  var bestYear;

  arr.forEach(function (e){
    if (parseFloat(e.rate) > maxRate){
      maxRate = parseFloat(e.rate);
      bestYear = e.year;
    }else if ((parseFloat(e.rate) === maxRate) && (bestYear>e.year)) {
      bestYear=e.year;
    }

  });
  return "The best year was " + bestYear + " with an average rate of " + maxRate

}
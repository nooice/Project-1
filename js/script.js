//script creates an array of random numbers based on the amount of items in the multidimensional array called 'a'. 
//when the page finished loading, it will display the first quote at random. 
//then it will cycle through the rest of the quotes as the user clicks the 'show another quote' button.

//variables
var lq = document.getElementById('loadQuote'); 
var postHTML;
var postButtonText;
var qb = document.getElementById("quote-box");
var bdy = document.querySelector('body');
var count = 0; //counter for 'a' array
var count2 = 0; //counter for 'colorArray' array
var xCount; //counter for setInterval
var ranNum = []; //random number array for 'a' array
var ranNum2 = []; //random number array for 'colorArray' array
var colorArray = ['#36b55c', '#67d1f5', '#ED5FB2']; //add colors here to change the background colors for body and #quote-box
var textDefault = "Show another Quote"; //default text for #quote-box button

//array of objects. add addition quotes here
var a = [
    {quote: "Do. Or do not. There is no try.", 
     source: "Yoda", 
     citation: "The Empire Strikes Back", 
     date: "1980",
     buttonText: "Force push for quote"},
    {quote: "I'm not superstitious, but I am a little stitious.", 
     source: "Michael Scott", 
     citation: "The Office", 
     date: "2007"},
    {quote: "Float like a butterfly, sting like a bee.", 
     source: "Muhammad Ali", 
     date: "1974",
     buttonText: "Punch here for quote"},
    {quote: "The problem with quotes found on the internet is that they are often not true", 
     source: "Abraham Lincoln"},
    {quote: "Design is not just what it looks like and feels like. Design is how it works.",
     source: "Steve Jobs",},
    {quote: "I'd rather do nothin' with you than somethin' with anybody else.",
     source: 'Theodore "Beaver" Cleaver',
     citation: "Leave It to Beaver",
     date: "1957–1963",
     buttonText: "Click for more"}
    
];

//creates an array of random numbers -- length of array is set by 'n'
function randPerm(n) {
    var result = new Array(n);
    result[0] = 0;
    for (var i = 1; i < n; ++i) {
        var idx = (Math.random() * (i+1)) | 0;
        if (idx < i) {
            result[i] = result[idx];
        }
        result[idx] = i;
    }
    return result;
}

//assigns the array of random numbers to varriable outside of the function.
//we pass in the length of 'a' to be expandable for future addition of quotes
ranNum = randPerm(a.length);
//sets random number array for colors. more colors can be added to colorArray without adding more code
ranNum2 = randPerm(colorArray.length);

//function takes number from quoteSelect() then builds the HTML code to paste into the index.html file
function printQuote(x) {
    if (a[x].hasOwnProperty('quote') && a[x].hasOwnProperty('source') && a[x].hasOwnProperty('citation') && a[x].hasOwnProperty('date')){
        postHTML = '<p class="quote">' + a[x].quote + '</p><p class="source">' + a[x].source + '<span class="citation">' + a[x].citation + '</span><span class="year">' + a[x].date + '</span></p>';
    }else if (a[x].hasOwnProperty('quote') && a[x].hasOwnProperty('source') && a[x].hasOwnProperty('citation')){
        postHTML = '<p class="quote">' + a[x].quote + '</p><p class="source">' + a[x].source + '<span class="citation">' + a[x].citation + '</span></p>';
    }else if (a[x].hasOwnProperty('quote') && a[x].hasOwnProperty('source') && a[x].hasOwnProperty('date')){
        postHTML = '<p class="quote">' + a[x].quote + '</p><p class="source">' + a[x].source + '<span class="year">' + a[x].date + '</span></p>';
    }else if (a[x].hasOwnProperty('quote') && a[x].hasOwnProperty('source')){
        postHTML = '<p class="quote">' + a[x].quote + '</p><p class="source">' + a[x].source + '</p>';
    } else {postHTML = '<p class="quote">' + a[x].quote + '</p>';}
    
    if (a[x].hasOwnProperty('buttonText')){
        postButtonText = a[x].buttonText;
    } else {postButtonText = textDefault;}
    
    //switch background color
    if (count2 < colorArray.length){
            colorSwap();
        }else {
            count2 = 0;
            colorSwap();
        }
    //post final code to HTML
    qb.innerHTML = postHTML;
    lq.innerHTML = postButtonText;
}

//starts a timer for getRandomQuote
function startTime() {
    xCount = setInterval(getRandomQuote, 7500); 
}

//ends the timer for getRandomQuote
function endTime() {
    clearInterval(xCount);
}

//grabs random number and asigns a new background color to body and 'show another quote' button.
function colorSwap() {
    bdy.style.background = colorArray[ranNum2[count2]];
    lq.style.background = colorArray[ranNum2[count2]];
    count2++;
}

//takes a number from the random number array and sends it to printQuote(). it then prevents printing quote twice
//if the counter passes the length of the total items in the array it will start over
function getRandomQuote() {
    endTime();//ends timer if user clicks button
    if (count < a.length){
    printQuote(ranNum[count]);  
    count++;
    } else {
        count = 0;
        printQuote(ranNum[count]);
        count++;
    }
    startTime();//starts a new timer after other functions complete
}

//loads first quote when page is loaded
window.onload = getRandomQuote;

//loads next quote when the 'show another quote' button is clicked by user
lq.onclick = getRandomQuote;
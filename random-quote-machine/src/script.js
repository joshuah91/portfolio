const projectName = "random-quote-machine";
localStorage.setItem("example_project", "Random Quote Machine");
let quotesData;

/*
  Code by Gabriel Nunes
  Modified by Todd Chaffee to use Camper gist for JSON Quote data.
  Extra modification for project purposes by joshuah_91
*/
function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

var colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857"
];
var currentQuote = "",
  currentAuthor = "";
function openURL(url) {
  window.open(
    url,
    "Share",
    "width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0"
  );
}

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: "application/json"
    },
    url:
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === "string") {
        quotesData = JSON.parse(jsonQuotes);
        console.log("quotesData");
        console.log(quotesData);
      }
    }
  });
}

function getRandomQuote() {
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}

function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  if (inIframe()) {
    $("#tweet-quote").attr(
      "href",
      "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );
 //this session might contain faulty share link codes
    $("#facebook-quote").attr(
      "href",
      "https://www.facebook.com/sharer/sharer.php?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );
    
    $("#linkedin-quote").attr(
      "href",
      "http://www.linkedin.com/shareArticle?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );
  }
//continue here
  $(".quote-text").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $("#text").text(randomQuote.quote);
  });

  $(".quote-author").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $("#author").html(randomQuote.author);
  });

  var color = Math.floor(Math.random() * colors.length);
  $("html body").animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    1000
  );
  $(".button").animate(
    {
      backgroundColor: colors[color]
    },
    1000
  );
}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $("#new-quote").on("click", getQuote);

  $("#tweet-quote").on("click", function () {
    if (!inIframe()) {
      openURL(
        "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
          encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
      );
    }
  });

  // this section might contain faulty link codes
  $("#facebook-quote").on("click", function () {
    if (!inIframe()) {
      openURL(
        "https://www.facebook.com/sharer/sharer.php?hashtags=quotes&related=freecodecamp&text=" +
          encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
      );
    }
  });
  
  $("#linkedin-quote").on("click", function () {
    if (!inIframe()) {
      openURL(
        "http://www.linkedin.com/shareArticle?hashtags=quotes&related=freecodecamp&text=" +
          encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
      );
    }
  });
  //continue here
});

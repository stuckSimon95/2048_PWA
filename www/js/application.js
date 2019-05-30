"use strict"; //https://love2dev.com/blog/javascript-strict-mode/
//import jQuery from "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";

(function () 
{
  // Wait till the browser is ready to render the game (avoids glitches)
  window.requestAnimationFrame(function () 
  {
    new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  });



  var deferredPrompt;

  /* $(".ad2hs-prompt").click(function(e)
  {
    debugger;
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    e.userChoice.then(function(outcome) 
    { 
      console.log(outcome); // either "accepted" or "dismissed"
    });
    deferredPrompt = e;

    showAddToHomeScreen();
  }); */

  window.addEventListener("beforeinstallprompt", function (e) 
  {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    e.userChoice.then(function(outcome) 
    { 
      console.log(outcome); // either "accepted" or "dismissed"
    });
    deferredPrompt = e;

    showAddToHomeScreen();

  });

  $(".btn-ad2hs-prompt").click( function()
  {
    if(deferredPrompt == undefined)
    {
      confirm('App già installata');
    }
  });

function showAddToHomeScreen() 
{
  var a2hsBtn = document.querySelector(".ad2hs-prompt");

  a2hsBtn.style.display = "flex";

  a2hsBtn.addEventListener("click", addToHomeScreen);

}

  function addToHomeScreen() 
  {
    var a2hsBtn = document.querySelector(".ad2hs-prompt");

    // hide our user interface that shows our A2HS button
    a2hsBtn.style.display = 'none';

    if (deferredPrompt) 
    {
      // Show the prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice
        .then(function (choiceResult) {

          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }

          deferredPrompt = null;

        });
    }

  }

  if(deferredPrompt == undefined)
  {
    $('.ad2hs-prompt').attr('style','"display: none;"');
  }

  window.addEventListener('appinstalled', function (evt) {
    console.log('a2hs', 'installed');
  });


})();
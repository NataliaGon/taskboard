
function initPageByHash() {
  loadBoard();
   loadMembers();
  const hash = window.location.hash;

  // If no hash, go to default page
  if (!hash) {
    window.location.hash = '#board';
    setActiveView('board');//I put
    
  }

  // const topbar = document.querySelector('.topbar > ul');

  // find the active one
  // const currentActive = topbar.querySelector('.active');
  // const targetLi      = document.querySelector(hash);

  // Remove it's active class
  // currentActive.classList.remove('active');
  // Add active to the clicked one
  // targetLi.classList.add('active');

  // If clicked on members, change the view to Members
  if (hash === '#members') {
    setActiveView('members');
  }

  // If clicked on members, change the view to Members
  if (hash === '#board') {
    setActiveView('board');
  }
}

window.addEventListener('hashchange', function () {
initPageByHash();
});



// retur value by key from url string

// function getParameterByName(name, url) {
//   if (!url) url = window.location.href;
//   name = name.replace(/[\[\]]/g, "#");
//   var regex = new RegExp("#" + name + "(=([^&#]*)|&|#|$)"),
//     results = regex.exec(url);
//   if (!results) return null;
//   if (!results[2]) return '';
//   return decodeURIComponent(results[2].replace(/\+/g, " "));
// }


//Help to open true content with menu button
// function insertParam(key, value) {
//   key = encodeURI(key); value = encodeURI(value);

//   var kvp = document.location.search.substr(1).split('&');

//   var i = kvp.length; var x; while (i--) {
//     x = kvp[i].split('=');

//     if (x[0] == key) {
//       x[1] = value;
//       kvp[i] = x.join('=');
//       break;
//     }
//   }

//   if (i < 0) { kvp[kvp.length] = [key, value].join('&'); }

  //this will reload the page, it's likely better to store this until finished
//   document.location.search = kvp.join('&');
// }

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
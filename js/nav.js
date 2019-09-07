const $ = document.querySelector.bind(document);

function openSideNav() {
  $('side-nav').style.width = '16em';
}

$('side-nav').addEventListener('onclick', openSideNav)
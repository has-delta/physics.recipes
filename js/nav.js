const $ = document.querySelector.bind(document);

function openSideNav() {
  $('.sidenav').style.width = '15em';
  $('.content').style.marginLeft = '15em';
  console.log();
}

$('.topnav-menu').addEventListener('onclick', openSideNav);
const $ = document.querySelector.bind(document);

let sideNavOpened = false;

function openSideNav() {
  $('.sidenav').style.width = '15em';
  $('.content').style.marginLeft = '15em';
  sideNavOpened = true;
}

function closeSideNav() {
  $('.sidenav').style.width = '0';
  $('.content').style.marginLeft = '0';
  sideNavOpened = false;
}

function toggleSideNav() {
  sideNavOpened ? closeSideNav() : openSideNav();
}

$('.topnav-menu').addEventListener('click', toggleSideNav);

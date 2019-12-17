import './scss/index.scss';
import './js/nav.js';
import './js/scenes/*.js';
import './js/matter-init.js';
import katex from 'katex';
import renderMathInElement from 'katex/contrib/auto-render/auto-render';
import 'katex/dist/katex.min.css';
import './js/content-update.js'

renderMathInElement(document.body);
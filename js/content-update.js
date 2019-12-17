import renderMathInElement from "katex/dist/contrib/auto-render";
import expl from '/assets/explanations.json'

const $ = document.querySelector.bind(document);
let title = $('.content-title');
let selector = $('.matter-example-select');
let explanation = $('.explanation-content');

let changeTitle = () => {
  let s = selector;
  let txt = s.options[s.selectedIndex].text;
  title.innerHTML = txt;
}

let changeExplanation = () => {
  let s = selector;
  let txt = s.options[s.selectedIndex].value;
  explanation.innerHTML = expl[txt];
  renderMathInElement(document.body);
}

selector.addEventListener('change', changeTitle, false)
selector.addEventListener('change', changeExplanation, false)


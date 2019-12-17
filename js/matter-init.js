import { Demo } from 'matter-tools';
const Inspector = require('matter-tools').Inspector;
const Gui = require('matter-tools').Gui;
import expl from '../assets/explanations.json';

const $ = document.querySelector.bind(document);
const scenes = [
  { name: 'Compound Bodies', id: 'compound' },
  { name: 'Slingshot', id: 'slingshot' },
  { name: 'Newton\'s Cradle', id: 'newtonsCradle' },
  { name: 'Introduction', id: 'hello' },
  { name: 'Hooke\'s Law', id: 'hooke' },
  { name: '2D Momentum', id: 'momentum2d' },
  { name: 'Friction', id: 'friction' }
]

const sourceLinkRoot = './scenes'

for (let i = 0; i < scenes.length; i += 1) {
  var scene = scenes[i];
  scene.sourceLink = sourceLinkRoot + '/' + scene.id + '.js';
  scene.init = window.Scene[scene.id];

  if (!scene.init) {
    console.warn('Scene not loaded:', scene.id);
  }
}

let demo = Demo.create({
  toolbar: {
    title: 'source',
    url: 'https://github.com/has-delta/physics.recipes',
    reset: true,
    source: false,
    inspector: true,
    tools: true,
    fullscreen: true,
    exampleSelect: true
  },
  tools: {
    inspector: true,
    gui: true
  },
  inline: true,
  preventZoom: true,
  resetOnOrientation: true,
  routing: true,
  startExample: 'slingshot',
  examples: scenes
});

const findSceneByName = (name) => {
  for (let i = 0; i < scenes.length; i += 1) {
    if (scenes[i].id === name) return scenes[i].name;
  }
}

$('.simulation').appendChild(demo.dom.root);

Demo.start(demo);

$('.content-title').innerHTML = findSceneByName(demo.startExample);
$('.explanation-content').innerHTML = expl[demo.startExample];


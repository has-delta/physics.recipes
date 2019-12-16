import MatterTools from 'matter-tools';

const scenes = [
  { name: 'Compound Bodies', id: 'compound' },
  { name: 'Slingshot', id: 'slingshot' }
]

const sourceLinkRoot = './scenes'

for (var i = 0; i < scenes.length; i += 1) {
  var scene = scenes[i];
  scene.sourceLink = sourceLinkRoot + '/' + scene.id + '.js';
  scene.init = window.Scene[scene.id];

  if (!scene.init) {
    console.warn('Scene not loaded:', scene.id);
  }
}

let demo = MatterTools.Demo.create({
  toolbar: {
    title: 'matter-js',
    url: 'https://github.com/liabru/matter-js',
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
  startExample: 'mixed',
  examples: scenes
});

document.querySelector('.simulation').appendChild(demo.dom.root);

MatterTools.Demo.start(demo);
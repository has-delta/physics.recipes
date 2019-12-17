window.Scene = window.Scene || {};

import Matter, { Body } from 'matter-js';

window.Scene.momentum2d = function () {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Events = Matter.Events,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;

  // create engine
  var engine = Engine.create(),
    world = engine.world;

  // create renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 1920,
      height: 1080,
      showAngleIndicator: false,
      wireframes: false
    }
  });

  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  world.gravity.scale = 0;

  // add bodies
  let rockOptions = { density: 1, restitution: 1, render: { fillStyle: "#ff0000" } },
    rock = Bodies.circle(170, 370, 25, rockOptions),
    anchor = { x: 170, y: 370 },
    elastic = Constraint.create({
      pointA: anchor,
      bodyB: rock,
      stiffness: 0.1,
      render: {
        "type": "spring"
      }
    });

  let pyramid = Composites.pyramid(900, 360, 9, 10, 0, 0, function (x, y) {
    return Bodies.circle(x, y, 25, { density: 1, restitution: 1 });
  });

  Composite.rotate(pyramid, -Math.PI / 2, { x: 900, y: 360 });
  Composite.translate(pyramid, { x: 0, y: 240 });


  var pyramid2 = Composites.pyramid(550, 0, 5, 10, 0, 0, function (x, y) {
    return Bodies.rectangle(x, y, 25, 40);
  });

  World.add(engine.world, [pyramid, rock, elastic]);

  Events.on(engine, 'afterUpdate', function () {
    if (mouseConstraint.mouse.button === -1 && (rock.position.y < 360 || rock.position.x > 180 || rock.position.y > 380)) {
      rock = Bodies.circle(170, 370, 25, rockOptions);
      World.add(engine.world, rock);
      elastic.bodyB = rock;
    }
  });

  // add mouse control
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

  World.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 1280, y: 720 }
  });

  // context for MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function () {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    }
  };
};
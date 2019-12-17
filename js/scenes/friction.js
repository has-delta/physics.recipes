window.Scene = window.Scene || {};

import Matter from 'matter-js';

window.Scene.friction = function () {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Composites = Matter.Composites,
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
      width: 1280,
      height: 720,
      showAxes: true,
      showConvexHulls: false,
      wireframes: false
    }
  });

  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  World.add(world, [
    // walls
    Bodies.rectangle(640, 0, 1280, 50, { isStatic: true }),
    Bodies.rectangle(640, 720, 1280, 50, { isStatic: true }),
    Bodies.rectangle(1280, 360, 50, 720, { isStatic: true }),
    Bodies.rectangle(0, 360, 50, 720, { isStatic: true })
  ]);

  World.add(world, [
    Bodies.rectangle(300, 180, 1200, 20, { isStatic: true, angle: Math.PI * 0.04 }),
    Bodies.rectangle(300, 70, 40, 40, { friction: 0.01 })
  ]);

  World.add(world, [
    Bodies.rectangle(300, 350, 1200, 20, { isStatic: true, angle: Math.PI * 0.04 }),
    Bodies.rectangle(300, 250, 40, 40, { friction: 0.00005 })
  ]);

  World.add(world, [
    Bodies.rectangle(300, 520, 1200, 20, { isStatic: true, angle: Math.PI * 0.04 }),
    Bodies.rectangle(300, 430, 40, 40, { friction: 0 })
  ]);

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
import MatterSprings from '../lib/matter-springs';

window.Scene = window.Scene || {};

import Matter from 'matter-js';

Matter.use(MatterSprings);

window.Scene.hooke = function () {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Spring = MatterSprings.Spring;

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
      showConvexHulls: true
    }
  });

  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine)

  world.gravity.scale /= 4.5

  let floor = Bodies.rectangle(450, 600, 800, 50.5, {
    isStatic: true, friction: 0, frictionStatic: 0, restitution: 1
  })
  let pendulum1 = Bodies.circle(100, 545, 30, { friction: 0, frictionAir: 0, frictionStatic: 0, restitution: 1 });
  let pendulum2 = Bodies.circle(950, 50, 30, { friction: 0, frictionAir: 0, frictionStatic: 0, restitution: 1 });
  let pendulum3 = Bodies.circle(1050, 50, 30, { friction: 0, frictionAir: 0, frictionStatic: 0, restitution: 1 });
  let pendulum4 = Bodies.circle(1150, 50, 30, { friction: 0, frictionAir: 0, frictionStatic: 0, restitution: 1 });

  let constraint1 = Constraint.create({
    pointA: { x: 450, y: 545 },
    bodyB: pendulum1,
    pointB: { x: 0, y: 0 },
    damping: 1e-15,
    stiffness: 1e-15,
    render: {
      "type": "spring"
    }
  });

  let constraint3 = Constraint.create({
    pointA: { x: 1050, y: 50 },
    bodyB: pendulum3,
    pointB: { x: 0, y: 0 },
    damping: 1e-15,
    stiffness: 1e-15,
    render: {
      "type": "spring"
    }
  });

  let constraint2 = Constraint.create({
    pointA: { x: 950, y: 50 },
    bodyB: pendulum2,
    pointB: { x: 0, y: 0 },
    damping: 1e-15,
    stiffness: 1e-15,
    render: {
      "type": "spring"
    }
  });

  let constraint4 = Constraint.create({
    pointA: { x: 1150, y: 50 },
    bodyB: pendulum4,
    pointB: { x: 0, y: 0 },
    damping: 1e-15,
    stiffness: 1e-15,
    render: {
      "type": "spring"
    }
  });


  World.add(world, [floor, pendulum1, pendulum2, pendulum3, pendulum4, constraint1, constraint2, constraint3, constraint4]);

  world.plugin.springs = [
    Spring.create({
      pointA: { x: 450, y: 545 },
      bodyB: pendulum1,
      pointB: { x: 0, y: 0 },
      stiffness: 10,
      damping: 1e-15,
    }),
    Spring.create({
      pointA: { x: 950, y: 100 },
      bodyB: pendulum2,
      pointB: { x: 0, y: 0 },
      damping: 1e-15,
      stiffness: 10 / 4,
    }),
    Spring.create({
      pointA: { x: 1050, y: 100 },
      bodyB: pendulum3,
      pointB: { x: 0, y: 0 },
      damping: 1e-15,
      stiffness: 10,
    }),
    Spring.create({
      pointA: { x: 1150, y: 100 },
      bodyB: pendulum4,
      pointB: { x: 0, y: 0 },
      damping: 1e-15,
      stiffness: 10 * 4,
    })
  ]

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
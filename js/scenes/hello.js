window.Scene = window.Scene || {};

import Matter from 'matter-js';

window.Scene.hello = function () {
  var Engine = Matter.Engine,
    Events = Matter.Events,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Vector = Matter.Vector;

  var element = document.getElementById("matter");

  // create engine
  var engine = Engine.create(),
    world = engine.world;

  var w = 1280,
    h = 720;

  // create renderer
  var render = Render.create({
    element: element,
    engine: engine,
    options: {
      width: w,
      height: h - 5,
      showAngleIndicator: false,
      background: "#000000",
      wireframeBackground: "transparent",
      wireframes: false,
      // showVelocity: true
    }
  });

  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  var group = Body.nextGroup(true),
    length = 200,
    width = 25;

  const Llength = 100;
  const radius = 15;
  const pivoty = 400;

  var ball = Bodies.circle(50, pivoty + Llength, radius);
  	World.add(world, ball);

  ball.frictionAir = 0;

  var pendulum = Constraint.create({
      bodyB: ball,
      pointA: {x: 50, y: pivoty}
    });

  pendulum.damping = 0;

  World.add(world, pendulum);

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

  world.gravity.scale = 0.002;

  render.context.globalAlpha = 1;
  Render.endViewTransform(render);

  Render.setPixelRatio(render, "auto");


  setTimeout(function() {
    Body.setVelocity(ball, {x: 25, y: 0});
  }, 3000);

  setTimeout(function() {
    World.remove(world, pendulum);
  }, 3100);

  setTimeout(function() {
    pendulum.pointA = {x: w - 50, y: pivoty};
    World.add(world, pendulum);
  }, 4100);

  setTimeout(function() {
    World.remove(world, pendulum);
  }, 4900);

  setTimeout(function() {
    pendulum.pointA = {x: w/2 + 120, y: pivoty};
    World.add(world, pendulum);
  }, 5100);

  setTimeout(function() {
    let colliding = Bodies.circle(w, pivoty + Llength - 20, radius);
    Body.setVelocity(colliding, {x: -200, y: 0});
    World.add(world, colliding);
  }, 6000);

  setTimeout(function() {
    World.remove(world, pendulum);
  }, 6150);

  setTimeout(function() {
    pendulum.pointA = {x: w/2 + 200, y: 235};
    World.add(world, pendulum);
  }, 7000);

  setTimeout(function() {
    World.remove(world, pendulum);
  }, 7500);

  setTimeout(function() {
    pendulum.pointA = {x: w/2, y: 235};
    World.add(world, pendulum);
  }, 7850);

  setTimeout(function() {
    World.remove(world, pendulum);
  }, 8400);

  setTimeout(function() {
    let colliding = Bodies.rectangle(180, h, 300, 20);
    Body.applyForce(colliding, {x: 0, y: 0}, {x: 0, y: -0.5});
    World.add(world, colliding);
  }, 9000);

  setTimeout(function() {
    pendulum.pointA = {x: w/2 + 200, y: 235};
    World.add(world, pendulum);
  }, 9600);

  setTimeout(function() {
    World.remove(world, pendulum);
  }, 10050);

  setTimeout(function() {
    pendulum.pointA = {x: 100, y: pivoty};
    World.add(world, pendulum);
  }, 10850);

  setTimeout(function() {
    World.remove(world, pendulum);
    world.gravity.scale = 0;
  }, 12350);

  setTimeout(function() {
    let colliding = Bodies.rectangle(w - 10, 100, 20, h);
    World.add(world, colliding);
  }, 13000);

  setTimeout(function() {
    pendulum.pointA = {x: w - 100, y: 50};
    World.add(world, pendulum);
  }, 14000);

  setTimeout(function() {
    World.remove(world, pendulum);
  }, 15000);

  setTimeout(function() {
    pendulum.pointA = {x: 50, y: pivoty};
    World.add(world, pendulum);
    world.gravity.scale = 0.002;
  }, 18550);

  setTimeout(function() {
    world.gravity.scale = -0.002;
  }, 21500);

  setTimeout(function() {
    World.remove(world, pendulum);
  }, 22350);

  setTimeout(function() {
    pendulum.pointA = {x: w/2, y: 270};
    World.add(world, pendulum);
    world.gravity.scale = 0;
  }, 23000);

  setTimeout(function() {
    var letterP1 = Constraint.create({
      pointA: {x: 90, y: 100},
      pointB: {x: 90, y: 200}
    });
    var letterP2 = Bodies.circle(120,130,30);
    World.add(world, letterP1);
    World.add(world, letterP2);
  }, 24000)

  setTimeout(function() {
    var letterR1 = Constraint.create({
      pointA: {x: 200, y: 100},
      pointB: {x: 200, y: 200}
    });
    var letterR2 = Constraint.create({
      pointA: {x: 200, y: 110},
      pointB: {x: 260, y: 110}
    });
    World.add(world, letterR1);
    World.add(world, letterR2);
  }, 24500)

  setTimeout(function() {
    var letterO = Bodies.circle(320, 170, 30);
    World.add(world, letterO);
  }, 25000)
  // keep the mouse in sync with rendering

  setTimeout(function() {
    var letterJ1 = Bodies.circle(410, 115, 15);
    var letterJ2 = Constraint.create({
      pointA: {x: 410, y: 140},
      pointB: {x: 410, y: 210}
    });
    var letterJ3 = Constraint.create({
      pointA: {x: 410, y: 210},
      pointB: {x: 380, y: 240}
    });
    var letterJ4 = Constraint.create({
      pointA: {x: 380, y: 240},
      pointB: {x: 350, y: 210}
    })
    World.add(world, letterJ1);
    World.add(world, letterJ2);
    World.add(world, letterJ3);
    World.add(world, letterJ4);
  }, 25500)

  setTimeout(function() {
    var letterE1 = Constraint.create({
      pointA: {x: 470, y: 200},
      pointB: {x: 540, y: 200}
    })
    var letterE2 = Constraint.create({
      pointA: {x: 470, y: 200},
      pointB: {x: 470, y: 170}
    })
    var letterE3 = Constraint.create({
      pointA: {x: 470, y: 170},
      pointB: {x: 500, y: 140}
    })
    var letterE4 = Constraint.create({
      pointA: {x: 500, y: 140},
      pointB: {x: 530, y: 170}
    })
    var letterE5 = Constraint.create({
      pointA: {x: 530, y: 170},
      pointB: {x: 470, y: 170}
    })
    World.add(world, letterE1);
    World.add(world, letterE2);
    World.add(world, letterE3);
    World.add(world, letterE4);
    World.add(world, letterE5);
  }, 26000)

  setTimeout(function() {
    var letterC1 = Constraint.create({
      pointA: {x: 610, y: 140},
      pointB: {x: 580, y: 170}
    })
    var letterC2 = Constraint.create({
      pointA: {x: 580, y: 170},
      pointB: {x: 610, y: 200}
    })
    World.add(world, letterC1);
    World.add(world, letterC2);
  }, 26500)

  setTimeout(function() {
    var letterT1 = Constraint.create({
      pointA: {x: 640, y: 130},
      pointB: {x: 700, y: 130}
    })
    var letterT2 = Constraint.create({
      pointA: {x: 670, y: 100},
      pointB: {x: 670, y: 200}
    })
    World.add(world, letterT1);
    World.add(world, letterT2);
  }, 27000)

  setTimeout(function() {
    var delta1 = Constraint.create({
      pointA: {x: 300, y: 500},
      pointB: {x: 500, y: 500}
    })
    var delta2 = Constraint.create({
      pointA: {x: 500, y: 500},
      pointB: {x: 400, y: 326.8}
    })
    var delta3 = Constraint.create({
      pointA: {x: 400, y: 326.8},
      pointB: {x: 300, y: 500}
    })
    World.add(world, delta1);
    World.add(world, delta2);
    World.add(world, delta3);
  }, 27500)

  setTimeout(function() {
    World.remove(world, pendulum);
    world.gravity.scale = 0.002;
    var letterP3 = Constraint.create({
      pointA: {x: 90, y: 100},
      pointB: {x: 120, y: 100}
    })
    var letterP4 = Constraint.create({
      pointA: {x: 120, y: 100},
      pointB: {x: 150, y: 130}
    })
    var letterP5 = Constraint.create({
      pointA: {x: 150, y: 130},
      pointB: {x: 120, y: 160}
    })
    var letterP6 = Constraint.create({
      pointA: {x: 120, y: 160},
      pointB: {x: 90, y: 160}
    })
    var letterO1 = Constraint.create({
      pointA: {x: 290, y: 170},
      pointB: {x: 320, y: 140}
    })
    var letterO2 = Constraint.create({
      pointA: {x: 320, y: 140},
      pointB: {x: 350, y: 170}
    })
    var letterO3 = Constraint.create({
      pointA: {x: 350, y: 170},
      pointB: {x: 320, y: 200}
    })
    var letterO4 = Constraint.create({
      pointA: {x: 320, y: 200},
      pointB: {x: 290, y: 170}
    })
    var letterJ5 = Constraint.create({
      pointA: {x: 395, y: 115},
      pointB: {x: 410, y: 100}
    })
    var letterJ6 = Constraint.create({
      pointA: {x: 410, y: 100},
      pointB: {x: 425, y: 115}
    })
    var letterJ7 = Constraint.create({
      pointA: {x: 425, y: 115},
      pointB: {x: 410, y: 130}
    })
    var letterJ8 = Constraint.create({
      pointA: {x: 410, y: 130},
      pointB: {x: 395, y: 115}
    })

    World.add(world, letterP3);
    World.add(world, letterP4);
    World.add(world, letterP5);
    World.add(world, letterP6);
    World.add(world, letterO1);
    World.add(world, letterO2);
    World.add(world, letterO3);
    World.add(world, letterO4);
    World.add(world, letterJ5);
    World.add(world, letterJ6);
    World.add(world, letterJ7);
    World.add(world, letterJ8);
  }, 29000)

  render.mouse = mouse;

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
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
import React, { useState } from 'react';
import Canvas from './drawing/Canvas'
import { gameplay } from './game/play';
import { GameState, Player, GunSight, Bullets, Walls, BouncingSurfaces, Target} from './game/model';
import { Point, Segment, Polyline } from 'geomescript';
import { drawGameplay } from './game/drawing';
import { Camera } from './camera/model';

function App() {
  
  let initialCamera = new Camera(new Point(0, 1000), 1000, 1000)
  let initial_state = new GameState(
    new Player(new Point(500, 350)),
    new GunSight(Polyline.fromPoints([new Point(-100, -100), new Point(0, 0)])),
    new Bullets([]),
    new Walls(([
      // Square
      new Segment(
        new Point(
          100,
          100
        ),
        new Point(
          900,
          100
        ),
      ),
      new Segment(
        new Point(
          100,
          100
        ),
        new Point(
          100,
          900
        ),
      ),
      new Segment(
        new Point(
          100,
          900
        ),
        new Point(
          900,
          900
        ),
      ),
      new Segment(
        new Point(
          900,
          900
        ),
        new Point(
          900,
          100
        ),
      ),
      // First wall
      new Segment(
        new Point(
          100,
          500
        ),
        new Point(
          650,
          500
        ),
      ),
      // G
      new Segment(
        new Point(
          650,
          750
        ),
        new Point(
          650,
          600
        ),
      ),

      // TOP
      new Segment(
        new Point(
          350,
          750
        ),
        new Point(
          650,
          750
        ),
      ),
      // Back
      new Segment(
        new Point(
          350,
          750
        ),
        new Point(
          350,
          600
        ),
      ),



    ]),
    ),
    new BouncingSurfaces([
      // 1st
      new Segment(
        new Point(
          390,
          899
        ),
        new Point(
          440,
          899
        ),
    ),
    // 2nd
    new Segment(
      new Point(
        899,
        588
      ),
      new Point(
        899,
        612
      ),
  ),
    // 3nd
    new Segment(
      new Point(
        101,
        725
      ),
      new Point(
        101,
        675
      ),
  ),
    // 4nd
    new Segment(
      new Point(
        400,
        501
      ),
      new Point(
        440,
        501
      ),
    ),
    // G
    new Segment(
      new Point(
        649,
        660
      ),
      new Point(
        649,
        620
      ),
    ),
    // TOP
    new Segment(
      new Point(
        455,
        749
      ),
      new Point(
        500,
        749
      ),
    ),
      // Back
    new Segment(
      new Point(
        351,
        700
      ),
      new Point(
        351,
        650
      ),
    ),
  ]),
  [new Target(new Point(430, 620))]
)

  let [mouseCoords] = useState({ x: 0, y: 0 });
  let [click] = useState(false);
  let [gameState] = useState(initial_state);
  let [camera] = useState(initialCamera);

  const predraw = (context:any, canvas:any) => {
    context.save()
    //resizeCanvasToDisplaySize(context, canvas)
    const { width, height } = context.canvas
    context.clearRect(0, 0, width, height)
  }


  const postdraw = (ctx:CanvasRenderingContext2D) => {
    ctx.restore()
   }



  const draw = (ctx:CanvasRenderingContext2D, frameCount:number) => {
    predraw(ctx, ctx.canvas)
    
    let new_state = gameplay(gameState, new Point(mouseCoords.x, mouseCoords.y), click)
    click = false
    gameState = new_state
    drawGameplay(gameState, ctx, camera)
    postdraw(ctx)
  }

  function handleCanvasMouseMove(x: any, y: any) {
    let point= camera.fromCanvasCoordinatesToMap(new Point(x, y));
    mouseCoords = { 'x': point.x, 'y':point.y }
  }

  function handleCanvasClick(x: any, y: any) {
    click = true
  }
  
  return <Canvas draw={draw} options={{'context': '2d'}}
          mouseMoveCallback={handleCanvasMouseMove}
          clickCallback={handleCanvasClick}
          />
}


export default App

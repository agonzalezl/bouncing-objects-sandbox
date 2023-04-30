import { GameState, Bullets, Bullet, Walls, BouncingSurfaces, Target} from '../game/model';
import { Point, Vector, Polyline } from 'geomescript';
import { calculateTrajectory } from '../physics/bouncing';


function gameplay(currentState: GameState, mouseCoords: Point, click: boolean) : GameState{
    let player_x = currentState.player.position.x
    let player_y = currentState.player.position.y
  
    // Calculate where we are pointing to
    let gunSightVector = Vector.fromPoints(currentState.player.position, mouseCoords).scaled(1000);
    
    let trajectory = calculateTrajectory(currentState.player.position, gunSightVector, currentState.bouncingSurfaces.surfaces, currentState.walls.wallList, 0)
    currentState.gunSight.line = Polyline.fromPoints([currentState.player.position].concat(trajectory))
    
    if(click){
        const BULLET_SPEED = 20;
        let bullet_vector =  Vector.fromPoints(currentState.player.position, mouseCoords).normalize().scaled(BULLET_SPEED);
        currentState.bullets.bulletList.push(new Bullet(new Point(player_x, player_y), bullet_vector));
    }
    currentState.bullets = moveBullets(currentState.bullets, currentState.walls, currentState.bouncingSurfaces, currentState.targets)
    
    return currentState;
  }
  
  function moveBullets(bullets: Bullets, walls: Walls, bouncingSurface: BouncingSurfaces, targets: Target[] = []): Bullets{
  
    for (let i = 0; i < bullets.bulletList.length; i++) {
      let bullet = bullets.bulletList[i];
      let bulletVector = bullet.vector;

      let trajectory = calculateTrajectory(bullet.position, bulletVector, bouncingSurface.surfaces, walls.wallList, 5)

      if(trajectory.length===0){
        console.log("Empty trajectory")
        bullets.bulletList.splice(i, 1);
        i--;
        continue;
      }

      const [finalPosition, directionVector, numberCheckpoints] = moveThroughCheckpoints(bullet.position, trajectory, bulletVector.magnitude());

      if(directionVector===undefined){
        console.log("Empty direction");
        bullets.bulletList.splice(i, 1);
        i--;
        continue;
      }

      for(let target of targets){
        if(target.position.distanceTo(finalPosition)<10){
          alert("Nice!");
          bullets.bulletList.splice(i, 1);
          i--;
          continue;
        }
      }

      bullet.lives-=numberCheckpoints;
      if (bullet.lives<=0){
        bullets.bulletList.splice(i, 1);
        i--;
        continue;
      }

      bullet.position = finalPosition
      bullet.vector = directionVector.normalize().scaled(bulletVector.magnitude());
      
      bullets.bulletList[i] = bullet;
    }

    return bullets
  }

  function moveThroughCheckpoints(initPosition: Point, checkpoints: Point[], distance:number): [Point, Vector|undefined, number] {
    let numberCheckpoints = 0;
    let distanceLeft = distance;
    let currentPosition = initPosition;
    for(let checkpoint of checkpoints){
      if(distanceLeft===0){
        return [currentPosition, Vector.fromPoints(currentPosition, checkpoint).normalize(), numberCheckpoints];
      }
      if(currentPosition.distanceTo(checkpoint)!==0 && distanceLeft - currentPosition.distanceTo(checkpoint)<0){
        let vector = Vector.fromPoints(currentPosition, checkpoint).normalize();
        return [currentPosition.translate(vector.scaled(distanceLeft)), vector, numberCheckpoints]
      }
      distanceLeft = distanceLeft - currentPosition.distanceTo(checkpoint);
      currentPosition = checkpoint;
      numberCheckpoints++;
    }
    return [currentPosition, undefined, numberCheckpoints];
  }


  export { gameplay, moveBullets, moveThroughCheckpoints };
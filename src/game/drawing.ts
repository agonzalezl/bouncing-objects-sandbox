import {
  Walls,
  Player,
  Bullets,
  GunSight,
  GameState,
  BouncingSurfaces,
  Target,
} from "./model";
import { Camera } from "../camera/model";

function drawWalls(ctx: any, walls: Walls, camera: Camera) {
  walls.wallList.forEach((wall) => {
    camera.drawSegment(ctx, wall, "#000000");
  });
}

function drawPlayer(ctx: any, player: Player, camera: Camera) {
  const PLAYER_SIZE = 20;
  camera.drawCircle(ctx, player.position, PLAYER_SIZE, "#0000FF");
}
function drawBullets(ctx: any, bullets: Bullets, camera: Camera) {
  const BULLET_SIZE = 5;
  bullets.bulletList.forEach((element) => {
    camera.drawCircle(ctx, element.position, BULLET_SIZE, "#000000");
  });
}

function drawGunSight(
  ctx: CanvasRenderingContext2D,
  gunSight: GunSight,
  camera: Camera
) {
  gunSight.line.segments.forEach((segment) => {
    camera.drawSegment(ctx, segment, "#aa0000");
  });
}

function drawBouncingSurfaces(
  ctx: any,
  bouncingSurfaces: BouncingSurfaces,
  camera: Camera
) {
  bouncingSurfaces.surfaces.forEach((surface) => {
    camera.drawSegment(ctx, surface, "#0000FF", 5);
  });
}

function drawTargets(ctx: any, targets: Target[], camera: Camera) {
  const TARGET_SIZE = 10;
  targets.forEach((target) => {
    camera.drawCircle(ctx, target.position, TARGET_SIZE, "#FF0000");
  });
}

function drawGameplay(
  state: GameState,
  ctx: CanvasRenderingContext2D,
  camera: Camera
) {
  drawWalls(ctx, state.walls, camera);
  drawGunSight(ctx, state.gunSight, camera);
  drawPlayer(ctx, state.player, camera);
  drawBullets(ctx, state.bullets, camera);
  drawBouncingSurfaces(ctx, state.bouncingSurfaces, camera);
  drawTargets(ctx, state.targets, camera);
}

export { drawWalls, drawPlayer, drawBullets, drawGunSight, drawGameplay };

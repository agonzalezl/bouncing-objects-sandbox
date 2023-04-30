import { Point, Vector, Polyline, Segment } from "geomescript";

class GameState {
  constructor(
    public player: Player,
    public gunSight: GunSight,
    public bullets: Bullets,
    public walls: Walls,
    public bouncingSurfaces: BouncingSurfaces,
    public targets: Target[]
  ) {}
}

class Player {
  constructor(public position: Point) {}
}

class Bullets {
  constructor(public bulletList: Bullet[]) {}
}

class Bullet {
  constructor(
    public position: Point,
    public vector: Vector,
    public lives: number = 8
  ) {}

  move() {
    this.position = this.position.translate(this.vector);
  }
}

class Walls {
  constructor(public wallList: Segment[]) {}
}

class BouncingSurfaces {
  constructor(public surfaces: Segment[]) {}
}

class GunSight {
  constructor(public line: Polyline) {}
}

class Target {
  constructor(public position: Point) {}
}

export {
  GameState,
  Player,
  Bullets,
  Bullet,
  Walls,
  GunSight,
  BouncingSurfaces,
  Target,
};

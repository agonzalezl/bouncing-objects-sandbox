import { Point, Vector, Segment } from "geomescript";

/**
 * Calculates the trajectory of an object given its position, velocity, and any obstacles or surfaces it may collide with.
 * @param position The object's current position.
 * @param direction The object's current velocity vector.
 * @param obstacles An array of obstacles or surfaces that the object may collide with.
 * @param maxBounces The maximum number of bounces allowed before stopping (for laser case).
 * @returns An array of points representing the object's trajectory.
 */
function calculateTrajectory(
  position: Point,
  direction: Vector,
  bounceableSurfaces: Segment[],
  obstacles: Segment[],
  maxBounces: number = 0,
  lastBounceableSurface?: Segment
): Point[] {
  let segment = Segment.from(position, direction.scaled(10000000));

  // This allows to not detect the same surface as bounceable again.
  const bounceableSurfaceCandidates = bounceableSurfaces.filter(
    (element) => element !== lastBounceableSurface
  );
  let { point: closestBounceable, surface: closestBounceableSurface } =
    getClosestCrossingPoint(segment, bounceableSurfaceCandidates);
  let { point: closestObstacle, surface: _ } = getClosestCrossingPoint(
    segment,
    obstacles
  );

  if (closestObstacle !== undefined) {
    if (
      closestBounceable === undefined ||
      position.distanceTo(closestObstacle) <
        position.distanceTo(closestBounceable)
    ) {
      return [closestObstacle];
    }
  }

  if (closestBounceable !== undefined) {
    if (maxBounces > 0) {
      maxBounces--;
      let bouncingVector = checkCollision(
        position,
        direction,
        closestBounceableSurface!
      );
      if (bouncingVector !== undefined) {
        return [closestBounceable].concat(
          calculateTrajectory(
            closestBounceable,
            bouncingVector,
            bounceableSurfaces,
            obstacles,
            maxBounces,
            closestBounceableSurface
          )
        );
      }
    }
    return [closestBounceable];
  }

  return [];
}

function getClosestCrossingPoint(
  segment: Segment,
  surfaces: Segment[]
): { point: Point | undefined; surface: Segment | undefined } {
  let closestCrossingPoint: Point | undefined;
  let closestSurface: Segment | undefined;

  for (let surface of surfaces) {
    let point = surface.crossingPoint(segment);
    if (point !== undefined) {
      if (
        closestCrossingPoint === undefined ||
        segment.start.distanceTo(point) <
          segment.start.distanceTo(closestCrossingPoint)
      ) {
        closestCrossingPoint = point;
        closestSurface = surface;
      }
    }
  }

  return { point: closestCrossingPoint, surface: closestSurface };
}

/**
 * Checks for collisions between an object and a surface.
 * @param position The object's current position.
 * @param direction The object's current direction vector.
 * @param surface The surface's position, size, and type (bounceable or not).
 * @param maxDistance The maximum distance for the collision check (for bullet case).
 * @returns returns a Vector with the new trajectory or undefined
 */
function checkCollision(
  position: Point,
  direction: Vector,
  surface: Segment
): Vector | undefined {
  // Calculate the normal vector of the surface
  const normal = Vector.fromPoints(surface.start, surface.end).normal();

  // Calculate the new direction vector by reflecting the old direction vector around the normal vector
  const newDirection = direction.reflect(normal);
  return newDirection;
}

export { calculateTrajectory, checkCollision };

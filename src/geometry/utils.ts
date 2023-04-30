import { Point } from "geomescript";

function calculateAngle(point1: Point, point2: Point, point3: Point): number {
  const a = Math.sqrt(
    Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
  );
  const b = Math.sqrt(
    Math.pow(point3.x - point2.x, 2) + Math.pow(point3.y - point2.y, 2)
  );
  const c = Math.sqrt(
    Math.pow(point1.x - point3.x, 2) + Math.pow(point1.y - point3.y, 2)
  );
  const angleInRadians = Math.acos((a * a + b * b - c * c) / (2 * a * b));
  const angleInDegrees = (angleInRadians * 180) / Math.PI;
  return angleInDegrees;
}

function complementAngle(angle: number): number {
  if (angle > 90) {
    return 180 - angle;
  }
  return 180 - angle;
}

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

export { complementAngle, calculateAngle, degreesToRadians, radiansToDegrees };

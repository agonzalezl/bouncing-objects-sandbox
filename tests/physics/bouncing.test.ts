import { Point, Segment, Vector } from "geomescript";
import { checkCollision, calculateTrajectory } from "../../src/physics/bouncing";

describe("checkCollision", () => {

  test.each([
    [new Point(0, 0), new Vector(1, 1), new Segment(new Point(1, 0), new Point(1, 1)), new Point(-1, 1)],
    [new Point(1, 1), new Vector(-1, -1), new Segment(new Point(0, 1), new Point(0, -1)), new Point(1, -1)],
  ])('checkCollision(%i, %i, %i) returns %i', (position, direction, surface, expected_result) => {
    const result = checkCollision(position, direction, surface);
    expect(result).toBeDefined();
    expect(result!.x).toBeCloseTo(expected_result.x);
    expect(result!.y).toBeCloseTo(expected_result.y);
  });

});
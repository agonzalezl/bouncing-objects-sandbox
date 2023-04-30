import { Point, Segment, Vector } from "geomescript";
import { Camera } from "../../src/camera/model";

describe("Coordinates", () => {

  test.each([
    [new Camera(new Point(0, 100), 100, 100), new Point(20, 20), new Point(20, 20)],
    [new Camera(new Point(0, 10), 9, 9), new Point(0, 0), new Point(0, -1)],
    [new Camera(new Point(2, 2), 1, 1), new Point(1, 1), new Point(-1, 0)],

  ])('cameraCoordinates(%i, %i) returns %i', (camera, input, expected_result) => {
    const result = camera.cameraCoordinates(input);
    expect(result!.x).toBeCloseTo(expected_result.x);
    expect(result!.y).toBeCloseTo(expected_result.y);
  });

  test.each([
    [new Camera(new Point(0, 10), 10, 10), new Point(1, 1), new Point(1, 9)],
  ])('transformCoordinates(%i, %i) returns %i', (camera, input, expected_result) => {
    const result = camera.transformCoordinates(input);
    expect(result!.x).toBeCloseTo(expected_result.x);
    expect(result!.y).toBeCloseTo(expected_result.y);
  });


  test.each([
    [new Camera(new Point(0, 10), 10, 10), new Point(1, 9), new Point(1, 1)],
  ])('fromCanvasCoordinatesToMap(%i, %i) returns %i', (camera, input, expected_result) => {
    const result = camera.fromCanvasCoordinatesToMap(input);
    expect(result!.x).toBeCloseTo(expected_result.x);
    expect(result!.y).toBeCloseTo(expected_result.y);
  });



});

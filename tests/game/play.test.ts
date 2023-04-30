import { Point, Vector } from 'geomescript';
import { moveThroughCheckpoints } from "../../src/game/play";

describe('moveThroughCheckpoints', () => {
  const checkpoints = [
    new Point(0, 0),
    new Point(2, 0),
    new Point(2, 2),
    new Point(0, 2),
  ];
  
  it('should return the final position and undefined direction vector if the distance is 0', () => {
    const initPosition = new Point(0, 0);
    const [finalPosition, directionVector] = moveThroughCheckpoints(initPosition, checkpoints, 0);
    expect(finalPosition).toEqual(initPosition);
    expect(directionVector).toEqual(new Vector(NaN, NaN));
  });

  it('should return the final position and undefined direction vector if the checkpoints array is empty', () => {
    const initPosition = new Point(0, 0);
    const [finalPosition, directionVector] = moveThroughCheckpoints(initPosition, [], 10);
    expect(finalPosition).toEqual(initPosition);
    expect(directionVector).toBeUndefined();
  });

  it('should return the last position and undefined direction vector if the distance is greater than the total distance to all checkpoints', () => {
    const initPosition = new Point(0, 0);
    const [finalPosition, directionVector] = moveThroughCheckpoints(initPosition, checkpoints, 10);
    expect(finalPosition).toEqual(new Point(0, 2));
    expect(directionVector).toBeUndefined();
  });

  it('should return the correct final position and direction vector if the distance is less than the total distance to all checkpoints', () => {
    const initPosition = new Point(0, 0);
    const [finalPosition, directionVector] = moveThroughCheckpoints(initPosition, checkpoints, 4);
    expect(finalPosition).toEqual(new Point(2, 2));
    expect(directionVector).toEqual(new Vector(-1, 0));
  });

  it('should return the correct final position and direction vector if the distance is a middle point between checkpoints', () => {
    const initPosition = new Point(0, 0);
    const [finalPosition, directionVector] = moveThroughCheckpoints(initPosition, checkpoints, 5);
    expect(finalPosition).toEqual(new Point(1, 2));
    expect(directionVector).toEqual(new Vector(-1, 0));
  });
});
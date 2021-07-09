import { Vector2 } from "@/components/Vector2";

describe("Vector2", () => {
  it("has a constructor with x and y coordinates", () => {
    const vector = new Vector2(2, 3);
    expect(vector.x).toBe(2);
    expect(vector.y).toBe(3);
  });

  it("can subtract two vectors", () => {
    const diff = new Vector2(3, 2).minus(new Vector2(1, 1));

    expect(diff.x).toBe(2);
    expect(diff.y).toBe(1);
  });

  it("can compute the angle between two vectors", () => {
    expect(Vector2.angleBetween(new Vector2(1, 0), new Vector2(1, 1))).toBe(45);
    expect(Vector2.angleBetween(new Vector2(1, 0), new Vector2(0, 1))).toBe(90);
    expect(Vector2.angleBetween(new Vector2(0, 1), new Vector2(1, 0))).toBe(-90);
    expect(Vector2.angleBetween(new Vector2(-1, 1), new Vector2(-1, -1))).toBe(90);
    expect(Vector2.angleBetween(new Vector2(-1, -1), new Vector2(-1, 1))).toBe(-90);
  });
});

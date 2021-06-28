/**
 * Represents a 2-dimensional vector
 */
export class Vector2 {
  constructor(public x: number, public y: number) {}

  /**
   * Return the difference between this vector and the vector in argument
   */
  minus(v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  /**
   * Return the angle in degres between two vectors.
   * -180 <= diff <= 180
   */
  static angleBetween(u: Vector2, v: Vector2): number {
    const diffInRad = Math.atan2(v.y, v.x) - Math.atan2(u.y, u.x);
    let diffInDeg = diffInRad * (180 / Math.PI);
    if (diffInDeg < -180) diffInDeg += 360;
    if (diffInDeg > 180) diffInDeg -= 360;
    return diffInDeg;
  }
}

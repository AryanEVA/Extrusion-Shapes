import * as THREE from "three";

export class HelperFunction {

    static Side = {
        top: 1,
        left: 2,
        bottom: 3,
        right: 4
    };

  /**
   * Calculates the angle (in degrees) between two lines defined by (p1, p2) and (p3, p4).
   *
   * @param {THREE.Vector2} p1 - The first point of the first line.
   * @param {THREE.Vector2} p2 - The second point of the first line.
   * @param {THREE.Vector2} p3 - The first point of the second line.
   * @param {THREE.Vector2} p4 - The second point of the second line.
   * @returns {number} - The angle between the two lines in degrees (0 to 180).
   */
  static getAngleBetweenLines(p1, p2, p3, p4) {
    let v1 = new THREE.Vector2(p2.x - p1.x, p2.y - p1.y);
    let v2 = new THREE.Vector2(p4.x - p3.x, p4.y - p3.y);

    let dotProduct = v1.dot(v2);
    let magnitude1 = v1.length();
    let magnitude2 = v2.length();

    let angleRad = Math.acos(dotProduct / (magnitude1 * magnitude2));
    let angleDeg = 180 - THREE.MathUtils.radToDeg(angleRad);

    return angleDeg;
  }

  /**
   * Calculates the intersection point of two line segments defined by (p1, p2) and (p3, p4).
   *
   * @param {THREE.Vector2} p1 - first point of the first line segment.
   * @param {THREE.Vector2} p2 - second point of the first line segment.
   * @param {THREE.Vector2} p3 - first point of the second line segment.
   * @param {THREE.Vector2} p4 - second point of the second line segment.
   * @returns {THREE.Vector2 | null} - The intersection point, or null if no intersection.
   */
  static getIntersectionPoint(p1, p2, p3, p4) {
    const denominator =
      (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
    if (denominator === 0) {
      return null;
    }

    const interSectX =
      ((p1.x * p2.y - p1.y * p2.x) * (p3.x - p4.x) -
        (p1.x - p2.x) * (p3.x * p4.y - p3.y * p4.x)) /
      denominator;
    const interSectY =
      ((p1.x * p2.y - p1.y * p2.x) * (p3.y - p4.y) -
        (p1.y - p2.y) * (p3.x * p4.y - p3.y * p4.x)) /
      denominator;
    const intPointXY = new THREE.Vector2(interSectX, interSectY);

    // Function to check if a point is within a segment
    const isWithinSegment = (point, a, b) =>
      Math.min(a, b) <= point && point <= Math.max(a, b);

    // Check if the intersection point lies within both segments
    if (
      isWithinSegment(intPointXY.x, p1.x, p2.x) &&
      isWithinSegment(intPointXY.y, p1.y, p2.y) &&
      isWithinSegment(intPointXY.x, p3.x, p4.x) &&
      isWithinSegment(intPointXY.y, p3.y, p4.y)
    ) {
      return intPointXY;
    }

    return p2;
  }

  /**
   * Calculates the perpendicular height of a right-angled triangle given the base and angle.
   *
   * @param {number} base - The length of the base.
   * @param {number} angleDeg - The angle (in degrees) between the base and the hypotenuse.
   * @returns {number} - The perpendicular height.
   */
    static getPerpendicularHeight(base, angleDeg) {
    const angleRad = THREE.MathUtils.degToRad(angleDeg); 
    return base * Math.tan(angleRad);
  }
}

function pointInsideRectangle(x1, y1, x2, y2, x, y) {
  if (x > x1 && x < x2 && y > y1 && y < y2) return true;
  return false;
}

export default pointInsideRectangle;

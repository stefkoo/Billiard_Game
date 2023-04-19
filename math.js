// addition of two vectors
export function add(v, w) {
    return { x: v.x + w.x, y: v.y + w.y };
}

// subtraction of two vectors
export function sub(v, w) {
    return { x: v.x - w.x, y: v.y - w.y };
}

// scale a vector
export function scale(r, v) {
    return { x: r * v.x, y: r * v.y };
}

// norm of a vector
export function norm(v) {
    return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
}

// distance between two points
export function distance(p, q) {
    return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
}

// normalization of a vector
export function normalize(v) {
    if (v.x == 0 && v.y == 0) return v;
    return scale(1 / norm(v), v);
}

// limit the norm of a vector
export function limit(s, v) {
    const n = norm(v);
    if (n <= s) return v;
    return scale(s / n, v);
}

// dot product of two vectors
export function dotProduct(v, w) {
    return v.x * w.x + v.y * w.y;
}

// calculate the angle between two vectors
export function angleBetween(v, w) {
    return Math.acos(dotProduct(v, w) / (norm(v) * norm(w)));
}

// rotate a vector around some angle
export function rotate(angle, v) {
    return {
        x: v.x * Math.cos(angle) - v.y * Math.sin(angle),
        y: v.x * Math.sin(angle) + v.y * Math.cos(angle),
    };
}

// solves a quadratic equation ut^2 + vt + w = 0
function solveRealQuadratic(u, v, w) {
    const discriminant = v * v - 4 * u * w;
    if (discriminant < 0) return [];
    const root = Math.sqrt(discriminant);
    return [(-v + root) / (2 * u), (-v - root) / (2 * u)];
}

// tests if a segment intersects a circle
export function segmentIntersectsCircle(segment, circle) {
    const [a, b] = segment;
    const [c, r] = circle;
    const u = Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2);
    const v =
        2 * ((a.x - c.x) * (b.x - a.x) + (a.y - c.y) * (b.y - a.y));
    const w =
        Math.pow(a.x - c.x, 2) +
        Math.pow(a.y - c.y, 2) -
        Math.pow(r, 2);
    const solutions = solveRealQuadratic(u, v, w);
    return (
        solutions.length > 0 &&
        solutions.some((t) => t >= 0 && t <= 1)
    );
}
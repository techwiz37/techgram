export function constructMaskPosition({ n, x, y, zoom }) {
    return {
        point: n === 0 ? "forehead" : n === 1 ? "eyes" : n === 2 ? "mouth" : "chin",
        xShift: x,
        yShift: y,
        scale: zoom,
    };
}

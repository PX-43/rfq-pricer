
const tenorsMap = new Map([
    ['1M', { spread:3 }],
    ['2M', { spread:12 }],
    ['3M', { spread:24 }],
    ['6M', { spread:45 }],
    ['9M', { spread:76 }],
    ['1Y', { spread:112 }],
]);

export const tenors = () => Array.from(tenorsMap.keys());
export const getSpread = tenor => tenorsMap.has(tenor) ? tenorsMap.get(tenor).spread : 1.0;
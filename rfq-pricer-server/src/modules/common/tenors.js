
const tenorsMap = new Map([
    ['1M', { spread:0.3 }],
    ['3M', { spread:0.8 }],
    ['6M', { spread:1.6 }],
    ['9M', { spread:3.4 }],
    ['1Y', { spread:6.8 }],
]);

export const tenors = () => Array.from(tenorsMap.keys());
export const getSpread = tenor => tenorsMap.has(tenor) ? tenorsMap.get(tenor).spread : 1.0;
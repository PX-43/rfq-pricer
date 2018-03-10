import * as ccys from "./ccys";

const ccyRatesMap = new Map([
    [ccys.AUDUSD, 1.28801],
    [ccys.EURUSD, 1.23166],
    [ccys.GBPUSD, 1.38007],
    [ccys.USDCAD, 1.28794],
    [ccys.USDCHF, 0.93730],
    [ccys.USDJPY, 105.746]
]);

export const getSpotRate = ccy => ccyRatesMap.has(ccy) ? ccyRatesMap.get(ccy) : 1.0;
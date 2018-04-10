import SpotRenderer from './renderers/SpotRenderer';
import FwdPointsRenderer from './renderers/FwdPointsRenderer';
import AmountRenderer from './renderers/AmountRenderer';
import FwdPriceRenderer from './renderers/FwdPriceRenderer';
import MidPriceRenderer from './renderers/MidPriceRenderer';
import ValueDateRenderer from './renderers/ValueDateRenderer';

export default [
  {
    headerName: "CCY1 CCY2",
    field: "ccyPair",
    cellRenderer: "agGroupCellRenderer",
    width: 290
  },
  {
    headerName: "Product",
    field: "legType",
    width: 170
  },
  {
    headerName: "Side",
    field: "side",
    width: 150
  },
  {
    headerName: "Amount",
    field: "amount",
    width: 200,
    cellStyle: {'text-align': 'right'},
    cellRendererFramework: AmountRenderer
  },
  {
    headerName: "Value Date",
    field: "valueDate",
    width: 220,
    cellRendererFramework: ValueDateRenderer
  },
  {
    headerName: "Fund",
    field: "fund",
    width: 220
  },
  {
    headerName: "Stamm",
    field: "stamm"
  },
  {
    headerName: "Spot Pirce",
    field: "spot",
    cellStyle: {'text-align': 'right'},
    cellRendererFramework: SpotRenderer
  },
  {
    headerName: "Fwd Pts",
    field: "fwdPoints",
    width: 170,
    cellStyle: {'text-align': 'right'},
    cellRendererFramework: FwdPointsRenderer
  },
  {
    headerName: "Fwd Price",
    field: "fwdPrice",
    cellStyle: {'text-align': 'right'},
    cellRendererFramework: FwdPriceRenderer
  },
  {
    headerName: "Mid Price",
    field: "midPrice",
    cellStyle: {'text-align': 'right'},
    cellRendererFramework: MidPriceRenderer
  },
];

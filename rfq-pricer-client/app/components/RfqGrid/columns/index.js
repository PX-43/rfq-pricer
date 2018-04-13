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
    width: 150
  },
  {
    headerName: "Product",
    field: "legType",
    width: 70
  },
  {
    headerName: "Side",
    field: "side",
    width: 50
  },
  {
    headerName: "Amount",
    field: "amount",
    width: 80,
    cellStyle: {'text-align': 'right'},
    cellRendererFramework: AmountRenderer
  },
  {
    headerName: "Value Date",
    field: "valueDate",
    width: 100,
    cellRendererFramework: ValueDateRenderer
  },
  {
    headerName: "Fund",
    field: "fund",
    width: 120
  },
  {
    headerName: "Stamm",
    field: "stamm",
    width: 100
  },
  {
    headerName: "Spot",
    field: "spot",
    cellStyle: {'text-align': 'right'},
    cellRendererFramework: SpotRenderer,
    width: 60
  },
  {
    headerName: "Fwd Pts",
    field: "fwdPoints",
    width: 80,
    cellStyle: {'text-align': 'right'},
    cellRendererFramework: FwdPointsRenderer
  },
  {
    headerName: "Fwd Price",
    field: "fwdPrice",
    cellStyle: {'text-align': 'right'},
    width: 90,
    cellRendererFramework: FwdPriceRenderer
  },
  {
    headerName: "Mid Price",
    field: "midPrice",
    cellStyle: {'text-align': 'right'},
    width: 90,
    cellRendererFramework: MidPriceRenderer
  },
];

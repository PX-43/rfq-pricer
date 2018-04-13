import SpotRenderer from './renderers/SpotRenderer';
import FwdPointsRenderer from './renderers/FwdPointsRenderer';
import AmountRenderer from './renderers/AmountRenderer';
import FwdPriceRenderer from './renderers/FwdPriceRenderer';
import MidPriceRenderer from './renderers/MidPriceRenderer';
import ValueDateRenderer from './renderers/ValueDateRenderer';
import {products} from '../../../constants';

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
    width: 68,
    cellStyle: {'text-align': 'right'},
    cellRendererFramework: SpotRenderer,
    cellClassRules: {
      'editable-cell-style' : params => params.node.level === 0
    }
  },
  {
    headerName: "Fwd Pts",
    field: "fwdPoints",
    width: 68,
    cellRendererFramework: FwdPointsRenderer,
    cellClassRules: {
      'editable-cell-style' : params => params.node.level === 1 && params.data.legType !== products.SPOT
    }
  },
  {
    headerName: "Fwd Price",
    field: "fwdPrice",
    cellStyle: {'text-align': 'right'},
    width: 80,
    cellRendererFramework: FwdPriceRenderer
  },
  {
    headerName: "Mid Price",
    field: "midPrice",
    cellStyle: {'text-align': 'right'},
    width: 80,
    cellRendererFramework: MidPriceRenderer
  },
];

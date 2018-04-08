import SpotCellRenderer from './renderers/SpotCellRenderer';
import FwdPointsCellRenderer from './renderers/FwdPointsCellRenderer';
import AmountRenderer from './renderers/AmountRenderer';
import FwdPriceRenderer from './renderers/FwdPriceRenderer';


const columns = [
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
    width: 250
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
    cellRendererFramework: SpotCellRenderer
  },
  {
    headerName: "Fwd Pts",
    field: "fwdPoints",
    width: 170,
    cellRendererFramework: FwdPointsCellRenderer
  },
  {
    headerName: "Fwd Price",
    field: "fwdPrice",
    cellRendererFramework: FwdPriceRenderer
  },
  {
    headerName: "Mid Price",
    field: "midPrice"
  },
];


export default columns;

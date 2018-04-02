import SpotCellRenderer from './renderers/SpotCellRenderer';
import FwdPointsCellRenderer from './renderers/FwdPointsCellRenderer';


const columns = [
  {
    headerName: "CCY1 CCY2",
    field: "ccyPair",
    cellRenderer: "agGroupCellRenderer",
    width: 290
  },
  {
    headerName: "Product",
    field: "product",
    width: 170
  },
  {
    headerName: "Side",
    field: "side",
    width: 130
  },
  {
    headerName: "Order Amount",
    field: "amount",
    width: 250
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
    headerName: "Fws Pts",
    field: "fwdPoints",
    width: 170,
    cellRendererFramework: FwdPointsCellRenderer
  },
  {
    headerName: "Fws Price",
    field: "fwdPrice"
  },
  {
    headerName: "Mid Price",
    field: "midPrice"
  },
];


export default columns;

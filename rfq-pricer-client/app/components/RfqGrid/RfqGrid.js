import React, {PureComponent}  from 'react';
import { AgGridReact } from "ag-grid-react";
import columns from './columns';
import { rfqPricerFlowActions as actions } from "../../modules/actions";
import { viewConstants as vc } from "../../constants";
import sumBy from 'lodash/sumBy';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham-dark.css';
import './RfqGrid.less';

class RfqGrid extends PureComponent {

  constructor(props){
    super(props);
    this.onGridReady = this.onGridReady.bind(this);
    this.gridRef = React.createRef();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.addEventListener(actions.types.ON_FWD_POINTS_CHANGED, this.props.onFwdPointsChanged);
    this.gridApi.addEventListener(actions.types.ON_SPOT_CHANGED, this.props.onSpotChanged);
    this.columnApi = params.columnApi; //todo: check if we need this
    this.gridApi.sizeColumnsToFit(); //todo: check if we need this
    this.gridApi.setFocusedCell(0, vc.SPOT_GRID_COLUMN);

    //this allows us to handle the enter keypress event on the grid
    this.gridRef.current.eGridDiv.addEventListener(vc.EVENTS.KEY_PRESS, this.onGridKeypress, false);
  }

  onGridKeypress = evt =>{
    //handle keypress event on the grid
    if(evt.key === vc.KEYS.ENTER){
      const el = evt.target.querySelector('input[type=text]');

      if(el){
        el.focus();
        const columnId = this.gridApi.getFocusedCell().column.colId;
        const selectionStart = columnId === vc.SPOT_GRID_COLUMN ? el.value.length-2 : 0;
        el.setSelectionRange(selectionStart, el.value.length);
      }
    }
  };

  componentDidUpdate() {
    // this is required because after updating a value in the grid, the grid loses its focus
    //so re-focus the last edited cell
    if(this.gridRef.current){
      let el = this.gridRef.current.eGridDiv.querySelector(vc.FOCUSED_CELL_CLASSES);
      if(el)
        el.focus();
    }
  }

  componentWillUnmount(){
    this.gridApi.removeEventListener(actions.types.ON_FWD_POINTS_CHANGED, this.props.onFwdPointsChanged);
    this.gridApi.removeEventListener(actions.types.ON_SPOT_CHANGED, this.props.onSpotChanged);
    this.gridRef.current.eGridDiv.removeEventListener(vc.EVENTS.KEY_PRESS, this.onGridKeypress);
  };

  static getNodeChildDetails(rowItem) {
    if (rowItem.valueDateNodes) {
      return {
        group: true,
        expanded: true,
        children: rowItem.valueDateNodes,
        key: rowItem.ccyPair,
      };
    }else if (rowItem.legs) {
      return {
        group: true,
        expanded: false,
        children: rowItem.legs,
        key: rowItem.ccyPair
      };
    } else {
      return null;
    }
  }

  calculateHeight = (data) => {
    if(!data || data.length === 0)
      return vc.RFQ_GRID_MIN_HEIGHT + 'px';

    const count = data.length + sumBy(data, item => item.valueDateNodes.length);
    const height = vc.RFQ_GRID_ROW_HEIGHT + (count * vc.RFQ_GRID_ROW_HEIGHT);

    return (height < vc.RFQ_GRID_MIN_HEIGHT  ? vc.RFQ_GRID_MIN_HEIGHT  : height) + 'px';
  };

  render(){
    const height = this.calculateHeight(this.props.rfqData);
    console.log('rendering RfqGrid');
    return(
      <div className='rfq-grid ag-theme-balham-dark' style={{height:height}}>
        <AgGridReact
          key='uniqueKey-ag-grid1'
          ref={this.gridRef}
          // properties
          columnDefs={columns}
          rowData={this.props.rfqData}

          //tree
          getNodeChildDetails={RfqGrid.getNodeChildDetails}

          // events
          onGridReady={this.onGridReady}>
        </AgGridReact>
      </div>
    );
  }
}

export default RfqGrid;


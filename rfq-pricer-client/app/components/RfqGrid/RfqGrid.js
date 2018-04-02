import React, {PureComponent}  from 'react';
import {AgGridReact} from "ag-grid-react";
import columns, { dummyData } from './columns';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham-dark.css';
import './RfqGrid.less';

class RfqGrid extends PureComponent {

  constructor(props){
    super(props);

    /*this.state = {
      rowData:dummyData
    }*/
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  static getNodeChildDetails(rowItem) {
    if (rowItem.details) {
      return {
        group: true,
        expanded: true,
        children: rowItem.details,
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

  render(){
    return(
      <div className='rfq-grid ag-theme-balham-dark'>
        <AgGridReact
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


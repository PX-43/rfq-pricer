import React from 'react';
import { arrayUtils } from '../../utils';
import { viewConstants } from "../../constants";


const getCcyPairs = props => {
  const allCcyArrs = arrayUtils.divideAt(viewConstants.MAX_CCYS_ON_RFQ_SUMMARY, props.currencies);
  const hiddenCcyArr = allCcyArrs[1];
  let ccysToShow = allCcyArrs[0].map(ccyPair => {
    return <div className='currency'
                key={ccyPair}>{ccyPair}</div>;
  });

  if(hiddenCcyArr.length > 0){
    ccysToShow.push(
      <div className='currency'
           title={hiddenCcyArr.join(', ')}
           key={hiddenCcyArr[0]}>+{hiddenCcyArr.length}</div>
    );
  }

  return ccysToShow;
};

const CcyList = props => {
  return (
      <div className='currencyList'>{getCcyPairs(props)}</div>
  );
};

export default CcyList;

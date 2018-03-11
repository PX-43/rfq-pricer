import {guid} from '../utils/guid'
import _ from 'lodash';
import moment from 'moment';
import {CCY_PAIRS} from "../common/ccys";

const TENORS = ['1M', '3M', '6M', '9M', '12Y'];
const STAMM = ['0201-TA253145', '0202-TM549855', '0204-UA746546', '0205-MT187644', '0401-GA653444', '0501-TC5455445'];
const CLIENTS = ['International Fund AG', 'Green Pension Fund', 'Perpetual Equity LTD'];
const DEFAULT_DATE_FORMAT = 'DD-MMM-YYYY';
const FUND_PREFIX = 'BA-';
const RFQ_TYPES = ['Allocation', 'Portfolio'];

export const getUniqueId = () => guid().generate();
export const PRODUCT_FWD = 'Fwd';
export const PRODUCT_SPOT = 'Spot';
export const SIDE_BUY = 'BUY';
export const SIDE_SELL = 'SELL';
export const getLegType = (excluded = []) => _.sample(_.difference([PRODUCT_FWD, PRODUCT_SPOT], excluded));
export const getSide = () => _.sample([SIDE_BUY, SIDE_SELL]);
export const getCcyPair = (excluded = []) => _.sample(_.difference(CCY_PAIRS, excluded));
export const getDealCcy = ccyPair => _.sample(ccyPair.split(' '));
export const getAmount = () => _.random(1, 100) * 1000000;
export const getStamm = () => _.sample(STAMM);
export const getFund = stemm => FUND_PREFIX + stemm;
export const getTenor = (excluded = []) => _.sample(_.difference(TENORS, excluded));
export const getSpotValueDate = () => moment().add(2, 'd').format(DEFAULT_DATE_FORMAT);
export const getFwdValueDate = tenor => moment().add(Number.parseInt(tenor), tenor.slice(-1)).format(DEFAULT_DATE_FORMAT);
export const getClient = () => _.sample(CLIENTS);
export const getRfqType = () => _.sample(RFQ_TYPES);
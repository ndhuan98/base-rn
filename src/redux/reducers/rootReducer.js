import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import InvoiceReducer from './InvoiceReducer';
import EinvoiceReducer from './EinvoiceReducer';
import EinvoiceMTTReducer from './EinvoiceMTTReducer';


const rootReducer = combineReducers({
  UserReducer,
  InvoiceReducer,
  EinvoiceReducer,
  EinvoiceMTTReducer
});

export default rootReducer;

import * as constAction from "../consts/index";


const initialState = {
  fetching: false,
  error: null,
  payments: [],
  paymentCal: {
    labels: [],
    datasets: [{ data: [] }],
  }
};
const miniMoneyFormat = (n) => {
  return (n / 1000000).toFixed(1)
}

const paymentReducers = (state = initialState, action) => {

  switch (action.type) {

    case constAction.API_PAYMENT_REQUEST:
      return { ...state, fetching: true, error: null };

    case constAction.API_PAYMENT_SUCCESS:


      const groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          rv[x[key]] = rv[x[key]] || { paidamt: 0, case: 0 };
          rv[x[key]] = {
            ...rv[x[key]],
            paidamt: rv[x[key]].paidamt + x.receipt_amt,
            case: rv[x[key]].case + 1,
          };
          return rv;
        }, {});
      };
      const groupByArray = (xs, key) => {
        const groupJson = groupBy(xs, key)
        const groupArray = []
        for (const [key, value] of Object.entries(groupJson)) {
          groupArray.push({ ...value, key: key.substring(8, 10) })
        }
        return groupArray.reverse();
      }

      const pmGr = groupByArray(action.content, 'rundate')


      var today = new Date()
      var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
      var labels = []
      var datasets = []
      var filter
      for (let i = today.getDate() > 10 ? today.getDate() - 10 : 0; i < today.getDate(); i++) {

        filter = pmGr.filter(item => item.key === String(i).padStart(2, '0'))
        labels.push(String(i + 1).padStart(2, '0'))
        if (filter.length > 0)
          datasets.push(miniMoneyFormat(filter[0].paidamt))
        else datasets.push(0)
      }

      state = {
        ...state,
        fetching: false,
        payments: action.content,
        error: null,
        paymentCal: {
          labels: labels,
          datasets: [{ data: datasets }],
        },
      }

      return state;

    case constAction.API_PAYMENT_FAILURE:
      state = { ...state, fetching: false, error: action.error }
      return state;



    default:
      return state;
  }
};


export default paymentReducers;
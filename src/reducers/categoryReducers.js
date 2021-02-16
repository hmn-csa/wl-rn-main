import * as constAction from "../consts/index";


const initialState = {
  categoryProduct: [],
  categoryBinscore: [],
  categoryClassify: [],
}

const categoryReducers = (state = initialState, action) => {

  switch (action.type) {
    // get data 
    case constAction.CAL_CATE_DASH:

      let appls = Object.values(action.data)

      const groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          rv[x[key]] = rv[x[key]] || { paidamt: 0, visited: 0, case: 0, paidcase: 0, applIds: [] };
          rv[x[key]] = {
            ...rv[x[key]],
            paidamt: rv[x[key]].paidamt + x.total_pay_amount,
            paidcase: rv[x[key]].paidcase + x.full_paid,
            case: rv[x[key]].case + 1,
            visited: rv[x[key]].visited + x.followed,
            applIds: rv[x[key]].applIds.concat([{ appl_id: x.appl_id, cust_name: x.cust_name }])
          };
          return rv;
        }, {});
      };
      // Groupby return array before Object
      const groupByArray = (xs, key) => {
        const groupJson = groupBy(xs, key)
        const groupArray = []
        for (const [key, value] of Object.entries(groupJson)) {
          groupArray.push({ ...value, key: key })
        }
        return groupArray;
      }

      // ======== todos ==========
      state = {
        ...state,
        categoryProduct: groupByArray(appls, 'product_group'),
        categoryBinscore: groupByArray(appls, 'bin_value'),
        categoryClassify: groupByArray(appls, 'classify_case'),
      }
      return state;

    default:
      return state;

  }
};


export default categoryReducers;
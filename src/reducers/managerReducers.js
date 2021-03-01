import * as constAction from "../consts/index";


const initialState = {
  data: [],
  status: [],
  last_uptrail: null,
  last_checkin: null,
  data_done: false,
  pullcnt: 0
}

const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    rv[x[key]] = rv[x[key]] || { paidamt: 0, visited: 0, case: 0, paidcase: 0, todayamt: 0, todaycase: 0 };
    rv[x[key]] = {
      ...rv[x[key]],
      paidamt: rv[x[key]].paidamt + x.total_pay_amount,
      paidcase: rv[x[key]].paidcase + (x.total_pay_amount > 0),
      todayamt: rv[x[key]].todayamt + x.paid_today_amt,
      todaycase: rv[x[key]].todaycase + (x.paid_today_amt > 0),
      // case:rv[x[key]].case+1,
      visited: rv[x[key]].visited + !(!x.last_action_code),
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


const managerReducers = (state = initialState, action) => {

  switch (action.type) {
    case constAction.COUNT_MANAGER_PULL:
      return {
        ...state, pullcnt: state.pullcnt + 1,
        //last_uptrail: state.last_uptrail, last_checkin: state.last_checkin
      }

    case constAction.SET_MANAGER_DASH:

      let rootInfo = Object.values(action.data.info);
      state = { ...state, status: rootInfo }
      return state;
    // get data 

    case constAction.UPDATE_MANAGER_DASH:
      let updateInfos = Object.values(action.data.info)
      let updateData = Object.values(action.data.data)
      let oldStatus = [...state.status]
      let oldData = [...state.data]
      let oldlast_uptrail = state.last_uptrail
      let oldlast_checkin = state.last_checkin

      // update Checkin - uptrails
      for (let j = 0; j < updateInfos.length; j++) {
        // let item = infos[j]
        let index = oldStatus.findIndex(p => p.staff_id == updateInfos[j].staff_id)
        if (index === -1) continue

        let newCheckin = [...updateInfos[j].checkin, ...oldStatus[index].checkin]
        let newUptrail = [...updateInfos[j].uptrail, ...oldStatus[index].uptrail]

        oldStatus[index] = {
          ...oldStatus[index],
          checkin: newCheckin,
          uptrail: newUptrail
        }

        if (updateInfos[j].uptrail.length > 0) {
          if (oldlast_uptrail === null)
            oldlast_uptrail = updateInfos[j].uptrail[0].runtime
          else if (Date.parse(updateInfos[j].uptrail[0].runtime) > Date.parse(oldlast_uptrail))
            oldlast_uptrail = updateInfos[j].uptrail[0].runtime
        }

        if (updateInfos[j].checkin.length > 0) {
          if (oldlast_checkin === null)
            oldlast_checkin = updateInfos[j].checkin[0].runtime
          else if (Date.parse(updateInfos[j].checkin[0].runtime) > Date.parse(oldlast_checkin))
            oldlast_checkin = updateInfos[j].checkin[0].runtime
        }

      }

      // update data:
      let addData = []
      for (let i = 0; i < updateData.length; i++) {
        updateData[i]
        let indexD = oldData.findIndex(p => p.staff_id == updateData[i].appl_id)
        if (indexD !== -1) {
          // update 
          oldData[indexD] = {
            ...oldData[indexD],
            ...updateData[i]
          }
        } else // add
          addData.push(updateData[i])
      }
      oldData = [...oldData, ...addData]


      return state = {
        ...state,
        status: oldStatus,
        data: oldData,
        last_uptrail: oldlast_uptrail,
        last_checkin: oldlast_checkin
      };


    case constAction.CAL_MANAGER_DASH:

      let appls = Object.values(action.data.data)
      let last_uptrail = state.last_uptrail
      let last_checkin = state.last_checkin

      let staffData = groupBy(appls, 'staff_id');
      const newState = []

      for (let i = 0; i < state.status.length; i++) {
        let item = state.status[i]
        newState.push({ ...item, content: staffData[item.staff_id] })
      }

      let infos = Object.values(action.data.info)
      for (let j = 0; j < infos.length; j++) {
        // let item = infos[j]
        let index = newState.findIndex(p => p.staff_id == infos[j].staff_id)

        newState[index] = {
          ...newState[index],
          checkin: infos[j].checkin,
          uptrail: infos[j].uptrail
        }
        // set last: 
        if (infos[j].uptrail.length > 0) {
          if (last_uptrail === null)
            last_uptrail = infos[j].uptrail[0].runtime
          else if (Date.parse(infos[j].uptrail[0].runtime) > Date.parse(last_uptrail))
            last_uptrail = infos[j].uptrail[0].runtime
        }

        if (infos[j].checkin.length > 0) {
          if (last_checkin === null)
            last_checkin = infos[j].checkin[0].runtime
          else if (Date.parse(infos[j].checkin[0].runtime) > Date.parse(last_checkin))
            last_checkin = infos[j].checkin[0].runtime
        }
      }

      state = {
        ...state,
        status: newState,
        data: appls,
        last_uptrail: last_uptrail,
        last_checkin: last_checkin,
        pullcnt: state.pullcnt + 1,
        data_done: true
      }
      return state;

    default:
      return state;

  }
};


export default managerReducers;
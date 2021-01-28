import * as constAction from "../consts/index";


const initialState = {
  totalCase: {
    case: 0,
    applIds: []
  },
  paidAll: {
    value: 0,
    applIds: []
  },
  paidMtd: {
    case: 0,
    value: 0,
    applIds: []
  },
  ptpCase: {
    case: 0,
    applIds: []
  },
  paidToday: {
    case: 0,
    value: 0,
    applIds: []
  },
  followed: {
    case: 0,
    applIds: []
  },
}

const totalReducers = (state = initialState, action) => {

  switch (action.type) {
    // get data 
    case constAction.CAL_TODO_DASH:
      let appls = Object.values(action.data)
      let totalCase = appls.length
      // ======== todos ==========

      let initPaidMtd = appls.filter((appl) => {
        return parseFloat(appl.total_pay_amount) > 0
      })

      let initFollowedAppls = appls.filter((appl) => {
        return appl.followed == 1
      })

      let paidMtdValue = initPaidMtd.map(function (appl) {
        return appl.total_pay_amount
      }).reduce(function (sum, pay) {
        return sum = sum + pay;
      }, 0)

      let initPaidTodayAppls = appls.filter((appl) => {
        return appl.paid_today_amt > 0
      })
      let paidTodayValue = initPaidTodayAppls.map((appl) => {
        return appl.paid_today_amt
      }).reduce(function (sum, pay) {
        return sum = sum + pay;
      }, 0);

      // ptp_lag
      let initPtp = appls.filter((appl) => {
        return appl.last_action_code === 'PTP'
      })
      state = {
        ...state,
        totalCase: {
          case: totalCase,
          applIds: appls//.map(appl => appl.appl_id)
        },
        paidAll: {
          value: initPaidMtd.length,
          applIds: initPaidMtd//.map(appl => appl.appl_id)
        },
        paidMtd: {
          case: initPaidMtd.length,
          value: paidMtdValue,
          applIds: initPaidMtd//.map(appl => appl.appl_id)
        },
        ptpCase: {
          case: initPtp.length,
          applIds: initPtp//.map(appl => appl.appl_id)
        },
        paidToday: {
          case: initPaidTodayAppls.length,
          value: paidTodayValue,
          applIds: initPaidTodayAppls//.map(appl => appl.appl_id)
        },
        followed: {
          case: initFollowedAppls.length,
          applIds: initFollowedAppls//.map(appl => appl.appl_id)
        },
      }
      return state;

    default:
      return state;

  }
};


export default totalReducers;
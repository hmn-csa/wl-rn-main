import { startClock } from "react-native-reanimated";
import * as constAction from "../consts/index";


const initialTotal = {
  totalCase: {
    case: 0,
    value: 0,
    applIds: [],
    pos: 1
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
  followedToday: {
    case: 0,
    applIds: []
  },
  revisit: {
    case: 0,
    applIds: []
  },
  Bptp: {
    case: 0,
    applIds: []
  },
}
const initialTodo = {
  todoCase: {
    case: 0,
    applIds: [],
    value: 0,
    pos: 1
  },
  todoFollowed: {
    case: 0,
    applIds: []
  },
  todoFollowedToday: {
    case: 0,
    applIds: []
  },
  todoPaid: {
    case: 0,
    value: 0,
    applIds: []
  },
  todoPaidToday: {
    case: 0,
    value: 0,
    applIds: []
  },
  todoPtp: {
    case: 0,
    applIds: []
  },
  todoBptp: {
    case: 0,
    applIds: []
  },
  todoRevisit: {
    case: 0,
    applIds: []
  },
}

const initialTree = [
  {
    id: 'Total',
    name: 'Total',
    case: 0,
    share: 100,
    applIds: [],
  },
  {
    id: 'Not Followed',
    name: 'Not Followed',
    case: 0,
    share: 0,
    applIds: [],
    children: [
      {
        id: 'Paid',
        name: 'Paid',
        case: 0,
        share: 0,
        applIds: [],
      },
      {
        id: 'Not Paid',
        name: 'Not Paid',
        case: 0,
        share: 0,
        applIds: [],
      },
    ],
  },
  {
    id: 'Followed',
    name: 'Followed',
    case: 0,
    share: 0,
    applIds: [],
    children: [
      {
        id: 'Paid',
        name: 'Paid',
        case: 0,
        Paid: 0,
        applIds: [],
      },
      {
        id: 'Not Paid',
        name: 'Not Paid',
        case: 0,
        share: 0,
        applIds: [],
        children: [
          {
            id: 'Meet',
            name: 'Meet',
            case: 0,
            share: 0,
            applIds: [],
            children: [
              {
                id: 'PTP',
                name: 'PTP',
                case: 0,
                share: 0,
                applIds: [],
              },
              {
                id: 'DIF Finance',
                name: 'DIF Finance',
                case: 0,
                share: 0,
                applIds: [],
              },
              {
                id: 'RTP',
                name: 'RTP',
                case: 0,
                share: 0,
                applIds: [],
              },
            ]
          },
          {
            id: 'Not Meet',
            name: 'Not Meet',
            case: 0,
            share: 0,
            applIds: [],
            children: [
              {
                id: 'Found House',
                name: 'Found House',
                case: 0,
                share: 0,
                applIds: [],
              },
              {
                id: 'Not Found House',
                name: 'Not Found House',
                case: 0,
                share: 0,
                applIds: [],
              },
            ]
          },
        ]
      },
    ],
  },
]

const initialState = {
  fetching: false,
  data: null,
  error: null,
  todoError: null,
  totalCal: initialTotal,
  todoCal: initialTodo,
  treeCal: initialTree,
  categoryProduct: [],
  categoryBinscore: [],
  categoryClassify: [],
};

const dataReducers = (state = initialState, action) => {

  switch (action.type) {
    // get data 
    case constAction.DATA_CLEAR:
      return initialState;

    case constAction.API_DATA_REQUEST:
      return { ...state, fetching: true, error: null };

    case constAction.API_DATA_SUCCESS:
      return { ...state, fetching: false, data: action.content };

    case constAction.API_DATA_FAILURE:
      return {
        ...state,
        fetching: false,
        data: action.content,
        error: action.error
      };

    // Change todo 
    case constAction.CHANGE_TODO:
      state.data[action.content.appl_id] = { ...state.data[action.content.appl_id], todo_flag: action.content.todo_flag }
      return state

    case constAction.API_TODO_FAILURE:
      return { ...state, todoError: action.content }

    case constAction.CHANGE_FOLLOW:
      if (action.content.code != 'PTP') {
        state.data[action.content.appl_id] = {
          ...state.data[action.content.appl_id],
          followed: 1,
          last_action_code: action.content.code,
        }
      } else {
        state.data[action.content.appl_id] = {
          ...state.data[action.content.appl_id],
          followed: 1,
          ptp_flag: 1,
          last_action_code: action.content.code
        }
      }
      return state

    // ================ Cal dash board =================//
    case constAction.CAL_TOTAL_DASH:
      let appls = Object.values(state.data)

      // ------- total -------//
      let totalCase = appls.length
      let posValue = appls.map(function (appl) {
        return appl.principle_outstanding
      }).reduce(function (sum, pay) {
        return sum = sum + pay;
      }, 0)

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

      let totalReVisitAppls = appls.filter((appl) => {
        return ['F_NAH', 'LEM'].includes(appl.last_action_code)
      })

      state = {
        ...state,
        totalCal: {
          totalCase: {
            case: totalCase,
            value: posValue,
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
          followedToday: {
            case: 0,
            applIds: []
          },
          revisit: {
            case: totalReVisitAppls.length,
            applIds: totalReVisitAppls//.map(appl => appl.appl_id)
          },
          Bptp: {
            case: 0,
            applIds: []
          },
        },
      }
      return state;

    case constAction.CAL_TREE_DASH:

      let listAppls = Object.values(state.data)

      // ------- total -------//
      let totalTReeCase = listAppls.length
      let notMeetCode = ['F_NAH', 'LEM',
        'F_RENT', 'F_HOS', 'F_WAU', 'F_NFH', 'F_NIW',
        'F_NLA', 'F_WET', 'F_CGI', 'DIE']

      let meetCode = ['PTP', 'F_OBT', 'WFP', 'TER',
        'WAS', 'LST', 'MCW', 'CTI',
        'RTP', 'GSF', 'IGN1', 'IGN2'
      ]

      let initPaidAppls = listAppls.filter((appl) => {
        return parseFloat(appl.total_pay_amount) > 0
      })
      let initNotPaidAppls = listAppls.filter((appl) => {
        return parseFloat(appl.total_pay_amount) == 0
      })
      let initNotfollow = listAppls.filter((appl) => {
        return appl.followed == 0
      })

      let initNotfollowPaid = initPaidAppls.filter((appl) => {
        return appl.followed == 0
      })

      let initNotfollowNotPaid = initNotPaidAppls.filter((appl) => {
        return appl.followed == 0
      })

      // follow:
      let initFollow = listAppls.filter((appl) => {
        return appl.followed == 1
      })
      let initFollowPaid = initFollow.filter((appl) => {
        return appl.full_paid == 1
      })
      let initFollowNotPaid = initFollow.filter((appl) => {
        return appl.full_paid == 0
      })
      let initNotPaidMeet = initFollowNotPaid.filter((appl) => {
        return meetCode.includes(appl.last_action_code)//appl.lv4 == 'Meet'
      })
      let initMeetPTP = initNotPaidMeet.filter((appl) => {
        return ['PTP', 'F_OBT', 'WFP', 'TER'].includes(appl.last_action_code)
      })
      let initMeetDif = initNotPaidMeet.filter((appl) => {
        return ['WAS', 'LST', 'MCW', 'CTI'].includes(appl.last_action_code) //appl.lv5 == 'DIF Finance'
      })
      let initMeetRTP = initNotPaidMeet.filter((appl) => {
        return ['RTP', 'GSF', 'IGN1', 'IGN2'].includes(appl.last_action_code) // appl.lv5 == 'RPT'
      })

      let initNotPaidNotMeet = initFollowNotPaid.filter((appl) => {
        return notMeetCode.includes(appl.last_action_code) //appl.lv4 == 'NOT_Meet'
      })

      let initNotMeetFH = initNotPaidNotMeet.filter((appl) => {
        return ['F_CGI', 'DIE', 'F_NAH', 'LEM'].includes(appl.last_action_code) //appl.lv5 == 'FOUND_HOUSE'
      })

      let initNotMeetNFH = initNotPaidNotMeet.filter((appl) => {
        return ['F_RENT', 'F_HOS', 'F_WAU', 'F_NFH', 'F_NIW',
          'F_NLA', 'F_WET'].includes(appl.last_action_code) //appl.lv5 == 'NOT_FOUND_HOUSE'
      })

      return {
        ...state,
        treeCal: [
          {
            id: 'Total',
            name: 'Total',
            case: totalTReeCase,
            share: 100,
            applIds: [], //.map(appl => appl.appl_id),
            children: [
              {
                id: 'Not Followed',
                name: 'Not Followed',
                case: initNotfollow.length,
                share: parseFloat(initNotfollow.length / totalTReeCase * 100).toFixed(1),
                applIds: initNotfollow, //.map(appl => appl.appl_id),
                type: 'bad',
                children: [
                  {
                    id: 'Paid',
                    name: 'Paid',
                    case: initNotfollowPaid.length,
                    share: initNotfollow.length > 0 ? parseFloat(initNotfollowPaid.length / initNotfollow.length * 100).toFixed(1) : 0,
                    applIds: initNotfollowPaid, //.map(appl => appl.appl_id),
                    type: 'good',
                  },
                  {
                    id: 'Not Paid',
                    name: 'Not Paid',
                    case: initNotfollowNotPaid.length,
                    share: initNotfollow.length > 0 ? parseFloat(initNotfollowNotPaid.length / initNotfollow.length * 100).toFixed(1) : 0,
                    applIds: initNotfollowNotPaid, //.map(appl => appl.appl_id),
                    type: 'bad',
                  },
                ],
              },
              {
                id: 'Followed',
                name: 'Followed',
                case: initFollow.length,
                share: (initFollow.length / totalTReeCase * 100).toFixed(1),
                applIds: initFollow, //.map(appl => appl.appl_id),
                type: 'good',
                children: [
                  {
                    id: 'Paid',
                    name: 'Paid',
                    case: initFollowPaid.length,
                    share: initFollow.length > 0 ? (initFollowPaid.length / initFollow.length * 100).toFixed(1) : 0,
                    applIds: initFollowPaid, //.map(appl => appl.appl_id),
                    type: 'good',
                  },
                  {
                    id: 'Not Paid',
                    name: 'Not Paid',
                    case: initFollowNotPaid.length,
                    share: initFollow.length > 0 ? (initFollowNotPaid.length / initFollow.length * 100).toFixed(1) : 0,
                    applIds: initFollowNotPaid, //.map(appl => appl.appl_id),
                    type: 'bad',
                    children: [
                      {
                        id: 'Meet',
                        name: 'Meet',
                        case: initNotPaidMeet.length,
                        share: initFollowNotPaid.length > 0 ? (initNotPaidMeet.length / initFollowNotPaid.length * 100).toFixed(1) : 0,
                        applIds: initNotPaidMeet, //.map(appl => appl.appl_id),
                        type: 'good',
                        children: [
                          {
                            id: 'PTP',
                            name: 'PTP',
                            case: initMeetPTP.length,
                            share: initNotPaidMeet.length > 0 ? (initMeetPTP.length / initNotPaidMeet.length * 100).toFixed(1) : 0,
                            applIds: initMeetPTP, //.map(appl => appl.appl_id),
                            type: 'good',
                          },
                          {
                            id: 'DIF Finance',
                            name: 'DIF Finance',
                            case: initMeetDif.length,
                            share: initNotPaidMeet.length > 0 ? (initMeetDif.length / initNotPaidMeet.length * 100).toFixed(1) : 0,
                            applIds: initMeetDif, //.map(appl => appl.appl_id),
                            type: 'bad',
                          },
                          {
                            id: 'RTP',
                            name: 'RTP',
                            case: initMeetRTP.length,
                            share: initNotPaidMeet.length > 0 ? (initMeetRTP.length / initNotPaidMeet.length * 100).toFixed(1) : 0,
                            applIds: initMeetRTP, //.map(appl => appl.appl_id),
                            type: 'bad',
                          },
                        ]
                      },
                      {
                        id: 'Not Meet',
                        name: 'Not Meet',
                        case: initNotPaidNotMeet.length,
                        share: initFollowNotPaid.length > 0 ? (initNotPaidNotMeet.length / initFollowNotPaid.length * 100).toFixed(1) : 0,
                        applIds: initNotPaidNotMeet, //.map(appl => appl.appl_id),
                        type: 'bad',
                        children: [
                          {
                            id: 'Found House',
                            name: 'Found House',
                            case: initNotMeetFH.length,
                            share: initNotPaidNotMeet.length > 0 ? (initNotMeetFH.length / initNotPaidNotMeet.length * 100).toFixed(1) : 0,
                            applIds: initNotMeetFH, //.map(appl => appl.appl_id),
                            type: 'good',
                          },
                          {
                            id: 'Not Found House',
                            name: 'Not Found House',
                            case: initNotMeetNFH.length,
                            share: initNotPaidNotMeet.length > 0 ? (initNotMeetNFH.length / initNotPaidNotMeet.length * 100).toFixed(1) : 0,
                            applIds: initNotMeetNFH, //.map(appl => appl.appl_id),
                            type: 'bad',
                          },
                        ]
                      },
                    ]
                  },
                ],
              },
            ]
          },
        ]
      }

    case constAction.CAL_TODO_DASH:
      // ======== todos ==========

      let todoAppls = Object.values(state.data).filter((appl) => {
        return appl.todo_flag == 1
      })
      let todoFollowedAppls = todoAppls.filter((appl) => {
        return appl.followed == 1
      })

      let todoPaidAppls = todoAppls.filter((appl) => {
        return appl.total_pay_amount > 0
      })
      let todoPaidValue = todoPaidAppls.map((appl) => {
        return appl.paid_today_amt
      }).reduce(function (sum, pay) {
        return sum = sum + pay;
      }, 0);


      let todoTodayPaidAppls = todoAppls.filter((appl) => {
        return appl.paid_today_amt > 0
      })
      let todoTodayPaidValue = todoTodayPaidAppls.map((appl) => {
        return appl.paid_today_amt
      }).reduce(function (sum, pay) {
        return sum = sum + pay;
      }, 0);


      let todoPtpAppls = todoAppls.filter((appl) => {
        return appl.last_action_code === 'PTP'
      })

      let reVisitAppls = todoAppls.filter((appl) => {
        return ['F_NAH', 'LEM'].includes(appl.last_action_code)
      })

      let paidValue = todoPaidAppls.map((appl) => {
        return appl.total_pay_amount
      }).reduce(function (sum, pay) {
        return sum = sum + pay;
      }, 0);

      state = {
        ...state,
        todoCal: {
          'todoCase': {
            case: todoAppls.length,
            applIds: todoAppls,//.map(appl => appl.appl_id)
            value: paidValue,
            pos: 1
          },
          'todoFollowed': {
            'case': todoFollowedAppls.length,
            'applIds': todoFollowedAppls//.map(appl => appl.appl_id)
          },
          'todoPaid': {
            'case': todoPaidAppls.length,
            value: todoPaidValue,
            'applIds': todoPaidAppls//.map(appl => appl.appl_id)
          },

          todoPaidToday: {
            case: todoTodayPaidAppls.length,
            value: todoTodayPaidValue,
            applIds: todoTodayPaidAppls,
          },

          'todoPtp': {
            'case': todoPtpAppls.length,
            'applIds': todoPtpAppls//.map(appl => appl.appl_id)
          },
          'todoBptp': {
            'case': 0,
            'applIds': []
          },
          'todoRevisit': {
            'case': reVisitAppls.length,
            'applIds': reVisitAppls//.map(appl => appl.appl_id)
          },
          todoFollowedToday: {
            case: 0,
            applIds: []
          },
        }
      }
      return state;

    case constAction.CAL_CATE_DASH:

      let appls2 = Object.values(state.data)

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
        categoryProduct: groupByArray(appls2, 'product_group'),
        categoryBinscore: groupByArray(appls2, 'bin_value'),
        categoryClassify: groupByArray(appls2, 'classify_case'),
      }
      return state;
    // ================ End dash board =================//
    default:
      return state;
  }
};

export default dataReducers;
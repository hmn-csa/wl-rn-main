import * as constAction from "../consts/index";


const defaultState = [
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

const treeReducers = (state = defaultState, action) => {

  switch (action.type) {

    case constAction.CAL_TREE_DASH:

      let notMeetCode = ['NFH', 'NIW', 'NLA', 'NAH', 'LEM', 'CGI', 'DIE']

      let appls = Object.values(action.data)
      let totalCase = appls.length
      let initPaidAppls = appls.filter((appl) => {
        return appl.full_Paid == 1
      })
      let initNotPaidAppls = appls.filter((appl) => {
        return appl.full_Paid == 0
      })

      let initNotfollow = appls.filter((appl) => {
        return appl.Followed == 0
      })

      let initNotfollowPaid = initPaidAppls.filter((appl) => {
        return appl.Followed == 0
      })

      let initNotfollowNotPaid = initNotPaidAppls.filter((appl) => {
        return appl.Followed == 0
      })

      // follow:
      let initFollow = appls.filter((appl) => {
        return appl.Followed == 1
      })

      let initFollowPaid = initFollow.filter((appl) => {
        return appl.full_Paid == 1
      })
      let initFollowNotPaid = initFollow.filter((appl) => {
        return appl.full_Paid == 0
      })
      let initNotPaidMeet = initFollowNotPaid.filter((appl) => {
        return !(notMeetCode.includes(appl.last_action_code))//appl.lv4 == 'Meet'
      })
      let initMeetPTP = initNotPaidMeet.filter((appl) => {
        return appl.last_action_code === 'PTP'
      })
      let initMeetDif = initNotPaidMeet.filter((appl) => {
        return ['WAS', 'LST'].includes(appl.last_action_code) //appl.lv5 == 'DIF Finance'
      })
      let initMeetRTP = initNotPaidMeet.filter((appl) => {
        return appl.last_action_code == 'RPT' // appl.lv5 == 'RPT'
      })

      let initNotPaidNotMeet = initFollowNotPaid.filter((appl) => {
        return notMeetCode.includes(appl.last_action_code) //appl.lv4 == 'NOT_Meet'
      })

      let initNotMeetFH = initNotPaidNotMeet.filter((appl) => {
        return ['WAS', 'LST', 'CGI', 'DIE'].includes(appl.last_action_code) //appl.lv5 == 'FOUND_HOUSE'
      })

      let initNotMeetNFH = initNotPaidNotMeet.filter((appl) => {
        return ['NFH', 'NIW', 'NLA'].includes(appl.last_action_code) //appl.lv5 == 'NOT_FOUND_HOUSE'
      })

      state = [
        {
          id: 'Total',
          name: 'Total',
          case: totalCase,
          share: 100,
          applIds: [], //.map(appl => appl.appl_id),
          children: [
            {
              id: 'Not Followed',
              name: 'Not Followed',
              case: initNotfollow.length,
              share: (initNotfollow.length / totalCase * 100).toFixed(1),
              applIds: initNotfollow, //.map(appl => appl.appl_id),
              type: 'bad',
              children: [
                {
                  id: 'Paid',
                  name: 'Paid',
                  case: initNotfollowPaid.length,
                  share: (initNotfollowPaid.length / totalCase * 100).toFixed(1),
                  applIds: initNotfollowPaid, //.map(appl => appl.appl_id),
                  type: 'good',
                },
                {
                  id: 'Not Paid',
                  name: 'Not Paid',
                  case: initNotfollowNotPaid.length,
                  share: (initNotfollowNotPaid.length / totalCase * 100).toFixed(1),
                  applIds: initNotfollowNotPaid, //.map(appl => appl.appl_id),
                  type: 'bad',
                },
              ],
            },
            {
              id: 'Followed',
              name: 'Followed',
              case: initFollow.length,
              share: (initFollow.length / totalCase * 100).toFixed(1),
              applIds: initFollow, //.map(appl => appl.appl_id),
              type: 'good',
              children: [
                {
                  id: 'Paid',
                  name: 'Paid',
                  case: initFollowPaid.length,
                  share: (initFollowPaid.length / totalCase * 100).toFixed(1),
                  applIds: initFollowPaid, //.map(appl => appl.appl_id),
                  type: 'good',
                },
                {
                  id: 'Not Paid',
                  name: 'Not Paid',
                  case: initFollowNotPaid.length,
                  share: (initFollowNotPaid.length / totalCase * 100).toFixed(1),
                  applIds: initFollowNotPaid, //.map(appl => appl.appl_id),
                  type: 'bad',
                  children: [
                    {
                      id: 'Meet',
                      name: 'Meet',
                      case: initNotPaidMeet.length,
                      share: (initNotPaidMeet.length / totalCase * 100).toFixed(1),
                      applIds: initNotPaidMeet, //.map(appl => appl.appl_id),
                      type: 'good',
                      children: [
                        {
                          id: 'PTP',
                          name: 'PTP',
                          case: initMeetPTP.length,
                          share: (initMeetPTP.length / totalCase * 100).toFixed(1),
                          applIds: initMeetPTP, //.map(appl => appl.appl_id),
                          type: 'good',
                        },
                        {
                          id: 'DIF Finance',
                          name: 'DIF Finance',
                          case: initMeetDif.length,
                          share: (initMeetDif.length / totalCase * 100).toFixed(1),
                          applIds: initMeetDif, //.map(appl => appl.appl_id),
                          type: 'bad',
                        },
                        {
                          id: 'RTP',
                          name: 'RTP',
                          case: initMeetRTP.length,
                          share: (initMeetRTP.length / totalCase * 100).toFixed(1),
                          applIds: initMeetRTP, //.map(appl => appl.appl_id),
                          type: 'bad',
                        },
                      ]
                    },
                    {
                      id: 'Not Meet',
                      name: 'Not Meet',
                      case: initNotPaidNotMeet.length,
                      share: (initNotPaidNotMeet.length / totalCase * 100).toFixed(1),
                      applIds: initNotPaidNotMeet, //.map(appl => appl.appl_id),
                      type: 'bad',
                      children: [
                        {
                          id: 'Found House',
                          name: 'Found House',
                          case: initNotMeetFH.length,
                          share: (initNotMeetFH.length / totalCase * 100).toFixed(1),
                          applIds: initNotMeetFH, //.map(appl => appl.appl_id),
                          type: 'good',
                        },
                        {
                          id: 'Not Found House',
                          name: 'Not Found House',
                          case: initNotMeetNFH.length,
                          share: (initNotMeetNFH.length / totalCase * 100).toFixed(1),
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
        {
          id: '',
          name: '',
        }
      ]
      return state;
    default:
      return state;
  }
};


export default treeReducers;
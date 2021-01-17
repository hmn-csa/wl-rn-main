import * as constAction from "../consts/index";


const initialState = {
  staffs: [],
  checkin: [],
  uptrail: [],
  last_pull: null,
  data_done: false,
  listCheckin: [],
  lastCheckin: [],
  fetchingInfo: false,
  fetchingCheckin: false,
  dash: {
    totalCase:{
      case: 0,
      pos: 0,
    },
    paidMtd: {
      case: 0,
      value: 0,
    },
    visited: {
      case: 0,
    },
    paidToday: {
      case: 0,
      value: 0,
    },
  },
  pullcnt: 0
}

function calcDistance(lat1, lon1, lat2, lon2) {
  function toRad(Value) {
      return Value * Math.PI / 180;
  }
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));   
  var d = R * c * 1000;
  return d ;
}

const cookCheckin = (checkinData) => {
  let arr = [];
  let checkins = checkinData.reverse()
  for ( let i=0; i <checkins.length; i++ ) {
    let item = checkins[i]
    item.value = Date.parse(item.runtime)
    if (arr.length === 0) arr.push({
      staff_id: item.staff_id,
      lat: item.lat, 
      lon: item.lon, 
      starttime: item.runtime, 
      endtime: item.runtime, 
      time : null 
    })
    else {
      let distance = calcDistance(arr[arr.length-1].lat, arr[arr.length-1].lon, item.lat, item.lon)
      if (distance > 100) {
        arr.push({
          staff_id: item.staff_id,
          lat: item.lat, 
          lon: item.lon, 
          starttime: item.runtime, 
          endtime: item.runtime, 
          time : null 
        })
      } 
      else {
        arr[arr.length-1].endtime = item.runtime
        arr[arr.length-1].time = Math.floor((item.value  -  Date.parse(arr[arr.length-1].starttime))/1000/60)//% 60

        if (arr[arr.length-1].time > 60){
          arr[arr.length-1].time = (arr[arr.length-1].time / 60).toFixed(0).toString() + ' giờ ' + (arr[arr.length-1].time% 60) + ' phút'
        } else 
        arr[arr.length-1].time = (arr[arr.length-1].time% 60) + ' phút'
      }
    }
  }
  
  let result = Object.values(arr)
  // result.reverse()
  return result
} 

const renListMarker = (staffs) => {
  const listMap2d = []
  for (let i = 0; i < staffs.length; i++) {
    if (staffs[i].checkin.length > 0) {
      let checpoint = {...staffs[i].checkin, fc_name: staffs[i].info.fc_name}
      listMap2d.push(checpoint)
    }
  }
  const listMap = Array.prototype.concat(...listMap2d);
  return listMap
}

const renLastMarker = (staffs) => {
  let listMap = []
  for (let i = 0; i < staffs.length; i++) {
    let checkin = staffs[i].checkin
    if (checkin !== undefined) {
      if (checkin.length > 0) {
        let checpoint = {...checkin[checkin.length - 1], fc_name: staffs[i].info.fc_name}
        listMap.push(checpoint)
      }
    }
  }
  return listMap
}

const staffReducers = (state = initialState, action) => {

  switch(action.type) {

    case constAction.STAFF_INFO_REQUEST: 
      return {...state, fetchingInfo: true}
    
    case constAction.STAFF_CHECKIN_REQUEST: 
      return {...state, fetchingCheckin: true}

    case constAction.STAFF_INFO_SUCCESS:
      let totalCase = 0
      let paidMtdValue = 0
      let paidMtdCase = 0
      let paidTodayValue = 0
      let paidTodayCase = 0
      let visitedCase = 0
      let pos = 0
      for ( let i=0; i < action.content.length; i++ ) {
        let staff = action.content[i]
        totalCase += staff.case
        paidMtdValue += staff.paidamt
        paidMtdCase += staff.paidcase
        paidTodayValue += staff.paidtodaycase
        paidTodayCase += staff.todayamt
        visitedCase += staff.visited
        pos += staff.pos
      }
        
      let dash =  {
        totalCase: {
          case: totalCase,
          pos: pos
        },
        paidMtd: {
          case: paidMtdCase,
          value: paidMtdValue,
        },
        visited: {
          case: visitedCase,
        },
        paidToday: {
          case: paidTodayCase,
          value: paidTodayValue,
        },
      }
      return {...state, staffs: action.content, dash: dash, fetchingInfo: false}

    case constAction.STAFF_CHECKIN_SUCCESS:
      return {...state, 
        checkin: action.content.checkin, 
        uptrail: action.content.uptrail,
        last_pull: action.content.last_pull,
        fetchingCheckin: false,
      }
    
    case constAction.STAFF_CHECKIN_UPDATE:
      return {...state, 
        checkin: [...action.content.checkin, ...state.checkin], 
        uptrail: [...action.content.uptrail, ...state.uptrail], 
        last_pull: action.content.last_pull,
        fetchingCheckin: false,
      }
      

    case constAction.STAFF_CAL_DASH:

      // Cal checkin !!!
      let staffCook = []
      for ( let i=0; i < state.staffs.length; i++ ) {
        let staff = state.staffs[i]
        let checkin = state.checkin.filter( item => item.staff_id === staff.staff_id )  
        let uptrail = state.uptrail.filter( item => item.staff_id === staff.staff_id )
        staff = {...staff, checkin: cookCheckin(checkin), uptrail: uptrail}
        staffCook.push(staff)
      }
      staffCook.sort(function(a,b){
        return b.paidamt - a.paidamt;
      })

      // call dash 

      return {...state, 
        staffs: staffCook,
        data_done: true,
        listCheckin: renListMarker(staffCook),
        lastCheckin: renLastMarker(staffCook),
        pullcnt: state.pullcnt + 1,
      }
    
    case constAction.STAFF_CHECKIN_COUNT:
      return {...state,  
        pullcnt: state.pullcnt + 1,
      }
    default:
      return state;
  }
}

export default staffReducers;
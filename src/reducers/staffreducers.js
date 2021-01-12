import * as constAction from "../consts/index";


const initialState = {
  staffs: [],
  checkin: [],
  uptrail: [],
  last_pull: null,
  data_done: false,
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

const staffReducers = (state = initialState, action) => {

  switch(action.type) {
    case constAction.STAFF_INFO_SUCCESS:
      return {...state, staffs: action.content}
    case constAction.STAFF_CHECKIN_SUCCESS:
      return {...state, 
        checkin: action.content.checkin, 
        uptrail: action.content.uptrail,
        last_pull: action.content.last_pull
      }
    case constAction.STAFF_CAL_DASH:
      let staffCook = []
      for ( let i=0; i < state.staffs.length; i++ ) {
        let staff = state.staffs[i]
        let checkin = state.checkin.filter( item => item.staff_id === staff.staff_id)
        let uptrail = state.uptrail.filter( item => item.staff_id === staff.staff_id)
        staff = {...staff, checkin: cookCheckin(checkin), uptrail: uptrail}
        staffCook.push(staff)
      }
      staffCook.sort(function(a,b){
        return b.paidamt - a.paidamt;
      })
      return {...state, 
        staffs: staffCook
      }

    default:
      return state;
  }
}

export default staffReducers;
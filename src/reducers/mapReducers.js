import * as constAction from "../consts/index";

const initialState = {
  uptrail: [],
  checkin: [],
  staff_id: null,
  username: null,
  fetching: null,
  error: null,
}


const cook_checkin = (checkin_data) => {
  let obj = {};
  let checkins = checkin_data.reverse()
  for (let i = 0; i < checkins.length; i++) {
    let item = checkins[i]
    item.value = Date.parse(item.runtime)
    const key = `${item.lat}${item.lon}`;
    if (obj[key] === undefined) obj[key] = {
      min: item.value, max: item.value, lat: item.lat, lon: item.lon, runtime: item.runtime
    }
    else if (item.value < obj[key].min) {
      obj[key].min = item.value
      obj[key].runtime = item.runtime
    }

    else if (item.value > obj[key].max)
      obj[key].max = item.value
    obj[key].time = Math.floor((obj[key].max - obj[key].min) / 1000 / 60) % 60
  }
  let result = Object.values(obj)
  result.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return b.min - a.min;
  });
  result.reverse()
  return result
}

function calcDistance(lat1, lon1, lat2, lon2) {
  function toRad(Value) {
    return Value * Math.PI / 180;
  }
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c * 1000;
  return d;
}

const cookCheckin = (checkinData) => {
  let arr = [];
  let checkins = checkinData.reverse()
  for (let i = 0; i < checkins.length; i++) {
    let item = checkins[i]
    item.value = Date.parse(item.runtime)
    if (arr.length === 0) arr.push({
      device_name: item.device_name,
      lat: item.lat,
      lon: item.lon,
      starttime: item.runtime,
      endtime: item.runtime,
      time: null
    })
    else {
      let distance = calcDistance(arr[arr.length - 1].lat, arr[arr.length - 1].lon, item.lat, item.lon)
      if (distance > 100) {
        arr.push({
          device_name: item.device_name,
          lat: item.lat,
          lon: item.lon,
          starttime: item.runtime,
          endtime: item.runtime,
          time: null
        })
      }
      else {
        arr[arr.length - 1].endtime = item.runtime
        arr[arr.length - 1].time = Math.floor((item.value - Date.parse(arr[arr.length - 1].starttime)) / 1000 / 60)//% 60

        if (arr[arr.length - 1].time > 60) {
          arr[arr.length - 1].time = (arr[arr.length - 1].time / 60).toFixed(0).toString() + ' giờ ' + (arr[arr.length - 1].time % 60) + ' phút'
        } else
          arr[arr.length - 1].time = (arr[arr.length - 1].time % 60) + ' phút'
      }
    }
  }

  let result = Object.values(arr)
  // result.reverse()
  //console.log(result)
  return result
}




const mapReducers = (state = initialState, action) => {

  switch (action.type) {

    //case constAction.API_GETCHECKIN_SUCCESS:
    case constAction.API_GETCHECKIN_REQUEST:
      return { ...state, fetching: true, error: null };

    case constAction.API_GETCHECKIN_SUCCESS:
      return { ...state, fetching: false, checkin: cookCheckin(action.content), error: null };

    case constAction.API_GETCHECKIN_FAILURE:
      return { ...state, fetching: false, error: action.content };


    case constAction.SET_MAP_STAFF:

      state = {
        ...state,
        uptrail: action.content.uptrail,
        checkin: cookCheckin(action.content.checkin), //action.content.checkin, 
        staff_id: action.content.staff_id,
        username: action.content.username,
      }
      return state;

    default:
      return state;
  }
};


export default mapReducers;
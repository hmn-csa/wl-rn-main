import * as constAction from "../consts/index";


// reducer with initial state
const initialState = {
  fetching: null,
  error: null,
  lat: null,
  lon: null,
  // currrent user token
  token: null,

  changePw: null,
  changePwError: null,
  // staff_user config
  active_staff: null,
  active_infos: { fc_name: 'họ tên' },
};

export function tokenReducers(state = initialState, action) {
  switch (action.type) {

    case constAction.API_TOKEN_REQUEST:
      return { ...state, fetching: true, error: null };

    case constAction.API_TOKEN_SUCCESS:
      return { ...state, fetching: false, token: action.content, error: null };

    case constAction.API_TOKEN_FAILURE:
      return { ...state, fetching: false, token: action.content, error: action.error };

    case constAction.TOKEN_REMOVE:
      return initialState;

    case constAction.API_CHANGEPW_REQUEST:
      return { ...state, changePw: true, changePwError: null }

    case constAction.API_CHANGEPW_FAILURE:
      return { ...state, changePwError: action.error }

    case constAction.SET_ACTIVE_STAFF:
      return {
        ...state,
        active_staff: action.content.staff_id,
        active_infos: action.content.info
      };

    case constAction.SET_ACTIVE_AVATAR:
      const active_infos = { ...state.active_infos, avatar: action.content }
      return {
        ...state,
        active_infos: active_infos,
      };

    case constAction.LOCATION_SET:
      //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
      function calcCrow(lat1, lon1, lat2, lon2) {
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
      // id distance > 100 m
      ///const distance = calcCrow(state.lat, state.lon, action.content.latitude, action.content.longitude).toFixed(3)
      //console.log('distance ', distance, distance > 1)
      //if (distance > 100)
      return {
        ...state,
        lat: action.content.latitude,
        lon: action.content.longitude,
        device_brand: action.content.device_brand,
        device_os: action.content.device_os,
        device_name: action.content.device_name
      }


    default:
      return state;
  }
}

export default tokenReducers;
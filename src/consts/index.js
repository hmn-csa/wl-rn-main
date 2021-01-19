
// Root backend api
export const WORKLIST_API = "https://beta-fc.lgm.com.vn/rn-ver/api"


export const REMARK_CODE = [
  { label: 'PTP - Hứa thanh toán', value: 'PTP' },
  { label: 'OBT - Đã thu được tiền', value: 'OBT' },
  { label: 'WFP - Đã thanh toán chờ kiểm tra', value: 'WFP' },
  { label: 'TER - Thanh lý', value: 'TER' },

  { label: 'NAH - Không có nhà', value: 'NAH' },
  { label: 'LEM - Để lại lời nhắn', value: 'LEM' },

  { label: 'WAS - Chờ thu nhập, trợ cấp', value: 'WAS' },
  { label: 'LST - Thất nghiệp, làm ăn thua lỗ', value: 'LST' },

  { label: 'RTP - Từ chôí thanh toán', value: 'RTP' },

  { label: 'RENT - Nhà thuê và đã dọn đi', value: 'RENT' },
  { label: 'HOS - Nhà đã bán', value: 'HOS' },

  { label: 'WAU - Bỏ trốn, người thân không tìm thấy ', value: 'WAU' },
  { label: 'NFH - Không tìm thấy nhà', value: 'NFH' },
  { label: 'NIW - Không có thông tin tại nơi làm việc', value: 'NIW' },
  { label: 'NLA - Không sống tại địa chỉ', value: 'NLA' },

  { label: 'GSF - Gian lận', value: 'GSF' },
  { label: 'IGN1 - Chưa nhận khoản vay', value: 'IGN1' },
  { label: 'IGN2 - Báo đã hủy hợp đồng', value: 'IGN2' },
  { label: 'CGI - Đi tù/nghĩa vụ/cai nghiện/tâm thần', value: 'CGI' },
  { label: 'DIE - Đã qua đời', value: 'DIE' },
];


// Appls datas

export const GET_TOKEN = "GET_TOKEN"

export const INIT_SHOWLIST = "INIT_SHOWLIST"
export const UPDATE_SHOWLIST = "UPDATE_SHOWLIST"
export const SET_TODO_SHOWLIST = "SET_TODO_SHOWLIST"

export const SHOWLIST_CLEAR = "SHOWLIST_CLEAR"

// token reducer
export const API_TOKEN_REQUEST = "API_TOKEN_REQUEST"
export const API_TOKEN_SUCCESS = "API_TOKEN_SUCCESS"
export const API_TOKEN_FAILURE = "API_TOKEN_FAILURE"
export const TOKEN_REMOVE = "TOKEN_REMOVE"
export const LOCATION_SET = "LOCATION_SET"


// ----------- DATA CASE DETAIL ---------------//
export const API_DATA_REQUEST = "API_DATA_REQUEST"
export const API_DATA_SUCCESS = "API_DATA_SUCCESS"
export const API_DATA_FAILURE = "API_DATA_FAILURE"
export const DATA_INIT_DASHBOARD = "DATA_INIT_DASHBOARD"

export const DATA_CLEAR = "DATA_CLEAR"

// ----------- TOODO  ---------------//
export const API_TODO_REQUEST = "API_TODO_REQUEST"
export const API_TODO_SUCCESS = "API_TODO_SUCCESS"
export const API_TODO_FAILURE = "API_TODO_FAILURE"
export const API_TODO_DASHBOARD = "API_TODO_DASHBOARD"

// ----------- VSF ---------------//
export const API_VSF_REQUEST = "API_VSF_REQUEST"
export const API_VSF_SUCCESS = "API_VSF_SUCCESS"
export const API_VSF_FAILURE = "API_VSF_FAILURE"
export const APPLID_VSF_ACTIVE = "APPLID_VSF_ACTIVE"


// ----------- Payment ---------------//
export const API_PAYMENT_REQUEST = "API_PAYMENT_REQUEST"
export const API_PAYMENT_SUCCESS = "API_PAYMENT_SUCCESS"
export const API_PAYMENT_FAILURE = "API_PAYMENT_FAILURE"


// ------------ uptrail -----------------//
export const API_UPTRAIL_REQUEST = "API_UPTRAIL_REQUEST"
export const API_UPTRAIL_SUCCESS = "API_UPTRAIL_SUCCESS"
export const API_UPTRAIL_FAILURE = "API_UPTRAIL_FAILURE"

export const MORE_UPTRAIL_REQUEST = "MORE_UPTRAIL_REQUEST"

export const USER_UPTRAIL_REQUEST = "USER_UPTRAIL_REQUEST"
export const USER_UPTRAIL_SUCCESS = "USER_UPTRAIL_SUCCESS"
export const USER_UPTRAIL_FAILURE = "USER_UPTRAIL_FAILURE"

export const SET_ACTIVE_STAFF = "SET_ACTIVE_STAFF"
export const UPTRAIL_CLEAR = "UPTRAIL_CLEAR"

// ------------ Checkin -----------------//
export const API_GETCHECKIN_REQUEST = "API_GETCHECKIN_REQUEST"
export const API_GETCHECKIN_SUCCESS = "API_GETCHECKIN_SUCCESS"
export const API_GETCHECKIN_FAILURE = "API_GETCHECKIN_FAILURE"



// ------------- summary -----------------//
export const CAL_TOTAL_DASH = "CAL_TOTAL_DASH"
export const CAL_TODO_DASH = "CAL_TODO_DASH"
export const CAL_TREE_DASH = "CAL_TREE_DASH"
export const CAL_CATE_DASH = "CAL_CATE_DASH"


export const CHANGE_TODO = "CHANGE_TODO"
export const CHANGE_FOLLOW = "CHANGE_FOLLOW"

// ------------------ manager -----------------//
export const SET_MANAGER_DASH = "SET_MANAGER_DASH"
export const CAL_MANAGER_DASH = "CAL_MANAGER_DASH"
export const UPDATE_MANAGER_DASH = "UPDATE_MANAGER_DASH"

export const COUNT_MANAGER_PULL = "COUNT_MANAGER_PULL"
export const MANAGER_DATA_REQUEST = "MANAGER_DATA_REQUEST"
export const MANAGER_CLEAR_STATE = "MANAGER_CLEAR_STATE"

// new 
export const STAFF_INFO_REQUEST = "STAFF_INFO_REQUEST"
export const STAFF_INFO_SUCCESS = "STAFF_INFO_SUCCESS"
export const STAFF_CHECKIN_REQUEST = "STAFF_CHECKIN_REQUEST"
export const STAFF_CHECKIN_SUCCESS = "STAFF_CHECKIN_SUCCESS"

export const STAFF_CHECKIN_COUNT = "STAFF_CHECKIN_COUNT"
export const STAFF_CHECKIN_PULL = "STAFF_CHECKIN_PULL"
export const STAFF_CHECKIN_UPDATE = "STAFF_CHECKIN_UPDATE"
export const STAFF_CAL_DASH = "STAFF_CAL_DASH"

export const SET_STAFF_MODE = "SET_STAFF_MODE"
export const OUT_STAFF_MODE = "OUT_STAFF_MODE"


// map checkin uptrail 

export const SET_MAP_STAFF = "SET_MAP_STAFF"
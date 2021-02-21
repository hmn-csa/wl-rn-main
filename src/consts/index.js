
// Root backend api
export const WORKLIST_API = "https://beta-fc.lgm.com.vn/rn-ver/api"


export const REMARK_CODE = [
  { label: 'PTP - Hứa thanh toán', value: 'PTP' },
  { label: 'F_OBT - Đã thu được tiền', value: 'F_OBT' },
  { label: 'WFP - Đã thanh toán chờ kiểm tra', value: 'WFP' },
  { label: 'TER - Thanh lý', value: 'TER' },

  { label: 'WAS - Chờ thu nhập, trợ cấp', value: 'WAS' },
  { label: 'LST - Thất nghiệp, làm ăn thua lỗ', value: 'LST' },
  { label: 'MCW - KH bị bệnh, tai nạn', value: 'MCW' },
  { label: 'CTI - Thiên tai', value: 'CTI' },

  { label: 'F_NAH - Không có nhà', value: 'F_NAH' },
  { label: 'LEM - Để lại lời nhắn', value: 'LEM' },

  { label: 'RTP - Từ chôí thanh toán', value: 'RTP' },
  { label: 'GSF - Gian lận', value: 'GSF' },
  { label: 'IGN1 - Chưa nhận khoản vay', value: 'IGN1' },
  { label: 'IGN2 - Báo đã hủy hợp đồng', value: 'IGN2' },

  { label: 'F_RENT - Nhà thuê và đã dọn đi', value: 'F_RENT' },
  { label: 'F_HOS - Nhà đã bán', value: 'F_HOS' },
  { label: 'F_WAU - KH bỏ trốn, gia đình còn ở tại địa phương', value: 'F_WAU' },
  { label: 'F_NFH - Không tìm thấy nhà', value: 'F_NFH' },
  { label: 'F_NIW - Không có thông tin tại nơi làm việc', value: 'F_NIW' },
  { label: 'F_NLA - Không sống tại địa chỉ', value: 'F_NLA' },
  { label: 'F_WET - KH bỏ trốn, không gặp gia đình', value: 'F_WET' },

  { label: 'F_CGI - Đi tù/nghĩa vụ/cai nghiện/tâm thần', value: 'F_CGI' },
  { label: 'DIE - Đã qua đời', value: 'DIE' },

];


export const PERSON_CONTACT = [
  { label: 'CLIENT - Khách hàng', value: 'CLIENT' },
  { label: 'OWNER - Chủ HĐ', value: 'OWNER' },


  { label: 'NOBODY - Không gặp ai', value: 'NOBODY' },
  { label: 'FATHER - Cha', value: 'FATHER' },
  { label: 'MOTHER - Cha', value: 'MOTHER' },

  { label: 'BROTHER - Anh/em trai', value: 'BROTHER' },
  { label: 'SISTER - Chị/em gái', value: 'SISTER' },
  { label: 'HUSBAND - Chồng', value: 'HUSBAND' },
  { label: 'WIFE - Vợ', value: 'WIFE' },

  { label: 'CHILD - Con', value: 'CHILD' },
  { label: 'UNCLE - Chú', value: 'UNCLE' },
  { label: 'RELATIVE - Người thân', value: 'RELATIVE' },
  { label: 'OTHER - Khác', value: 'OTHER' },

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

export const SET_ACTIVE_STAFF = "SET_ACTIVE_STAFF"
export const SET_ACTIVE_AVATAR = "SET_ACTIVE_AVATAR"

export const API_CHANGEPW_REQUEST = "API_CHANGEPW_REQUEST"
export const API_CHANGEPW_FAILURE = "API_CHANGEPW_FAILURE"

export const API_CHANGE_AVATAR_REQUEST = "API_CHANGE_AVATAR_REQUEST"
export const API_CHANGE_AVATAR_SUCCESS = "API_CHANGE_AVATAR_SUCCESS"
export const API_CHANGE_AVATAR_FAILURE = "API_CHANGE_AVATAR_FAILURE"



// ----------- DATA CASE DETAIL ---------------//
export const API_DATA_REQUEST = "API_DATA_REQUEST"
export const API_DATA_SUCCESS = "API_DATA_SUCCESS"
export const API_DATA_FAILURE = "API_DATA_FAILURE"
export const DATA_INIT_DASHBOARD = "DATA_INIT_DASHBOARD"

export const DATA_CLEAR = "DATA_CLEAR"

// ----------- TOODO  ---------------//
export const SET_TODO_TASK = "SET_TODO_TASK"

export const API_TODO_REQUEST = "API_TODO_REQUEST"
export const API_TODO_SUCCESS = "API_TODO_SUCCESS"
export const API_TODO_FAILURE = "API_TODO_FAILURE"

// ----------- VSF ---------------//
export const API_VSF_REQUEST = "API_VSF_REQUEST"
export const API_VSF_SUCCESS = "API_VSF_SUCCESS"
export const API_VSF_FAILURE = "API_VSF_FAILURE"

export const API_SKIP_REQUEST = "API_SKIP_REQUEST"
export const API_SKIP_SUCCESS = "API_SKIP_SUCCESS"
export const API_SKIP_FAILURE = "API_SKIP_FAILURE"

export const APPLID_VSF_ACTIVE = "APPLID_VSF_ACTIVE"
export const IDNO_SKIP_ACTIVE = "IDNO_SKIP_ACTIVE"

// ----------- Payment ---------------//
export const API_PAYMENT_REQUEST = "API_PAYMENT_REQUEST"
export const API_PAYMENT_SUCCESS = "API_PAYMENT_SUCCESS"
export const API_PAYMENT_FAILURE = "API_PAYMENT_FAILURE"


// ------------ uptrail -----------------//
export const API_UPTRAIL_REQUEST = "API_UPTRAIL_REQUEST"
export const API_UPTRAIL_SUCCESS = "API_UPTRAIL_SUCCESS"
export const API_UPTRAIL_FAILURE = "API_UPTRAIL_FAILURE"

export const DAILY_UPTRAIL_REQUEST = "DAILY_UPTRAIL_REQUEST"
export const DAILY_UPTRAIL_SUCCESS = "DAILY_UPTRAIL_SUCCESS"


export const MORE_UPTRAIL_REQUEST = "MORE_UPTRAIL_REQUEST"
export const MORE_UPTRAIL_SUCCESS = "MORE_UPTRAIL_SUCCESS"

export const APPLID_UPTRAIL_REQUEST = "APPLID_UPTRAIL_REQUEST"
export const APPLID_UPTRAIL_SUCCESS = "APPLID_UPTRAIL_SUCCESS"

export const USER_UPTRAIL_REQUEST = "USER_UPTRAIL_REQUEST"
export const USER_UPTRAIL_SUCCESS = "USER_UPTRAIL_SUCCESS"
export const USER_UPTRAIL_FAILURE = "USER_UPTRAIL_FAILURE"


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

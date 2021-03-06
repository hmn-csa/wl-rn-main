import React, { useState, useEffect, useRef } from 'react';
import {
  Text, View, StyleSheet, ScrollView,
  Dimensions, Linking, Platform, TouchableOpacity, ViewBase, ImageBackground
} from 'react-native'
import TreeView from 'react-native-final-tree-view'
import { connect } from "react-redux"
import Carousel from 'react-native-snap-carousel'
import Timeline from 'react-native-timeline-flatlist'
import { FontAwesome, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { actUpdateShowlist } from "../actions"
import { MAIN_COLOR2, colors } from '../styles'
import Loader from '../components/elements/Loader'
import Label, { Orientation } from "react-native-label";




import { moneyFormat } from '../functions';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 5;
const SliderWidth = Dimensions.get('screen').width;
const AVATAR_WIDTH = width / 8
import { EMPTYAVATAR } from '../images'


const BOOK = [
  {
    id: 'mainPhone',
    name: 'Thông tin liên lạc',
    children: []
  },
  {
    id: 'mainRef',
    name: 'Người tham chiếu',
    children: []
  },
]

function Skip(props) {

  const renPhonBook = (info) => {

    var childRef = []
    const mainRef = []
    for (let i = 0; i < info.main_ref.length; i++) {
      childRef = []
      for (let j = 0; j < info.child_ref.length; j++) {
        if (info.child_ref[j].nid_no === info.main_ref[i].ref_nid_no) {
          childRef.push({
            id: info.main_ref[j].ref_nid_no,
            name: info.child_ref[j].ref_name,
            phone: info.child_ref[j].ref_phone,
            ref_relation: info.child_ref[j].ref_relation
          })
        }
      }
      mainRef.push({
        id: info.main_ref[i].ref_nid_no,
        name: info.main_ref[i].ref_name,
        phone: info.main_ref[i].ref_phone,
        ref_relation: info.main_ref[i].ref_relation,
        children: childRef,
      })
    }

    const mainPhone = []

    // if (info.main_infos.s37_phone !== null && info.main_infos.s37_phone !== undefined && info.main_infos.s37_phone !== "")
    //   mainPhone.push({
    //     id: "s37_phone",
    //     name: "s37_phone",
    //     phone: info.main_infos.s37_phone
    //   })

    // if (info.main_infos.cash24_phone !== null && info.main_infos.cash24_phone !== undefined && info.main_infos.cash24_phone !== "")
    //   mainPhone.push({
    //     id: "cash24_phone",
    //     name: "cash24_phone",
    //     phone: info.main_infos.cash24_phone
    //   })

    // if (info.main_infos.pcb_phone !== null && info.main_infos.pcb_phone !== undefined && info.main_infos.pcb_phone !== "")
    //   mainPhone.push({
    //     id: "pcb_phone",
    //     name: "pcb_phone",
    //     phone: info.main_infos.pcb_phone
    //   })

    // if (info.main_infos.vmg_phone !== null && info.main_infos.vmg_phone !== undefined && info.main_infos.vmg_phone !== "")
    //   mainPhone.push({
    //     id: "vmg_phone",
    //     name: "vmg_phone",
    //     phone: info.main_infos.vmg_phone
    //   })

    // if (mainPhone.length > 0)
    //   return [
    //     {
    //       id: 'mainPhone',
    //       name: 'Thông tin liên lạc',
    //       children: mainPhone
    //     },
    //     {
    //       id: 'mainRef',
    //       name: 'Người tham chiếu',
    //       children: [...mainRef, ...fatherRef]
    //     },
    //   ]


    return ([{
      id: '',
      name: <Text style={{ color: colors.main, fontSize: 16, fontWeight: 'bold' }}>Thông tin tham chiếu</Text >,
      children: mainRef,
      phone: "",
      type: 'none'
    }])
  }

  const SkipHeader = (maininfo) => {
    const renAvatar = (avatar) => {
      if (!avatar)
        return EMPTYAVATAR
      else return { uri: avatar }
    }
    return (
      <View>
        <View style={{ padding: 10, paddingRight: 0 }}>
          <View style={[styles.row, { borderBottomWidth: 0, borderBottomColor: '#CCC', paddingTop: 5, backgroundColor: 'white' }]}>
            <View style={[styles.box, { minWidth: AVATAR_WIDTH, flex: 0.05, marginBottom: 5, }]}>
              <ImageBackground
                style={{
                  borderRadius: 30,
                  width: 50,
                  height: 50,
                }}
                imageStyle={{ borderRadius: 90, resizeMode: "cover" }}
                source={renAvatar("")}>
              </ImageBackground>
            </View>
            <View style={[styles.box, { flex: 1, marginLeft: 10, marginBottom: 5, marginTop: -5 },]}>
              <Text style={{ color: colors.main, fontWeight: 'bold', fontSize: 20 }}
                ellipsizeMode="tail">
                {maininfo.client_name}
              </Text>
              <Text style={{ fontSize: 12, paddingTop: 10 }}
                ellipsizeMode="tail">
                CMND: {maininfo.id_no}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.smalltitle}>Ngày sinh: </Text>
              <Text style={styles.smalltext}>{maininfo.birthday}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.smalltitle}>Giới tính:</Text>
              <Text style={styles.smalltext}>{maininfo.gender === "Male" ? "Nam" : "Nữ"}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.smalltitle}>Học vấn:</Text>
              <Text style={styles.smalltext}> {maininfo.education}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.smalltitle}>Hôn nhân:</Text>
              <Text style={styles.smalltext}>{maininfo.marital_status}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.smalltitle}>Nghề nghiệp:</Text>
              <Text style={styles.smalltext}> {maininfo.job_description}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.smalltitle}>Thu nhập:</Text>
              <Text style={styles.smalltext}>{moneyFormat(maininfo.personal_income)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.smalltitle}>Hộ khẩu:</Text>
              <Text style={styles.smalltext}> {maininfo.fb_no}</Text>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
        </View >
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 10, paddingTop: 5 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <FontAwesome5 name="facebook-messenger" size={20} color="grey" style={{ padding: 10, borderRadius: 15, borderWidth: 1, borderColor: colors.lightGray }} />
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <FontAwesome5 name="map-marked-alt" size={20} color="grey" style={{ padding: 10, borderRadius: 15, borderWidth: 1, borderColor: colors.lightGray }} />
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <FontAwesome name="phone" size={20} color="grey" style={{ padding: 10, borderRadius: 15, borderWidth: 1, borderColor: colors.lightGray }} />
          </View>
        </View>
      </View>
    )
  }

  const renMainInfo = (maininfo) => {
    return (
      <View style={{
        flex: 1,
        backgroundColor: "white",
      }}>
        {SkipHeader(maininfo)}

        {/* <View style={[styles.row, { marginTop: 8 }]}>
          <View style={[styles.box]}>
            <Text style={{ fontSize: 10 }}>Tạm trú : {maininfo.address}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.box]}>
            <Text style={{ fontSize: 10 }}>Thường trú : {maininfo.address_per}</Text>
          </View>
        </View>

        <View style={[styles.row, { marginTop: 5 }]}>
          <View style={[styles.box]}>
            <Text style={{ fontSize: 10 }}>Công ty: {maininfo.company_name}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.box]}>
            <Text style={{ fontSize: 10 }}>Địa chỉ cty: {maininfo.address_off}</Text>
          </View>
        </View> */}

      </View>
    )
  }

  const renApplInfo = ({ item, index }) => {
    const statusColor = (status, appl_id) => {
      if (status === 'Active')
        return colors.main
      if (appl_id !== "")
        return colors.yellow
      return colors.secondary
    }
    const statusText = (status, appl_id) => {
      if (status === 'Active')
        return 'Đang mở'
      if (appl_id !== "")
        return 'Đã đóng'
      return 'Từ chối'
    }

    const loan = (status, appl_id) => {
      if (status === 'Active')
        return `${moneyFormat(item.loanamount)}`
      if (appl_id !== "")
        return `${moneyFormat(item.loanamount)}`
      return `${moneyFormat(item.loanamount_uw)}`
    }

    const emi = (status, appl_id) => {
      if (status === 'Active')
        return `${moneyFormat(item.installment)}`
      if (appl_id !== "")
        return `${moneyFormat(item.installment)}`
      return `${moneyFormat(item.installment)}`
    }

    return (
      <Label
        orientation={Orientation.TOP_RIGHT}
        style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}
        title={statusText(item.status, item.appl_id)}
        color={statusColor(item.status, item.appl_id)}
        distance={60}
        extent={0}
      >
        <View style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
          borderBottomWidth: 5,
          borderWidth: 0.5,
          borderBottomColor: statusColor(item.status, item.appl_id),
          borderColor: colors.lightGray

        }}
        >

          <View style={[styles.row, { borderBottomWidth: 0.5, borderColor: colors.lightGray }]}>
            <View style={[styles.box]}>
              <Text style={[styles.textContent, { fontWeight: 'bold', color: statusColor(item.status, item.appl_id), paddingBottom: 5, fontSize: 14 }]}>
                {item.appl_id}20190506xxxxx
              </Text>
            </View>
            <View style={[styles.box]}>
              <Text style={[styles.textContent, { fontWeight: 'bold', color: colors.success, fontSize: 14 }]}>
                {item.product_group}
              </Text>
            </View>
          </View>
          <View style={[styles.row, { marginTop: 5 }]}>
            <View style={[styles.box]}>
              <Text style={[styles.textContent]}>
                <Text style={{ fontWeight: 'bold' }}>Ngày mở: </Text>
                <Text>{item.operate_date ? item.operate_date.substring(0, 10) : ""}</Text>
              </Text>
            </View>

            <View style={[styles.box]}>
              <Text style={[styles.textContent]}>
                <Text style={{ fontWeight: 'bold' }}>Ngày due: </Text>
                <Text>{item.first_duedate ? item.first_duedate.substring(0, 10) : ""}</Text>
              </Text>
            </View>
          </View>

          <View style={[styles.row, { marginTop: 5 }]}>

            <View style={[styles.box]}>
              <Text style={[styles.textContent]}>
                <Text style={{ fontWeight: 'bold' }}>Loan: </Text>
                <Text>{loan(item.status, item.appl_id)}</Text>
              </Text>
            </View>

            <View style={[styles.box]}>
              <Text style={[styles.textContent]}>
                <Text style={{ fontWeight: 'bold' }}>Lãi Suất: </Text>
                <Text>{item.eff_rate}%</Text>
              </Text>
            </View>
          </View>

          <View style={[styles.row, { marginTop: 5 }]}>

            <View style={[styles.box]}>
              <Text style={[styles.textContent]}>
                <Text style={{ fontWeight: 'bold' }}>Số kỳ: </Text>
                <Text>{item.tenor}</Text>
              </Text>
            </View>

            <View style={[styles.box]}>
              <Text style={[styles.textContent]}>
                <Text style={{ fontWeight: 'bold' }}>Tiền/kỳ: </Text>
                <Text>{emi(item.status, item.appl_id)}</Text>
              </Text>
            </View>
          </View>
          {dataAppl != "" ? <View>
            <View style={[styles.row, { paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.lightGray }]}>
              <Text style={[styles.textContent, { fontWeight: 'bold' }]}>Chit tiết: </Text>
            </View>
            <Timeline
              data={dataAppl}
              separator={false}
              circleSize={0.1}
              innerCircle={'none'}
              columnFormat={'single-column-right'}
              dotSize={0}
              innerCircle={'dot'}
              renderDetail={renderDetail}
              showTime={false}
              lineWidth={0}
            />
          </View>
            : null}
        </View>
      </Label >


    )
  }

  renderDetail = (rowData, sectionID, rowID) => {
    let title = <Text style={[styles.title]}>{rowData.month_dt} | DPD: {rowData.dpd}</Text>
    var payment = null
    var followContent = null
    const content = (
      <View style={[styles.descriptionContainer, { marginTop: 5 }]}>
        <Text style={[styles.textDescription]}>Dư nợ gốc: {moneyFormat(rowData.balance_amt)}</Text>
        <Text style={[styles.textDescription]}>Tổng nợ: {moneyFormat(rowData.debt_amt)}</Text>
      </View>
    )

    if (rowData.payment.length > 0)
      payment = (
        <View style={{ marginTop: 3 }}>
          {
            rowData.payment.map((pay, index) => {
              return (
                <View style={[styles.descriptionContainer]} key={index}>
                  <Text style={[styles.textDescription, { backgroundColor: colors.main, fontWeight: "bold" }]}>
                    Ngày {pay.pay_date.substring(8, 10)} | Thanh Toán: {moneyFormat(pay.receipt_amt)}
                  </Text>
                </View>
              )
            })
          }
        </View>
      )

    if (rowData.follow.length > 0)
      followContent = (
        <View style={{ marginTop: 3 }}>
          {
            rowData.follow.map(fol => {
              return (
                <View style={[styles.descriptionContainer]} >
                  <Text style={[styles.textDescription]}>
                    Ngày {fol.contact_time.substring(8, 10)} {fol.contact_time.substring(11, 16)} | {fol.response_code} | {fol.person_contacted} |
                  {fol.remarks}
                  </Text>
                </View>
              )
            })
          }
        </View>
      )
    return (
      <View style={{ flex: 1, backgroundColor: 'white', padding: 0 }}>
        {title}
        {content}
        {payment}
        {followContent}
      </View>
    )
  }

  const renTree = () => {
    function getIndicator(isExpanded, hasChildrenNodes, type, idno) {
      if (!hasChildrenNodes) {
        if (idno !== '') {
          return <FontAwesome name="user" size={15} color={colors.main} />
        }
        // else if (idno === '') {
        //   return <FontAwesome name="user" size={15} color={colors.danger} />
        // }
        else {
          return <FontAwesome name="user" size={15} color={colors.grey} />
        }

      }
      else if (isExpanded) {
        if (idno !== '') {
          return <Text> <FontAwesome name="caret-down" size={16} color='black' style={{ marginRight: 10 }} />  <FontAwesome name="user" size={15} color={colors.main} /></Text>
        }
        // else if (type == 'bad') {
        //   return <Text> <FontAwesome name="caret-down" size={16} color="black" style={{ marginRight: 10 }} />  <FontAwesome name="user" size={15} color={colors.danger} /></Text>
        // }
        else if (type == 'none') {
          return <Text> <FontAwesome name="caret-down" size={16} color="black" /></Text>
        }
        else {
          return <Text> <FontAwesome name="caret-down" size={16} color="black" />  <FontAwesome name="user" size={15} color={colors.grey} /></Text>
        }
      } else {
        if (idno !== '') {
          return <Text> <FontAwesome name="caret-right" size={16} color="black" style={{ marginRight: 10 }} />  <FontAwesome name="user" size={15} color={colors.main} /></Text>
        }
        // else if (type == 'bad') {
        //   return <Text> <FontAwesome name="caret-right" size={16} color="black" style={{ marginRight: 10 }} />  <FontAwesome name="user" size={15} color={colors.danger} /></Text>
        // }
        else if (type != 'none') {
          return <Text> <FontAwesome name="caret-right" size={16} color="black" style={{ marginRight: 10 }} />  <FontAwesome name="user" size={15} color={colors.grey} /></Text>
        }
      }
    }

    const handleCall = (phone) => {
      var phoneNumber = `tel:${phone}`;
      if (Platform.OS !== 'android') {
        phoneNumber = `telprompt:${phone}`;
      }
      return Linking.openURL(phoneNumber)
    }

    return <View>
      <TreeView
        data={phoneBook}
        initialExpanded={true}
        getCollapsedNodeHeight={() => { 40 }}
        renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
          return (
            <View
              style={{
                height: 40,
                marginLeft: 30 * level,
                fontSize: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Text>
                {getIndicator(isExpanded, hasChildrenNodes, node.type, node.id)} {node.name}
              </Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text style={{ color: colors.black }}>
                  {node.phone}
                </Text>
                <View style={{ color: colors.info, flexDirection: 'row', marginLeft: 10 }}>
                  {node.phone != "" ?
                    <FontAwesome name="phone" size={15} color={colors.grey}
                      onPress={() => { handleCall(node.phone) }}
                      style={{ borderWidth: 0.5, padding: 4, borderRadius: 5, marginRight: 10 }} />
                    :
                    null}
                </View>
              </View>
            </View>
          )
        }}
      />
    </View>
  }

  // ====================================================== // 

  const [dataAppl, setDataAppl] = useState([])
  const [phoneBook, setPhoneBook] = useState(BOOK)
  const [activeIndex, setActivateIndex] = useState(0);

  const setInit = () => {
    if (props.vsf.activeIdno.main_infos !== undefined) {
      const appl_id = props.vsf.activeIdno.appl_infos[activeIndex].appl_id
      const paymentsF = props.vsf.activeIdno.payment_infos.filter(pay => pay.appl_id === appl_id)
      const dpdsF = props.vsf.activeIdno.dpd_infos.filter(item => item.appl_id === appl_id)
      const followF = props.vsf.activeIdno.follow_infos.filter(follow => follow.appl_id === appl_id)
      if (dpdsF.length === 0)
        setDataAppl([])
      else {
        const payments = paymentsF.length > 0 ? paymentsF[0].value : []
        const follows = followF.length > 0 ? followF[0].value : []
        const dpds = dpdsF[0].value
        const data = []
        for (let i = 0; i < dpds.length; i++) {
          data.push(
            {
              ...dpds[i],
              payment: payments.filter(pay => pay.pay_date.substring(0, 7) === dpds[i].month_dt),
              follow: follows.filter(follow => follow.contact_time.substring(0, 7) === dpds[i].month_dt)
            }
          )
        }
        setDataAppl(data)
      }
    } else {
      setDataAppl([])
    }
  }
  useEffect(() => {
    if (props.vsf.activeIdno.main_infos !== undefined && !props.vsf.fetching)
      setPhoneBook(renPhonBook(props.vsf.activeIdno))
    setInit()
  }, [props.vsf.activeIdno]);

  useEffect(() => {
    setInit()
  }, [activeIndex]);
  if (props.vsf.fetching)
    return <Loader />
  if (props.vsf.activeIdno.main_infos === undefined)
    return (
      <View>
        <Text>Không có thông tin khách hàng</Text>
      </View>
    )
  if (!props.vsf.fetching && props.vsf.activeIdno.main_infos !== undefined)
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{
          backgroundColor: 'white',
          paddingLeft: 10
        }}>
          {renMainInfo(props.vsf.activeIdno.main_infos)}
          {renTree()}
        </View>
        <View style={{ flexDirection: 'column', marginTop: 10 }}>
          <Text style={{ color: colors.main, fontSize: 16, fontWeight: 'bold', paddingLeft: 10, marginBottom: 10 }}>Thông tin các khoản vay</Text>
          <Carousel
            layout={'default'}
            data={props.vsf.activeIdno.appl_infos}
            sliderWidth={SliderWidth}
            itemWidth={width * 0.95}
            renderItem={renApplInfo}
            useScrollView={false}
            activeSlideAlignment="center"
            onSnapToItem={(index) => {
              setActivateIndex(index)
            }}

          />
        </View>
      </ScrollView>
    )

}



const mapStateToProps = (state, ownProps) => {
  return {
    vsf: state.vsf,
    tree: state.treeCal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateShowlist: (content) => {
      dispatch(actUpdateShowlist(content))
    }
  };
}


const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 3
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  textContent: {
    fontSize: 12
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
  },
  list: {
    backgroundColor: 'white',
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 12,
    fontWeight: "bold",
  },
  title: {
    color: colors.main,
    fontSize: 18,
    fontWeight: 'bold'
  },
  descriptionContainer: {
    flexDirection: 'row',
  },

  textDescription: {
    marginLeft: 10,
    color: 'gray',
    fontSize: 10,
  },
  smalltitle: {
    fontSize: 12,
    flex: 1.2
  },
  smalltext: {
    fontSize: 12,
    flex: 1
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Skip);


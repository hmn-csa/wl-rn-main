import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import TreeView from 'react-native-final-tree-view'
import { Button } from 'react-native-paper';
import { connect } from "react-redux"
import Carousel from 'react-native-snap-carousel'
import Timeline from 'react-native-timeline-flatlist'

import { actUpdateShowlist } from "../actions"
import { MAIN_COLOR2, colors } from '../styles'
import Loader from '../components/elements/Loader'

import { moneyFormat } from '../functions';
import { DataTable } from 'react-native-paper';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 5;
const SliderWidth = Dimensions.get('screen').width;


//ion-md-remove
function getIndicator(isExpanded, hasChildrenNodes) {
  if (!hasChildrenNodes) {
    return <Ionicons name='ios-remove' />
  } else if (isExpanded) {
    return <Ionicons
      style={{
        fontWeight: "bold",
        fontSize: 20,
        color: MAIN_COLOR2
      }}
      name='ios-arrow-dropdown-circle' />
  } else {
    return <Ionicons
      style={{
        fontWeight: "bold",
        fontSize: 20,
        color: MAIN_COLOR2
      }}
      name='ios-arrow-dropright' />
  }
}

const BOOK = [
  {
    id: 'mainRef',
    name: 'mainRef',
    children: []
  },
  {
    id: 'fatherRef',
    name: 'fatherRef',
    children: []
  },
]

function Skip(props) {

  const renPhonBook = (info) => {
    const mainRef = []
    for (let i = 0; i < info.main_ref.length; i++)
      mainRef.push({
        id: info.main_ref[i].ref_phone,
        name: info.main_ref[i].ref_name,
        ref_nid_no: info.main_ref[i].ref_nid_no,
      })

    const fatherRef = []
    for (let i = 0; i < info.father_ref.length; i++)
      fatherRef.push({
        id: info.main_ref[i].ref_phone,
        name: info.father_ref[i].ref_name,
        ref_nid_no: info.father_ref[i].ref_nid_no,
      })

    return [
      {
        id: 'mainRef',
        name: 'mainRef',
        children: mainRef
      },
      {
        id: 'fatherRef',
        name: 'fatherRef',
        children: fatherRef
      },
    ]
  }

  const renMainInfo = (maininfo) => {
    return (
      <DataTable >
        <DataTable.Header>
          <DataTable.Title>Thông tin cơ bản: {maininfo.client_name}</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>CMND: {maininfo.id_no}</DataTable.Cell>
          <DataTable.Cell>Chủ hộ khẩu: {maininfo.fb_no}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Giới tính: {maininfo.gender === "Male" ? "Nam" : "Nữ"}</DataTable.Cell>
          <DataTable.Cell>Ngày sinh: {maininfo.birthday}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Học vấn: {maininfo.education}</DataTable.Cell>
          <DataTable.Cell>Hôn nhân: {maininfo.marital_status}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Nghề nghiệp: {maininfo.job_description}</DataTable.Cell>
          <DataTable.Cell>Thu nhập: {moneyFormat(maininfo.personal_income)}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell >
            <View>
              <Text style={{ fontSize: 10 }}>Tạm trú : {maininfo.address}</Text>
              <Text style={{ fontSize: 10 }}>Thường trú : {maininfo.address_per}</Text>
            </View>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell >
            <View>
              <Text style={{ fontSize: 10 }}>Công ty: {maininfo.company_name}</Text>
              <Text style={{ fontSize: 10 }}>Địa chỉ: {maininfo.address_off}</Text>
            </View>
          </DataTable.Cell>
        </DataTable.Row>

      </DataTable>
    )
  }


  const renPaymentInfo = (appl_id) => {

    const paymentsF = props.vsf.activeIdno.payment_infos.filter(pay => pay.appl_id === appl_id)
    const dpdsF = props.vsf.activeIdno.dpd_infos.filter(item => item.appl_id === appl_id)
    const followF = props.vsf.activeIdno.follow_infos.filter(follow => follow.appl_id === appl_id)

    if (dpdsF.length == 0)
      return <View></View>

    const payments = paymentsF.length > 0 ? paymentsF[0].value : []
    const follows = followF.length > 0 ? followF[0].value : []
    const dpds = dpdsF[0].value

    const data = []
    for (let i = 0; i < dpds.length; i++) {
      data.push(
        {
          ...dpds[i],
          payment: payments.filter(pay => pay.pay_date.substring(0, 7) === dpds[i].month_dt),
          follow: follows.filter(follow => follow.contact_time.substring(0, 7) === dpds[i].month_dt),
        }
      )
    }


    const renPay = (payment) => {
      return (
        <View>
          {
            payment.map(pay => {
              return (
                <Text style={{ fontSize: 10, backgroundColor: colors.green }}>
                  Ngày-{pay.pay_date.substring(8, 10)} {moneyFormat(pay.receipt_amt)}
                </Text>
              )
            })
          }
        </View>
      )
    }

    const renFollow = (follow) => {
      return (
        <View>
          {
            follow.map(fol => {
              return (
                <Text style={{ fontSize: 10, }}>
                  Ngày-{fol.contact_time.substring(8, 10)} {fol.response_code}
                </Text>
              )
            })
          }
        </View>
      )
    }

    return (
      <View style={{ margin: 10, backgroundColor: 'white', borderRadius: 10, }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Tháng</DataTable.Title>
            <DataTable.Title>Dư nợ gốc</DataTable.Title>
            <DataTable.Title>Tổng nợ</DataTable.Title>
            <DataTable.Title>DPD</DataTable.Title>
            <DataTable.Title>Payment</DataTable.Title>
            <DataTable.Title>Follow</DataTable.Title>
          </DataTable.Header>
          {
            data.map(
              item => {
                return (
                  <DataTable.Row>
                    <DataTable.Cell><Text style={{ fontSize: 10 }}>{item.month_dt}</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{ fontSize: 10 }}>{moneyFormat(item.balance_amt)}</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{ fontSize: 10 }}>{moneyFormat(item.debt_amt)}</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{ fontSize: 10 }}>{moneyFormat(item.dpd)}</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{ fontSize: 10 }}>{renPay(item.payment)}</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={{ fontSize: 10 }}>{renFollow(item.follow)}</Text></DataTable.Cell>
                  </DataTable.Row>
                )
              }
            )
          }
        </DataTable>
      </View>
    )
  }

  const renFollowInfo = (appl_id) => {
    const follow = props.vsf.activeIdno.follow_infos.filter(follow => follow.appl_id === appl_id)
  }


  const renApplInfo = ({ item, index }) => {

    // const activeAppls = applinfos.filter(appl => appl.status === 'Active')

    const statusColor = (status, appl_id) => {
      if (status === 'Active')
        return colors.green
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
        return `Loan: ${moneyFormat(item.loanamount)}`
      if (appl_id !== "")
        return `Loan: ${moneyFormat(item.loanamount)}`
      return `UW: ${moneyFormat(item.loanamount_uw)}`
    }

    const emi = (status, appl_id) => {
      if (status === 'Active')
        return `Tiền/kỳ: ${moneyFormat(item.installment)}`
      if (appl_id !== "")
        return `Tiền/kỳ: ${moneyFormat(item.installment)}`
      return `Tiền/kỳ: ${moneyFormat(item.installment)}`
    }


    return (
      <View style={{
        backgroundColor: 'white',
        padding: 0,
        borderLeftWidth: 5,
        borderRadius: 10,
        borderColor: statusColor(item.status, item.appl_id)
      }}
      >
        <DataTable>
          <DataTable.Header>
            <DataTable.Title><Text style={{ fontSize: 12 }}>{item.appl_id}</Text></DataTable.Title>
            <DataTable.Title><Text style={{ fontSize: 10 }}>Sản phẩm: {item.product_group}</Text></DataTable.Title>
            <DataTable.Title><Text style={{ fontSize: 10 }}>Lãi Suất: {item.eff_rate}%</Text></DataTable.Title>
          </DataTable.Header>
          <DataTable.Row >
            <DataTable.Cell ><Text style={{ fontSize: 10, backgroundColor: statusColor(item.status, item.appl_id) }}>
              Trạng thái: {statusText(item.status, item.appl_id)} </Text></DataTable.Cell>
            <DataTable.Cell ><Text style={{ fontSize: 10 }}>Ngày mở: {item.operate_date ? item.operate_date.substring(0, 10) : ""} </Text></DataTable.Cell>
            <DataTable.Cell ><Text style={{ fontSize: 10 }}>due: {item.first_duedate ? item.first_duedate.substring(0, 10) : ""} </Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row >
            <DataTable.Cell ><Text style={{ fontSize: 10 }}>{loan(item.status, item.appl_id)}</Text></DataTable.Cell>
            <DataTable.Cell ><Text style={{ fontSize: 10 }}>{emi(item.status, item.appl_id)}</Text></DataTable.Cell>
            <DataTable.Cell ><Text style={{ fontSize: 10 }}>Số kỳ: {item.tenor}</Text></DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>

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
            rowData.payment.map(pay => {
              return (
                <View style={[styles.descriptionContainer]}>
                  <Text style={[styles.textDescription, { backgroundColor: colors.green, fontWeight: "bold" }]}>
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
                  <Text style={[styles.textDescription, { fontSize: 10 }]}>
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
      <View style={{ flex: 1 ,backgroundColor: 'white', padding:5, borderRadius: 13, }}>
        {title}
        {content}
        {payment}
        {followContent}
      </View>
    )
  }



  // ====================================================== // 

  const [dataAppl, setDataAppl] = useState([])
  const [phoneBook, setPhoneBook] = useState(BOOK)
  const [activeIndex, setActivateIndex] = useState(0);

  useEffect(() => {
    if (props.vsf.activeIdno.main_infos && !props.vsf.fetching)
      setPhoneBook(renPhonBook(props.vsf.activeIdno))

  }, [props.vsf.activeIdno]);

  useEffect(() => {
    const appl_id = props.vsf.activeIdno.appl_infos[activeIndex].appl_id
    const paymentsF = props.vsf.activeIdno.payment_infos.filter(pay => pay.appl_id === appl_id)
    const dpdsF = props.vsf.activeIdno.dpd_infos.filter(item => item.appl_id === appl_id)
    const followF = props.vsf.activeIdno.follow_infos.filter(follow => follow.appl_id === appl_id)

    if (dpdsF.length === 0)
      return setDataAppl([])

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
    console.log(dataAppl)

  }, [activeIndex]);




  if (props.vsf.fetching)
    return <Loader />

  if (!props.vsf.fetching && props.vsf.activeIdno.main_infos)
    return (
      <View>
        <ScrollView>
          <TreeView
            data={phoneBook}
            initialExpanded={true}
            renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
              return (
                <View style={{
                  height: 40,
                  marginBottom: 4,
                  paddingBottom: 5,
                  flexDirection: 'row',
                }}
                >
                  <Text
                    style={{
                      height: 40,
                      marginLeft: 25 * level,
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {getIndicator(isExpanded, hasChildrenNodes)} {node.name} | {node.id}
                  </Text>

                </View>
              )
            }}
          />
          <View>
            {renMainInfo(props.vsf.activeIdno.main_infos)}
          </View>
          <View style={{ flexDirection: 'row', }}>
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

          {/* {renPaymentInfo(props.vsf.activeIdno.appl_infos[activeIndex].appl_id)} */}
          <Timeline
            style={styles.list}
            data={dataAppl}
            separator={false}
            circleSize={20}
            innerCircle={'dot'}
            circleColor='rgb(45,156,219)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
            timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
            descriptionStyle={{ color: 'green' }}
            renderDetail={renderDetail}
            showTime={false}
          />

        </ScrollView>

      </View>
    )

  return (
    <View>
      <Text> kh</Text>
    </View>
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

const buttonStyles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    padding: 2,
  },
  button: {
    margin: 2,
  },
});

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
  content: {
    marginLeft: 16,
    flex: 1,
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
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 10,
    
  },

  textDescription: {
    marginLeft: 10,
    color: 'gray'
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Skip);


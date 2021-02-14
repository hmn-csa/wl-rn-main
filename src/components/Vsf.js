import {
  View, Text, Image, Button, StyleSheet, ScrollView, ActivityIndicator
} from 'react-native'

import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import { styles, colors } from '../styles'

import Loader from '../components/elements/Loader'

function Vsf(props) {

  const moneyFormat = (n) => {
    //return  n.toLocaleString().split(".")[0]
    const money = parseFloat(n, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
    return money.substring(0, money.length - 2)
  }

  if (props.vsf.fetching)
    return (
      <Loader />
    )

  return (
    <ScrollView style={{ padding: 5 }}>
      <View style={[vsfStyles.blockInput]}>

        <View style={[vsfStyles.row, { borderBottomWidth: 0.4 }]}>
          <Text style={[vsfStyles.header]}>Khách hàng: {props.vsf.activeApplId.cust_name} </Text>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>CMND:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.appl_id} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Ngày sinh:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.dob} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Giới tính:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.gender} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Mobile:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.act_mobile} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Thường trú:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.reg_address} </Text>
          </View>
        </View>
        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Tạm trú:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.act_address} </Text>
          </View>
        </View>
        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Tham chiếu:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.phone_all} </Text>
          </View>
        </View>
      </View>

      <View style={vsfStyles.blockInput}>
        <View style={[vsfStyles.row, { borderBottomWidth: 0.4 }]}>
          <Text style={vsfStyles.header}>Nghề nghiệp: {props.vsf.activeApplId.job_description} </Text>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Tên công ty:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.company_name} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Địa chỉ:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.off_address} </Text>
          </View>
        </View>
      </View>

      <View style={vsfStyles.blockInput}>
        <View style={[vsfStyles.row, { borderBottomWidth: 0.4 }]}>
          <Text style={vsfStyles.header}>Hợp đồng: {props.vsf.activeApplId.appl_id} </Text>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Sản phẩm:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.product_group} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Số tài khoản:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.account_number} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Ngày giải ngân:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.disbursal_date} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Khoản vay:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.loan_amount}</Text>
          </View>
        </View>


        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Số tiền đóng/kỳ:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.installment_amount} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row, { backgroundColor: 'white' }]}>
          <View style={[styles.box]}>
            <Text>Gốc còn lại:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text style={{ color: colors.secondary }}>
              {moneyFormat(props.vsf.activeApplId.principle_outstanding)}
            </Text>
          </View>
        </View>

        <View style={[vsfStyles.row, { backgroundColor: 'white' }]}>
          <View style={[styles.box]}>
            <Text>Tổng nợ quá hạn:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text style={{ color: colors.secondary }}>
              {moneyFormat(props.vsf.activeApplId.amount_overdue)}
            </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Gốc quá hạn:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{moneyFormat(props.vsf.activeApplId.principle_overdue)}</Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Lãi quá hạn:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{moneyFormat(props.vsf.activeApplId.interest_overdue)}</Text>
          </View>
        </View>
        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Phí bảo hiểm:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{moneyFormat(props.vsf.activeApplId.insurance_fee)} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>VAT:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{moneyFormat(props.vsf.activeApplId.vat)} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Kỳ hạn:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.tenor} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>MOB181:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.mob181} </Text>
          </View>
        </View>
        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>DPD:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.dpd} </Text>
          </View>
        </View>
        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>charge off:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.charge_off_flag} </Text>
          </View>
        </View>

      </View>

      <View style={vsfStyles.blockInput}>
        <View style={[vsfStyles.row, { borderBottomWidth: 0.4 }]}>
          <Text style={vsfStyles.header}>Thông tin thanh toán</Text>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Tổng thanh toán:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{moneyFormat(props.vsf.activeApplId.total_paid)} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Tổng kỳ đóng:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.paid_term} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>Chi tiết:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.last_pay} </Text>
          </View>
        </View>
      </View>

      <View style={vsfStyles.blockInput}>
        <View style={[vsfStyles.row, { borderBottomWidth: 0.4 }]}>
          <Text style={vsfStyles.header}>Thông tin tác động</Text>
        </View>


        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text>{props.vsf.activeApplId.last_action_fv} </Text>
          </View>
        </View>
      </View>

    </ScrollView >
  )
}


const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
    vsf: state.vsf
  }
}

const vsfStyles = StyleSheet.create({
  blockInput: {
    borderBottomWidth: 0.2,
    borderBottomColor: colors.grey,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 3,
    marginBottom: 2,
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  row: {
    width: '95%',
    marginVertical: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  box: {
    justifyContent: 'center',
    flex: 1
  },
  header: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    margin: 8,
    justifyContent: 'center',
  },
});




export default connect(mapStateToProps, null)(Vsf);
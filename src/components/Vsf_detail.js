import {
  View, Text, Image, Button, StyleSheet, ScrollView, ActivityIndicator
} from 'react-native'

import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { styles, colors } from '../styles'
import Loader from './elements/Loader'
import ApplUptrail from './ApplUptrail'
import { moneyFormat } from '../functions';


function Contract(props) {
  if (props.vsf.fetching)
    return (
      <Loader />
    )
  return (
    <ScrollView style={{ padding: 5, backgroundColor: 'white' }}>
      <View style={vsfStyles.blockInput}>
        <View style={[vsfStyles.row, { borderBottomWidth: 0.4 }]}>
          <Text style={vsfStyles.header}>{props.vsf.activeApplId.appl_id} </Text>
          <Text style={[vsfStyles.header, { color: colors.success }]}>{props.vsf.activeApplId.product_group}</Text>
        </View>
        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Số tài khoản:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.account_number} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Ngày giải ngân:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.disbursal_date} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Khoản vay:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{moneyFormat(props.vsf.activeApplId.loan_amount)}</Text>
          </View>
        </View>


        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Số tiền đóng/kỳ:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{moneyFormat(props.vsf.activeApplId.installment_amount)} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={[vsfStyles.title, { color: 'red' }]}>Gốc còn lại:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text style={[vsfStyles.title, { color: 'red' }]}>
              {moneyFormat(props.vsf.activeApplId.principle_outstanding)}
            </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Tổng nợ quá hạn:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text >
              {moneyFormat(props.vsf.activeApplId.amount_overdue)}
            </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Gốc quá hạn:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{moneyFormat(props.vsf.activeApplId.principle_overdue)}</Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Lãi quá hạn:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{moneyFormat(props.vsf.activeApplId.interest_overdue)}</Text>
          </View>
        </View>
        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Phí bảo hiểm:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{moneyFormat(props.vsf.activeApplId.insurance_fee)} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>VAT:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{moneyFormat(props.vsf.activeApplId.vat)} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Kỳ hạn:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.tenor} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>MOB181:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.mob181} </Text>
          </View>
        </View>
        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text
              style={vsfStyles.title}>DPD:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.dpd} </Text>
          </View>
        </View>
        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Charge off:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.charge_off_flag} </Text>
          </View>
        </View>
      </View>
    </ScrollView >
  )
}

function Customer(props) {
  if (props.vsf.fetching)
    return (
      <Loader />
    )
  return (
    <ScrollView style={{ padding: 5, backgroundColor: 'white' }}>
      <View style={[vsfStyles.blockInput]}>
        <View style={[vsfStyles.row, { borderBottomWidth: 0.4 }]}>
          <Text style={[vsfStyles.header]}>{props.vsf.activeApplId.cust_name} </Text>
        </View>
        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>CMND:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.id_no} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Ngày sinh:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.dob} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Giới tính:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.gender} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Mobile:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.act_mobile} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Thường trú:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.reg_address} </Text>
          </View>
        </View>
        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Tạm trú:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.act_address} </Text>
          </View>
        </View>
        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Tham chiếu:</Text>
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
            <Text style={vsfStyles.title}>Tên công ty:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.company_name} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Địa chỉ:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.off_address} </Text>
          </View>
        </View>
      </View>
    </ScrollView >
  )
}

function Payment(props) {
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
    <ScrollView style={{ padding: 5, backgroundColor: 'white' }}>
      <View style={vsfStyles.blockInput}>
        <View style={[vsfStyles.row, { borderBottomWidth: 0.4 }]}>
          <Text style={vsfStyles.header}>Thông tin thanh toán</Text>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Tổng thanh toán:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{moneyFormat(props.vsf.activeApplId.total_paid)} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Tổng kỳ đóng:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.paid_term} </Text>
          </View>
        </View>

        <View style={[vsfStyles.row]}>
          <View style={[styles.box]}>
            <Text style={vsfStyles.title}>Chi tiết:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.last_pay} </Text>
          </View>
        </View>
      </View>
    </ScrollView >
  )

}

function Follow(props) {

  if (props.vsf.fetching)
    return (
      <Loader />
    )
  return (

    <ScrollView style={{ padding: 5, backgroundColor: 'white' }}>
      <View style={[vsfStyles.row, { borderBottomWidth: 0.4 }]}>
        <Text style={vsfStyles.header}>Tác động trong tháng</Text>
      </View>
      <ApplUptrail />

      <View style={[vsfStyles.row, { borderBottomWidth: 0.4 }]}>
        <Text style={vsfStyles.header}>Lịch sử tác động</Text>
      </View>
      <View style={[vsfStyles.row]}>
        <View style={[styles.box]}>
          <Text>{props.vsf.activeApplId.last_action_fv} </Text>
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
    backgroundColor: 'white',
    padding: 3,
    marginBottom: 2,
    alignItems: 'center',
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
    marginBottom: 10,
    justifyContent: 'center',
    color: colors.main
  },
  title: {
    fontWeight: 'bold'
  }
});

const Contract_com = connect(mapStateToProps, null)(Contract)
const Customer_com = connect(mapStateToProps, null)(Customer)
const Payment_com = connect(mapStateToProps, null)(Payment)
const Follow_com = connect(mapStateToProps, null)(Follow)

export {
  Contract_com,
  Customer_com,
  Payment_com,
  Follow_com
}
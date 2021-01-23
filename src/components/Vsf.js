import {
  View, Text, Image, Button, StyleSheet, ScrollView, ActivityIndicator
} from 'react-native'

import React, { useState, useEffect} from "react"
import { connect } from "react-redux"

import { styles, MAIN_COLOR2, MAIN_COLOR3 } from '../styles'

function Vsf(props){
    
  const moneyFormat = (n) => {
    //return  n.toLocaleString().split(".")[0]
    const  money = parseFloat(n, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
    return money.substring(0, money.length -2)
  }

  if (props.vsf.fetching)
    return (
      <View style={[styles.container, {alignItems: 'center'}]}>
        <Text>Loading ... </Text>
        <ActivityIndicator size="large" color={MAIN_COLOR2} />
      </View>
    )

  return (  
    <ScrollView style={{padding: 5}}>
      <View style={[styles.container, ]}>
        <View style={[styles.row, {backgroundColor: MAIN_COLOR3}]}>
          <Text style={styles.header2}>Khách hàng: {props.vsf.activeApplId.cust_name} </Text>
        </View>
      
        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>CMND:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.appl_id} </Text>
          </View>
        </View>

        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Ngày sinh:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.dob} </Text>
          </View>
        </View>    
      
        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Giới tính:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.gender} </Text>
          </View>
        </View>   

        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Mobile:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.act_mobile} </Text>
          </View>
        </View>  

        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Thường trú:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.reg_address} </Text>
          </View>
        </View>  
        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Tạm trú:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.act_address} </Text>
          </View>
        </View>  
        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Tham chiếu:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.phone_all} </Text>
          </View>
        </View>  

      </View>

      <View style={styles.container}>
        <View style={[styles.row, {backgroundColor: MAIN_COLOR3}]}>
          <Text style={styles.header2}>Nghề nghiệp: {props.vsf.activeApplId.job_description} </Text>
        </View>

        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Tên công ty:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.company_name} </Text>
          </View>
        </View>  

        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Địa chỉ:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.off_address} </Text>
          </View>
        </View>  
      </View>

      <View style={styles.container}>
        <View style={[styles.row, {backgroundColor: MAIN_COLOR3}]}>
          <Text style={styles.header2}>Hợp đồng: {props.vsf.activeApplId.appl_id} </Text>
        </View>

        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Sản phẩm:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.product_group} </Text>
          </View>
        </View>  

        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Số tài khoản:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.account_number} </Text>
          </View>
        </View>  

        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Ngày giải ngân:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.disbursal_date} </Text>
          </View>
        </View>  

        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Khoản vay:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.loan_amount}</Text>
          </View>
        </View>  

        
        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Số tiền đóng/kỳ:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.installment_amount} </Text>
          </View>   
        </View>  

        <View style={[styles.row, {backgroundColor: MAIN_COLOR3}]}>
          <View style={[styles.box]}>
            <Text>Gốc còn lại:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text style={{color: MAIN_COLOR2}}>
              {moneyFormat(props.vsf.activeApplId.principle_outstanding)}
            </Text>
          </View>   
        </View>  

        <View style={[styles.row, {backgroundColor: MAIN_COLOR3}]}>
          <View style={[styles.box]}>
            <Text>Tổng nợ quá hạn:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text style={{color: MAIN_COLOR2}}>
              {moneyFormat(props.vsf.activeApplId.amount_overdue)}
            </Text>
          </View>   
        </View>  

        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Gốc quá hạn:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{moneyFormat(props.vsf.activeApplId.principle_overdue)}</Text>
          </View>   
        </View>  

        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Lãi quá hạn:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{moneyFormat(props.vsf.activeApplId.interest_overdue)}</Text>
          </View>   
        </View>  
        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Phí bảo hiểm:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{moneyFormat(props.vsf.activeApplId.insurance_fee)} </Text>
          </View>   
        </View>  
        
        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>VAT:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{moneyFormat(props.vsf.activeApplId.vat)} </Text>
          </View>   
        </View>  

        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Kỳ hạn:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.tenor} </Text>
          </View>   
        </View>  

        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>MOB181:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.mob181} </Text>
          </View>   
        </View>  
        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>DPD:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.dpd} </Text>
          </View>   
        </View> 
        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>charge off:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.charge_off_flag} </Text>
          </View>   
        </View>  
    
      </View>
      
      <View style={styles.container}>
        <View style={[styles.row, {backgroundColor: MAIN_COLOR3}]}>
          <Text style={styles.header2}>Thông tin thanh toán</Text>
        </View>

        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Tổng thanh toán:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{moneyFormat(props.vsf.activeApplId.total_paid)} </Text>
          </View>   
        </View>  

        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Tổng kỳ đóng:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.paid_term} </Text>
          </View>   
        </View>  

        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>Chi tiết:</Text>
          </View>
          <View style={[styles.box2]}>
            <Text>{props.vsf.activeApplId.last_pay} </Text>
          </View>   
        </View>  
      </View>

      <View style={styles.container}>
        <View style={[styles.row, {backgroundColor: MAIN_COLOR3}]}>
          <Text style={styles.header2}>Thông tin tác động</Text>
        </View>


        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text>{props.vsf.activeApplId.last_action_fv} </Text>
          </View>
        </View>  
      </View>

    </ScrollView>
  )
}

 
const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
    vsf: state.vsf
  }
}


export default connect(mapStateToProps, null)(Vsf);
import React, { useState } from 'react';
import {
    Dimensions,
    View,
    TouchableOpacity
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from "react-redux"
import { FontAwesome5 } from '@expo/vector-icons';
import * as constAction from '../consts'





const DEVICE_WIDTH = Dimensions.get(`window`).width;
function Searchbar(props) {
    const [hidesearch, Sethidesearch] = useState(false);
    const [valueee, Setvalueee] = useState(true);

    return (
        props.hidesearch !== true ?
            <SearchBar
                placeholder="Tìm kiếm..."
                style={{ height: 30, backgroundColor: 'white' }}
                onChangeText={(search) => {
                    Setvalueee(search),
                        props.sendSearch(search)
                }}
                searchIcon={<TouchableOpacity onPress={() => { Sethidesearch(true), Setvalueee('') }}><FontAwesome5 name="arrow-left" size={20} color="grey" /></TouchableOpacity>}
                value={valueee}
                showCancel={true}
                lightTheme={true}
                leftIconContainerStyle={{ width: 50 }}
                cancelIcon={<TouchableOpacity onPress={() => { Sethidesearch(true), Setvalueee('') }}><FontAwesome5 name="arrow-left" size={20} color="grey" /></TouchableOpacity>}
                containerStyle={{ backgroundColor: 'white' }}
                inputContainerStyle={{ backgroundColor: 'white', width: DEVICE_WIDTH - 50, height: 30, right: 0 }}
                onCancel={() => { Sethidesearch(true), Setvalueee('') }}
                onBlur={() => { Sethidesearch(true), Setvalueee('') }}
                onSubmitEditing={() => {
                    Sethidesearch(true),
                        props.sendSearch({ valueee }.valueee)
                }}
            />
            :
            <Text>null</Text>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendSearch: (content) => {
            dispatch({
                type: constAction.SEND_VALUE_SEARCH,
                content
            })
        },
    }
}
const Searchheader = connect(null, mapDispatchToProps)(Searchbar)
export {
    Searchheader
}

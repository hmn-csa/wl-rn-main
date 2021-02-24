import React from 'react';
import {
    Dimensions,
    View,
    TouchableOpacity
} from 'react-native';
import SearchHeader from 'react-native-search-header';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { colors } from '../styles'



const DEVICE_WIDTH = Dimensions.get(`window`).width;
function Searchbar_1() {
    const searchHeaderRef = React.useRef(null);
    return (
        <View style={{ justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={() => searchHeaderRef.current.show()}>
                <MaterialIcons name="search" size={25} color={colors.main} />
            </TouchableOpacity>
            <SearchHeader
                ref={searchHeaderRef}
                placeholder='Tìm kiếm....'
                placeholderColor='gray'
                enableSuggestion={false}
                visibleInitially={true}
            />
        </View>
    );
}

export {
    Searchbar_1
}
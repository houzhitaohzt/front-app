import {Platform, StatusBar, Dimensions} from 'react-native';

const {height, scale} = Dimensions.get('window');
// const isIphoneX = Platform.OS === 'ios' && height * scale === 2436;
module.exports = {

    constant: {
        headerHeight: 65,
        ...Platform.select({
            ios: {
                // headerHeight: isIphoneX ? 85: 65,
                // statusHeight: isIphoneX ? 40: 20,
                headerHeight: 65,
                statusHeight: 20,
            },
            android: {
                statusHeight: StatusBar.currentHeight,
            }
        }),
        tabBarHeight: 49,
        headerFontSize: 17,
    },

    get mainColors (){
        return require('./colors').default;
    },

    get mainStyles (){
        return  require('./css').default;
    }
};

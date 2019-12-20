import {Dimensions} from 'react-native';

const DeviceWidth = Math.round(Dimensions.get('window').width);
const DeviceHeight = Math.round(Dimensions.get('window').height);

export {DeviceHeight,DeviceWidth};
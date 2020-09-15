import React, { Component } from 'react';
import { View, Platform, ToastAndroid } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import { DISHES } from '../shared/dishes'
import Container from '../config/navigation'
import { connect } from 'react-redux'
import { fetchDishes, fetchComments, fetchPromotions, fetchLeaders } from '../redux/ActionCreators'

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromotions: () => dispatch(fetchPromotions()),
    fetchLeaders: () => dispatch(fetchLeaders())
})
class MainComponent extends Component {
    componentDidMount() {
        this.props.fetchDishes()
        this.props.fetchComments()
        this.props.fetchPromotions()
        this.props.fetchLeaders()
        NetInfo.fetch().then(info => {
            ToastAndroid.show('Initial Network Connectivity Type ' + info.type , ToastAndroid.LONG)
        });
            NetInfo.addEventListener(this.handleConnectivityChange)
    }

    componentWillUnmount() {
        NetInfo.removeEventListener(this.handleConnectivityChange)
    }

    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
            case 'none':
                ToastAndroid.show('You are now offline!', ToastAndroid.LONG)
                break
            case 'wifi':
                ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG)
                break
            case 'cellular':
                ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG)
                break
            case 'unknown':
                ToastAndroid.show('You are now have an unknown connection!', ToastAndroid.LONG)
                break
            default:
                break
        }
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <Container />
            </View>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainComponent)
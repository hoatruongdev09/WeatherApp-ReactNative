import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default class Weather extends React.Component {
    constructor(props) {
        super(props)
        console.log("props: ", props)
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.headerContainer}>
                    <Image style={style.conditionIcon} source={{ uri: `http://openweathermap.org/img/wn/${this.props.weather.icon}@2x.png` }}></Image>
                    <Text style={style.tempText}>{this.convertToCDegree(this.props.temperature)}˚C</Text>
                </View>
                <View style={style.bodyContainer}>
                    <Text style={style.textCondition}>{this.props.weather.main}</Text>
                    <Text style={style.subTitle}>{this.props.city}</Text>
                </View>
            </View>
        )
    }
    convertToCDegree(kDegree) {
        return (kDegree - 273.15).toPrecision(2)
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7b733'
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom: 40
    },
    tempText: {
        fontSize: 48,
        color: '#fff'
    },
    conditionIcon: {
        width: screenWidth * 0.4,
        height: screenWidth * 0.4
    },
    textCondition: {
        fontSize: 48,
        color: '#fff'
    },
    subTitle: {
        fontSize: 24,
        color: '#fff'
    }
})
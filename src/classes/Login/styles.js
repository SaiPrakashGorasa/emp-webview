import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');
// define your styles
export default StyleSheet.create({
    container: {
        width : "100%",
        height : "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    subContainer: {
        width: '90%',
        height: "80%",
        position: 'absolute',
        top: 120
    },
    logoicon: {
        width: 150,
        height: 90,
        alignSelf: 'flex-start'
    },
    welComeText: {
        color: "#000000",
        fontWeight: "600",
        fontSize: 25,
        borderWidth: 1,
        borderColor: "transparent"
    },
    signInText: {
        color: "#000",
        fontSize: 20,
        fontWeight: "600",
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "transparent"
    },
    mobileNumberLabel: {
        color: "#000000",
        fontSize: 15,
        fontWeight: "500",
        marginBottom: 8
    },

    errorMssgText: {
        color: "red",
        fontSize: 14,
        fontWeight: "400"
    },

    mobileNumberTextContainer: {
        borderWidth: 1,
        borderRadius: 8,
        width: "100%",
        flexDirection: "row",
        padding: 1
    },

    countryCodeContainer: {
        marginRight: 2,
        borderColor: "#BFC4C1",
        borderRightWidth: 1,
        justifyContent: "center",
        width: "12%",
        alignItems: "center",
        height: height * 0.04,
        alignSelf: "center"
    },

    countryCodeText: {
        color: "#BFC4C1",
        fontSize: 15,
        fontWeight: "400"
    },

    mobileTextInput: {
        width: "75%",
        color: "#000",
        fontSize: 14
    },

    mobileIcon: {
        height: width * 0.061,
        width: width * 0.1,
        alignSelf: "center"
    },

    whatsAppContainer: {
        width: "90%",
        marginVertical: 10,
        alignItems: "center",
        flexDirection: "row"
    },

    whatsAppIcon: {
        height: width * 0.05,
        width: width * 0.05,
        resizeMode: "contain"
    },

    whatsUpText: {
        color: "#000",
        fontWeight: "400",
        fontSize: 13,
        marginLeft: 5
    },

    checkBoxContainer: {

        flexDirection: "row",
    },

    termsAndConditionsText: {
        width: "92%",
        color: "#000",
        fontSize: 14,
    },

    termsAndConditionText2: {
        textDecorationLine: "underline",
        color: "#DB710E",
        lineHeight: 30,
        fontSize: 13
    },

    checkBoxError: {
        color: "red",
        fontSize: 15,
        marginTop: 5
    },

    termsAndConditiosnMainContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: height * 0.008,
        width: width * 0.05,
        marginRight: 5,
        height: width * 0.053,
        borderRadius: 5,
        borderWidth: 1.8,
    },

    checkIcon: {
        height: 10,
        width: 10,
        tintColor: "#fff",
        resizeMode: "contain"
    },

});
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../colors/Colors";

const { width, height } = Dimensions.get('window');
// define your styles
export default StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
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
    signInText: {
        color: "#000",
        fontSize: 20,
        fontWeight: "600",
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "transparent"
    },

    resendOtpContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        marginTop : 10
    },

    notYetReceivedText: {
        fontSize: 14,
        fontWeight: "400",
        marginRight: 5,
        color: "#000"
    },

    resendText: {
        fontWeight: "700",
        fontSize: 14,
        color: Colors.app_theme_color
    },

    verifyContainer: {
        borderRadius: 8,
        alignSelf: "center",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        height: height * 0.06,
    },

    verify: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 17,
        lineHeight: 25
    },

    width_100_full: {
        width: "100%"
    },

    alignItems_center: {
        alignItems: 'center'
    },
    marginTop_10: {
        marginTop: 10
    }


});
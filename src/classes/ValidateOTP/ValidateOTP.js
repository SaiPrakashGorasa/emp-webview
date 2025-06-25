//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Platform, StatusBar, Image } from 'react-native';
import { translate } from '../../Localization/Localisation';
import styles from './styles';
import { Colors } from '../../colors/Colors';
import CustomButton from '../../components/CustomButton'
import { useSelector } from 'react-redux';
import simpleToast from 'react-native-simple-toast';
import CustomLoader from '../../components/CustomLoader';
import { useNavigation, CommonActions } from '@react-navigation/native';
import CustomOTP from './CustomOTP';
import ApiConfig, { STATUS_CODE_103, STATUS_CODE_SUCCESS_200 } from '../../Networks/ApiConfig';
import ApiService from '../../Networks/ApiService';
import { isNullOrEmptyNOTTrim } from '../../Utility/Utils';


// create a component
const ValidateOTP = (props) => {
    const navigation = useNavigation();
    console.log("OTPRequest", JSON.stringify(props?.route?.params?.OTPRequest))
    console.log("OTPResponse", JSON.stringify(props?.route?.params?.OTPResponse))
    const OTPRequest = props?.route?.params?.OTPRequest;
    const OTPResponse = props?.route?.params?.OTPResponse;
    const { isConnected } = useSelector(state => state.network);
    const [mobileNumber, setMobileNumber] = useState(OTPRequest?.mobileNumber || '');
    const [otp, setOtp] = useState(undefined);
    const [termsAndConditions, setTermsAndConditions] = useState(OTPRequest?.termsAndConditionsAccepted || false)
    const [successOtp, setSuccessOtp] = useState(true)
    const [timer, setTimer] = useState(120);
    const [startTimer, setStartTimer] = useState(false);
    const [resetOtp, setResetOtp] = useState(false)
    const [loader, setLoader] = useState(false)


    useEffect(() => {
        setStartTimer(true); // Start on component mount
    }, []);

    useEffect(() => {
        let countdown;
        if (startTimer && timer > 0) {
            countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
        } else if (timer === 0) {
            setStartTimer(false);
        }
        return () => clearInterval(countdown);
    }, [startTimer, timer]);

    const onCodeChanged = (code) => {
        setOtp(code)
        console.log('what is OTP code', code);
    }

    const handleResendOtp = async () => {
        if (isConnected) {
            setLoader(true)
            const postData = { mobileNumber: mobileNumber, userAcceptanceKey: 0, termsAndConditionsAccepted: termsAndConditions };
            const loginURL = ApiConfig.BASE_URL + ApiConfig.LOGIN.SENDOTP;
            setTimer(120);
            setStartTimer(true);
            const responseResult = await ApiService.post(loginURL, postData);
            console.log("responseResult", JSON.stringify(responseResult))
            if (responseResult?.statusCode == STATUS_CODE_SUCCESS_200) {
                setLoader(false)
                // navigation.navigate('ValidateOTP', { OTPResponse: responseResult?.response })
            }
            else if (responseResult?.statusCode == STATUS_CODE_103) {
                setLoader(false)
            }
            else {
                setLoader(false)
                simpleToast.show(!isNullOrEmptyNOTTrim(responseResult?.message) ? responseResult?.message : translate('Something_went_wrong'));
            }
        }
        else {
            setLoader(false)
            simpleToast.show(translate('no_internet_connected'));
        }

    };

    const handleNavigate = async () => {
        if (otp.length === 6) {
            if (isConnected) {
                setLoader(true)
                const postData = { mobileNumber: mobileNumber, otp: otp, optInForWhatsApp: false, termsAndConditionsAccepted: termsAndConditions };
                const VALIDATEOTPURL = ApiConfig.BASE_URL + ApiConfig.LOGIN.VALIDATEOTP;
                const responseResult = await ApiService.post(VALIDATEOTPURL, postData);
                console.log("responseResult", JSON.stringify(responseResult))
                if (responseResult?.statusCode == STATUS_CODE_SUCCESS_200) {
                    setLoader(false)
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'HomeScreen' }],
                        })
                    );
                }
                else {
                    setLoader(false)
                    simpleToast.show(!isNullOrEmptyNOTTrim(responseResult?.message) ? responseResult?.message : translate('Something_went_wrong'));
                }
            }
            else {
                setLoader(false)
                simpleToast.show(translate('no_internet_connected'));
            }
        }
        else {
            setLoader(false)
            simpleToast.show(translate('invalid_otp'));
        }

    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.container}
                resizeMode='stretch'
                source={require('../../assets/Images/backgroundImg.png')}>

                {Platform.OS === 'android' && (<StatusBar backgroundColor={Colors.app_theme_color} />)}

                <View style={styles.subContainer}>
                    <Image
                        style={styles.logoicon}
                        resizeMode='contain'
                        source={require('../../assets/Images/ic_logo_beej.png')} />

                    <Text style={styles.signInText}>{translate("verify_otp")}</Text>


                    <View style={[styles.width_100_full, styles.alignItems_center]}>
                        <CustomOTP otpKeyBoardVisibe={successOtp} resetOTP={resetOtp} onEndEditting={(otp) => { onCodeChanged(otp) }} />
                        <View style={styles.resendOtpContainer}>
                            <Text style={styles.notYetReceivedText}>
                                {translate('not_received_code')}
                            </Text>
                            {timer > 0 ? (
                                <Text style={[styles.resendText]}>
                                    {`${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`}
                                </Text>
                            ) : (
                                <Text
                                    style={[styles.resendText]}
                                    onPress={handleResendOtp}
                                >
                                    {translate('resend_code')}
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={[styles.width_100_full, styles.alignItems_center, styles.marginTop_10]}>
                        <CustomButton
                            btnText={translate("verify")}
                            btnWidth={"90%"}
                            btnHeight={45}
                            btnRadius={6}
                            btnColor={Colors.app_theme_color}
                            textColor={Colors.white_color}
                            borderColor={Colors.app_theme_color}
                            borderWidth={0.5}
                            fontSize={14}
                            marginTop={10}
                            onPress={() => handleNavigate()}
                        />
                    </View>

                </View>
            </ImageBackground>

            {loader && <CustomLoader visible={loader} />}
        </View>

    );
};

export default ValidateOTP;

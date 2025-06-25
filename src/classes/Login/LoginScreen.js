//import liraries
import React, { Component, useState } from 'react';
import { View, Text, ImageBackground, Platform, StatusBar, TouchableOpacity, TextInput, Image } from 'react-native';
import { translate } from '../../Localization/Localisation';
import styles from './styles';
import { Colors } from '../../colors/Colors';
import CustomButton from '../../components/CustomButton'
import { useSelector } from 'react-redux';
import simpleToast from 'react-native-simple-toast';
import CustomLoader from '../../components/CustomLoader';
import ApiConfig, { STATUS_CODE_103, STATUS_CODE_SUCCESS_200 } from '../../Networks/ApiConfig';
import { useNavigation } from '@react-navigation/native';
import ApiService from '../../Networks/ApiService';
import { isNullOrEmptyNOTTrim } from '../../Utility/Utils';
import CustomAlert from '../../Modals/CustomAlert';


// create a component
const LoginScreen = () => {
    const navigation = useNavigation();
    const { isConnected } = useSelector(state => state.network);
    const [mobileNumber, setMobileNumber] = useState('');
    const [error, setError] = useState('');
    const [checkedWA, setCheckedWA] = useState(true);
    const [loader, setLoader] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const handleNavigate = async (type) => {
        if (mobileNumber.length === 0) {
            setError(translate("Mobile_number_is_required"));
            return;
        } else if (mobileNumber.length < 10) {
            setError(translate("Mobile_number_must_be_digits"));
            return;
        }
        else {
            if (isConnected) {
                setLoader(true)
                const postData = { mobileNumber: mobileNumber, userAcceptanceKey: type || 0, termsAndConditionsAccepted: checkedWA };
                const loginURL = ApiConfig.BASE_URL + ApiConfig.LOGIN.SENDOTP;
                const responseResult = await ApiService.post(loginURL, postData);
                console.log("responseResult", JSON.stringify(responseResult))
                if (responseResult?.statusCode == STATUS_CODE_SUCCESS_200) {
                    setLoader(false)
                    navigation.navigate('ValidateOTP', { OTPRequest : postData, OTPResponse: responseResult?.response })
                }
                else if (responseResult?.statusCode == STATUS_CODE_103) {
                    setAlertTitle(translate('alert'))
                    setAlertMessage(!isNullOrEmptyNOTTrim(responseResult?.message) ? responseResult?.message : translate('alreadyLoggedMessage'))
                    setLoader(false)
                    setAlertVisible(true)
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
    }

    const handleOnChangeMobileNum = (text) => {
        const cleanedText = text.replace(/[^0-9]/g, '').replace(/^[^6-9]+/, '');
        setMobileNumber(cleanedText);
        setError('');
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

                    <Text style={styles.welComeText}>{translate("welcome")}</Text>
                    <Text style={styles.signInText}>{translate("lets_sign_you_in")}</Text>
                    <View>
                        <Text style={styles.mobileNumberLabel}>{translate('mobile_number')}</Text>
                        <View style={[styles.mobileNumberTextContainer, { borderColor: error ? Colors.app_theme_color : "#BFC4C1", }]}>
                            <View style={styles.countryCodeContainer}>
                                <Text style={styles.countryCodeText}>{translate('+91')}</Text>
                            </View>
                            <TextInput
                                placeholder={translate('enter_your_mobile_number')}
                                placeholderTextColor={"#BFC4C1"}
                                maxLength={10}
                                keyboardType="phone-pad"
                                style={styles.mobileTextInput}
                                value={mobileNumber}
                                onChangeText={handleOnChangeMobileNum}
                            />
                            <Image resizeMode="contain" style={styles.mobileIcon} source={require("../../assets/Images/mobileIconImg.png")} />
                        </View>

                    </View>
                    {error ? <Text style={styles.errorMssgText}>{error}</Text> : null}
                    <View style={styles.whatsAppContainer}>
                        <TouchableOpacity onPress={() => { setCheckedWA(checkedWA) }}>
                            <Image style={styles.whatsAppIcon} source={require("../../assets/Images/whatsAppIconImg.png")} />
                        </TouchableOpacity>
                        <Text style={styles.whatsUpText}>
                            {translate('optInForWhatsApp')}
                        </Text>
                    </View>
                    <View style={styles.checkBoxContainer}>
                        <View style={[styles.termsAndConditiosnMainContainer, { backgroundColor: Colors.app_theme_color, borderColor: Colors.app_theme_color, }]}>
                            <Image style={styles.checkIcon} source={require("../../assets/Images/correctTickIcon.png")} />
                        </View>
                        <Text style={styles.termsAndConditionsText}>
                            {translate('bySigningText')}{' '}<Text onPress={() => Linking.openURL(`https://subeejkisan.com/termsAndConditions?languageId=${languageSetId}&companyCode=&ProgramName=`)} style={styles.termsAndConditionText2}>{translate('termsConditions')}</Text> {translate("and")}{' '}
                            <Text onPress={() => Linking.openURL(`https://subeejkisan.com/privacy?languageId=${languageSetId}`)} style={styles.termsAndConditionText2}>{translate('privacyPolicy')}</Text>
                        </Text>
                    </View>

                    <CustomButton
                        btnText={translate("Request_OTP")}
                        btnWidth={"100%"}
                        btnHeight={45}
                        btnRadius={6}
                        btnColor={Colors.app_theme_color}
                        textColor={Colors.white_color}
                        borderColor={Colors.app_theme_color}
                        borderWidth={0.5}
                        fontSize={14}
                        marginTop={10}
                        onPress={() => handleNavigate(0)}
                    />
                </View>
            </ImageBackground>

            {loader && <CustomLoader visible={loader} />}
            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                leftButtonVisible={true}
                leftButtonText={translate('cancel')}
                leftButtonColor="#6c757d"
                onLeftButtonPress={() => setAlertVisible(false)}
                rightButtonVisible={true}
                rightButtonText={translate('proceed')}
                rightButtonColor={Colors.app_theme_color}
                onRightButtonPress={()=>handleNavigate(1)}
            />
        </View>

    );
};

export default LoginScreen;

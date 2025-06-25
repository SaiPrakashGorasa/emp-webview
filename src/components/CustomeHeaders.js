import { View, Text,StyleSheet,SafeAreaView,Image,Dimensions, TouchableOpacity,StatusBar, Platform } from 'react-native'
const {height,width}=Dimensions.get("window")
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CustomHeaders=({headersTitle,backBtnHandle,bgColor})=>{
    const navigation=useNavigation()
    const handleBack = () => {
        if (backBtnHandle) {
            backBtnHandle();
        } else {
            navigation.goBack(); // default behavior
        }
    };
    return(
        <View style={[styles.headersContainer,{ backgroundColor: bgColor || "#ED3237"}]}>
            {Platform.OS==="android"&&<StatusBar backgroundColor={bgColor || "#ED3237"}/>}
            <SafeAreaView>
                <View style={styles.headersSubContainer}>
                    <TouchableOpacity onPress={()=>backBtnHandle()}>
                        <Image source={require("../assets/Images/ScreenBackIcon.png")} style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headersTitleText}>{headersTitle}</Text>
                    <View style={styles.dummyContainer} />
                </View>
            </SafeAreaView>
            <Image style={styles.headersFlowerImg} source={require("../assets/Images/headersFlowerIcon.png")}/>
        </View>

    )
}

const styles=StyleSheet.create({
    headersContainer:{
        // backgroundColor:"#ED3237",
        width:"100%",
        paddingHorizontal:10,
        height:"12.5%",
        alignItems:"center",justifyContent:"center"
    },
    headersSubContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%",
    },
    headersTitleText:{
        color:"#fff",
        fontWeight:"500",
        fontSize:17,
        lineHeight:25
    },
    headersFlowerImg:{
        width:80,
        height:50,
        resizeMode:"contain",
        alignSelf:"flex-end",
        position:"absolute",
        top:height*0.061
    },
    backIcon:{
        height:40,
        width:40,
        resizeMode:"contain",
    },
    dummyContainer:{
        width: 40,
        height: 40
    }


})

export default CustomHeaders

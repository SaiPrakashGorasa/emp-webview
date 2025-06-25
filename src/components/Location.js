import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Platform,
    TouchableOpacity,
    Image,
    Text,
    Alert,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CustomButton from "./CustomButton";
// import { BuildStyleOverwrite } from "../assets/style/BuildStyle";
// import MapplsGL from 'mappls-map-react-native';
import CustomLoader from "./CustomLoader";
import { translate } from "../Localization/Localisation";
import Geolocation from "@react-native-community/geolocation";
import { MAP_MY_INDIA_URL } from "../Networks/ApiConfig";


// Mappls keys setup
// MapplsGL.setMapSDKKey("hgxmpb6gldoe2jb2r3upyje5rej6v72p");
// MapplsGL.setRestAPIKey("5zf2txekry89tciw19sgmjpo7w133ioj");
// MapplsGL.setAtlasClientId("qwj3TMxdzY7SIXZq8s3A4xDzY3LBjO3xAepnlJFBOjA_DQ7xzJWYtgfi1mKTFeTCLePMnWjzcGfP3PeOP6QozA==");
// MapplsGL.setAtlasClientSecret("NdJUAD9O1c0LyinGBY0q0A17p-U96zMmvmehrrw4OVI91FWsWwBD2VCd3HVpTBawIi_g0BxxNireuLAJZpwie4283oO0mRYf");

// const styles = BuildStyleOverwrite(Styles);

const Location = ({ route }) => {
    console.log("checaking=-=-=->", route.params.address)
    const getCompanyStyles = useSelector(state => state.companyStyles.companyStyles);
    // const {
    //     latitude = 17.4483,
    //     longitude = 78.3915
    //   } = useSelector((state) => state.location || {});
    const { latitude, longitude } = route?.params?.coordinates;
    const isConnected = useSelector(state => state.network?.isConnected ?? false);
    const [isMapReady, setIsMapReady] = useState(false);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const [locallatitudes, setLocalLatitudes] = useState(0);
    let [addLoader, setAddLoader] = useState(false)
    const [locallongitudes, setLocalLongitudes] = useState(0);
    const [latitudes, setLatitudes] = useState(null);
    const [longitudes, setLongitudes] = useState(null);
    const [initialLatitudes, setinitialLatitudes] = useState(null);
    const [initialLongitudes, setInitialLongitudes] = useState(null);
    const [address, setAddress] = useState(route?.params?.address || '');
    const [isMap, setIsMap] = useState(!address);
    const [screen, setScreen] = useState(route?.params?.screeName);
    const [pinDance, setPinDance] = useState(false);
    const [loading, setLoading] = useState(false);
    const cameraRef = useRef(null);
    const { width, height } = Dimensions.get('window');
    const companyStyle = getCompanyStyles;
    const navigation = useNavigation();
    const [hasCentered, setHasCentered] = useState(false);
    let [wholeData, setWholeData] = useState(null)

    const [primaryColor, setPrimaryColor] = useState(route?.params?.primaryColor ?? companyStyle?.value?.primaryColor);
    const [secondaryColor, setSecondaryColor] = useState(route?.params?.secondaryColor ?? companyStyle?.value?.secondaryColor);
    const [textColor, setTextColor] = useState(route?.params?.textColor ?? companyStyle?.value?.textColor);
    const [dynamicStyles, setDynamicStyles] = useState(getCompanyStyles);

    const [markerLat, setMarkerLat] = useState(null);
    const [markerLng, setMarkerLng] = useState(null);

    const [newLat,setNewLat]=useState(null)
    const [newLong,setNewLong]=useState(null)



    const centerMap = (longi, lati) => {
        // if (!cameraRef?.current || !longi || !lati || isUserInteracting) return;
        console.log("called3=-=-=-3", longi, lati)
        cameraRef.current?.setCamera({
            centerCoordinate: [longi, lati],
            zoomLevel:15,
            animationDuration: 1000,
        });
    };

    useEffect(() => {
        setLoading(true)
        onMapLoad();

        // setTimeout(() => {
        // }, 200);
    }, [])
    useFocusEffect(
        React.useCallback(() => {
            console.log('screen focused', route?.params);
            fetchCurrentLocation()
            setHasCentered(false); // reset on screen focus

            if (route?.params?.address && route?.params?.coordinates?.latitude && route?.params?.coordinates?.longitude) {
                setIsMap(false);
                setAddress(route.params.address);
                setLatitudes(route.params.latitude);
                setLongitudes(route.params.longitude);
                setinitialLatitudes(route.params.latitude);
                setInitialLongitudes(route.params.longitude);
                setMarkerLat(route.params.latitude);
                setMarkerLng(route.params.longitude);
                setLoading(false);
            } else {
                setIsMap(true);
                if (latitude && longitude) {
                    setLatitudes(latitude);
                    setLongitudes(longitude);
                    setinitialLatitudes(latitude);
                    setInitialLongitudes(longitude);
                    setMarkerLat(latitude);
                    setMarkerLng(longitude);
                    setLoading(false);
                }
            }

            return () => {
                console.log('Screen is no longer focused!');
            };
        }, [isConnected, route?.params])
    );


    const goSignup = () => {
        navigation.goBack();
    };

    const onMapLoad = () => {
        setIsMapReady(true);
        console.log(latitude, longitude, "from on map load");

        if (hasCentered) return;

        if (route.params?.latitude && route.params?.longitude) {
            console.log("calledOne=-=-=1")
            centerMap( route.params?.longitude,route.params?.latitude);
            // centerMap(route.params.latitude, route.params.longitude);
            setMarkerLat(route.params.latitude);
            setMarkerLng(route.params.longitude);
            setLoading(false);
            setHasCentered(true);
        } else if (latitude && longitude) {
            console.log("calledOne=-=-=2")
            centerMap(longitude,latitude);
            setMarkerLat(latitude);
            setMarkerLng(longitude);
            setLoading(false);
            setHasCentered(true);
        }
    };





    const fetchCurrentLocation=()=>{
          Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log("currentLatitudeLongitude-0=-=->",typeof latitude,longitude)
        // dispatch(setLocationActions({ latitude, longitude }));
        setNewLat(latitude);
        setNewLong(longitude);
      },
      error => {
        console.error('Error fetching location:', error);
        if (error.code === 3 || error.code === 2) {
          // Retry with higher accuracy
          Geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
        //          setNewLat(latitude);
        // setNewLong(longitude);
            //   dispatch(setLocationActions({ latitude, longitude }));
            //   setLatitude(latitude);
            //   setLongitude(longitude);
            },
            fallbackError => {
              console.error('Fallback location error:', fallbackError);
              // SimpleToast.show(translate('Fallback_failed_Please_check_GPS_settings'));
            },
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
          );
        } else {
          // SimpleToast.show(translate('Fallback_failed_Please_check_GPS_settings'));
        }
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 5000 }
    );
    }

    const onMapError = (error) => {
        console.log('Map error:', error);
    };

    const onMapRegionChange = (event) => {
        if (!isUserInteracting) return;
        const [longitude, latitude] = event?.geometry?.coordinates || [];
        setLocalLatitudes(latitude);
        setLocalLongitudes(longitude);
    };

    const onRegionWillChange = () => {
        setIsUserInteracting(true);
    };

    const onRegionDidChange = () => {
        setIsUserInteracting(false);
        setLatitudes(locallatitudes);
        setLongitudes(locallongitudes);
        setMarkerLat(locallatitudes);
        setMarkerLng(locallongitudes);
        console.log(locallatitudes, locallongitudes, "marker updated on map");
    };

    const handleBackToCurrentLocation = () => {
        setPinDance(false);
        cameraRef.current?.setCamera({
            centerCoordinate: [newLong,newLat],
            zoomLevel: 15,
            animationDuration: 1000,
        });
    };

    const reverseGeocode = async (latitude, longitude) => {
        const url = MAP_MY_INDIA_URL;
        setAddLoader(true)
        try {
            let urll = `${url}?lat=${latitude}&lng=${longitude}`
            const res = await fetch(urll);
            const response = await res.json();
            setAddLoader(false)
            return response;
        } catch (err) {
            console.error('Reverse geocode error:', err);
            return null;
        }
    };

    const handlePickLocation = async () => {
        if (!isMap) {
            setIsMap(true);
            return;
        }

        const data = await reverseGeocode(locallatitudes, locallongitudes);
        if (data?.results?.length > 0) {
            const place = data.results[0];

            if (place?.formatted_address) {
                console.log('✅ Valid place selected:', place?.formatted_address);
                setAddress(place?.formatted_address);

                if (locallatitudes && locallongitudes && place?.formatted_address) {
                    navigation.navigate(screen, {
                        latitude: locallatitudes,
                        longitude: locallongitudes,
                        address: place.formatted_address,
                    });
                }
            } else {
                Alert.alert(translate('Invalid_Selection'), translate('valid_location'));
            }
        } else {
            Alert.alert("Error", "Failed to get address from location.");
        }
    };
    return (
//         <>
//             <View
//                 style={{
//                     backgroundColor: screen === 'SignUp' ? primaryColor : dynamicStyles?.primaryColor,
//                     paddingStart: 20,
//                     paddingEnd: 20,
//                     paddingBottom: 20,
//                     borderBottomStartRadius: 10,
//                     borderBottomEndRadius: 10,
//                     paddingTop: Platform.OS === 'ios' ? 60 : 20,
//                 }}
//             >
//                 <TouchableOpacity style={styles['flex_direction_row']} onPress={goSignup}>
//                     <Image
//                         style={{
//                             tintColor: screen === 'SignUp' ? secondaryColor : dynamicStyles?.secondaryColor,
//                             height: 15,
//                             width: 20,
//                             top: 5,
//                         }}
//                         source={require('../../assets/Images/BackIcon.png')}
//                     />
//                     <Text
//                         style={[
//                             styles['margin_left_10'],
//                             {
//                                 color: screen === 'SignUp' ? secondaryColor : dynamicStyles?.secondaryColor,
//                             },
//                             styles['font_size_18_bold'],
//                         ]}
//                     >
//                         {translate('Map')}
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//             <View style={{ flex: 1 }}>
//                 {loading ? (
//                     <ActivityIndicator />
//                 ) : (
//                     <MapplsGL.MapView
//                         style={{ flex: 1 }}
//                         onDidFinishLoadingMap={onMapLoad}
//                         onMapError={onMapError}
//                         onRegionIsChanging={onMapRegionChange}
//                         onRegionWillChange={onRegionWillChange}
//                         onRegionDidChange={onRegionDidChange}
//                         zoomEnabled={isMap}
//                         scrollEnabled={isMap}
//                         rotateEnabled={isMap}
//                     >
//                         <MapplsGL.Camera
//                             ref={cameraRef}
//                             zoomLevel={8}
//                             animationDuration={1000}
//                         />
//                         <MapplsGL.UserLocation visible={true} showsUserHeadingIndicator={true} />
//                     </MapplsGL.MapView>
//                 )}
//             </View>

//             {isMapReady && !loading && newLat !== null && newLong !== null && (
//                 <TouchableOpacity
//                     disabled={!isMap}
//                     onPress={() => {
//                         handleBackToCurrentLocation();
//                         setPinDance(true);
//                     }}
//                     style={{
//                         position: 'absolute',
//                         bottom: 100,
//                         right: 20,
//                         alignItems: "center",
//                         justifyContent: "center",
//                         backgroundColor: screen === 'SignUp' ? primaryColor : dynamicStyles?.primaryColor,
//                         height: 60,
//                         width: 60,
//                         borderRadius: 60,
//                     }}
//                 >
//                     <Image
//                         tintColor={dynamicStyles.secondaryColor}
//                         source={require('../../assets/Images/gps.png')}
//                         style={{ height: 30, width: 30, resizeMode: "contain" }}
//                     />
//                 </TouchableOpacity>
//             )}
// {/* 
//             {!isMapReady &&
//                 <CustomLoader
//                     loading={!isMapReady}
//                     uriSent={true}
//                     message={translate('please_wait_location_data')}
//                     loaderImage={route.params.loaderPath}
//                 />
//             } */}
//             {!loading && (
//                 <View style={[
//                     sheetStyles.centeredView,
//                     {
//                         left: (width - 40) / 2,
//                         top: (height - (Platform.OS == 'ios' ? 0 : 20)) / 2,
//                     }
//                 ]}>
//                     <Image
//                         source={require('../../assets/Images/locationImgIcon.png')}
//                         style={{ height: 40, width: 40, resizeMode: "contain" }}
//                     />
//                 </View>
//             )}

//             {isMapReady && !loading &&
//                 <View style={[styles['width_100%'], { position: "absolute", bottom: 20, zIndex: 100 }]}>
//                     {/* <CustomButton
//                         title={isMap ? translate('save') : translate('edit')}
//                         buttonBg={screen === 'SignUp' ? primaryColor : dynamicStyles?.primaryColor}
//                         btnWidth={'90%'}
//                         enableLoader={addLoader}
//                         titleTextColor={screen === 'SignUp' ? secondaryColor : dynamicStyles?.secondaryColor}
//                         onPress={handlePickLocation}
//                     /> */}
//                 </View>}
//         </>
<Text>hello</Text>
    );
};

const sheetStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Location;
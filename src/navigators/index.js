import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
    SplashScreen, WelcomeScreen,
    SigninScreen, SignupScreen, ForgotPasswordScreen,
    RegisterPhoneScreen, VerificationScreen, HomeScreen
} from "../screens";
import { useDispatch, useSelector } from "react-redux";
import { GeneralAction } from "../actions";

const Stack = createStackNavigator()




const Navigators = () => {

    const { isFirstTimeUse, isAppLoading, token } = useSelector(state => state.generalState)
    console.log(`token ${token}`);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(GeneralAction.appStart())
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAppLoading ? (
                    <Stack.Screen name="Splash" component={SplashScreen} />
                ) : !token || token === null || token === '' ? (
                    <>
                        {isFirstTimeUse && (
                            <Stack.Screen name="Welcome" component={WelcomeScreen} />
                        )}

                        <Stack.Screen name="Singin" component={SigninScreen} />
                        <Stack.Screen name="Signup" component={SignupScreen} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                        <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
                        <Stack.Screen name="Verification" component={VerificationScreen} />
                    </>) : (<>
                        <Stack.Screen name="Home" component={HomeScreen} />

                    </>)}



            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default Navigators
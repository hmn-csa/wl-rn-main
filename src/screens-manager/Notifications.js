import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { connect } from "react-redux";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});



function Notify(props) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  


  useEffect(() => {
    if (props.staff.notCheckin !== null ) {  // && props.staff.notCheckin !== 0
      Notifications.scheduleNotificationAsync({
        content: {
          title: `Có ${props.staff.notCheckin} nhân viên chưa thực hiện Checkin 📬`,
          body: `hãy nhắc nhở nhân viên nào !!!`,
        },
        trigger: { seconds: 2 },
      });
    }
  }, [props.staff.notCheckin])

  return (
    <View>
    </View>
  );
}

async function schedulePushNotification(le) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Có ${le} nhân viên chưa thực hiện Checkin📬`,
      body: "hãy nhắc nhở nhân viên nào !!!",
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token.token.access,
    staff: state.staff,
  }
}


export default connect(mapStateToProps, null)(Notify);


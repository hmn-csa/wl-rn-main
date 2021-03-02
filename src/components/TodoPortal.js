import React, { useState, useEffect } from "react";

import {
  FlatList,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { styles as masterStyle, colors } from "../styles";
import Swipeout from "react-native-swipeout";
import { Button, Divider, Text, List, Colors } from "react-native-paper";

const { width, height } = Dimensions.get("window");

export default function TodoPortal(props) {
  const [isAddCamVisible, setAddCamVisible] = useState(false);
  const [campaign, setCampaign] = useState([
    { id: 1, value: "Week 1" },
    { id: 2, value: "Week 2" },
    { id: 3, value: "Week 3" },
    { id: 4, value: "Week 4" },
  ]);
  const [inputCam, setinputCam] = useState("");

  const newCampaign = () => {
    setCampaign((currentCam) => [
      ...currentCam,
      { id: Math.random().toString(), value: inputCam },
    ]);
    setAddCamVisible(false);
  };

  const onDeleteCampaign = (CampaignID) => {
    setCampaign((currentCam) =>
      currentCam.filter((Cam) => Cam.id != CampaignID)
    );
  };

  let textInput;
  const renderItem = ({ item }) => {
    const swipeoutBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        onPress: () => {
          onDeleteCampaign(item.id);
        },
      },
    ];
    return (
      <Swipeout right={swipeoutBtns}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => console.log("touch list", item.id, item.value)}
        >
          <View>
            <List.Item
              style={styles.listitemstyle}
              title={item.value}
              left={() => <List.Icon color={Colors.blue500} icon="calendar" />}
            />
            <Divider />
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{ height: height }}
      keyboardVerticalOffset={1}
    >
      <ScrollView
        style={{
          backgroundColor: "white",
          flex: 1,
        }}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
      >
        <View style={{ flex: 1, paddingBottom: 20 }}>
          <TouchableOpacity onPress={() => setAddCamVisible(!isAddCamVisible)}>
            <View>
              <List.Item
                style={styles.listitemstyle}
                title="Tạo Campaign"
                left={() => (
                  <List.Icon
                    color={Colors.blue500}
                    style={{ backgroundColor: "grey" }}
                    icon="plus"
                  />
                )}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 5, paddingBottom: 50 }}>
          <FlatList
            keyExtractor={(item) => item.id} //how to generate custom key , if not key is used on the objects ( for example we use id )
            data={campaign}
            renderItem={renderItem}
          ></FlatList>
        </View>

        <Modal
          visible={isAddCamVisible}
          animationType="slide"
          onShow={() => {
            textInput.focus();
          }}
        >
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="New Campaign"
              style={styles.input}
              onChangeText={(text) => setinputCam(text)}
              ref={(input) => (textInput = input)}
            />
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                style={[
                  styles.button,
                  {
                    width: "35%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  },
                ]}
                labelStyle={[styles.buttonLabel, { color: colors.secondary }]}
                onPress={newCampaign}
              >
                Thêm
              </Button>
              <Button
                mode="contained"
                style={[
                  styles.button,
                  {
                    width: "35%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  },
                ]}
                labelStyle={[styles.buttonLabel, { color: colors.secondary }]}
                onPress={() => setAddCamVisible(!isAddCamVisible)}
              >
                Huỷ
              </Button>
            </View>
          </View>
        </Modal>

        <View style={{ flex: 1 }}>
          <Button
            mode="contained"
            style={[
              styles.button,
              {
                width: "45%",
                marginLeft: "auto",
                marginRight: "auto",
              },
            ]}
            labelStyle={[styles.buttonLabel, { color: colors.secondary }]}
            onPress={() => {
              props.cancel();
            }}
          >
            Huỷ
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: "white",
    borderColor: colors.grey,
    borderWidth: 0.3,
  },

  listitemstyle: {
    backgroundColor: "white",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  input: {
    width: "70%",
    borderColor: "black",
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    paddingTop: 30,
  },
});
// export default connect(mapStateToProps, mapDispatchToProps)(RemarkPortal);

// export default RemarkPortal;

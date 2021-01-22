
import { StyleSheet } from 'react-native'
import colors from './colors'
const MAIN_COLOR1 = "#003f5c"
const MAIN_COLOR2 = "#fb5b5a"
const MAIN_COLOR3 = "#dee2e6"
const BACKGROUND_LOGIN = "white"
const BACKGROUND_COLOR = '#FFFFFF'


const styles = StyleSheet.create({
  boxinfodevice: {
    padding: 20,
  },
  checkbox: {
    alignSelf: "center",
    fontSize: 10
  },
  alertlogin: {
    width: "85%",
    height: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left',
    paddingLeft: 50,
    marginBottom: 10,
    backgroundColor: 'rgba(220,53,69,0.2)',
    color: 'red'
  },
  logologin: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 120,
    height: 80,
    marginTop: -60,
    marginBottom: 10
  },
  bglogin: {
    flex: 1,
    width: '100%',
    resizeMode: "cover",
    justifyContent: "center",
  },
  boxlogin: {
    height: 'auto',
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 150,
    paddingTop: 30,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 1
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  box2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  header: {
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 10,
    margin: 8,
    justifyContent: 'center',
    color: colors.primary,
  },
  header2: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    margin: 8,
    justifyContent: 'center',
    color: colors.primary,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 15,
    color: colors.secondary,
    padding: 3,
  },
  sologan: {
    fontWeight: "bold",
    fontSize: 30,
    color: colors.light,
    opacity: 0.7,
    padding: 10,
    paddingBottom: 30,
  },
  iconinput: {
    position: 'absolute',
    backgroundColor: colors.info,
    width: 40,
    height: 40,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: "center",
  },
  inputView: {
    width: "85%",
    backgroundColor: colors.light,
    height: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    justifyContent: "center",
    padding: 20,
    paddingLeft: 50,
    borderRadius: 5,
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  inputViewRemark: {
    width: "90%",
    backgroundColor: colors.secondary,
    borderRadius: 5,
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputViewConst: {
    width: "90%",
    backgroundColor: colors.secondary,
    borderRadius: 5,
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  // Login
  loginBtn: {
    width: "85%",
    marginLeft: 'auto',
    marginRight: '7.5%',
    marginTop: 10,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  },
  inputText: {
    height: 50,
  },
  inputTextBlack: {
    height: 50,
    color: "black"
  },

})



export {
  styles,
  colors,
  MAIN_COLOR1,
  MAIN_COLOR2,
  MAIN_COLOR3,
  BACKGROUND_LOGIN,
  BACKGROUND_COLOR,
}
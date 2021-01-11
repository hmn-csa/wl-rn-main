
import { StyleSheet } from 'react-native'
import colors from './colors'
const MAIN_COLOR1 = "#003f5c"
const MAIN_COLOR2 = "#fb5b5a"
const MAIN_COLOR3 = "#dee2e6"
const BACKGROUND_LOGIN =  "white"
const BACKGROUND_COLOR =  '#edeff3'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#edeff3', 
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
  indexValue: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 30,
    paddingTop: 2,
    color: colors.black,
  },
  indexValueSmall: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 2,
    color: colors.black
  },
  indexLabel: {
    textAlign: 'center', // <-- the magic
    fontSize: 10,
    paddingBottom: 2,
  },

  logo:{
    fontWeight:"bold",
    fontSize:15,
    color: colors.secondary,
    padding: 3,
  },
  sologan :{
    fontWeight:"bold",
    fontSize:50,
    color: colors.secondary,
    padding: 3,
  },
  inputView:{
    width:"80%",
    backgroundColor: colors.primary,
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputViewRemark:{
    width:"90%",
    backgroundColor: colors.secondary,
    borderRadius:5,
    height:40,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
  },
  inputViewConst:{
    width:"90%",
    backgroundColor: colors.secondary,
    borderRadius:5,
    height:40,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  // Login
  loginBtn:{
    backgroundColor:colors.primary,
    borderRadius:50,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10
  },
  loginText:{
    color:"white"
  },
  inputText:{
    height:50,
    color:"white"
  },
  inputTextBlack:{
    height:50,
    color:"black"
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
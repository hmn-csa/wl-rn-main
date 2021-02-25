
# styleSheet grid:
https://code.tutsplus.com/vi/tutorials/get-started-with-layouts-in-react-native--cms-27418



# Kết hợp Stacks, Tabs
**install**
https://reactnavigation.org/docs/getting-started/
**https://viblo.asia/p/ket-hop-stacks-tabs-va-drawers-cua-react-navigation-4x-trong-react-native-maGK7OqMKj2**

**demo**
https://github.com/react-navigation/react-navigation/tree/main/example

"react-navigation-drawer": "^2.3.3",
"react-navigation-stack": "^1.10.3",
"react-navigation-tabs": "^2.5.6",

# Form

https://react-hook-form.com/get-started
https://reactnativeexample.com/create-beautiful-forms-with-react-native/

## select 
https://www.npmjs.com/package/react-native-picker-select

https://developer.aliyun.com/mirror/npm/package/react-native-select-awesome

# config map
https://docs.expo.io/versions/latest/sdk/map-view/
https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md


expo build:android -t apk


# redux keys index
https://kipalog.com/posts/Su-dung-Redux-store-nhu-1-database


# Icons
https://ionicons.com/v4/cheatsheet.html
https://materialdesignicons.com/

**Xài hàng expo cho khoẻ**
https://icons.expo.fyi/MaterialIcons/contacts

# list 
https://github.com/archriss/react-native-snap-carousel/#showcase


htt
p   `1` s://www.reactnativeschool.com/building-an-animation-hook-in-react-native



# BUG List :

*1,*
Vào màn hình Uptrail 
sau khi load thêm tại tháng
```
TypeError: Cannot read property 'label' of undefined



const handleSelectDate = async (date) => {
    setRedate(date);
    setShowDate(false)
    if (date !== today)
      await props.getDailyStaffCheckin({
        query_date: date,
        token: props.token
      })

    if (date !== today) {
      const dailyCheckinItems = props.staff.dailyChekin.filter(item => item.date === date)
      if (dailyCheckinItems.length > 0) {
        let newlistApplDaily = filterListAppl(
          filterStaffs,
          filterType,
          dailyCheckinItems[0].listCheckin,
          dailyCheckinItems[0].lastCheckin,
          dailyCheckinItems[0].firstCheckin,
        )
        setListappls(newlistApplDaily)
        setListStaffChecked(dailyCheckinItems[0].firstCheckin)

        let tmpDailyChecked = dailyCheckinItems[0].firstCheckin.map(item => item.staff_id)
        setListStaffNotChecked(
          props.staff.staffs.filter(staff => !tmpDailyChecked.includes(staff.staff_id))
        )
        setInitialRegion(calInitialRegion(newlistApplDaily))
        console.log('date: ', dailyCheckinItems[0].date)
      }
    } else {
      let newlistAppl = filterListAppl(
        filterStaffs,
        filterType,
        props.staff.listCheckin,
        props.staff.lastCheckin,
        props.staff.firstCheckin,
      )
      setListappls(newlistAppl)
      setListStaffChecked(props.staff.firstCheckin)
      let tmpChecked = props.staff.firstCheckin.map(item => item.staff_id)
      setListStaffNotChecked(
        props.staff.staffs.filter(staff => !tmpChecked.includes(staff.staff_id))
      )
      console.log(listStaffNotChecked)
      setInitialRegion(calInitialRegion(newlistAppl))
    }
  }
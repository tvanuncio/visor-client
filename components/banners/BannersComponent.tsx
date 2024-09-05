import React, { useState, useEffect, useRef, } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image, ScrollView, Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import color from '../../utils/commons/ColorsCommon';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../modal/LoadingComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginStackParamList, MainStackParamList } from '../../AppNavigator';
import { BannerDto } from '../../utils/types/types';

type PropsBannerComponent = NativeStackScreenProps<MainStackParamList & LoginStackParamList ,'Main' | 'VerMas'>;

type PropsHeaderComponentType = {
  newHeight?: number;
  navigation? : PropsBannerComponent['navigation'];
  banners : BannerDto[];
}


const BannersComponent : React.FC<PropsHeaderComponentType> = ({ navigation, newHeight, banners }) => {

  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const [secs, setSecs] = useState(0);
  const [xScroll, setXScroll] = useState(0);
  const [x, setX] = useState(0);
  const [isWidth, setWidth] = useState(200);
  const [layout, setLayout] = useState<number>(0);
  const scrollviewRef = useRef<ScrollView> (null);
  const [countDots, setCountDots] = useState<number>(0);


  useEffect(() => {
    getMoreBanners();
    const timerId = setInterval(() => {
        if (secs >= 0) {
          setSecs(s => s + 1)
        
          setScrollValue();
        }
    }, 1000)
    return () => clearInterval(timerId);
}, [secs, xScroll]);


  const setScrollValue = ()=>{    
    const paddingToRight = 20;
    if(layout + x >= isWidth - paddingToRight && secs%4===3){
      setXScroll(0);
      setCountDots(0)
    }else if(secs%4===3)  {
      setXScroll(xScroll=>xScroll+responsiveScreenWidth(97))
      setCountDots(countDots+1)
    }
  };

  const getNativeEvents = (event : NativeSyntheticEvent<NativeScrollEvent>) : boolean  => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    setX(contentOffset.x);
    setWidth(contentSize.width);
    setLayout(layoutMeasurement.width);
    return true;
  };
  
  const getMoreBanners = () => {
    if (secs%4===0 && secs>0 && banners.length>1){
      if (scrollviewRef.current){
        scrollviewRef.current.scrollTo({
          x: xScroll,
          animated: true,
        });

      }

    }    
  }

  const actions = (actionType : string , actionData : Object) => {
    console.log('Banners actionType = ', actionType)
    console.log('BannersData', actionData)
    switch (actionType) {
      case 'Product':
        //navigation.navigate('AddCart', { product: bannerType.bannerData })
        break;
      case 'Category':
       //goAndNavigateParams(navigation, 'SectionProduct', { data: bannerType.bannerData.categoryId, categories: true, name: bannerType.bannerData.name || "" });

        break;
      case 'Search':
        //navigation.navigate('Search', { search: bannerType.bannerData })
        break;
      case 'Loyalty':
        //dispatch(Actions.TabSelector(2))
        break;
      default:
        break;
    }
  }

  const dots =()=>{
    return (
      <View style={{ flexDirection:'row', justifyContent:'space-evenly', marginTop:8, marginHorizontal:80}}>
        {banners.map((banner, index) => (
          <View key={index} style={[styles.dot, { borderColor: countDots===index ? color.green3 : color.white }]}></View>
        ))}
      </View>
    )
  }
  


  const renderBanners = () => {
    return banners.map((banner, i) => {
        return (
          <TouchableOpacity
            style={{alignItems:'center'}}
            key={i}
            onPress={() => {
              actions(banner.actionType, banner.actionData)
            }}>
            <Image
              style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, borderWidth: 1, borderColor: "red", width: responsiveScreenWidth(97), height: responsiveScreenHeight(18) }}
              source={{ uri: banner.urlImage }}
              resizeMode='stretch'
            />
          </TouchableOpacity>
        )

    })
  }
  return (
    <Animated.View style={{ height: newHeight }}>
      {banners && banners.length > 0 ?
      <>
        <View style={[styles.container]}>
          <ScrollView 
            horizontal
            ref={scrollviewRef}
            showsHorizontalScrollIndicator={false}
            onScroll={(nativeEvent) => {
              if (getNativeEvents(nativeEvent)) {
                getMoreBanners();
              }
            }}
          >
            {renderBanners()}
          </ScrollView>
          <View style={{flex:1, top: -24}}>
            {dots()}
          </View>     
        </View>

      </>
        : null}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: responsiveScreenWidth(97),
    top : 11,
    left : 2,
    marginBottom : 10,
  },
  dot: {
    flexDirection:'row',
    width: 5,
    borderRadius: 20,
    borderWidth: 5,
  }
})

export default BannersComponent;
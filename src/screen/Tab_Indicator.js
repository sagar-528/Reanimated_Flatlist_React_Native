import { StyleSheet, Text, View, StatusBar, FlatList, Animated, Image, Dimensions, findNodeHandle } from 'react-native'
import React from 'react'

const { width, height} = Dimensions.get('screen')

const images = {
    man:
      'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    women:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    kids:
      'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    skullcandy:
      'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    help:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  };
  const data = Object.keys(images).map((i) => ({
    key: i,
    title: i,
    image: images[i],
    ref: React.createRef()
  }));

  const Indicator = ({measures, scrollX}) =>{

    const inputRange =  data.map((_, i) => i * width);
    
    const indicatorWidth = scrollX.interpolate({
      inputRange,
      outputRange: measures.map(measure => measure.width)
  })

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.x)
})

    return <Animated.View style={{position: 'absolute', height: 4, width: indicatorWidth, left: 0, backgroundColor: '#fff', bottom: -10, transform: [{
      translateX
    }] }}  />
  }

  const Tab = React.forwardRef(({item}, ref) =>{
    return <View ref={ref}>
      <Text style={{color: '#fff', fontSize: 84 / data.length, fontWeight: '800', textTransform: 'uppercase'}}>{item.title}</Text>
    </View>
  })

  const Tabs = ({data, scrollX}) =>{
  const containerRef = React.useRef();
  const [measures, setMeasures] = React.useState([])

React.useEffect(() =>{
  data.forEach(item => {
    let m = []
    item.ref.current.measureLayout(containerRef.current, 
      (x,y,width,height) =>{
        m.push({x,y,width,height})
        console.log(m)
        if(m.length === data.length){
          setMeasures(m)
        }
    })
  })
})

console.log('measure', measures);
    return(
      <View style={{position: 'absolute', top: 50, width}}>
        <View ref={containerRef} style={{justifyContent:'space-evenly', flex: 1, flexDirection: 'row'}}>
          {data.map((item) =>{
            return <Tab key={item.key} item={item} ref={item.ref} />
          })}
        </View>
        {
          measures.length > 0 && 
        <Indicator measures={measures} scrollX={scrollX} />
        }
      </View>
    )
  }
  
  export default function Tab_Indicator() {

const scrollX = React.useRef(new Animated.Value(0)).current

    return (
      <View style={styles.container}>
        <StatusBar hidden />
       <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.key}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}],{useNativeDriver: false})}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({item}) =>{
          return <View>
            <Image source={{ uri: item.image}} style={{ flex: 1 ,width, height,resizeMode: 'cover'}} />
          </View>
        }}       
        />
        <View style={[StyleSheet.absoluteFillObject,{backgroundColor: 'rbg(0,0,0,0.3)'}]} />
        <Tabs scrollX={scrollX} data={data} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
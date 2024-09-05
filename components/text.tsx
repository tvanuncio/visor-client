import React, { ReactNode } from 'react';
import { View,  Text } from 'react-native';

type PropsTextType = {
   text : string
   fontSize : number,
   color : string,
   right : number,
   fontWeight : string | number | undefined,
   marginTop? : number,
   icon? :  ReactNode | undefined,
}


const Texts =(props : PropsTextType)=>{
    return(
        <View>
            <Text style={{
                fontSize: props.fontSize, 
                color: props.color, 
                right: props.right, 
                fontWeight: props.fontWeight,
                marginTop: props.marginTop, 
            
            }}>
                {props.text}
                
            </Text>
            {props.icon ?
                <View style={{ position: 'absolute', left: -30, marginTop: props.marginTop }}>
                  {props.icon}
                </View>
             : null}

        </View>

    );
}

export default Texts;
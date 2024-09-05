import { Alert, Share } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

export const switchPay = (pay: string) => {
  switch (pay) {
    case "cashondelivery":
      return 'Pago contra entrega/Efectivo'
    case "banktransfer":
      return 'Pago con crédito Nutenta'
    case "checkmo":
      return 'Pago con tarjeta de crédtio/debito'
    case "canceled":
      return 'Pedido cancelado'
    default:
      return ``
  }
};

export const phrase = [
  "Surte tu tienda con una gran variedad de productos, ¡en un solo lugar!",
  "Llevamos tu pedido al día siguiente, ¡sin costo, sin mínimo de compra!",
  "¡Obtén puntos cada vez que hagas pedidos y cambialos por increíbles recompensas!",
  "¡Solicita un crédito, para comprar cualquier producto!",
  "Encuentra precios competitivos, crea promociones para vender más y ahorra en tiempo para tu negocio.",
  "Apoyo de un asesor nutenta que te visitará para impulsar tu negocio juntos",
];

export const createFormData = (photo : string, userId : string) => {
  console.log("formData function", photo)
  const data = new FormData();
  data.append("image", {
    name: userId + '.jpg',
    type: 'image/jpeg',
    uri: photo
  });
  return data;
};

export const validateEmail = (email : string): boolean => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validatePasswords = (data : string): boolean => {
  // let passw = new RegExp("^(?=(.*[A-Z]){1,})(?=(.*[a-z]){1,})(?=(.*[ !@#$%^&*(),.?:{}|<>]){1,})(?=(.*[0-9]){1,}).{8,}$");
  let passw = new RegExp("^(?=[A-Za-z0-9]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$");
  return passw.test(data);
};

export const validateInputsNums = (data : string): boolean => {
  let regExp = /^[0-9]+$/
  return regExp.test(data);
};

export const validateInputsPrices = (data : string): boolean => {
  let regExp = /^[0-9]*\.?[0-9]*$/;
  return regExp.test(data);
};

export const validatePhoneNumber = (data : string): boolean => {
  let regExp = /^[0-9]+$/
  return regExp.test(data);
};

export const simpleAlert = (message : string) => {
  return (
    Alert.alert(
      'TVAnuncio',
      message,
      [
        {
          text: "Aceptar", onPress: () => { }
        },
      ],
      { cancelable: false }
    )
  )
};

export const messageAlert = (message : string) => {
  return (
    Alert.alert(
      'TVAnuncio',
      message,
      [
        {
          text: "OK", onPress: () => { }
        },
      ],
      { cancelable: false }
    )
  )
};

export const alertUpdateApp = (action  :() => void, message : string , action2 : () => void) => {
  return (
    Alert.alert(
      'TVAnuncio',
      message,
      [

        {
          text: 'ACTUALIZAR',
          onPress: action
        },
        // {
        //   text: 'CONTINUAR',
        //   onPress: action2
        // },
      ],
      { cancelable: false }
    )
    
  )
};

export const alertCallbackAction = (action : () => void, message : string ) => {
  return (
    Alert.alert(
      'TVAnuncio',
      message,
      [

        {
          text: 'NO',
          onPress: () => { },
          style: 'destructive'
        },
        {
          text: 'SI',
          onPress: action
        },
      ],
      { cancelable: false }
    )
  )
};
export const alertCallbackActionCancellation = (action : () => void, message : string) => {
  return (
    Alert.alert(
      'TVAnuncio',
      message,
      [
        {
          text: 'Aceptar',
          onPress: action
        },
      ],
      { cancelable: false }
    )
  )
};

export function formatDatetimeCompare ( date : Date) : number {
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2,'0');
   const day = String(date.getDate()).padStart(2,'0');
   const hours = String(date.getHours()).padStart(2,'0');
   const minutes = String(date.getMinutes()).padStart(2,'0');
   const dateTimeNow : number = Number (year+month+day+hours+minutes);
   return dateTimeNow;
}

export const convertDate = (date: string) => {
  let newDate = date.split(' ')
  let days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const monthNames = ["Enero", "Febrero", "Marzo", "April", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  let d = new Date(newDate[0]);
  let dayName = days[(Number(d.getUTCDay()) + 1)];
  let month = d.getUTCMonth() + 1;
  let day = d.getUTCDate();
  day = Number(day) + 1
  let dia : string = "";
  if (String(day).length == 1) {
    dia = '0' + day
  }
  let dateFormat = dayName + ' ' + dia + ' ' + monthNames[d.getMonth()]
  return dateFormat
}

export const getDate = (createdAt : string) => {
  const date = new Date(createdAt);
  return  date.getDate() + '/' + (date.getMonth() + 1) +'/'+ date.getFullYear();
}


export const moneyFormat = (value: Double) => {
  let num = Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value || 0) || 0;
  return num;
  // return array.length > 1 
  //   ? array[array.length -1].length > 1 ? num : (num + '0') 
  //   : num + '.00'
} 

export const isNumber = (n : string) => {
  return !isNaN(parseFloat(n));
}

export const elevationShadowStyle = (elevation : number, color : string) => {
  return {
    elevation,
    shadowColor: color,
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.1,
    shadowRadius: 0.9 * elevation,
    outlineProvider: 'bounds'
  };
}

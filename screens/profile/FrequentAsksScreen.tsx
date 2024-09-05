import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text, FlatList, Image } from 'react-native';
import * as Component from '../../components';
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from 'react-redux';
import color from '../../utils/commons/ColorsCommon';
import { Roboto } from '../../utils/commons/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { PropsHomeScreen } from '../home/HomeScreen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginStackParamList, MainStackParamList } from '../../AppNavigator';
SimpleLineIcons.loadFont()
Entypo.loadFont()

export type PropsFrequentAsksScreen = NativeStackScreenProps<MainStackParamList & LoginStackParamList,'FrequentAsks'>;

const FrequentAsksScreen : React.FC<PropsFrequentAsksScreen> = ({ navigation, route }) => {

    const frequentAsks = [
        { question: "¿En dónde debo realizar mi pedido?" },
        { answer: "El pedido se realiza a través de la aplicación Nutenta. Selecciona los productos que deseas, agrégalos al carrito de compras, elige la forma de pago y listo. Recibirás tus productos al día siguiente. Recuerda que no entregamos Domingos ni días feriados. (Consulta el Anexo 2 para días feriados)." },
        { question: "¿Solo puedo obtener información de los productos a través de la app?" },
        { answer: "Puedes obtener toda la información de los productos de manera digital, pero recuerda que también te estará visitando tu asesor dos veces a la semana; el asesor cuenta con toda la información que necesitas. Además, puedes comunicarte con nuestras líneas de atención al cliente vía whatsapp al número 5527236355 de 8:00 am a 11:59pm, los 7 días de la semana." },
        { question: "¿Solo puedo hacer el pedido a través de la app?" },
        { answer: "Sí. Al pertenecer a Nutenta, sólo podrás hacer tu pedido a través de nuestra aplicación, lo cual te permite hacer tu pedido en cualquier momento y desde cualquier lugar, encontrando muchos de los productos que más se venden en tu tienda y recibiéndolos en una única entrega. ¡Te garantizamos que esta forma será mucho más eficiente!" },
        { question: "¿Qué productos puedo pedir a través de Nutenta?" },
        { answer: "Actualmente puedes pedir más de 50 categorías como refrescos, leche, detergente, aceite y muchas más, con más de 500 productos. Esto representa más del 40% de las ventas de tu tienda, y seguiremos incorporando más productos a Nutenta a lo largo de los siguientes meses." },
        { question: "¿En cuánto tiempo me entregan el pedido?" },
        { answer: "El pedido será entregado al día siguiente de realizado. Recuerda que no entregamos Domingos ni días feriados. (Consulta el Anexo 2 para días feriados)." },
        { question: "¿De qué manera serán entregados los productos?" },
        { answer: "Todos los productos serán entregados en un solo viaje, a través del repartidor de Nutenta." },
        { question: "¿A qué precios me van a vender los productos?" },
        { answer: "Todos los productos serán vendidos a los mismos precios que podrás encontrar en los mayoristas, con la única diferencia de que no tienes que ir a ningún lado para comprarlos lo puedes hacer simplemente con unos clics en nuestra aplicación." },
        { question: "¿Tendrán promociones?" },
        { answer: "Las tiendas Nutenta tendrán acceso a promociones exclusivas y personalizadas, las cuales podrás encontrar en tu aplicación con información detallada de cada una." },
        { question: "¿Con quién me comunico para resolver dudas sobre mi pedido?" },
        { answer: "¡Muy fácil! Comunícate con nosotros en nuestros diferentes medios de atención: Whatsapp al 5527236355 de 8:00am a 11:59pm los 7 días de la semana." },
        { question: "¿Cómo puedo estar seguro de que mi pedido va a llegar a tiempo?" },
        { answer: "Actualmente, recibirás notificaciones sobre el estado de tu pedido a través de la aplicación en donde podrás darle seguimiento a nuestro compromiso de entrega al día siguiente. Recuerda que no entregamos Domingos ni días feriados. (Consulta el Anexo 2 para días feriados)." },
        { question: "¿Por qué debería dejar de hacer los pedidos a través de mi vendedor y pertenecer a Nutenta?" },
        { answer: "Nutenta te brindará una serie de beneficios inigualables, como (i) la posibilidad de acceder a productos de múltiples proveedores en un solo lugar, a precios de mayorista, y entregados directamente en tu tienda al siguiente día, (ii) acceso a un programa de lealtad que te ayude a gestionar mejor tu negocio y aumentar la calidad de vida de tu familia, (iii) contar con elementos de visibilidad que aumenten la confianza de los clientes y te ayuden a competir mejor contra otras tiendas, ¡y muchos más!" },
        { question: "¿La aplicación de Nutenta es gratuita?" },
        { answer: "Sí, la aplicación Nutenta es totalmente gratuita." },
        { question: "¿Cómo se usa la aplicación?" },
        {
            answer: "1. Ingresa con el usuario y contraseña que te asignaremos.\n"
                + "2. Usa nuestro buscador de productos donde podrás escribir el nombre del producto específico que necesitas o desplázate a través de todo nuestro catálogo y selecciona los productos que desees agregar a tu carrito.\n"
                + "3. Agrega las cantidades necesarias y listo. Podrás ver la totalidad de tu pedido en el carrito de compras además de confirmar que tus datos sean correctos, el monto total de tu compra, los descuentos aplicados y más.\n"
                + "Una vez confirmado tu pedido (y el método de pago del pedido), nosotros lo recibimos y preparamos para que lo recibas al día siguiente. Si tienes alguna duda adicional puedes comentarla con tu asesor para que te pueda ayudar."
        },
        { question: "¿Tengo que registrarme?" },
        { answer: "No, no lo tienes que hacer tú, nosotros nos encargamos de hacer todo. Te brindaremos un usuario y contraseña y tú solo debes preocuparte en sacarle el mayor provecho." },
        { question: "¿Qué sucederá con mis datos personales?" },
        { answer: "Puedes quedarte tranquilo; tus datos personales están siempre protegidos con nosotros, pero si tienes alguna duda, puedes encontrar toda esta información en el enlace “Aviso de privacidad”." },
        { question: "¿Qué información encontraré en la aplicación?" },
        { answer: "Podrás encontrar información de los productos que desees comprar y descripción de cada uno, además de promociones exclusivas y personalizadas, historial de tus compras, acceso a tu línea de crédito con Nutenta y tus puntos Nutenta que podrás redimir por diferentes recompensas." },
        { question: "¿Es difícil de usar?" },
        { answer: "Si alguna vez has utilizado alguna aplicación para comprar algo, entonces la aplicación de Nutenta será muy fácil de usar. Además tendrás un asesor comercial dedicado a asegurar que el uso de la aplicación de Nutenta sea lo más sencillo posible, capacitándote y ayudándote con todo lo que necesites." },
        { question: "¿Qué pasa si no entiendo cómo usarla?" },
        { answer: "¡No te preocupes, nosotros te ayudamos! Un asesor Nutenta te capacitará en el uso de nuestra aplicación, además te visitará dos veces a la semana para ayudarte con cualquier tema relacionado a Nutenta." },
        { question: "¿También cuentan con página web?" },
        { answer: "Estamos trabajando para tener disponible nuestra versión web lo más pronto posible y adaptarnos a las necesidades de cada uno de nuestros clientes. ¡Mantente atento al lanzamiento!" },
        { question: "¿Cómo se compara el precio de los productos comprados a través de Nutenta con los precios mayoristas y distribuidor?" },
        { answer: "Todos los productos vendidos a través de Nutenta estarán a precio de mayorista." },
        { question: "¿Tendré acceso a promociones?" },
        { answer: "Sí, tendrás acceso a promociones especiales que se ajusten a tus necesidades y compras anteriores. Podrás encontrarlas en tu aplicación." },
        { question: "¿Cada cuanto obtendré promociones?" },
        { answer: "Manejaremos diferentes promociones, las cuales podrás visualizar siempre en tu aplicación Nutenta cada vez que estén activas." },
        { question: "¿Qué tipo de promociones?" },
        { answer: "Tendremos descuentos especiales sobre productos individuales, combos entre múltiples productos, y muchos más. Consúltalos cada día en tu aplicación." },
        { question: "¿Cómo me entero de las condiciones de cada promoción?" },
        { answer: "Las condiciones de cada promoción estarán en la aplicación Nutenta.y tu asesor podrá darte más información al respecto." },
        { question: "¿Qué beneficios voy a recibir?" },
        {
            answer: "El programa de lealtad Nutenta cuenta con múltiples beneficios y podrás acceder a ellos dependiendo de tiempos y requisitos. Algunos de los beneficios que ofreceremos:\n"
                + "Crédito para financiar tus pedidos a través de Nutenta.\n"
                + "Promociones exclusivas para miembros Nutenta\n"
                + "Elementos de visibilidad internos como: posters, marcadores de precio, racks y stoppers.\n"
                + "¡Gana puntos con tus pedidos! Te llevarás 1 punto nutenta por cada $10 de compra en la app. Te servirán para cambiarlos por distintos premios para tu impulsar tu negocio y hogar.\n"
        },
        { question: "¿Cuál es el monto del crédito que me van a dar?" },
        { answer: "Nuestros asesores se encargarán de darte una línea de crédito adecuada para poder cumplir con tus objetivos de negocio, estas serán visibles en tu aplicación. En caso de requerir una ampliación del monto, platícalo con tu asesor estamos aquí para ayudarte a crecer tu negocio. ¡Siempre estaremos dispuestos a escucharte y hacer lo posible para cumplir tus deseos!" },
        { question: "¿Para qué me sirve el crédito?" },
        { answer: "El crédito te servirá para realizar más compras a través de Nutenta y tengas la tienda muy bien surtida para todos los consumidores que entren a tu tienda, otorgándote un plazo flexible para realizar su pago." },
        { question: "¿Cuándo empezaré a recibir visitas de mi asesor?" },
        { answer: "Tu asesor te visitará de hoy en adelante, entre una o dos veces por semana." },
        { question: "¿Qué funciones cumplirá el asesor?" },
        { answer: "El asesor estará a tu disposición para ayudarte con cualquier tema relacionado a Nutenta, además de revisar tus niveles de venta para realizar recomendaciones sobre cómo mejorar aún más el desempeño de tu negocio (Ej. qué productos comprar, ayudarte a hacer compras, darte recomendaciones de productos,etc.)." },
        { question: "¿Con qué frecuencia me visitará?" },
        { answer: "El asesor de Nutenta te estará visitando dos veces por semana." },
        { question: "¿Cuántas tiendas forman parte de Nutenta?" },
        { answer: "Actualmente sólo unas ~300 tiendas han sido seleccionadas para formar parte de Nutenta, teniendo el privilegio de acceder a todos nuestros beneficios y ayudarnos a mejorar aún más nuestra propuesta de valor de cara al escalamiento a nivel nacional." },
        { question: "¿Qué elementos internos voy a recibir?" },
        {
            answer: "Stoppers y cenefas para tus racks.\n"
                + "Poster para tu tienda.\n"
                + "Pantalla Covid.\n"
                + "Señal de pago con tarjeta."
        },
        { question: "¿Qué debo hacer con los otros elementos de mercadotecnia que ya tengo en mi tienda?" },
        { answer: "Por lo pronto, deberás priorizar la colocación de elementos Nutenta para que tú mismo puedas ver lo mucho que los elementos de mercadotecnia pueden beneficiar el desempeño de tu tienda." },
        { question: "¿Quién me ayudará a incorporarlos?" },
        { answer: "Los elementos serán incorporados por tu asesor que te ayudará a ordenar y colocar los materiales, y te guiará a lo largo de todo el proceso." },
        { question: "¿Cuáles son los canales de atención post-venta de Nutenta?" },
        { answer: "El canal de atención post-venta de Nutenta es via Whatsapp." },
        { question: "¿Cuál es el número de teléfono?" },
        { answer: "5527236355." },
        { question: "¿Cuál es el horario de atención?" },
        { answer: "La atención post-venta estará disponible de 8:00 de la mañana a 11:59pm todos los días." },
        { question: "¿Qué tipo de consultas pueden ser atendidas por este canal?" },
        { answer: "En este canal podrás realizar cualquier consulta relacionada con tus pedidos. Además, el equipo de atención podrá apoyarte con temas adicionales relacionados a Nutenta como Información de productos, promociones, contactos, devoluciones, etc" },
        { question: "¿Dejaré de recibir beneficios por ser cliente Milenio?" },
        { answer: "No, tus beneficios actuales por ser cliente Milenio se mantendrán y traspasarán a Nutenta." },
        { question: "¿La aplicación de Nutenta tiene un costo? ¿Cuál es?" },
        { answer: "Utilizar la aplicación de Nutenta es absolutamente gratuito." },
    ];


    return (
        <View style={[styles.container]}>
            <Component.HeaderCar
                title="Preguntas frecuentes"
                navigation={navigation}
            />
            <ScrollView>
                {frequentAsks.map((value) => {
                    return (
                        <View style={[styles.viewText]}>
                            <Text style={[styles.textQ]}>{value.question}</Text>
                            <Text style={[styles.textA]} >{value.answer}</Text>
                        </View>
                    )

                }
                )}
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.grayBackTwo,
        alignItems: 'center',
        width: responsiveScreenWidth(100),
        flex: 1,
    },
    viewText: {
        alignItems: 'flex-start',
        marginHorizontal: 20,
    },
    textQ: {
        fontFamily: Roboto.Bold,
        fontSize: 18,
        color: color.darkGray,
    },
    textA: {
        fontFamily: Roboto.Regular,
        fontSize: 18,
        color: color.darkGray,
        bottom: 35,
        marginTop: 10
    },
    card: {
        width: responsiveScreenWidth(42),
        borderWidth: 2,
        margin: 10,
        borderRadius: 20,
        borderColor: '#E2E2E2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardCotainer: {
        width: responsiveScreenWidth(42),
        height: responsiveScreenHeight(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontFamily: Roboto.Bold,
        color: color.darkGray,
        paddingVertical: 15,
        textAlign: 'center'
    },

})

export default FrequentAsksScreen;
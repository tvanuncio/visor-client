import React from 'react';
import * as Components from '../../components';
import { View, StyleSheet, Text } from 'react-native';
import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import color from '../../utils/commons/ColorsCommon';
import { Roboto } from '../../utils/commons/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginStackParamList } from '../../AppNavigator';
import { ScrollView } from 'react-native-gesture-handler';
SimpleLineIcons.loadFont()
Entypo.loadFont()

export type PropsPrivacyScreen = NativeStackScreenProps<LoginStackParamList,'Privacy'>;


const PolicyPrivacyScreen: React.FC<PropsPrivacyScreen> = ({ navigation }) => {
 
  const titlesAndParagraphes =
  [
    { title: '1. AVISO DE PRIVACIDAD CLIENTES' },
    { paragraphe:'En cumplimiento a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (la &quot;Ley&quot;) vigente en México, le informamos los términos y condiciones del Aviso de Privacidad de Datos Personales (&quot;Aviso de Privacidad&quot;) de Propimex, S. de R.L. de C.V, con domicilio en: Calle Mario Pani No.100, Col. Santa Fe Cuajimalpa, C.P. 05348, Cuajimalpa de Morelos, en Ciudad de México, así como de sus subsidiarias, filiales y controladoras, las cuales se rigen por las mismas políticas y procedimientos (en lo sucesivo denominada "NUTENTA").' },
    { title: '1. ¿Qué información recopilamos?:' },
    { paragraphe:'NUTENTA tiene acceso y/o podría llegar a recabar sus datos personales en general mediante la utilización de la plataforma digital e informática (“Plataforma”) a través de la aplicación móvil para teléfonos inteligentes y/o cualquier otro dispositivo o medio electrónico denominado APP Nutenta (en adelante la “Aplicación”) cuya titularidad corresponde a, o está controlado por NUTENTA que, directa o indirectamente, utilice NUTENTA para comercializar productos (conjuntamente, “Medios Digitales”), los cuales podrán incluir:' },
    { title: '(I)' },
    { paragraphe:'Datos personales de identificación y de contacto como son: su nombre, fecha de nacimiento, número telefónico ya sea fijo o celular, domicilio, correo electrónico y en caso de que emita factura adicionalmente a los datos enunciados recopilaremos su Cedula de Identificación Fiscal y/o Constancia de Situación Fiscal, así como datos del método de pago conforme a los Términos y Condiciones de los Medios Digitales, y' },
    { title: '(II)' },
    { paragraphe:'Datos demográficos incluyendo datos relativos a su ubicación geográfica (GPS) del dispositivo que utilice para usar los Medios Digitales, Información acerca de sus preferencias e intereses relacionados con los Medios Digitales de NUTENTA.' },
    { title: '(III)' },
    { paragraphe:'También recabamos información generada por otros dispositivos conectados o utilizados (incluyendo su dirección IP y los datos de identificación de su dispositivo), datos relacionados con la navegación dentro de la aplicación NUTENTA, datos sobre el uso y consumo de los servicios de internet desde su dispositivo, así como información relacionada con el uso de los Medios Digitales.' },
    { title: '2. ¿Para qué utilizamos su información?:' },
    { paragraphe:'Los datos personales que recopilamos son para:' },
    { title: 'Finalidades primarias:' },
    { paragraphe:'NUTENTA tratará los datos personales antes descritos para (a) Fines de identificación y contacto, (b) Realizar ventas de contado o a crédito de los productos que NUTENTA comercializa, (c) Envío y entrega de productos, (d) Asistencia en línea por nuestros operadores a través del uso de nuestro Centro de Atención y Soporte, (e) Para promocionar los productos que comercializamos, (f) Llevar a cabo alguna o todas las actividades necesarias para el desarrollo y cumplimiento de las obligaciones que se originen y deriven de la relación contractual y/o comercial que tenga con NUTENTA incluyendo facturación y cobranza,(g) Para el uso en aplicaciones móviles, plataformas digitales y portales desarrollados o contratados por NUTENTA para gestionar ventas, entregas a domicilio, pagos y/o con fines promocionales.' },
    { title: 'Finalidades secundarias:' },
    { paragraphe:'NUTENTA tratará sus datos personales para llevar a cabo alguna o todas las finalidades secundarias como: a) Para contactarlo a través de los Medios Digitales, con el fin de responder a sus requerimientos y monitorear su preferencia en el consumo de los productos que comercializa con fines estadísticos, b) Para contactarlo vía WhatsApp, vía Facebook, Twitter, o cualquier otra red social con el fin de responder a sus requerimientos y monitorear su preferencia en el consumo de los productos que comercializa fines estadísticos, c) Fines mercadotécnicos, publicitarios y/o de prospección comercial relacionados con productos y servicios, que puede realizar NUTENTA o de terceros con los que NUTENTA tenga celebrado convenios o contratos, d) Informarle del lanzamiento o cambios de nuevos productos, promociones y/u ofertas de acuerdo a sus intereses, e) Realizar estadísticas, encuestas o estudios sobre hábitos de consumo y de mercado que tengan por finalidad evaluar la calidad de los servicios, bienes, productos y/o experiencia de compra a través de los Medios Digitales, f) Realizar tratamientos de técnicas de análisis masivo de datos para realizar actividades de perfilamiento y mejor conocimiento del cliente, g) Compartir sus perfiles y hábitos de consumo con nuestros socios comerciales para que éstos puedan contactarle y enviarle información de carácter publicitario, promocional y/o informativo que consideren de su interés y/o para que puedan valorar, conforme a sus procedimientos internos, si usted es susceptible de obtener el servicio que hubiere solicitado ante dicho tercero, h) Realizar actividades de análisis de datos mediante la aplicación y uso de tecnologías de inteligencia artificial, big data y similares para generar reportes estadísticos, estudios sobre sus hábitos de consumo y/o uso de los servicios, mejor conocimiento del cliente así como para dar cumplimiento a las finalidades previstas en este Aviso de Privacidad y conforme a los Términos y Condiciones de los Medios Digitales.' },
    { paragraphe:'NUTENTA por ningún motivo recaba datos personales de menores de edad, por lo que al hacer uso de los Medios Digitales reconoce ser mayor de edad y tener conocimiento de este aviso de privacidad. En caso de que se lleguen tratar datos personales de algún menor de edad, es necesario que se haga con el previo consentimiento expreso e informado del padre o madre, tutor y/o persona que ejerce patria potestad del menor.' },
    { title: '3. Mecanismos para manifestación de negativa.' },
    { paragraphe:'En caso que no desee que sus datos personales sean tratados para las finalidades secundarias mencionadas, o alguna(s) de ellas, puede manifestar su negativa de esa manera desde este momento llamando al Centro de Atención y Soporte al número telefónico (+52 55 2723 6355), donde un asesor le ayudara a ejercer su solicitud, o bien puede enviar un correo electrónico a la dirección datospersonales@kof.com.mx, donde atenderemos su petición. La negativa para el uso de sus datos personales para estas finalidades no podrá ser un motivo para que NUTENTA niegue los productos que solicita o contrata.' },
    { paragraphe:'Con la recolección y tratamiento de datos personales que usted nos proporcione, cumplimos todos los principios que marca la Ley (Artículo 6): Licitud, calidad, consentimiento, información, finalidad, lealtad, proporcionalidad y responsabilidad.' },
    { title: '4. ¿Con quién compartimos su información?:' },
    { paragraphe:'NUTENTA podrá compartir su información con uno o varios terceros, con quienes previamente hayamos celebrado contratos con cláusulas de confidencialidad y de protección de datos personales, así como con proveedores de servicios seleccionados para apoyar las actividades comercialización, promoción de nuestros productos, desarrollo de software, encuestas de servicio, así como, para fines de verificación de que la información que usted nos proporciona es correcta y actual, por lo que NUTENTA podría incluso transferir sus datos personales a dicho(s) tercero(s) con finalidades comerciales, de análisis y de estadística. De igual manera, NUTENTA podrá compartir o transmitir sus datos personales a sus controladoras, subsidiarias, partes relacionadas y/o a sus Unidades de Negocio con fines de mejora de productos y servicios, promociones, fines estadísticos, para administración interna y propósitos de análisis. Cualquier transferencia de datos personales que NUTENTA realice, será únicamente para los fines permitidos por las leyes y los receptores de los datos personales, están obligados a observar el presente Aviso y la Ley.' },
    { paragraphe:'Entenderemos que Usted ha otorgado su consentimiento para el tratamiento y transferencia de sus datos personales de conformidad con el presente Aviso de Privacidad si usted no manifiesta su oposición o negativa a través de los medios que se ponen a su disposición y hacen de su conocimiento en este Aviso de Privacidad.' },
    { title: '5. ¿Qué medidas de seguridad y control utilizamos para la protección de sus datos personales?:' },
    { paragraphe:'NUTENTA tiene implementadas medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales, mismas que igualmente exigimos sean cumplidas por los proveedores de servicios que contratamos, y cualquier tercero con el que se compartan sus datos personales aun tratándose de servicios que prestan las empresas controladoras, partes relacionadas, subsidiarias o afiliadas de NUTENTA.' },
    { title: '6. ¿Cuál es el área de NUTENTA responsable de la vigilancia y cumplimiento al procedimiento de resguardo y gestión de datos personales?:' },
    { paragraphe:'Es "Atención a Datos Personales";, cuya dirección de correo electrónico se señala más adelante. Los datos personales proporcionados por Usted formarán parte de un archivo que contendrá su perfil. Usted podrá solicitar que se modifique su perfil en cualquier momento a través de la cuenta de correo electrónico datospersonales@kof.com.mx, NUTENTA le recomienda que actualice sus datos personales cada vez que éstos sufran alguna modificación y que mantenga su información debidamente actualizada.' },
    { title: '7. ¿Cómo puede usted ejercer sus derechos ARCO y revocar su consentimiento al tratamiento?' },
    { paragraphe:'Los usuarios titulares de datos personales podrán ejercitar los derechos ARCO (Acceso, cancelación, rectificación y oposición al tratamiento de sus datos personales) o bien, revocar el consentimiento que hayan otorgado a NUTENTA para el tratamiento de sus datos personales incluyendo si es que así lo desean su manifestación de no recibir publicidad o información que sea utilizada con fines mercadotécnicos o publicitarios mediante llamadas telefónicas y/o mensajes de texto, enviando directamente su solicitud al área de Atención de Datos Personales a través de la cuenta de correo electrónico: datospersonales@kof.com.mx, dicha solicitud deberá contener por lo menos: (a) Nombre y domicilio u otro medio para comunicarle la respuesta a su solicitud; (b) Los documentos que acrediten la identidad o, en su caso, la representación legal; (c) La descripción clara y precisa de los datos personales respecto de los que se solicita ejercer alguno de los derechos ARCO; y (d) Cualquier otro elemento que facilite la localización de los datos personales.' },
    { paragraphe:'NUTENTA, vía correo electrónico, le comunicará en un plazo no mayor a veinte (20) días, contados a partir de la fecha en que se recibió la solicitud, la determinación adoptada, a efecto de que, si resulta procedente, se haga efectiva la misma dentro de los quince (15) días siguientes a la fecha en que se comunicó la respuesta. Tratándose de solicitudes de acceso a Datos Personales, el Responsable procederá a poner a disposición del Titular, vía correo electrónico y previa acreditación de la identidad del solicitante o del representante legal, según corresponda, los Datos solicitados. Los plazos antes referidos podrán ser ampliados una sola vez por un periodo igual, siempre y cuando así lo justifiquen las circunstancias del caso.' },
    { paragraphe:'Asimismo, en cualquier momento y por los medios ya referidos, podrá revocar su consentimiento para el tratamiento y aprovechamiento de sus Datos Personales. Cuando el titular solicite la confirmación del cese del tratamiento de sus datos personales, el Responsable responderá expresamente a dicha solicitud por los mismos medios y dentro de los mismos plazos referidos en el antepenúltimo párrafo, si transcurrido el término que señala la Ley, NUTENTA no diera respuesta a su solicitud, entonces podrá iniciar el procedimiento de protección de derechos ARCO ante el Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI).' },
    { title: '8. Modificaciones al Aviso de Privacidad.' },
    { paragraphe:'Nos reservamos el derecho de cambiar este Aviso de Privacidad en cualquier momento. En caso de que exista algún cambio en este Aviso de Privacidad, se comunicará publicando en los Medios Digitales. Por su seguridad, revise en todo momento el contenido de este Aviso de Privacidad en el portal antes señalado.' },
    { title: '9. Otras normatividades aplicables.' },
    { paragraphe:'Las leyes y regulaciones de otros países pueden imponer diferentes requerimientos para la protección de la información en general y de los datos personales que se recolectan vía internet o por cualquier otro medio digital. NUTENTA se encuentra ubicada en México y todos los asuntos en relación a este Aviso son regidos por las leyes de México. Si Usted está ubicado en algún otro país distinto de México y nos contacta, por favor tome en cuenta que cualquier información que Usted nos provea será transferida a México, y al momento de ingresar su información Usted autoriza esta transferencia y la aceptación del presente Aviso de Privacidad.' },
    { title: '10. El uso de tecnologías de rastreo en nuestro portal de Internet' },
    { paragraphe:'Le informamos que en nuestra Plataforma y Aplicación podremos utilizar cookies, y otras tecnologías (“Tecnologías de Rastreo”) a través de las cuales es posible monitorear su comportamiento como usuario de nuestros Medios Digitales, brindarle un mejor servicio y experiencia de usuario al navegar en nuestra página, así como ofrecerle nuevos productos y servicios basados en sus preferencias.' },
    { paragraphe:'Los diferentes tipos de Tecnologías de Rastreo que utilizamos para obtener datos identificativos y datos relacionados con su comportamiento de compra y uso de los Medios Digitales son:' },
    { paragraphe:'Esenciales: Utilizamos estas tecnologías para permitirle un uso adecuado de nuestros Medios Digitales, por lo que las mismas no pueden ser deshabilitadas al ser necesarias para permitirle el uso de las funcionalidades de nuestros Medios Digitales.' },
    { paragraphe:'Para recordar sus preferencias y experiencia a través de estas tecnologías obtenemos horario de navegación, tiempo de navegación en nuestros Medios Digitales, secciones consultadas, y páginas de internet accedidas previo a la nuestra, estas Tecnologías de Rastreo nos permiten recordar sus preferencias, opciones de navegación y funciones personalizadas.' },
    { paragraphe:'Para objetivos de rendimiento y análisis: Podemos usar Tecnologías de Rastreo propias y de terceros para obtener datos de carácter técnico y estadístico que nos permitan identificar la forma en la cual usted hace uso de nuestros Medios Digitales con la finalidad de mejorar su rendimiento y futuros desarrollos.' },
    { paragraphe:'Publicitarias propias y de terceros: Podemos colocar Tecnologías de Rastreo publicitarias propias y de terceros (como socios comerciales y subsidiarias y afiliadas) para obtener información relativa a sus preferencias de compra, consumo y visualización de nuestros Medios Digitales para mostrarle publicidad que consideremos relevante para Usted.' },
    { paragraphe:'Otros datos: De la misma forma, como parte de nuestros procesos de mejora de nuestros productos y servicios a través de nuestros Medios Digitales, en ciertos casos podremos recabar respuestas anónimas a encuestas y requerimientos relacionados con el uso de nuestros productos y servicios a través de nuestros Medios Digitales. En determinados casos y cuando ello sea necesario podremos aplicar técnicas de anonimización de datos con la finalidad de realizar determinados estudios de carácter predictivo y estadístico a partir de la información generada con motivo del uso de nuestros servicios a través de nuestros Medios Digitales.' },
    { paragraphe:'Este Aviso de Privacidad cumple con los requisitos que marca la Ley (artículos 15 y 16). Fecha de última actualización de este Aviso de Privacidad: 29/11/2021. Usted manifiesta que los datos personales que son materia del presente Aviso de Privacidad, han sido obtenidos de manera libre, informada, voluntaria e inequívoca y que usted consiente a que NUTENTA lleve a cabo el tratamiento de los mismos en términos de la Ley y de este Aviso.' },
  ];

  return (
    <View >
      <Components.HeaderCar
        title="Avisos de privacidad"
        navigation={navigation}
      />
      <View style={{ backgroundColor: color.grayBackTwo }}>
        <ScrollView>
          <View style={styles.container}>
            {
              titlesAndParagraphes.map( (text, id) =>{
                return text.title ?
                <Text key={`title-${id}`}style={styles.title}>{text.title}</Text>
                : text.paragraphe ?
                <Text key={`paragraphe-${id}`} style={styles.paragraphe}>{text.paragraphe}</Text>
                : null
              })
            }
          </View>
       </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: responsiveScreenWidth(100),
    backgroundColor: color.grayBackTwo,
    paddingHorizontal: 10,
    paddingBottom: responsiveScreenHeight(30)
  }, title:{
    fontFamily: Roboto.Bold,
    color: color.darkGray,
    paddingTop: 20,
  },
  paragraphe: {
    marginVertical: 15,
    fontFamily: Roboto.Regular,
    color: color.darkGray,
  }
})

export default PolicyPrivacyScreen;
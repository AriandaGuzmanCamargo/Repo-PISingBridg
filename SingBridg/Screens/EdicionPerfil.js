import React, {useState} from 'react';
import {Alert, Dimensions, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import BarraNavegacionInferior from '../components/BarraNavegacionInferior';
import { eliminarUsuarioPorEmail, buscarUsuarioPorEmail } from '../database/database';


const { width } = Dimensions.get('window');
const ANCHO = width * 0.9;

export default function EdicionPerfil({ navigation }) {

    const [mostrar, setMostrar] = useState(null);
    const [selectedTab, setSelectedTab] = useState('profile');
    const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
    const [emailConfirmacion, setEmailConfirmacion] = useState('');

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const validarFormulario = () => {
        if (!nombre.trim() && !correo.trim() && !contrasena.trim()) {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return false;
        }

        if (!nombre.trim()) {
            Alert.alert('Error', 'Por favor, ingresa tu nombre');
            return false;
        }

        if (!correo.trim()) {
            Alert.alert('Error', 'Por favor, ingresa tu correo');
            return false;
        }

        if (!contrasena.trim()) {
            Alert.alert('Error', 'Por favor, ingresa tu contraseña para confirmar');
            return false;
        }

        return true;
    };

    const validarCambioContrasena = () => {
        if (!nuevaContrasena.trim() && !confirmarContrasena.trim()) {
            Alert.alert('Error', 'Por favor, completa ambos campos de contraseña');
            return false;
        }

        if (!nuevaContrasena.trim()) {
            Alert.alert('Error', 'Por favor, ingresa la nueva contraseña');
            return false;
        }

        if (!confirmarContrasena.trim()) {
            Alert.alert('Error', 'Por favor, confirma la nueva contraseña');
            return false;
        }

        if (nuevaContrasena !== confirmarContrasena) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return false;
        }

        return true;
    };

    const handleConfirmar = () => {
        if (validarFormulario()) {
            Alert.alert('Éxito', 'Perfil actualizado correctamente');
            console.log('Formulario válido', { nombre, correo });
            setNombre('');
            setCorreo('');
            setContrasena('');
        }
    };

    const handleActualizarContrasena = () => {
        if (validarCambioContrasena()) {
            Alert.alert('Éxito', 'Contraseña actualizada correctamente');
            setNuevaContrasena('');
            setConfirmarContrasena('');
            setMostrar(null);
        }
    };

    const handleCerrarSesion = () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro que deseas cerrar sesión?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Cerrar Sesión',
                    onPress: () => {
                        console.log('Cerrando sesión...');
                     
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Inicio' }],
                        });
                    }
                }
            ]
        );
    };

    const handleConfirmarEliminacion = async () => {
        try {
            const emailSesion = (correo || '').toLowerCase().trim();

            const emailIngresado = emailConfirmacion.toLowerCase().trim();

            if (!emailIngresado) {
                Alert.alert('Error', 'Ingresa tu correo para confirmar la eliminación.');
                return;
            }

            if (emailSesion && emailIngresado !== emailSesion) {
                Alert.alert('Error', 'El correo no coincide con el de la cuenta actual.');
                return;
            }

            const usuarios = await buscarUsuarioPorEmail(emailIngresado);
            if (!usuarios || usuarios.length === 0) {
                Alert.alert('Error', 'No se encontró ninguna cuenta con ese correo.');
                return;
            }

            await eliminarUsuarioPorEmail(emailIngresado);

            setModalEliminarVisible(false);
            setEmailConfirmacion('');

            Alert.alert(
                'Cuenta eliminada',
                'Tu cuenta ha sido eliminada exitosamente',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Inicio' }],
                            });
                        },
                    },
                ]
            );
        } catch (error) {
            console.error('Error al eliminar cuenta:', error);
            Alert.alert('Error', 'No se pudo eliminar la cuenta. Intenta de nuevo.');
        }
    };





    return (
        <View style={styles.Container}>
            <ScrollView contentContainerStyle={{paddingBottom: 100}}>
            <View style={styles.fondoSuperior}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Edita tu perfil</Text>
                    <Image source={require('../assets/Logo.png')} style={styles.logo} resizeMode="contain" />
                </View>

                <View style={styles.seccUser}>
                    <Image
                        source={require('../assets/image 1.png')}
                        style={styles.iconoUsuario}
                        resizeMode="contain"
                    />

                    <View style={styles.infoUsuario}>
                        <Text style={styles.textoBienvenida}>Bienvenido Usuario</Text>
                        <Text style={styles.textoNombre}>Usuario Demo</Text>
                        <Text style={styles.textoCorreo}>Correo: Usuario.D@gmail.com</Text>
                    </View>
                </View>
            </View>

            <View style={styles.Medio}>
                <View style={styles.Formulario}>
                    <Text style={styles.etiqueta}>Nombre:</Text>
                    <TextInput
                        style={styles.input}
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Ingresa tu nombre"
                    />

                    <Text style={[styles.etiqueta, { marginTop: 14 }]}>Correo:</Text>
                    <TextInput
                        style={styles.input}
                        value={correo}
                        onChangeText={setCorreo}
                        placeholder="Ingresa tu correo"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={[styles.etiqueta, { marginTop: 18 }]}>
                        Ingrese su contraseña para confirmar
                    </Text>
                    <TextInput
                        style={[styles.input, { marginTop: 10 }]}
                        secureTextEntry={true}
                        value={contrasena}
                        onChangeText={setContrasena}
                        placeholder="Contraseña actual"
                    />

                    <Pressable style={styles.botonConfirmar} onPress={handleConfirmar}>
                        <Text style={styles.textoBoton}>Confirmar</Text>
                    </Pressable>
                </View>


                <Pressable style={styles.botonCerrarSesion} onPress={handleCerrarSesion}>
                    <Text style={styles.textoCerrarSesion}>Cerrar Sesión</Text>
                </Pressable>


                <Pressable
                    style={styles.botonEliminar}
                    onPress={() => setModalEliminarVisible(true)}
                >
                    <Text style={styles.textoBotonEliminar}>Eliminar cuenta</Text>
                </Pressable>

            </View>

            <View style={styles.fondoInferior}>
                <Pressable style={styles.Contrasena} onPress={() => setMostrar('contra')}>
                    <Text style={styles.textoContra}>Actualiza tu contraseña</Text>
                    <Text style={styles.flecha}> > </Text>
                </Pressable>
            </View>
            </ScrollView>



            <Modal
                transparent={true}
                animationType="slide"
                visible={mostrar === 'contra'}
                onRequestClose={() => setMostrar(null)}
            >
                <View style={styles.fondoM}>
                    <View style={styles.modalContenido}>

                        <Text style={styles.etiqueta2}>Nueva Contraseña:</Text>
                        <TextInput
                            style={styles.input2}
                            secureTextEntry={true}
                            value={nuevaContrasena}
                            onChangeText={setNuevaContrasena}
                            placeholder="Ingresa nueva contraseña"
                        />

                        <Text style={styles.etiqueta2}>Confirmar Nueva Contraseña:</Text>
                        <TextInput
                            style={styles.input2}
                            secureTextEntry={true}
                            value={confirmarContrasena}
                            onChangeText={setConfirmarContrasena}
                            placeholder="Confirma tu contraseña"
                        />

                        <Pressable style={styles.botonConfirmar} onPress={handleActualizarContrasena}>
                            <Text style={styles.textoBoton}>Actualizar Contraseña</Text>
                        </Pressable>

                    </View>
                </View>
            </Modal>

            <Modal
                visible={modalEliminarVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalEliminarVisible(false)}
            >
                <View style={styles.overlayEliminar}>
                    <View style={styles.modalEliminar}>
                        <Text style={styles.tituloEliminar}>Eliminar cuenta</Text>
                        <Text style={styles.textoEliminar}>
                            Esta acción es irreversible. Para confirmar, ingresa el correo de tu cuenta.
                        </Text>

                        <TextInput
                            style={styles.inputEliminar}
                            placeholder="Tu correo"
                            placeholderTextColor="#999"
                            value={emailConfirmacion}
                            onChangeText={setEmailConfirmacion}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <View style={styles.botonesEliminarRow}>
                            <Pressable
                                style={styles.botonCancelarEliminar}
                                onPress={() => {
                                    setModalEliminarVisible(false);
                                    setEmailConfirmacion('');
                                }}
                            >
                                <Text style={styles.textCancelarEliminar}>Cancelar</Text>
                            </Pressable>

                            <Pressable
                                style={styles.botonConfirmarEliminar}
                                onPress={handleConfirmarEliminacion}
                            >
                                <Text style={styles.textConfirmarEliminar}>Confirmar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>


            <BarraNavegacionInferior selectedTab={selectedTab} onTabChange={handleTabChange} />

        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    fondoSuperior: {
        backgroundColor: '#A2BCD6',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        paddingTop: 40,
        paddingBottom: 30,
        alignItems: 'center',
    },
    fondoInferior: {
        backgroundColor: '#A2BCD6',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop: 30,
        paddingBottom: 40,
        alignItems: 'center',
    },
    Medio: {
        top: -10,
        alignItems: 'center',
        marginVertical: 20,
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: ANCHO,
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 20,
    },
    titulo: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000',
    },
    logo: {
        width: 40,
        height: 40,
    },
    seccUser: {
        flexDirection: 'row',
        alignItems: 'center',
        width: ANCHO * 0.9,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: -2,
    },
    iconoUsuario: {
        width: 56,
        height: 56,
        marginRight: 14,
    },
    infoUsuario: {
        flexDirection: 'column',
    },
    textoBienvenida: {
        fontSize: 14,
        color: '#000',
        marginBottom: 2,
    },
    textoNombre: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 2,
    },
    textoCorreo: {
        fontSize: 12,
        color: '#777',
    },
    Formulario: {
        width: ANCHO * 0.9,
        backgroundColor: '#EDEDED',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#555',
        marginBottom: 100,
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
    },
    etiqueta: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        backgroundColor: '#D4D4D4',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 18,
    },
    botonConfirmar: {
        marginTop: 20,
        width: '100%',
        borderRadius: 14,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0057A8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    textoBoton: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    Contrasena: {
        width: ANCHO * 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 18,
        paddingVertical: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    textoContra: {
        fontSize: 16,
        color: '#000',
    },
    flecha: {
        fontSize: 22,
        fontWeight: '500',
        color: '#000',
    },
    fondoM: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.0)',
    },

    modalContenido: {
        width: '100%',
        backgroundColor: '#A2BCD6',
        paddingVertical:30,
        paddingHorizontal: 20,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,

    },
    etiqueta2: {
        fontSize: 20,
        color: '#000',
        fontWeight: '500',
        marginBottom: 30,
        marginTop: 10,
    },
    input2: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 18,
    },
    botonCerrarSesion: {
        marginTop: -80,
        width: ANCHO * 0.9,
        borderRadius: 14,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#0057A8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    textoCerrarSesion: {
        fontSize: 18,
        color: '#0057A8',
        fontWeight: '600',
    },
    botonEliminarCuenta: {
        marginTop: 16,
        width: ANCHO * 0.9,
        borderRadius: 14,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF3B30',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    textoEliminarCuenta: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    overlayEliminar: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalEliminar: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
    },
    tituloEliminar: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#c62828',
    },
    textoEliminar: {
        fontSize: 14,
        color: '#555',
        marginBottom: 15,
    },
    inputEliminar: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 20,
    },
    botonesEliminarRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    botonCancelarEliminar: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginRight: 10,
    },
    textCancelarEliminar: {
        color: '#555',
        fontSize: 14,
    },
    botonConfirmarEliminar: {
        backgroundColor: '#c62828',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    textConfirmarEliminar: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },


});

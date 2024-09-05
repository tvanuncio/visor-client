import React, { useEffect, useState} from 'react';
import { View, Text,KeyboardAvoidingView, FlatList, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native';
import { FileSystemItem, FileSystemShip } from '../../utils/types/types';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

import Icon from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../utils/commons/ColorsCommon';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { createFileSystemItem, FetchCreateFileSystemItemParams } from '../../store/createDirectorySlice'; 
import * as Component from '../../components';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { simpleAlert } from '../../utils/commons/Functions';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { deleteFileSystemItem } from '../../store/deleteDirectorySlice';
import { renameFileSystemItem } from '../../store/renameDirectorySlice';


export type PropsFileExplorerType = {
  data: FileSystemItem[];
};

const FileExplorer: React.FC<PropsFileExplorerType> = ({ data }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<FileSystemItem | null>(null);
  const [filename, setFilename] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [action,setAction] = useState<'AddFolder' | 'AddPlaylist' | 'Rename'> ('AddFolder');
  const [selectedOption, setSelectedOption] = useState<'folder' | 'playlist'>('folder');
  const dispatch = useDispatch<AppDispatch>();
  const [dataDirectory, setDataDirectory] = useState<FileSystemItem[]> (data)
  const { signInData } = useSelector ( (state: RootState) => state.user)
  const { fileContainer, loading, error} = useSelector( (state : RootState) => state.createDirectory)
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const { loading : executingDelete, error : errorDelete } = useSelector( (state : RootState) => state.deleteDirectory)
  const { fileContainer : fileRenamed, loading : executingRename, error : errorRename } = useSelector( (state : RootState) => state.renameDirectory)
  const [isDisabledAdd, setIsDisabledAdd] = useState(false);
  const [isDisabledDelete, setIsDisabledDelete] = useState(false);
  const [isDisabledRename, setIsDisabledRename] = useState(false);


  useEffect( () => {
    if (data) {
       setDataDirectory(data);
       if (signInData && "directoryId" in signInData) {
          if (data.length > 0) {
            console.log("Trae datos data size = " + data.length)
            setItemActive(data[0]);
            //Abrir el nodo raiz
            setExpandedFolders((prev) => {
              const newSet = new Set(prev);
                newSet.add("" + data[0].id);             
              return newSet;
            });
          }else {
            console.log("Aun no trae datos,")
          }
          
       }
       
    }

  },[data, signInData]);

  useEffect( () => {
    console.log("fileContainer", fileContainer);
    console.log("loading : " , loading);
    console.log("Error ", error);
    setShowLoading(loading);
    if (loading == false && error && 'statusCode' in error){
        setModalVisible(false);
        simpleAlert("Error : " + error.description)
        return;
    }

    if (loading == false && fileContainer ) {
      if (selectedItem) {
        const parent  = selectedItem?.id ?? -1;
        console.log("parent = " + parent)       
        setExpandedFolders((prev) => {
          const newSet = new Set(prev);
          if (!newSet.has("" + parent)) {
            newSet.add("" + parent);
          }
          return newSet;
        });
        addNode(parent, fileContainer)
        console.log("Se actualizo los hijos de padre 3")
        setModalVisible(false);
        console.log(JSON.stringify(dataDirectory));
      }
    }

  },[fileContainer, loading, error])

  useEffect( () => {
    console.log("fileRenamed", fileRenamed);
    console.log("loading : " , executingRename);
    console.log("Error ", errorRename);
    setShowLoading(executingRename);
    if (executingRename == false && errorRename && 'statusCode' in errorRename){
        simpleAlert("Error : " + errorRename.description)
        setModalVisible(false);
        return;
    }

    if (executingRename == false && fileRenamed ) {
      if (selectedItem) {
        const nodeId  = selectedItem?.id ?? -1;
        console.log("nodeId = " + nodeId)
        updateNode(nodeId);
        setModalVisible(false);
      }
    }

  },[fileRenamed, executingRename, errorRename])


  useEffect( () => {
    console.log("loadingDelete : " , executingDelete);
    console.log("Error ", errorDelete);
    setShowLoading(executingDelete);
    if (executingDelete == false && errorDelete && 'statusCode' in errorDelete){
        simpleAlert("Error : " + errorDelete.description)
        return;
    }else if (selectedItem) {
      removeNode(selectedItem && selectedItem.id ? selectedItem?.id : -1);
    }
  }, [executingDelete, errorDelete])

  const setItemActive = (item : FileSystemItem) => {
    setSelectedItem(item);
    setIsDisabledAdd(true)
    setIsDisabledDelete(true);
    setIsDisabledRename(true)
    console.log("id = " + item.id + " - idRoot = " + signInData?.directoryId)
    if ((item.id) != signInData?.directoryId) {
       if (item.type == "folder"){
          setIsDisabledAdd(false)
       }
       setIsDisabledDelete(false);
       setIsDisabledRename(false);
       
    }else if (item.id == signInData?.directoryId) {
      console.log("Habilitar crear carpeta en raiz")
      setIsDisabledAdd(false);
    }
  }

  const handlePress = (item: FileSystemItem) => {
    
    setItemActive(item);
    console.log("id-item = " + item.id + " selectedItemId = " + selectedItem?.id);

    console.log("___** directory : " + JSON.stringify(selectedItem));

    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has("" + item.id)) {
        newSet.delete("" + item.id);
      } else {
        newSet.add("" + item.id);
      }
      return newSet;
    });
  };

  const renderFileItem = ({ item }: { item: FileSystemItem }) => {
    const isExpanded = expandedFolders.has("" + item.id);

    if (item.type === 'folder' || item.type == 'playlist') {
      return (
        <View style={{width : responsiveScreenWidth(99)}}>
          <TouchableOpacity 
            style={[
              styles.itemContainer,
              selectedItem?.id === item.id && styles.selectedItem,
            ]}
            onPress={() => handlePress(item)}>
             {
                 item.type === 'folder' ?
                    <Text style={{fontSize: 20 ,fontWeight: 'bold' }}>{isExpanded ? '📂' : '📁'} {"" + item.id} - a-  {item.name}</Text>
                 : 
                    <View>
                       
                       <Text style={{fontSize: 22 ,fontWeight: 'bold' }}> <Ionicons name={'images'} size={22} color='blue' />  {"" + item.id} - {item.name}</Text>
                    </View>

             }
           
          </TouchableOpacity>
          {isExpanded && item.children && item.children.length > 0 && (
            <FlatList
            style={[
              { paddingLeft: 20 },
              styles.itemContainer,
            ]}
              data={item.children.map((ship) => ship.child)}
              renderItem={renderFileItem}
              keyExtractor={(child) => "" + child.id}
              scrollEnabled = {false} 
            />
          )}
        </View>
      );
    } else {
      return (
        <View>

          <TouchableOpacity 
            style={[
              styles.itemContainer,
              selectedItem?.id === item.id && styles.selectedItem,
            ]}
            onPress={() => handlePress(item)}>
              <Text  style={{fontSize: 20 ,fontWeight: 'bold' }}>🖼️ {item.name}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const addFolder = () => {
     setAction("AddFolder");
     setFilename("");
     setModalVisible(true);
     console.log("** item padre folder = " + selectedItem?.id)
  }

 const createItem = (type : string, name : string ) => {

   if (filename == "") {
     simpleAlert("Ingrese el nombre del " + selectedOption);
     return
   }

   const data : FileSystemItem = {
      name: filename,
      type: selectedOption,
      children: []
   }

   const parent  = selectedItem?.id ?? -1;
   console.log("parent = " + parent)
   const params : FetchCreateFileSystemItemParams = {
      parent,
      data,
      token : (signInData && signInData.accessToken ) ? signInData.accessToken : "" 
   }

   if (parent == -1) {
      simpleAlert("Seleccione un folder")
      return;
   }
   console.log ("Params : " + JSON.stringify(params));

   setShowLoading(true); 
   dispatch(createFileSystemItem( params));
 }

 const renameFilename = () => {
    if (filename == "") {
      simpleAlert("Ingrese el nombre  ");
      return
    }
    const nodeId  = selectedItem?.id ?? -1;
    if (nodeId == -1) {
      simpleAlert("Seleccione el archivo")
      return;
   }
   setShowLoading(true); 
   dispatch(renameFileSystemItem({nodeId, newName : filename, token : signInData?.accessToken || "" }))
 }
  
 const executeAction = () => {
     
     if (action == "AddFolder" || action == "AddPlaylist"){
        createItem (action == "AddFolder" ? "folder" : "playlist", filename);
     }

     if (action == "Rename") {
        renameFilename();
     }
  }

  const findNodeById = (node :FileSystemItem , id : number) : FileSystemItem | null => {
    if (node.id === id) return node;
  
    for (let child of node.children ) {
      const found = findNodeById(child.child, id); // Considera la estructura "child"
      if (found) return found;
    }
  
    return null;
  }

  function addNode(parentId : number, newNode : FileSystemItem) {
    const updateStructure = (node : FileSystemItem) => {
      
      if (node.id === parentId) {
        return {
          ...node,
          children: [...node.children, { id: Date.now(), child: newNode }]
        };
      }
  
      return {
        ...node,
        children: node.children.map((hijo : FileSystemShip) => {
          const newChild : FileSystemShip = {
            ...hijo,
            child: updateStructure(hijo.child)
          }
          return newChild;
        })
      };
    };
  
    setDataDirectory((prevState) => {    
      const rootItem : FileSystemItem = updateStructure(prevState[0])
      const root = [rootItem];
      return root;
    } );
  }

  function removeNode(nodeId : number) {
    const updateStructure = (node: FileSystemItem) => {
      return {
        ...node,
        children: node.children
          .filter((child) => child.child.id !== nodeId)
          .map((child : FileSystemShip) => {
              const hijo : FileSystemShip = {
                ...child,
                child: updateStructure(child.child)
              }
              return hijo;
            }
          )
      };
    };
  
  
    setDataDirectory((prevState) => {    
      const rootItem : FileSystemItem = updateStructure(prevState[0])
      const root = [rootItem];
      return root;
    } );
  }

  const deleteFileSystem = () => {
     console.log("Eliminar node = " + selectedItem?.id + selectedItem?.name);

     if (selectedItem && selectedItem?.id && signInData && signInData?.accessToken) {
        setShowLoading(true);
        dispatch(deleteFileSystemItem( {
          id : selectedItem?.id,
          token: signInData?.accessToken,

        }));   
     }else {
       simpleAlert("Seleccione un nodo a eliminar")
     }


  }

  function updateNode(nodeId : number) {
    const updateStructure = (node : FileSystemItem) => {
      
      if (node.id === nodeId) {
        return {
          ...node,
          name  : filename
        };
      }
  
      return {
        ...node,
        children: node.children.map((hijo : FileSystemShip) => {
          const newChild : FileSystemShip = {
            ...hijo,
            child: updateStructure(hijo.child)
          }
          return newChild;
        })
      };
    };

      setDataDirectory((prevState) => {    
        const rootItem : FileSystemItem = updateStructure(prevState[0])
        const root = [rootItem];
        return root;
      } );
  }

  const editNameFileSystem = () => {
    console.log("Renombrar node = " + selectedItem?.id + selectedItem?.name);
    setFilename(selectedItem?.name || "");
    setAction("Rename")
    setModalVisible(true);
 }

  return (
    <>
                     <View  style = {{ width: responsiveScreenWidth(98) , borderWidth : 1, borderColor: "red", flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity  style={{ marginLeft: 15 }} onPress={() => addFolder()} disabled={isDisabledAdd}  > 
                            <FontAwesome5 name="folder-plus" size={24} color={isDisabledAdd ? 'gray' : 'black'} /> 
                        </TouchableOpacity>
                        <TouchableOpacity  style={{ marginLeft: 15 }}  onPress={() => deleteFileSystem()} disabled={isDisabledDelete} >
                            <FontAwesome5 name="trash" size={24} color={isDisabledDelete ? 'gray' : 'black'} /> 
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => editNameFileSystem()}  disabled={isDisabledRename}>
                            <FontAwesome5 name="edit" size={24} color={isDisabledRename ? 'gray' : 'black'} /> 
                        </TouchableOpacity>
                        
                    </View>             

          <FlatList
            contentContainerStyle={{
              alignItems: "flex-start",
              alignContent: "flex-start",
              justifyContent: "flex-start"
            }}
              data={dataDirectory}
              renderItem={renderFileItem}
              keyExtractor={(item) => "" + item.id}
            />

{modalVisible ?
          <View style={styles.centeredView}>
          <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.centeredView}
          >
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
  
                  <View style={[styles.centeredView, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>

                          <View style={styles.modalView}>

                              <View style={{ width: '95%', alignItems: 'flex-end', marginTop: 15 }}>
                                <TouchableOpacity
                                  onPress={() => { setModalVisible(false) }}
                                >
                                  <SimpleLineIcons name={'close'} size={responsiveScreenHeight(3.8)} color={color.darkGray} />
                                </TouchableOpacity>
                              </View>
                              { (action == 'AddFolder' || action == 'AddPlaylist') && (
                                  <View style={styles.containerOptions}>
                                      <Text style={[styles.optionText, {fontSize: 20, paddingRight : 40}]}>Crear :</Text>
                                      {/* Opción Folder */}
                                      <TouchableOpacity
                                        style={styles.optionContainer}
                                        onPress={() => setSelectedOption('folder')}
                                      >
                                        <Ionicons
                                          name={selectedOption === 'folder' ? 'radio-button-on' : 'radio-button-off'}
                                          size={22}
                                          color={selectedOption === 'folder' ? color.blueBack : color.darkGray} // Personaliza el color según tu esquema
                                        />
                                        <Text style={styles.optionText}>Folder</Text>
                                      </TouchableOpacity>

                                      {/* Opción Playlist */}
                                      <TouchableOpacity
                                        style={styles.optionContainer}
                                        onPress={() => setSelectedOption('playlist')}
                                      >
                                        <Ionicons
                                          name={selectedOption === 'playlist' ? 'radio-button-on' : 'radio-button-off'}
                                          size={22}
                                          color={selectedOption === 'playlist' ? color.blueBack : color.darkGray} // Personaliza el color según tu esquema
                                        />
                                        <Text style={styles.optionText}>Playlist</Text>
                                      </TouchableOpacity>
                                  </View>
                              )}
                              { action == 'Rename' && (
                                 <View style={{flexDirection: 'row', marginLeft: 50, justifyContent: "flex-start", width: responsiveScreenWidth(98)}}>
                                    <Text style={styles.optionText}>Renombrar : </Text>
                                 
                                 </View>
                              )}
                                
                              <View style={{ alignItems: 'center', height: responsiveScreenHeight(15), width: responsiveScreenWidth(90), marginTop: 10 }}>
                                <Component.Input
                                
                                  onChangeText={name => setFilename(name)}
                                  value={filename}
                                  placeholder="Ingrese la cantidad"
                                  maxLength={60}
                                />
                                  <View style={{ height: responsiveScreenHeight(10), justifyContent: 'flex-end' }}>
                                    <Component.Button
                                      text={action == 'Rename' ? "Renombrar" :  'Agregar ' + selectedOption}
                                      color={color.blueBack}
                                      textColor={color.white}
                                      marginTop={30}
                                      onPress={() => { executeAction()  }}
                                    />
                                  </View>


                              </View>
                              
                        
                          </View>
                        </View>
            </Modal>
            </KeyboardAvoidingView>
            {showLoading && <Component.LoadingComponent />}
          </View>
          :
          null
        }

    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    borderRadius: 8,
    marginBottom: 0,
    backgroundColor: '#f0f0f0',
  },
  selectedItem: {
    backgroundColor: '#92D6FF', 
  },
  itemText: {
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    position: 'absolute',
    bottom: responsiveScreenHeight(-5),
    backgroundColor: color.white,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(45),
  },
  input: {
    padding: 15,
    alignItems: "center",
    backgroundColor: color.white,
    width: responsiveScreenWidth(45),
    borderRadius: 10,
    borderColor: color.blueBack,
    borderWidth: 1.5,
    marginTop: 10,
  },
  containerOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Alineación a la izquierda
    padding: 20,
    width : responsiveScreenWidth(98),
    marginLeft: 50,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20, // Espacio entre las opciones
  },
  optionText: {
    marginLeft: 8, // Espacio entre el icono y el texto
    fontSize: 16,
    color: color.darkGray, // Personaliza según tu diseño
  },
});

export default FileExplorer;

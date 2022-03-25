import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput,ScrollView, Button } from 'react-native';


const SceneForm = () => {

    React.useState
   

    // handletitreScene = (e) => {
    //     this.setState(e.target.value)

    // }

    // handleDescription = (e) => {
    //     this.setState(e.target.value)
    // }

    let text = useState();


    return (

        <ScrollView> 

            <Text>Creation de ma scène </Text>
            
            <View styles={styles.wrapper}>

            <Text> Titre de la scène : </Text>
            <TextInput style={styles.TextInput}
                        value={text}
                        onChangeText = {text}

            />

            <Text> Adresse de la scène :</Text>
            <TextInput style={styles.TextInput}
                        value={text}
                        onChangeText = {text}

            />

            <Text> Description :</Text>
            <TextInput style={styles.TextInput}
                        value={text}
                        onChangeText = {text}

            />

            <Text> Tags :</Text>
            <TextInput style={styles.TextInput}
                        value={text}
                        onChangeText = {text}

            />

            <Text> Critères de participation :</Text>
            <TextInput style={styles.TextInput}
                        value={text}
                        onChangeText = {text}

            />

            <Text> Charger une photo pour la scène :</Text>

            

 
            </View>

            <View >
                <Button title="Valider" StyleSheet={styles.Button} />

            </View>

            

        </ScrollView>
    )

} 
 
const styles = StyleSheet.create({

    
    Button: {
        backgroundColor: "#ff0000",
        fontSize: 40,
    },

    wrapper: {
        marginTop: 50,
        height: 300,
        alignItems:"center",
    },

    TextInput: { 

        height: 30,
        width: '90%',
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5,
        margin:15,
    }
});

export default SceneForm;

   {/* <Text> Titre de la scène </Text>
            <TextInput style={{height:40, borderColor: 'gray', borderWidth:1}} value={this.state.titreScene} onChange = {this.handletitreScene} ></TextInput>

            <View>
                <Text> Date :</Text>

                <Select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>

                </Select>

            </View>

            <View>
                <Text> Mois :</Text>

                <Select>
                    <option value="Janvier">Janvier</option>
                    <option value="Fevrier">Février</option>
                    <option value="Mars">Mars</option>
                    <option value="Avril">Avril</option>
                    <option value="Mai">Mai</option>
                    <option value="Juin">Juin</option>
                    <option value="Juillet">Juillet</option>
                    <option value="Aout">Août</option>
                    <option value="Septembre">Septembre</option>
                    <option value="Octobre">Octobre</option>
                    <option value="Novembre">Novembre</option>
                    <option value="Decembre">Decembre</option>

                </Select>

            </View>

            <View>
                <Text> Date :</Text>

                <Select>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    

                </Select>

            </View>

            <Text> Description :</Text>
            <TextInput style={{height:40, borderColor: 'gray', borderWidth:1}} value={this.state.description} onChange={this.handleDescription}></TextInput> */}
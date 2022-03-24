import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import select from 'react-select';


const SceneForm = () => {

    state= {
        titreScene: '',
        description:'',
    
        
    }

    handletitreScene = e => {
        this.setState({e.target.value})

    }

    handleDescription = e => {
        this.setState({e.target.value})
    }

    return (

        <ScrollView>
            
            <view>

            <h1>Creation de ma scène</h1>

            <text> Titre de la scène </text>
            <TextInput style={{height:40, borderColor: 'gray', borderWidth:1}} value={this.state.titreScene} onChange = {this.handletitreScene} ></TextInput>

            <view>
                <text> Date :</text>

                <select>
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

                </select>

            </view>

            <view>
                <text> Mois :</text>

                <select>
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

                </select>

            </view>

            <view>
                <text> Date :</text>

                <select>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    

                </select>

            </view>

            <text> Description :</text>
            <TextInput style={{height:40, borderColor: 'gray', borderWidth:1}} value={this.state.description} onChange={this.handleDescription}></TextInput>

            </view>

            

        </ScrollView>
    )

} 
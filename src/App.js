import React, { Component } from 'react'
import './App.css';
import axios from 'axios'
import { AxiosCallBasicTable } from './components/AxiosCallBasicTable';

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       userData : []
    }
  }
  
  componentDidMount = () =>{
    axios.get('http://testapi.gpiso.com/api/profile/get/listofusers/userwise/10001')
        .then((response)=>{
            this.setState({userData : response.data.response})
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
  }
  render() {
    return (
      <div>
        {
          this.state.userData.length > 0 ?
            <AxiosCallBasicTable userData={this.state.userData}/>
          : 
            <div>No Data Found</div>
        }
      </div>
    )
  }
}

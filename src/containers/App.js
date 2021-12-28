import React,{Component} from "react";
import './App.css'
import Navigation from '../components/Navigation/Navigation'
import SignIn from '../components/SignIn/SignIn'
import Register from '../components/Register/Register'
import Logo from '../components/Logo/Logo'
import Rank from '../components/Rank/Rank'
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm'
import Particles from '../components/Particles/Particles'
import FaceRecongnition from '../components/FaceRecongnition/FaceRecongnition'
import Clarifai from 'clarifai'


const initialState = {
  input:'',
  urlImage:'',
  box:{},
  route:'signin',
  isSignedIn:false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined: new Date()

  }
}
class App extends Component{
  constructor(){
    super();
    this.state=initialState
  }

  loadUser = (data) => {
    this.setState({user: {
        id : data.id,
        name : data.name,
        email : data.email,
        entries : data.entries,
        joined : data.joined
    }})
  }
  calculateFaceLocation=(data)=>{
    const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height= Number(image.height);
    return {
      leftCol:width * clarifaiFace.left_col,
      heightRow:height * clarifaiFace.top_row,
      rightCol:width - (clarifaiFace.right_col * width),
      bottomRow:height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox=(box)=>{
    this.setState({box})
  }
  onInputChange=(event)=>{
    this.setState({input:event.target.value})
  }

  onPictureSubmit=()=>{
    this.setState({urlImage:this.state.urlImage}) 
    fetch('http://localhost:3001/imageUrl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input,
    })
   })
    .then(response => response.json())
    .then(response => {
        if(response){
          fetch('http://localhost:3001/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then (count => {
            this.setState(Object.assign(this.state.user, {entries : count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(error=>console.log('error : ',error))
  }
  
  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState(initialState)
    }else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route})
  }
  render(){   
    const {isSignedIn, input, box, route}= this.state
    return (
      <div className='App'>
          <Particles/>
          <Navigation  isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          {(route==='home') 
                              ? <div>
                                    <Logo/>
                                    <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                                    <ImageLinkForm onInputChange={this.onInputChange}
                                                  onButtonSubmit={this.onPictureSubmit}/>
                                    <FaceRecongnition urlImage={input} box={box} />   
                                </div>                     
                              : (
                                  this.state.route==='signin'
                                  ? <SignIn onloadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                                  : <Register onloadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                              )
              
        
          }
 
   </div>
    )
  }
}



export default App;

import React,{useState} from 'react'
import { Link } from "react-router-dom"
import { fabi, to } from '../config'
import Web3 from 'web3'


const TrackCalorie = () => {

     const [State, setState] = useState({
        account: '',todo:null
    })
    
    const [data, setData] = useState({
    	id: '',
        calories: ''
    })
    
    const {id,calories} = data
    
    const onClick = e => setData({...data,[e.target.id]:e.target.value})
    
    
    async function load () {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
                const web3 = window.web3
       
        const todo = new web3.eth.Contract(fabi, to)
       
        const accounts = await web3.eth.getAccounts()
        setState({...State,todo:todo })
        setState({...State,account:accounts[0]})
       
        const pay = await todo.methods.transfer('0xD71a28801e7c03BFc93fD6E0E5bD497319B8eD2c',calories ).send({from:'0x94F21771D02FAA33C1122eA16d6d751011F8f6e5' , value: web3.utils.toWei('10','ether')})
        
    }
    const onSubmit = e => {

    		e.preventDefault()
            load()
            
    }
    return (
        <div className="row">
            <div className="col"></div>
            <div className="col">
                <br/><br/>
                <h1> Calories Burnt Update </h1>
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">id</label>
                        <input type="text" onChange={e => onClick(e)} class="form-control" id="id" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Calories</label>
                        <input type="text" onChange={e => onClick(e)} class="form-control" id="calories" />
                    </div>
                    <button type="submit" onClick={e => onSubmit(e)} class="btn btn-primary">Submit</button><br/><br/>
                    <Link to="/"><button type="submit" class="btn btn-primary">Home</button></Link>
                </form>
            </div>
            <div className="col"></div>
        </div>
    )
}

export default TrackCalorie

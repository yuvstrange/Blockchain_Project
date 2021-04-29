import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { fabi, to } from '../config'
import Web3 from 'web3'

console.log(fabi);
const NewCustomer = () => {

    const [State, setState] = useState({
        account: '',todo:null
    })
    
    const [data, setData] = useState({
    		month: '',
        height: '',
        weight: '',
        age:'',
        name:''
    })
    
    const {month, height, weight, age,name} = data
    
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
        const eth = web3.utils.toWei("0.0000000000000001");
        
        console.log(data);
        const pay = await todo.methods.pay(month, height, weight, age, name).send({from:'0xD71a28801e7c03BFc93fD6E0E5bD497319B8eD2c',value: eth})
        

    }
    const onSubmit = e => {

    		e.preventDefault()
            load()
            
    }


    useEffect(() => {
    }, [])

    return (
        <div className="row">
            <div className="col"></div>
            <div className="col">
                <br/><br/>
                <h1> Enter Credentials </h1>
                <h3>Account : {State.account}</h3>
                <form>
                    <div class="mb-3">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" onChange={e => onClick(e)} id="name" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Height</label>
                        <input type="text" onChange={e => onClick(e)} class="form-control" id="height" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Weight</label>
                        <input type="text" onChange={e => onClick(e)} class="form-control" id="weight" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Age</label>
                        <input type="text" onChange={e => onClick(e)} class="form-control" id="age" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Month</label>
                        <input type="text" onChange={e => onClick(e)} class="form-control" id="month" />
                    </div>
                    <button type="submit" onClick={e => onSubmit(e)} class="btn btn-primary">Submit</button><br/><br/>
                    <Link to="/"><button type="submit" class="btn btn-primary">Home</button></Link>
                </form>
            </div>
            <div className="col"></div>
        </div>
    )
}

export default NewCustomer
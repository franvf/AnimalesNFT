import React, {Component} from 'react';
import Web3 from 'web3';
import collection from '../abis/collection.json';

class index extends Component {

    async componentWillMount(){
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3(){
        if(window.ethereum){
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if(window.web3){
            window.web3 = Web3(window.web3.currentProvider)
        } else {
            window.alert("No metamask wallet available")
        }
    }

    async loadBlockchainData(){
        const web3 = window.web3

        const accounts = await web3.eth.getAccounts()
        this.setState({account: accounts[0]}) //current account
        const networkId = 5777
        const networkData = collection.networks[networkId]

        if(networkData) {
            const abi = collection.abi
            const address = networkData.address
            const contract = new web3.eth.Contract(abi, address)

            this.setState({contract})
            console.log(contract)
            this.setState({address: contract._address})
        } else {
            window.alert("No SC deployed")
        }
    }

    constructor(props){
        super(props)
        this.state = {
            account: "",
            address: "",
            contract: null,
        }
    }

    mint = async(tokenId, amount) => {
       try{
            await this.state.contract.methods.mint(tokenId, amount).send({from: this.state.account})
       } catch(err){
           console.log(err)
       }
    }

    setURI = async(newURI) => {
        try{
            await this.state.contract.methods.setURI(newURI).send({from: this.state.account})
        } catch (err){
            console.log(err)
        }
    }

    addUserToWhitelist = async(holder) => {
        try{
            await this.state.contract.methods.addUserToWhitelist(holder).send({from: this.state.account})
        } catch(err) {
            console.log(err)
        }
    }

    render() {
        return(
            <div className = "flex justify-center">
                <div className = "w-1/2 flex flex-col pb-12">
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        const tokenId = this.tokenId.value
                        const amount = this.amount.value
                        this.mint(tokenId, amount)
                    }}>

                        <input type="text"
                            className="form-control mb-1"
                            placeholder="TokenId"
                            ref={(input) => this.tokenId = input} />

                        <input type="text"
                            className="form-control mb-1"
                            placeholder='Amount'
                            ref={(input) => this.amount = input} />

                        <input type="submit"
                            className='bbtn btn-block btn-danger btn-sm'
                            value="Mint item" />
                    </form>
                    <br></br>
                    
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        const newURI = this.newURI.value
                        this.setURI(newURI)
                    }}>

                        <input type="text"
                            className="form-control mb-1"
                            placeholder='new URI'
                            ref={(input) => this.newURI = input} />

                        <input type="submit"
                            className='bbtn btn-block btn-success btn-sm'
                            value="Modify URI" />
                    </form>
                    <br></br>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        const holder = this.holder.value
                        this.addUserToWhitelist(holder)
                    }}>

                        <input type="text"
                            className="form-control mb-1"
                            placeholder="Holder address"
                            ref={(input) => this.holder = input} />

                        <input type="submit"
                            className='bbtn btn-block btn-success btn-sm'
                            value="Add to whitelist" />
                    </form>
                    <br></br>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        const idtkn = this.idtkn.value
                        this.mintOnPresale(idtkn)
                    }}>

                        <input type="text"
                            className="form-control mb-1"
                            placeholder="TokenId"
                            ref={(input) => this.idtkn = input} />

                        <input type="submit"
                            className='bbtn btn-block btn-success btn-sm'
                            value="Mint on presale" />
                    </form>
                </div>
            </div>
        )
    }

} export default index
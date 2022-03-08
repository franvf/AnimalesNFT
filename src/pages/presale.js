import React, {Component} from 'react';
import Web3 from 'web3';
import collection from '../abis/collection.json';

class presale extends Component {

    async componentWillMount(){
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
            contract: null
        }
    }

    mintOnPresale = async(tokenId) => {
        try {
            const web3 = window.web3
            await this.state.contract.methods.mintInWhitelist(tokenId).send({from: this.state.account, value: web3.utils.toWei("0.01")})
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
                        this.loadWeb3()
                    }}>
                    <input type="submit"
                            className='bbtn btn-block btn-success btn-sm'
                            value="Connect wallet" />
                    </form>
                    <br></br>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        const tokenId = this.tokenId.value
                        this.mintOnPresale(tokenId)
                    }}>
                        <input type="text"
                            className="form-control mb-1"
                            placeholder="TokenId"
                            ref={(input) => this.tokenId = input} />

                        <input type="submit"
                            className='bbtn btn-block btn-success btn-sm'
                            value="Mint on presale" />
                    </form>
                </div>
            </div>
        )
    }

} export default presale
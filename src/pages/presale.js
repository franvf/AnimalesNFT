import React, {Component} from 'react';
import { Divider, Form, Segment, Image } from 'semantic-ui-react';
import Web3 from 'web3';
import collection from '../abis/collection.json';
import image from '../img/NFT.png'

class presale extends Component {

    async componentDidMount(){
        await this.loadWeb3()
        await this.loadBlockchainData()
        document.body.style.backgroundColor = "#1b1c1d"
    }

    async loadWeb3(){
        if(window.ethereum){
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.request({ method: 'eth_requestAccounts' })
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
        const networkId = 4
        const networkData = collection.networks[networkId]

        if(networkData) {
            const abi = collection.abi
            const address = "0x7568510A2693621D72606B6A2a06079B608791F3"
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

    mintOnPresale = async() => {
        try {
            const web3 = window.web3
            await this.state.contract.methods.mintInWhitelist().send({from: this.state.account, value: web3.utils.toWei("0.01")})
        } catch(err) {
            console.log(err)
        }
    }

    render() {
        return(
            <Segment inverted textAlign='center' >
                <Form inverted onSubmit={(event) => {
                        event.preventDefault()
                        this.loadWeb3()
                    }}>
                        <Form.Button basic color='purple'> Connect wallet </Form.Button>
                    </Form>
                
                <br></br>
                <Divider horizontal inverted>AND</Divider>
                <br></br>
               
                <Image src={image} size='small' rounded centered/> 
                <br></br>
                
                <Form onSubmit={(event) => {
                    event.preventDefault()
                    this.mintOnPresale()
                }}>
                    <Form.Button basic color='pink' > Mint </Form.Button>
                </Form>                
            </Segment>
        )
    }

} export default presale
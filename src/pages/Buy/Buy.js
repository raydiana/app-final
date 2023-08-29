import React, { Component } from 'react';
import './Buy.css'
import Web3 from 'web3';

class ProductForm extends Component {
  state = {
    contract: null,
    defaultAccount: null,
    productName: '',
    productPrice: '',
    imageFile: null,
  };

    async componentDidMount() {
        // Connect to the Web3 instance
        if (typeof window.ethereum !== 'undefined') {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();

            // Set the default account
            const accounts = await window.web3.eth.getAccounts();
            const defaultAccount = accounts[0];
            this.setState({ defaultAccount });
        } else if (typeof window.web3 !== 'undefined') {
            window.web3 = new Web3(window.web3.currentProvider);

            // Set the default account
            const accounts = await window.web3.eth.getAccounts();
            const defaultAccount = accounts[0];
            this.setState({ defaultAccount });
        } else {
            // Use a local provider URL if needed
            window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
        }

        // Set the contract address and ABI
        const contractAddress = '0x24D244e7e4B68f627830211D91bEf17D42a64DC8';
        const contractABI =[
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "nomProduit",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "prix",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "address payable",
                        "name": "proprietaire",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "achete",
                        "type": "bool"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "imageIPFSHash",
                        "type": "string"
                    }
                ],
                "name": "Produitachete",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "nomProduit",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "prix",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "address payable",
                        "name": "proprietaire",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "achete",
                        "type": "bool"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "imageIPFSHash",
                        "type": "string"
                    }
                ],
                "name": "Produitcree",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "Produits",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "nomProduit",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "prix",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address payable",
                        "name": "proprietaire",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "achete",
                        "type": "bool"
                    },
                    {
                        "internalType": "string",
                        "name": "imageIPFSHash",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            },
            {
                "inputs": [],
                "name": "count",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            },
            {
                "inputs": [],
                "name": "nom",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_nom",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_prix",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_imageIPFSHash",
                        "type": "string"
                    }
                ],
                "name": "nouveauProduit",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    }
                ],
                "name": "acheteProduit",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function",
                "payable": true
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_nouvelleImageIPFSHash",
                        "type": "string"
                    }
                ],
                "name": "mettreAJourImageProduit",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]; // Replace with the actual ABI

        // Instantiate the contract
        const contract = new window.web3.eth.Contract(contractABI, contractAddress);

        // Set the contract instance in the state
        this.setState({ contract });
    }


    handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        this.setState({ imageFile });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const productName = event.target.productName.value;
        const productPrice = event.target.productPrice.value;

        const { contract, defaultAccount, imageFile } = this.state;

        const imageBase64 = await this.readFileAsBase64(imageFile);

        await contract.methods.nouveauProduit(productName, productPrice, imageBase64).send({ from: defaultAccount });

        event.target.reset();
    }

    readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

  render() {
    //const { productName, productPrice } = this.state;

    return (
    //   <div>
    //     <h1>Ajouter un produit</h1>
    //     <form onSubmit={this.handleSubmit}>
    //       <label htmlFor="productName">Nom du produit:</label>
    //       <input type="text" id="productName" required /><br />
    //       <label htmlFor="productPrice">Prix du produit:</label>
    //       <input type="number" id="productPrice" required /><br />
    //       <label htmlFor="productImage">Image du produit:</label>
    //       <input type="file" id="productImage" onChange={this.handleImageChange} required /><br />
    //       <button type="submit">Ajouter</button>
    //     </form>
    //   </div>
        <div class="container1">
            <h1>Ajouter un produit</h1>
            <form id="product-form" onSubmit={this.handleSubmit}>
                <div class="form-group1">
                    <label for="productName">Nom du produit:</label>
                    <input type="text" id="productName" name="productName" required/>
                </div>
                <div class="form-group1">
                    <label for="productPrice">Prix du produit:</label>
                    <input type="text" id="productPrice" name="productPrice" />
                </div>
                <div class="form-group1">
                    <label className="custom-file-upload" for="productImage">Sélectionner l'image</label>
                    <input type="file" id="productImage" onChange={this.handleImageChange} required /><br />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
  }
}

export default ProductForm;

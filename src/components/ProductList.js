import React, { Component } from 'react';
import Web3 from 'web3';
import './ProductList.css';

class ProductList extends Component {
  state = {
    contract: null,
    products: [],
    defaultAccount: null,
  };

  async componentDidMount() {
    // Se connecter à l'instance Web3
    if (typeof window.ethereum !== 'undefined') {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();

      // Définir l'adresse de compte par défaut
      const accounts = await window.web3.eth.getAccounts();
      const defaultAccount = accounts[0];
      this.setState({ defaultAccount });
    } else if (typeof window.web3 !== 'undefined') {
      window.web3 = new Web3(window.web3.currentProvider);

      // Définir l'adresse de compte par défaut
      const accounts = await window.web3.eth.getAccounts();
      const defaultAccount = accounts[0];
      this.setState({ defaultAccount });
    } else {
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545")); // Modifier l'URL du fournisseur Web3 si nécessaire
    }

    // Définir l'adresse du contrat et l'ABI
    const contractAddress = '0x14EdA983Bc7774D28272C0110c632c7c5f979b8A';
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
    ];

    // Instancier le contrat
    const contract = new window.web3.eth.Contract(contractABI, contractAddress);

    // Récupérer la liste des produits
    const productsCount = await contract.methods.count().call();
    const products = [];
    for (let i = 1; i <= productsCount; i++) {
      const product = await contract.methods.Produits(i).call();
      products.push(product);
    }

    // Stocker l'instance du contrat et la liste des produits dans l'état du composant
    this.setState({ contract, products });
  }

  handleBuyProduct = async (productId, productPrice) => {
    const { contract, defaultAccount } = this.state;

    // Appeler la fonction "acheteProduit" du contrat pour acheter un produit spécifique
    await contract.methods.acheteProduit(productId).send({ from: defaultAccount, gas: 3000000, value: productPrice });

  }

  render() {
    const { products } = this.state;

    return (
      <div>
        <h1>Liste des produits</h1>
        <div className="product-grid"> {/* Appliquez la classe CSS 'product-grid' */}
          {products.map((product) => (
            <div key={product.id} className="product">
              <h3>{product.nomProduit}</h3>
              <p>Prix: {product.prix} Ether</p>
              <p>Propriétaire: {product.proprietaire}</p>
              <img src={product.image} alt={product.nomProduit} />
              {!product.achete && (
                <button onClick={() => this.handleBuyProduct(product.id, product.prix)}>Acheter</button>
              )}
              {product.achete && (
                <p>Ce produit a déjà été acheté.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;

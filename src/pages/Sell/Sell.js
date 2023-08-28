import React, { Component } from 'react';
import Web3 from 'web3';
import {Link, useSearchParams} from 'react-router-dom';
import './Sell.css';

class ProductList extends Component {
  state = {
    contract: null,
    products: [
        {
            nomProduit: "Jordan Essentials",
            prix: 99.99,
            proprietaire: "Alex",
            image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7c055af8-3b48-425b-80ee-d899181889ae/pantalon-fonctionnel-jordan-essentials-pour-BrB3SW.png"
        },
        {
            nomProduit: "Solo Swoosh",
            prix: 79.99,
            proprietaire: "Mary",
            image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fa083709-b3dc-4605-8321-4b1c092592f1/pantalon-en-tissu-fleece-solo-swoosh-pour-GwtDSS.png"
        },
        {
            nomProduit: 'Jordan Sport Jam',
            prix: 69.99,
            image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0895f2ad-f289-4940-9c16-a727619f286e/pantalon-de-survetement-jordan-sport-jam-pour-CBh4k3.png',
            proprietaire: "Luna",
        },
        {
            nomProduit: 'Club Fleece',
            prix: 59.99,
            image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9fe9ffe0-aaef-4288-8db5-e8a08d120985/pantalon-court-club-fleece-pour-vVPBLm.png',
            proprietaire: "Kris",
        },
    ],
    defaultAccount: null,
  };

//   async componentDidMount() {
//     // Se connecter à l'instance Web3
//     if (typeof window.ethereum !== 'undefined') {
//       window.web3 = new Web3(window.ethereum);
//       await window.ethereum.enable();

//       // Définir l'adresse de compte par défaut
//       const accounts = await window.web3.eth.getAccounts();
//       const defaultAccount = accounts[0];
//       this.setState({ defaultAccount });
//     } else if (typeof window.web3 !== 'undefined') {
//       window.web3 = new Web3(window.web3.currentProvider);

//       // Définir l'adresse de compte par défaut
//       const accounts = await window.web3.eth.getAccounts();
//       const defaultAccount = accounts[0];
//       this.setState({ defaultAccount });
//     } else {
//       window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545")); // Modifier l'URL du fournisseur Web3 si nécessaire
//     }

//     // Définir l'adresse du contrat et l'ABI
//     const contractAddress = '0x14EdA983Bc7774D28272C0110c632c7c5f979b8A';
//     const contractABI =[
//       {
//         "inputs": [],
//         "stateMutability": "nonpayable",
//         "type": "constructor"
//       },
//       {
//         "anonymous": false,
//         "inputs": [
//           {
//             "indexed": false,
//             "internalType": "uint256",
//             "name": "id",
//             "type": "uint256"
//           },
//           {
//             "indexed": false,
//             "internalType": "string",
//             "name": "nomProduit",
//             "type": "string"
//           },
//           {
//             "indexed": false,
//             "internalType": "uint256",
//             "name": "prix",
//             "type": "uint256"
//           },
//           {
//             "indexed": false,
//             "internalType": "address payable",
//             "name": "proprietaire",
//             "type": "address"
//           },
//           {
//             "indexed": false,
//             "internalType": "bool",
//             "name": "achete",
//             "type": "bool"
//           },
//           {
//             "indexed": false,
//             "internalType": "string",
//             "name": "imageIPFSHash",
//             "type": "string"
//           }
//         ],
//         "name": "Produitachete",
//         "type": "event"
//       },
//       {
//         "anonymous": false,
//         "inputs": [
//           {
//             "indexed": false,
//             "internalType": "uint256",
//             "name": "id",
//             "type": "uint256"
//           },
//           {
//             "indexed": false,
//             "internalType": "string",
//             "name": "nomProduit",
//             "type": "string"
//           },
//           {
//             "indexed": false,
//             "internalType": "uint256",
//             "name": "prix",
//             "type": "uint256"
//           },
//           {
//             "indexed": false,
//             "internalType": "address payable",
//             "name": "proprietaire",
//             "type": "address"
//           },
//           {
//             "indexed": false,
//             "internalType": "bool",
//             "name": "achete",
//             "type": "bool"
//           },
//           {
//             "indexed": false,
//             "internalType": "string",
//             "name": "imageIPFSHash",
//             "type": "string"
//           }
//         ],
//         "name": "Produitcree",
//         "type": "event"
//       },
//       {
//         "inputs": [
//           {
//             "internalType": "uint256",
//             "name": "",
//             "type": "uint256"
//           }
//         ],
//         "name": "Produits",
//         "outputs": [
//           {
//             "internalType": "uint256",
//             "name": "id",
//             "type": "uint256"
//           },
//           {
//             "internalType": "string",
//             "name": "nomProduit",
//             "type": "string"
//           },
//           {
//             "internalType": "uint256",
//             "name": "prix",
//             "type": "uint256"
//           },
//           {
//             "internalType": "address payable",
//             "name": "proprietaire",
//             "type": "address"
//           },
//           {
//             "internalType": "bool",
//             "name": "achete",
//             "type": "bool"
//           },
//           {
//             "internalType": "string",
//             "name": "imageIPFSHash",
//             "type": "string"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function",
//         "constant": true
//       },
//       {
//         "inputs": [],
//         "name": "count",
//         "outputs": [
//           {
//             "internalType": "uint256",
//             "name": "",
//             "type": "uint256"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function",
//         "constant": true
//       },
//       {
//         "inputs": [],
//         "name": "nom",
//         "outputs": [
//           {
//             "internalType": "string",
//             "name": "",
//             "type": "string"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function",
//         "constant": true
//       },
//       {
//         "inputs": [
//           {
//             "internalType": "string",
//             "name": "_nom",
//             "type": "string"
//           },
//           {
//             "internalType": "uint256",
//             "name": "_prix",
//             "type": "uint256"
//           },
//           {
//             "internalType": "string",
//             "name": "_imageIPFSHash",
//             "type": "string"
//           }
//         ],
//         "name": "nouveauProduit",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "inputs": [
//           {
//             "internalType": "uint256",
//             "name": "_id",
//             "type": "uint256"
//           }
//         ],
//         "name": "acheteProduit",
//         "outputs": [],
//         "stateMutability": "payable",
//         "type": "function",
//         "payable": true
//       },
//       {
//         "inputs": [
//           {
//             "internalType": "uint256",
//             "name": "_id",
//             "type": "uint256"
//           },
//           {
//             "internalType": "string",
//             "name": "_nouvelleImageIPFSHash",
//             "type": "string"
//           }
//         ],
//         "name": "mettreAJourImageProduit",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//       }
//     ];

//     // Instancier le contrat
//     const contract = new window.web3.eth.Contract(contractABI, contractAddress);

//     // Récupérer la liste des produits
//     const productsCount = await contract.methods.count().call();
//     const products = [];
//     for (let i = 1; i <= productsCount; i++) {
//       const product = await contract.methods.Produits(i).call();
//       products.push(product);
//     }

//     // Stocker l'instance du contrat et la liste des produits dans l'état du composant
//     this.setState({ contract, products });
//   }

//   handleBuyProduct = async (productId, productPrice) => {
//     const { contract, defaultAccount } = this.state;

//     // Appeler la fonction "acheteProduit" du contrat pour acheter un produit spécifique
//     await contract.methods.acheteProduit(productId).send({ from: defaultAccount, gas: 3000000, value: productPrice });

//   }

  render() {
    const { products } = this.state;
    const handleAddToCart = () => {
        
    };

    return (
      <div>
        <h1>Liste des produits</h1>
        <div class="products"> 
            {products.map((product) => (
            <div key={product.id} class="product">
                <img src={product.image} alt={product.nomProduit}/>
                <h3>{product.nomProduit}</h3>
                <p>Prix : {product.prix} Ether</p>
                <Link to={`/ShoppingCart?param1=${product.nomProduit}&param2=${product.prix}&param3=${product.image}`} onClick={handleAddToCart}>
                  <button>Ajouter au panier</button>
                </Link>
            </div>
        ))}
        </div>
      </div>
    );
  }
}

export default ProductList;

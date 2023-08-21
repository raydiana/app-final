// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Paiement {
    string public nom;
    uint public count = 0;
    mapping(uint => Produit) public Produits;

    struct Produit {
        uint id;
        string nomProduit; // Correct variable name
        uint prix;
        address payable proprietaire;
        bool achete;
        string imageIPFSHash; // Hachage IPFS de l'image
    }

    event Produitcree(
        uint id,
        string nomProduit,
        uint prix,
        address payable proprietaire,
        bool achete,
        string imageIPFSHash
    );

    event Produitachete(
        uint id,
        string nomProduit,
        uint prix,
        address payable proprietaire,
        bool achete,
        string imageIPFSHash
    );

    constructor(){
        nom = "ESPORT";
    }

    function nouveauProduit(string memory _nom, uint _prix, string memory _imageIPFSHash) public {
        // Require a valid nom
        require(bytes(_nom).length > 0);
        // Require a valid prix
        require(_prix > 0);
        // Increment Produit count
        count ++;
        // Nouveau Produit
        Produits[count] = Produit(count, _nom, _prix, payable(msg.sender), false, _imageIPFSHash);
        // Trigger an event
        emit Produitcree(count, _nom, _prix, payable(msg.sender), false, _imageIPFSHash);
    }

    function acheteProduit(uint _id) public payable {
        // Fetch the Produit
        Produit storage _Produit = Produits[_id];
        // Fetch the proprietaire
        address payable _vendeur = _Produit.proprietaire;
        // Make sure the Produit has a valid id
        require(_Produit.id > 0 && _Produit.id <= count);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _Produit.prix);
        // Require that the Produit has not been achete already
        require(!_Produit.achete);
        // Transfer proprietaireship to the buyer
        _Produit.proprietaire = payable(msg.sender);
        // Mark as achete
        _Produit.achete = true;
        // Update the Produit
        Produits[_id] = _Produit;
        // Pay the vendeur by sending them Ether
        _vendeur.transfer(msg.value);
        // Trigger an event
        emit Produitachete(_id, _Produit.nomProduit, _Produit.prix, _Produit.proprietaire, true, _Produit.imageIPFSHash);
    }

    function mettreAJourImageProduit(uint _id, string memory _nouvelleImageIPFSHash) public {
        // Fetch the Produit
        Produit storage _Produit = Produits[_id];
        // Make sure the Produit exists
        require(_Produit.id > 0 && _Produit.id <= count);
        // Update the image IPFS hash
        _Produit.imageIPFSHash = _nouvelleImageIPFSHash;
        // Update the Produit
        Produits[_id] = _Produit;
    }
}

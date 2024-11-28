pragma solidity ^0.8.0;

contract ProductContract {
    struct Product {
        string name;
        string description;
        string imageHash;
        uint256 price;
        bool isSold;
    }

    Product public product;
    address public owner;

    event ProductCreated(
        string name,
        string description,
        string imageHash,
        uint256 price
    );

    event ProductPurchased(address buyer, uint256 price);

    constructor(
        string memory _name,
        string memory _description,
        string memory _imageHash,
        uint256 _price
    ) {
        owner = msg.sender;
        product = Product(_name, _description, _imageHash, _price, false);
        emit ProductCreated(_name, _description, _imageHash, _price);
    }

    function buyProduct() public payable {
        require(!product.isSold, "Product already sold.");
        require(msg.value >= product.price, "Insufficient payment.");
        product.isSold = true;
        payable(owner).transfer(msg.value);
        emit ProductPurchased(msg.sender, msg.value);
    }
}
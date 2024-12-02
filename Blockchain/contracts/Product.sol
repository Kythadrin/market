pragma solidity ^0.8.0;

contract Product {
    address public seller;
    uint256 public productPrice;
    bool public productSold;

    event ProductPurchased(address indexed buyer, uint256 price);

    constructor(uint256 _price) {
        seller = msg.sender;
        productPrice = _price;
        productSold = false;
    }

    function buyProduct() external payable {
        require(msg.value == productPrice, "Incorrect payment amount");
        require(!productSold, "Product already sold");

        productSold = true;

        payable(seller).transfer(msg.value);

        emit ProductPurchased(msg.sender, msg.value);
    }

    function isProductSold() external view returns (bool) {
        return productSold;
    }

    function getProductPrice() external view returns (uint256) {
        return productPrice;
    }

    function withdrawFunds() external {
        require(msg.sender == seller, "Only the seller can withdraw funds");
        require(productSold, "Product not sold yet");

        payable(seller).transfer(address(this).balance);
    }
}
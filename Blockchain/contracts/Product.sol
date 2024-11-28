pragma solidity ^0.8.0;

contract Product {
    struct Product {
        uint256 id;
        uint256 price;
        uint256 quantity;
        bool isAvailable;
    }

    mapping(uint256 => Product) public products;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    function addProduct(uint256 _id, uint256 _price, uint256 _quantity) public onlyOwner {
        require(!products[_id].isAvailable, "Product already exists");
        require(_price > 0, "Price must be greater than 0");
        require(_quantity > 0, "Quantity must be greater than 0");

        products[_id] = Product(_id, _price, _quantity, true);
    }

    function updateProduct(uint256 _id, uint256 _price, uint256 _quantity) public onlyOwner {
        require(products[_id].isAvailable, "Product does not exist");
        products[_id].price = _price;
        products[_id].quantity = _quantity;
    }

    function purchaseProduct(uint256 _id, uint256 _quantity) public payable {
        require(products[_id].isAvailable, "Product does not exist");
        require(products[_id].quantity >= _quantity, "Not enough quantity available");
        uint256 totalPrice = products[_id].price * _quantity;
        require(msg.value >= totalPrice, "Insufficient payment");

        products[_id].quantity -= _quantity;

        if (msg.value > totalPrice) {
            payable(msg.sender).transfer(msg.value - totalPrice);
        }
    }
}
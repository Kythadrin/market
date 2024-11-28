pragma solidity ^0.8.0;

contract ProductContract {
    enum District {
        Centrs,
        Purvciems,
        Plavnieki,
        Kengarags,
        Teika
    }

    struct Product {
        string name;
        uint256 amount;
        uint256 price;
        District district;
        int256 latitude;
        int256 longitude;
        bytes32 imageHash;
        bool isSold;
    }

    Product[] public products;
    mapping(uint256 => address) public productOwners;

    address public owner;


    event ProductCreated(
        uint256 productId,
        string name,
        uint256 amount,
        uint256 price,
        District district,
        int256 latitude,
        int256 longitude,
        bytes32 imageHash,
        bool isSold
    );

    event ProductPurchased(
        uint256 productId,
        address buyer,
        uint256 price
    );

    constructor() {
        owner = msg.sender;
    }

    function createProduct(
        string memory _name,
        uint256 _amount,
        uint256 _price,
        District _district,
        int256 _latitude,
        int256 _longitude,
        bytes32 _imageHash
    ) public {
        require(msg.sender == owner, "Only owner can create products.");

        products.push(
            Product(_name, _amount, _price, _district, _latitude, _longitude, _imageHash, false)
        );

        uint256 productId = products.length - 1;
        productOwners[productId] = msg.sender;

        emit ProductCreated(
            productId,
            _name,
            _amount,
            _price,
            _district,
            _latitude,
            _longitude,
            _imageHash,
            false
        );
    }

    function buyProduct(uint256 productId) public payable {
        Product storage _product = products[productId];

        require(!_product.isSold, "Product already sold.");

        require(msg.value >= _product.price, "Insufficient payment.");

        uint256 price = _product.price;
        uint256 refund = msg.value - price;

        address productOwner = productOwners[productId];
        (bool successOwner, ) = productOwner.call{value: price}("");
        require(successOwner, "Transfer to product owner failed.");

        if (refund > 0) {
            (bool successRefund, ) = msg.sender.call{value: refund}("");
            require(successRefund, "Refund failed.");
        }

        _product.isSold = true;

        emit ProductPurchased(productId, msg.sender, price);
    }

    function getProductsByDistrict(District _district) public view returns (Product[] memory) {
        uint256 totalProducts = products.length;
        uint256 districtProductCount = 0;

        for (uint256 i = 0; i < totalProducts; i++) {
            if (products[i].district == _district && !products[i].isSold) {
                districtProductCount++;
            }
        }

        Product[] memory districtProducts = new Product[](districtProductCount);
        uint256 index = 0;

        for (uint256 i = 0; i < totalProducts; i++) {
            if (products[i].district == _district && !products[i].isSold) {
                districtProducts[index] = products[i];
                index++;
            }
        }

        return districtProducts;
    }

    function getTotalProducts() public view returns (uint256) {
        return products.length;
    }
}
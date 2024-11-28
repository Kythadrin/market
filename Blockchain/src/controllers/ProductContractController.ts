import { Request, Response } from "express";
import {BaseContract, ethers} from "ethers";
import fs from "fs";
import path from "path";
import {IContract} from "../interface/IContract";

export class ProductContractController {
    private readonly provider: ethers.JsonRpcProvider;
    private readonly signer: ethers.Wallet;

    constructor() {
        this.provider = new ethers.JsonRpcProvider(process.env.CONTRACT_PROVIDER_LINK);
        const privateKey: string = process.env.CONTRACT_PROVIDER_KEY ?? "";
        this.signer = new ethers.Wallet(privateKey, this.provider);
    }

    public async deploy(req: Request, res: Response): Promise<void> {
        try {
            const { contractMessage } = req.body;

            const contractJsonPath = path.join(__dirname, '/../../artifacts/contracts/Product.sol/ProductContract.json');
            const contractJson: IContract = JSON.parse(fs.readFileSync(contractJsonPath, 'utf-8'));

            const abi = contractJson.abi;
            const bytecode = contractJson.bytecode;

            const contractFactory = new ethers.ContractFactory(abi, bytecode, this.signer);

            const contract: BaseContract = await contractFactory.deploy(contractMessage);
            console.log("Contract deployed at:", contract.getAddress());

            await contract.deploymentTransaction()?.wait();

            res.json({
                message: `Contract deployed successfully!`,
                contractAddress: contract.getAddress()
            });
        } catch (error) {
            console.error("Error deploying contract:", error);
            res.status(500).json({ error: "Contract deployment failed." });
        }
    }

    // public getExample(res: Response): void {
    //     res.json({ message: "This is an example endpoint." });
    // }
}
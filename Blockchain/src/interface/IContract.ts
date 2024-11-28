export interface IContract {
    _format: string;
    contractName: string;
    sourceName: string;
    abi: object[];
    bytecode: string;
    deployedBytecode: string;
    linkReferences: object;
    deployedLinkReferences: object;
}
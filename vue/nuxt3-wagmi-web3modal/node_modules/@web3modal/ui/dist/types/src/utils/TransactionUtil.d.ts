import type { TransactionTransfer, Transaction } from '@web3modal/common';
export declare const TransactionUtil: {
    getTransactionGroupTitle(year: number): number | "This Year";
    getTransactionImages(transfers: TransactionTransfer[]): {
        type: string | null;
        url: string | null | undefined;
    }[];
    getTransactionImage(transfer?: TransactionTransfer): {
        type: string | null;
        url: string | null | undefined;
    };
    getTransactionImageURL(transfer: TransactionTransfer | undefined): string | null | undefined;
    getTransactionTransferTokenType(transfer?: TransactionTransfer): "FUNGIBLE" | "NFT" | null;
    getTransactionDescriptions(transaction: Transaction): string[];
    getTransferDescription(transfer?: TransactionTransfer): string;
    getFungibleTransferDescription(transfer?: TransactionTransfer): string | null;
    getQuantityFixedValue(value: string | undefined): string | null;
};

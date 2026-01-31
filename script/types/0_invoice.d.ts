import type { Api } from "../2_tl.js";
export interface Invoice {
    title: string;
    description: string;
    startParameter: string;
    currency: string;
    totalAmount: number;
}
export declare function constructInvoice(invoice: Api.messageMediaInvoice): Invoice;
//# sourceMappingURL=0_invoice.d.ts.map
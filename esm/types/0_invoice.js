export function constructInvoice(invoice) {
    return {
        title: invoice.title,
        description: invoice.description,
        startParameter: invoice.start_param,
        currency: invoice.currency,
        totalAmount: Number(invoice.total_amount),
    };
}

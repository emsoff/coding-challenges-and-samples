// Challenge: summarize an array of transactions, grouping them by AccountId, then summing the amounts for transactions within each group and listing all descriptions

const transactions = [
    { accountId: 'A1', amount: 50, description: 'Grocery' },
    { accountId: 'A2', amount: 20, description: 'Gas' },
    { accountId: 'A1', amount: -10, description: 'Refund' },
    { accountId: 'A2', amount: 100, description: 'Grocery' },
    { accountId: 'A1', amount: 60, description: 'Restaurant' },
    { accountId: 'A2', amount: 20, description: 'Gas' }
];

function summarizeTransactions(transactions) {
    const result = {};

    transactions.forEach(transaction => {
        const { accountId, amount, description } = transaction;

        if (!result[accountId]) {
            result[accountId] = {
                totalAmount: 0,
                descriptions: new Set() // Using a Set to avoid duplicate descriptions
            };
        }

        result[accountId].totalAmount += amount;

        result[accountId].descriptions.add(description);
    });

    for (const accountId in result) {
        result[accountId].descriptions = Array.from(result[accountId].descriptions);
    }

    return result;
}

console.log(summarizeTransactions(transactions));


export function useSaveUserAssets(data: any) {
    // Retrieve walletId from localStorage
    const walletId = localStorage.getItem("walletId");

    // Check if data is available
    if (!data?.result?.length) {
        console.error("No data found in result");
        return;
    }

    // Initialize an array to store all user assets
    const userAssets: Array<any> = [];

    // Process each account in the provided data
    data.result[0].accounts.forEach((account: any) => {
        // Check if there are assets in the account
        if (!account.assets || account.assets.length === 0) {
            console.error(`No assets found for account ID: ${account.accountId}`);
            return;
        }

        // Loop through each asset in the account
        account.assets.forEach((asset: any) => {
            // Create userAsset object with required fields
            const userAsset = {
                NetworkType: "testnet",
                Blockchain: account.networkName,
                ContractId: asset.contaractAddress,
                Address: account.address,
                WalletId: walletId,
                ApiId: asset.apiId,
            };

            // Add the userAsset to the array
            userAssets.push(userAsset);
        });
    });

    // Store the array of user assets in localStorage
    localStorage.setItem("userAssets", JSON.stringify(userAssets));
    console.log("All user assets saved successfully.");
}

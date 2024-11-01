import axios from "axios";

export async function fetchBalances() {
    // Set loading to true initially
    let loading = true;
    const balances: Array<any> = []; // Array to store balance data

    // Retrieve walletId and jwtToken from localStorage
    const walletId = localStorage.getItem("walletId");
    const jwtToken = localStorage.getItem("jwtToken");

    // Retrieve saved user assets from localStorage
    const storedAssets = localStorage.getItem("userAssets");
    if (!storedAssets || !walletId || !jwtToken) {
        console.error("Required data not found in localStorage.");
        loading = false;
        return;
    }

    // Parse stored assets
    const userAssets = JSON.parse(storedAssets);

    try {
        // Send a request for each asset
        const requests = userAssets.map((asset: any) => {
            const balancePayload = {
                NetworkType: asset.NetworkType,
                Blockchain: asset.Blockchain,
                ContractId: asset.ContractId,
                Address: asset.Address,
                WalletId: walletId,
                ApiId: asset.ApiId,
            };

            // Send POST request and return the promise
            return axios.post("https://api.hero.io/account/GetTotalBalance", balancePayload, {
                headers: {
                    Authorization: jwtToken,
                },
            });
        });

        // Wait for all requests to complete
        const responses = await Promise.all(requests);

        // Process each response and store it in balances array
        responses.forEach((response) => {
            balances.push(response.data);
        });

        console.log("All balance data fetched successfully:", balances);
    } catch (error) {
        console.error("Error fetching balance data:", error);
    } finally {
        // Set loading to false after all requests are completed
        loading = false;
    }

    return balances; // Return the fetched balances
}

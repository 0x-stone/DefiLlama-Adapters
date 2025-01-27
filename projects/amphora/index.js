const { sumTokens2 } = require('../helper/unwrapLPs');

async function tvl(_, _1, _2, { api }) {
    const balances = await sumTokens2({ api, tokensAndOwners:[
        ["0xb2f30a7c980f052f02563fb518dcc39e6bf38175", "0xD842D9651F69cEBc0b2Cffc291fC3D3Fe7b5D226"]
    ]})
    const tokens = await api.call({
        target: "0xb688801cadb4ddb6980bb777d42972c24f920855",
        abi: "address[]:getEnabledTokens"
    })
    const deposited = await api.multiCall({
        abi: "function tokenTotalDeposited(address _tokenAddress) external view returns (uint256 _totalDeposited)",
        calls: tokens.map(i => ({ target: "0xb688801cadb4ddb6980bb777d42972c24f920855", params: [i] }))
    })
    tokens.forEach((element, i) => {
        balances[element] = deposited[i]
    });

    return balances
}

module.exports = {
    methodology: 'Coins deposited as collateral and snxUSD',
    ethereum: {
        tvl
    },
}
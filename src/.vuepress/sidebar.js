module.exports = {
  // '/examples': getExamplesSidebar(),
  "/": getDefaultSidebar(),
};

function getDefaultSidebar() {
  return [
    {
      title: "What's XPRNetwork",
      path: "/getting-started/introduction",
      collapsable: true,
    },
    {
      title: "Mainnet vs Testnet",
      path: "/getting-started/mainnet-vs-testnet",
      collapsable: true,
    },
    {
      title: "Terminology you need to know",
      path: "/getting-started/terminology",
      collapsable: true,
    },
    {
      title: "Quick notes on data types",
      path: "/getting-started/data-types",
      collapsable: true,
    },
    {
      title: "Action, Transactions and execution order",
      path: "/getting-started/action-transactions-executions-order",
      collapsable: true,
    },
    {
      title: "Account and permissions",
      path: "/getting-started/accounts-and-permissions",
      collapsable: true,
    },

    {
      title: "XPRNetwork command line interface",
      collapsable: true,
      sidebarDepth: 1,
      path: "/cli-101/cli-crash-course",
      children: [],
    },
    {
      title: "Reading data from the chain",
      path: "/reading-onchain-data/reading-onchain-data.md",
      collapsable: true,
      sidebarDepth: 1,
    },
    {
      title: "Signing and pushing transactions",
      path: "/signing-and-pushing-transactions/signing-and-pushing-transactions.md",
      collapsable: true,
      sidebarDepth: 1,
    },
    {
      title: "Your first dApp with the web-sdk",
      path: "/your-first-dapp-with-the-web-sdk/your-first-dapp-with-the-web-sdk.md",
      collapsable: true,
      sidebarDepth: 1,
    },
    {
      title: "Write your first smart contract",
      path: "/smart-contracts/write-your-first-smart-contract.md",
      collapsable: true,
      sidebarDepth: 1,
    },
    {
      title: "Documentation",
      collapsable: true,
      sidebarDepth: 1,
      children: [
        {
          title: "@proton/web-sdk",
          collapsable: true,
          children: [
            {
              title: "WalletConnect",
              path: "/documentations/proton-web-sdk/connect.md",
            },
            {
              title: "Storage",
              path: "/documentations/proton-web-sdk/storage.md",
            },
            {
              title: "Storage",
              path: "/documentations/proton-web-sdk/walletTypeSelector.md",
            },
          ],
        },
        {
          title: "@proton/cli",
          collapsable: true,
          sidebarDepth: 2,
          children: [
            {
              title: "Account Commands",
              path: "/documentations/proton-cli/account.md",
            },
            {
              title: "Action Commands",
              path: "/documentations/proton-cli/action.md",
            },
            {
              title: "Block Commands",
              path: "/documentations/proton-cli/block.md",
            },
            {
              title: "Chain Commands",
              path: "/documentations/proton-cli/chain.md",
            },
            {
              title: "Contract Commands",
              path: "/documentations/proton-cli/contract.md",
            },
            {
              title: "Encode Commands",
              path: "/documentations/proton-cli/encode.md",
            },
            {
              title: "Faucet Commands",
              path: "/documentations/proton-cli/faucet.md",
            },
            {
              title: "Generate Commands",
              path: "/documentations/proton-cli/generate.md",
            },
            {
              title: "Key Commands",
              path: "/documentations/proton-cli/key.md",
            },
            {
              title: "Msig Commands",
              path: "/documentations/proton-cli/msig.md",
            },
            {
              title: "Permission Commands",
              path: "/documentations/proton-cli/permission.md",
            },
            {
              title: "Psr Commands",
              path: "/documentations/proton-cli/psr.md",
            },
            {
              title: "Ram Commands",
              path: "/documentations/proton-cli/ram.md",
            },
            {
              title: "Rpc Commands",
              path: "/documentations/proton-cli/rpc.md",
            },
            {
              title: "Scan Commands",
              path: "/documentations/proton-cli/scan.md",
            },
            {
              title: "System Commands",
              path: "/documentations/proton-cli/system.md",
            },
            {
              title: "Table Commands",
              path: "/documentations/proton-cli/table.md",
            },
            {
              title: "Transaction Commands",
              path: "/documentations/proton-cli/transaction.md",
            },
          ],
        },
        {
          title: "Contract SDK",
          collapsable: true,
          sidebarDepth: 1,
          children: [
            {title: "Storage", path: "/contract-sdk/storage"},
            {title: "Execution Order", path: "/contract-sdk/execution-order"},
            {title: "Inline Actions", path: "/contract-sdk/inline-actions"},
            {title: "Notifications", path: "/contract-sdk/notifications"},
            {title: "Testing", path: "/contract-sdk/testing"},
            {title: "Security", path: "/contract-sdk/security"},
            {
              title: "Language Specifics",
              collapsable: true,
              sidebarDepth: 0,
              children: [
                {title: "Concepts", path: "/contract-sdk/concepts"},
                {title: "Number Types", path: "/contract-sdk/types"},
                {title: "Globals", path: "/contract-sdk/globals"},
              ],
            },
            {
              title: "API",
              collapsable: true,
              sidebarDepth: 1,
              children: [
                {
                  title: "Authentication",
                  path: "/contract-sdk/api/authentication",
                },
                {title: "Assert", path: "/contract-sdk/api/assert"},
                {
                  title: "Blockchain Time",
                  path: "/contract-sdk/api/currentTime",
                },
                {title: "Cryptography", path: "/contract-sdk/api/cryptography"},
                {title: "Print", path: "/contract-sdk/api/print"},
                {
                  title: "Random Number Generator",
                  path: "/contract-sdk/api/random-number-generator",
                },
                {
                  title: "Transaction ID",
                  path: "/contract-sdk/api/transaction-id",
                },
                {title: "SafeMath", path: "/contract-sdk/api/safemath"},
              ],
            },
            {
              title: "Classes",
              collapsable: true,
              sidebarDepth: 1,
              children: [
                {title: "Name", path: "/contract-sdk/classes/Name"},
                {title: "Symbol", path: "/contract-sdk/classes/Symbol"},
                {
                  title: "ExtendedSymbol",
                  path: "/contract-sdk/classes/ExtendedSymbol",
                },
                {title: "Asset", path: "/contract-sdk/classes/Asset"},
                {
                  title: "ExtendedAsset",
                  path: "/contract-sdk/classes/ExtendedAsset",
                },
                {title: "Action", path: "/contract-sdk/classes/Action"},
                {
                  title: "PermissionLevel",
                  path: "/contract-sdk/classes/PermissionLevel",
                },
                {title: "TableStore", path: "/contract-sdk/classes/TableStore"},
                {
                  title: "Keys",
                  collapsable: true,
                  children: [
                    {
                      title: "PublicKey",
                      path: "/contract-sdk/classes/keys/PublicKey",
                    },
                    {
                      title: "ECCPublicKey",
                      path: "/contract-sdk/classes/keys/ECCPublicKey",
                    },
                    {
                      title: "WebAuthNPublicKey",
                      path: "/contract-sdk/classes/keys/WebauthNPublicKey",
                    },
                  ],
                },
                {title: "Signature", path: "/contract-sdk/classes/Signature"},
                {
                  title: "Time",
                  collapsable: true,
                  children: [
                    {
                      title: "Microseconds",
                      path: "/contract-sdk/classes/time/Microseconds",
                    },
                    {
                      title: "TimePoint",
                      path: "/contract-sdk/classes/time/TimePoint",
                    },
                    {
                      title: "TimePointSec",
                      path: "/contract-sdk/classes/time/TimePointSec",
                    },
                    {
                      title: "BlockTimestamp",
                      path: "/contract-sdk/classes/time/BlockTimestamp",
                    },
                  ],
                },
                {
                  title: "Checksum",
                  collapsable: true,
                  children: [
                    {
                      title: "Checksum160",
                      path: "/contract-sdk/classes/checksum/Checksum160",
                    },
                    {
                      title: "Checksum256",
                      path: "/contract-sdk/classes/checksum/Checksum256",
                    },
                    {
                      title: "Checksum512",
                      path: "/contract-sdk/classes/checksum/Checksum512",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    // {
    //   title: "Introduction",
    //   collapsable: false,
    //   sidebarDepth: 1,
    //   children: [
    //     {title: "Overview", path: "/introduction/overview"},
    //     {title: "Getting Started", path: "/introduction/getting-started"},
    //     {
    //       title: "Accounts and Permissions",
    //       path: "/introduction/accounts-and-permissions",
    //     },
    //   ],
    // },
    //
    // {
    //   title: "Client SDKs",
    //   collapsable: false,
    //   sidebarDepth: 1,
    //   children: [
    //     {title: "Web", path: "/client-sdks/web"},
    //     {title: "React Native", path: "/client-sdks/react-native"},
    //     {title: "Kotlin", path: "/client-sdks/kotlin"},
    //     {title: "Swift", path: "/client-sdks/swift"},
    //     {title: "Chain IDs and Endpoints", path: "/client-sdks/endpoints"},
    //     // {
    //     //   title: 'NFT APIs',
    //     //   collapsable: false,
    //     //   sidebarDepth: 1,
    //     //   children: [
    //     //     { title: "Accounts", path: '/client-sdks/atomicassets/accounts' },
    //     //   ]
    //     // }
    //     {title: "Table Information", path: "/client-sdks/query-tables"},
    //     {title: "User Tokens", path: "/client-sdks/user-tokens"},
    //     {
    //       title: "Examples",
    //       collapsable: true,
    //       children: [
    //         {
    //           title: "React / Vue / Angular / HTML",
    //           path: "https://github.com/ProtonProtocol/proton-web-sdk/tree/master/examples",
    //         },
    //         {title: "Escrow", path: "/client-sdks/examples/escrow"},
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: "CLI",
    //   collapsable: false,
    //   sidebarDepth: 1,
    //   children: [
    //     {title: "Usage", path: "/cli/usage"},
    //     {
    //       title: "Examples",
    //       collapsable: true,
    //       children: [
    //         {title: "Deploy Token", path: "/cli/examples/deploy-token"},
    //         {title: "Transfer Token", path: "/cli/examples/transfer-token"},
    //         {title: "Free New Account", path: "/cli/examples/free-new-account"},
    //         {title: "Paid New Account", path: "/cli/examples/paid-new-account"},
    //         {title: "Manage Private Keys", path: "/cli/examples/manage-keys"},
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: "Guides",
    //   collapsable: true,
    //   sidebarDepth: 1,
    //   children: [
    //     {title: "Hello world", path: "/guides/hello-world"},
    //     {title: "Key-Value", path: "/guides/key-value"},
    //   ],
    // },
    // {
    //   title: "Built with XPR Network",
    //   path: "/built-with-xpr-network",
    // },
  ];
}

function getExamplesSidebar() {
  return [
    {
      title: "Examples",
      collapsable: false,
      sidebarDepth: 0,
      children: [["/examples", "Overview"], "/built-with-xpr-network"],
    },
  ];
}

module.exports = {
  "/": getDefaultSidebar(),
};

function getDefaultSidebar() {
  return [
    // ==================
    // GETTING STARTED
    // ==================
    {
      title: "Getting Started",
      collapsable: false,
      sidebarDepth: 1,
      children: [
        { title: "Introduction", path: "/getting-started/introduction" },
        { title: "Mainnet vs Testnet", path: "/getting-started/mainnet-vs-testnet" },
        { title: "Terminology", path: "/getting-started/terminology" },
        { title: "Data Types", path: "/getting-started/data-types" },
        { title: "Accounts & Permissions", path: "/getting-started/accounts-and-permissions" },
        { title: "Actions & Transactions", path: "/getting-started/action-transactions-executions-order" },
      ],
    },

    // ==================
    // TUTORIALS
    // ==================
    {
      title: "Tutorials",
      collapsable: false,
      sidebarDepth: 1,
      children: [
        { title: "CLI Crash Course", path: "/cli-101/cli-crash-course" },
        { title: "Hello World Contract", path: "/guides/hello-world" },
        { title: "Key-Value Storage", path: "/guides/key-value" },
        { title: "Reading Chain Data", path: "/reading-onchain-data/reading-onchain-data" },
        { title: "Signing Transactions", path: "/signing-and-pushing-transactions/signing-and-pushing-transactions" },
        { title: "Your First dApp", path: "/your-first-dapp-with-the-web-sdk/your-first-dapp-with-the-web-sdk" },
        { title: "Your First Smart Contract", path: "/smart-contracts/write-your-first-smart-contract" },
      ],
    },

    // ==================
    // CLI REFERENCE
    // ==================
    {
      title: "CLI Reference",
      collapsable: true,
      sidebarDepth: 1,
      children: [
        { title: "Account", path: "/documentations/proton-cli/account" },
        { title: "Action", path: "/documentations/proton-cli/action" },
        { title: "Chain", path: "/documentations/proton-cli/chain" },
        { title: "Contract", path: "/documentations/proton-cli/contract" },
        { title: "Faucet", path: "/documentations/proton-cli/faucet" },
        { title: "Generate", path: "/documentations/proton-cli/generate" },
        { title: "Key", path: "/documentations/proton-cli/key" },
        { title: "Msig", path: "/documentations/proton-cli/msig" },
        { title: "Permission", path: "/documentations/proton-cli/permission" },
        { title: "RAM", path: "/documentations/proton-cli/ram" },
        { title: "Table", path: "/documentations/proton-cli/table" },
        { title: "Transaction", path: "/documentations/proton-cli/transaction" },
      ],
    },

    // ==================
    // WEB SDK
    // ==================
    {
      title: "Web SDK",
      collapsable: true,
      sidebarDepth: 1,
      children: [
        { title: "WalletConnect", path: "/documentations/proton-web-sdk/connect" },
        { title: "Storage", path: "/documentations/proton-web-sdk/storage" },
        { title: "WalletTypeSelector", path: "/documentations/proton-web-sdk/walletTypeSelector" },
      ],
    },

    // ==================
    // CLIENT SDKs
    // ==================
    {
      title: "Client SDKs",
      collapsable: true,
      sidebarDepth: 1,
      children: [
        { title: "Web SDK", path: "/client-sdks/web" },
        { title: "React Native", path: "/client-sdks/react-native" },
        { title: "Kotlin", path: "/client-sdks/kotlin" },
        { title: "Swift", path: "/client-sdks/swift" },
        { title: "Endpoints", path: "/client-sdks/endpoints" },
        { title: "Query Tables", path: "/client-sdks/query-tables" },
        { title: "User Tokens", path: "/client-sdks/user-tokens" },
      ],
    },

    // ==================
    // SMART CONTRACT SDK
    // ==================
    {
      title: "Smart Contract SDK",
      collapsable: true,
      sidebarDepth: 1,
      children: [
        { title: "Storage", path: "/contract-sdk/storage" },
        { title: "Execution Order", path: "/contract-sdk/execution-order" },
        { title: "Inline Actions", path: "/contract-sdk/inline-actions" },
        { title: "Notifications", path: "/contract-sdk/notifications" },
        { title: "Testing", path: "/contract-sdk/testing" },
        { title: "Security", path: "/contract-sdk/security" },
        { title: "Examples", path: "/contract-sdk/examples" },
        {
          title: "Language",
          collapsable: true,
          children: [
            { title: "Concepts", path: "/contract-sdk/concepts" },
            { title: "Number Types", path: "/contract-sdk/types" },
            { title: "Globals", path: "/contract-sdk/globals" },
          ],
        },
        {
          title: "API Reference",
          collapsable: true,
          children: [
            { title: "Authentication", path: "/contract-sdk/api/authentication" },
            { title: "Assert", path: "/contract-sdk/api/assert" },
            { title: "Blockchain Time", path: "/contract-sdk/api/currentTime" },
            { title: "Cryptography", path: "/contract-sdk/api/cryptography" },
            { title: "Print", path: "/contract-sdk/api/print" },
            { title: "Random Number", path: "/contract-sdk/api/random-number-generator" },
            { title: "Transaction ID", path: "/contract-sdk/api/transaction-id" },
            { title: "SafeMath", path: "/contract-sdk/api/safemath" },
          ],
        },
        {
          title: "Classes",
          collapsable: true,
          children: [
            { title: "Name", path: "/contract-sdk/classes/Name" },
            { title: "Symbol", path: "/contract-sdk/classes/Symbol" },
            { title: "ExtendedSymbol", path: "/contract-sdk/classes/ExtendedSymbol" },
            { title: "Asset", path: "/contract-sdk/classes/Asset" },
            { title: "ExtendedAsset", path: "/contract-sdk/classes/ExtendedAsset" },
            { title: "Action", path: "/contract-sdk/classes/Action" },
            { title: "PermissionLevel", path: "/contract-sdk/classes/PermissionLevel" },
            { title: "TableStore", path: "/contract-sdk/classes/TableStore" },
            { title: "Signature", path: "/contract-sdk/classes/Signature" },
            {
              title: "Keys",
              collapsable: true,
              children: [
                { title: "PublicKey", path: "/contract-sdk/classes/keys/PublicKey" },
                { title: "ECCPublicKey", path: "/contract-sdk/classes/keys/ECCPublicKey" },
                { title: "WebAuthNPublicKey", path: "/contract-sdk/classes/keys/WebauthNPublicKey" },
              ],
            },
            {
              title: "Time",
              collapsable: true,
              children: [
                { title: "Microseconds", path: "/contract-sdk/classes/time/Microseconds" },
                { title: "TimePoint", path: "/contract-sdk/classes/time/TimePoint" },
                { title: "TimePointSec", path: "/contract-sdk/classes/time/TimePointSec" },
                { title: "BlockTimestamp", path: "/contract-sdk/classes/time/BlockTimestamp" },
              ],
            },
            {
              title: "Checksum",
              collapsable: true,
              children: [
                { title: "Checksum160", path: "/contract-sdk/classes/checksum/Checksum160" },
                { title: "Checksum256", path: "/contract-sdk/classes/checksum/Checksum256" },
                { title: "Checksum512", path: "/contract-sdk/classes/checksum/Checksum512" },
              ],
            },
          ],
        },
      ],
    },

    // ==================
    // RESOURCES
    // ==================
    {
      title: "Resources",
      collapsable: true,
      sidebarDepth: 1,
      children: [
        { title: "Built with XPR Network", path: "/built-with-xpr-network" },
      ],
    },
  ];
}

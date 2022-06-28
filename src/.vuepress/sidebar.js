module.exports = {
  // '/examples': getExamplesSidebar(),
  '/': getDefaultSidebar()
}

function getDefaultSidebar() {
  return [
    {
      title: 'Introduction',
      collapsable: false,
      sidebarDepth: 1,
      children: [
        { title: "Overview", path: '/introduction/overview' },
        { title: "Getting Started", path: '/introduction/getting-started' },
        { title: "Accounts and Permissions", path: '/introduction/accounts-and-permissions' },
      ]
    },
    {
      title: 'Contract SDK',
      collapsable: false,
      sidebarDepth: 1,
      children: [
        { title: "Storage", path: '/contract-sdk/storage' },
        { title: "Execution Order", path: '/contract-sdk/execution-order' },
        { title: "Inline Actions", path: '/contract-sdk/inline-actions' },
        { title: "Notifications", path: '/contract-sdk/notifications' },
        { title: "Testing", path: '/contract-sdk/testing' },
        { title: "Security", path: '/contract-sdk/security' },
        {
          title: 'Language Specifics',
          collapsable: true,
          sidebarDepth: 0,
          children: [
            { title: "Concepts", path: '/contract-sdk/concepts' },
            { title: "Number Types", path: '/contract-sdk/types' },
            { title: "Globals", path: '/contract-sdk/globals' }
          ]
        },
        {
          title: 'API',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            { title: 'Authentication', path: '/contract-sdk/api/authentication' },
            { title: 'Assert', path: '/contract-sdk/api/assert' },
            { title: 'Blockchain Time', path: '/contract-sdk/api/currentTime' },
            { title: 'Cryptography', path: '/contract-sdk/api/cryptography' },
            { title: 'Print', path: '/contract-sdk/api/print' },
            { title: "Random Number Generator", path: '/contract-sdk/api/random-number-generator' },
            { title: "Transaction ID", path: '/contract-sdk/api/transaction-id' },
            { title: "SafeMath", path: '/contract-sdk/api/safemath' },
          ]
        },
        {
          title: 'Classes',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            { title: 'Name', path: '/contract-sdk/classes/Name' },
            { title: 'Symbol', path: '/contract-sdk/classes/Symbol' },
            { title: 'ExtendedSymbol', path: '/contract-sdk/classes/ExtendedSymbol' },
            { title: 'Asset', path: '/contract-sdk/classes/Asset' },
            { title: 'ExtendedAsset', path: '/contract-sdk/classes/ExtendedAsset' },
            { title: 'Action', path: '/contract-sdk/classes/Action' },
            { title: 'PermissionLevel', path: '/contract-sdk/classes/PermissionLevel' },
            { title: 'TableStore', path: '/contract-sdk/classes/TableStore' },
            {
              title: 'Keys',
              collapsable: true,
              children: [
                { title: "PublicKey", path: '/contract-sdk/classes/keys/PublicKey' },
                { title: "ECCPublicKey", path: '/contract-sdk/classes/keys/ECCPublicKey' },
                { title: "WebAuthNPublicKey", path: '/contract-sdk/classes/keys/WebauthNPublicKey' }
              ]
            },
            { title: 'Signature', path: '/contract-sdk/classes/Signature' },
            {
              title: 'Time',
              collapsable: true,
              children: [
                { title: "Microseconds", path: '/contract-sdk/classes/time/Microseconds' },
                { title: "TimePoint", path: '/contract-sdk/classes/time/TimePoint' },
                { title: "TimePointSec", path: '/contract-sdk/classes/time/TimePointSec' },
                { title: "BlockTimestamp", path: '/contract-sdk/classes/time/BlockTimestamp' },
              ]
            },
            {
              title: 'Checksum',
              collapsable: true,
              children: [
                { title: "Checksum160", path: '/contract-sdk/classes/checksum/Checksum160' },
                { title: "Checksum256", path: '/contract-sdk/classes/checksum/Checksum256' },
                { title: "Checksum512", path: '/contract-sdk/classes/checksum/Checksum512' },
              ]
            }
          ]
        },
        { title: 'Examples', path: '/contract-sdk/examples' },
      ]
    },
    {
      title: 'Client SDKs',
      collapsable: false,
      sidebarDepth: 1,
      children: [
        { title: "Web", path: '/client-sdks/web' },
        { title: "React Native", path: '/client-sdks/react-native' },
        { title: "Kotlin", path: '/client-sdks/kotlin' },
        { title: "Swift", path: '/client-sdks/swift' },
        { title: "Chain IDs and Endpoints", path: '/client-sdks/endpoints' },
        { title: "Table Information", path: '/client-sdks/query-tables' },
        { title: "User Tokens", path: '/client-sdks/user-tokens' },
      ]
    },
    {
      title: 'CLI',
      collapsable: false,
      sidebarDepth: 1,
      children: [
        { title: "Usage", path: '/cli/usage' },
        {
          title: 'Examples',
          collapsable: true,
          children: [
            { title: "Free New Account", path: '/cli/examples/free-new-account' },
            { title: "Paid New Account", path: '/cli/examples/paid-new-account' },
          ]
        },
      ]
    },
    {
      title: 'Guides',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        { title: "Hello world", path: '/guides/hello-world' },
        { title: "Key-Value", path: '/guides/key-value' },
      ]
    },
    {
      title: 'Built with Proton',
      path: '/built-with-proton',
    }
  ]
}

function getExamplesSidebar() {
  return [
    {
      title: 'Examples',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        ['/examples', 'Overview'],
        '/built-with-proton'
      ]
    }
  ]
}

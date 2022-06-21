module.exports = {
  // '/examples': getExamplesSidebar(),
  '/': getDefaultSidebar()
}

function getDefaultSidebar() {
  return [
    {
      title: "Introduction",
      path: 'introduction',
      collapsable: false,
      sidebarDepth: 0,
    },
    {
      title: "Getting started",
      path: 'getting-started',
      collapsable: false,
      sidebarDepth: 1,
    },
    {
      title: 'Contract SDK',
      collapsable: false,
      sidebarDepth: 1,
      children: [
        { title: "Accounts and Permissions", path: '/accounts-and-permissions' },
        { title: "Storage", path: '/storage' },
        { title: "Execution Order", path: '/execution-order' },
        { title: "Inline Actions", path: '/inline-actions' },
        { title: "Notifications", path: '/notifications' },
        { title: "Testing", path: '/testing' },
        { title: "Debugging", path: '/debugging' },
        { title: "Security", path: '/security' },
        {
          title: 'Language Specifics',
          collapsable: true,
          sidebarDepth: 0,
          children: [
            { title: "Concepts", path: '/concepts' },
            { title: "Number Types", path: '/types' },
            { title: "Globals", path: '/globals' }
          ]
        }
      ]
    },
    {
      title: 'Client SDKs',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        { title: "Web", path: '/client-sdks/web' },
        { title: "React Native", path: '/client-sdks/react-native' },
        { title: "Kotlin", path: '/client-sdks/kotlin' },
        { title: "Swift", path: '/client-sdks/swift' },
        { title: "Chain IDs and Endpoints", path: '/client-sdks/endpoints' },
      ]
    },
    {
      title: 'Examples',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        {
          title: 'Guides',
          collapsable: true,
          children: [
            { title: "Hello world", path: '/examples/guides/hello-world' },
          ]
        },
        { title: 'Contracts', path: '/examples/contracts' },
        { title: 'Built with Proton', path: '/built-with-proton' },
        {
          title: 'CLI',
          collapsable: true,
          children: [
            { title: "Free New Account", path: '/examples/cli/free-new-account' },
            { title: "Paid New Account", path: '/examples/cli/paid-new-account' },
          ]
        },
      ]
    },
    {
      title: 'API',
      collapsable: false,
      sidebarDepth: 1,
      children: [
        { title: 'Authentication', path: '/api/authentication' },
        { title: 'Assert', path: '/api/assert' },
        { title: 'Blockchain Time', path: '/api/currentTime' },
        { title: 'Cryptography', path: '/api/cryptography' },
        { title: 'Print', path: '/api/print' },
        { title: "Random Number Generator", path: '/random-number-generator' },
        { title: "Utility", path: '/api/utility' },
      ]
    },
    {
      title: 'Classes',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        { title: 'Name', path: '/classes/Name' },
        { title: 'Symbol', path: '/classes/Symbol' },
        { title: 'ExtendedSymbol', path: '/classes/ExtendedSymbol' },
        { title: 'Asset', path: '/classes/Asset' },
        { title: 'ExtendedAsset', path: '/classes/ExtendedAsset' },
        { title: 'Action', path: '/classes/Action' },
        { title: 'PermissionLevel', path: '/classes/PermissionLevel' },
        { title: 'TableStore', path: '/classes/TableStore' },
        {
          title: 'Keys',
          collapsable: true,
          children: [
            { title: "PublicKey", path: '/classes/keys/PublicKey' },
            { title: "ECCPublicKey", path: '/classes/keys/ECCPublicKey' },
            { title: "WebAuthNPublicKey", path: '/classes/keys/WebauthNPublicKey' }
          ]
        },
        { title: 'Signature', path: '/classes/Signature' },
        {
          title: 'Time',
          collapsable: true,
          children: [
            { title: "Microseconds", path: '/classes/time/Microseconds' },
            { title: "TimePoint", path: '/classes/time/TimePoint' },
            { title: "TimePointSec", path: '/classes/time/TimePointSec' },
            { title: "BlockTimestamp", path: '/classes/time/BlockTimestamp' },
          ]
        },
        {
          title: 'Checksum',
          collapsable: true,
          children: [
            { title: "Checksum160", path: '/classes/checksum/Checksum160' },
            { title: "Checksum256", path: '/classes/checksum/Checksum256' },
            { title: "Checksum512", path: '/classes/checksum/Checksum512' },
          ]
        }
      ]
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

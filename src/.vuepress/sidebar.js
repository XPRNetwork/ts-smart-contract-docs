module.exports = {
  // '/classes/': getclassesSidebar(),
  // '/examples': getExamplesSidebar(),
  // '/built-with-proton': getExamplesSidebar(),
  '/': getDefaultSidebar()
}

function getDefaultSidebar() {
  return [
    {
      title: "Introduction",
      path: '/introduction',
      collapsable: false,
      sidebarDepth: 0,
    },
    {
      title: "Getting started",
      path: '/getting-started',
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
        { title: "Testing", path: '/testing' },
        { title: "Debugging", path: '/debugging' },
        {
          title: 'Language Specifics',
          collapsable: true,
          sidebarDepth: 0,
          children: [
            { title: "Concepts", path: '/concepts' },
            { title: "Number Types", path: '/types' },
            { title: "Globals", path: '/globals' }
          ]
        },
      ]
    },
    {
      title: 'Client SDKs',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        { title: "Web", path: '/client-sdks/web' },
        { title: "React Native", path: '/client-sdks/react-native'  },
        { title: "Kotlin", path: '/client-sdks/kotlin'  },
        { title: "Swift", path: '/client-sdks/swift' },
      ]
    },
    {
      title: 'Examples',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        { title: 'Overview', path: '/examples' },
        { title: 'Built with Proton', path: '/built-with-proton' },
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

      ]
    },
    {
      title: 'Classes',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        { title: 'Name', path: '/classes/name' },
        { title: 'Symbol', path: '/classes/symbol' },
        { title: 'ExtendedSymbol', path: '/classes/extended-symbol' },
        { title: 'Asset', path: '/classes/asset' },
        { title: 'ExtendedAsset', path: '/classes/extended-asset' },
        { title: 'Action', path: '/classes/action' },
        { title: 'PermissionLevel', path: '/classes/permissionLevel' },
        {
          title: 'PublicKey',
          collapsable: true,
          children: [
            { title: "PublicKey", path: '/classes/publicKey/publicKey' },
            { title: "ECCPublicKey", path: '/classes/publicKey/eccPublicKey' },
            { title: "WebAuthNPublicKey", path: '/classes/publicKey/webauthnPublicKey' }
          ]
        },
        { title: 'Signature', path: '/classes/signature' },
        {
          title: 'Time',
          collapsable: true,
          children: [
            {
              title: "Microseconds",
              path: '/classes/time/microseconds'
            },
            {
              title: "TimePoint",
              path: '/classes/time/timePoint'
            },
            {
              title: "TimePointSec",
              path: '/classes/time/timePointSec'
            },
            {
              title: "BlockTimestamp",
              path: '/classes/time/blockTimestamp'
            },
          ]
        },
        {
          title: 'Storage',
          collapsable: true,
          children: [
            {
              title: 'TableStore',
              path: '/classes/storage/table-store.md'
            }
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

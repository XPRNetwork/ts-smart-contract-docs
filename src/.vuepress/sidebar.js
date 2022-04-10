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
      title: 'Using the SDK',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        {
          title: "Concepts",
          path: '/concepts'
        },
        {
          title: "Debugging",
          path: '/debugging'
        },
        {
          title: "Number Types",
          path: '/types'
        }
      ]
    },
    {
      title: 'Examples',
      collapsable: false,
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
        { title: 'Blockchain Time', path: '/api/currentTime' },
      ]
    },
    {
      title: 'Classes',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        { title: 'Action', path: '/classes/action' },
        { title: 'Asset', path: '/classes/asset' },
        { title: 'PermissionLevel', path: '/classes/permissionLevel' },
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

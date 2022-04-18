---
description: Inline Actions
---


# Execution Order

## Overview

Root Actions - Actions submitted by a user as part of a transaction.

Inline Actions - Actions generated from inside a smart contract (as opposed to user-generated).

Notifications - Incoming alerts from other smart contracts.

Proton's architecture helps mitigate re-entrancy attacks by scheduling inline actions instead of executing them immediately:
- If we have 3 root actions, all notifications and inline actions inside root action 1 must execute before root action 2, and so on.
- However, the order of the notifications and inline actions inside each of the root actions is dependant on the execution order,

## Execution order
There are 2 queues per root action, **Notifications queue (RootN)** and **Inline actions queue (RootIA)**

**New notifications (NewN)** and **new inline actions (NewIA)** are added at the end of the every notification or action as:
1. RootN = [...RootN, ...NewN]
2. Is current context a notification?
     - Yes: RootIA = [...RootIA, ...NewIA]
     - No: RootIA = [...NewIA, ...RootIA]

Note that Proton will only process the inline actions queue when the notifications queue is empty.

## Basic playground


<ExecutionOrder :rootActions="[
        {
          type: 'Action',
          elements: [
            {
              type: 'Notification',
              elements: [
                {
                  type: 'Action',
                  elements: [
                    {
                      type: 'Action',
                      elements: [],
                    },
                    {
                      type: 'Notification',
                      elements: [],
                    }
                  ],
                }
              ],
            },
          ],
        },
        {
          type: 'Action',
          elements: [
            {
              type: 'Action',
              elements: [],
            },
            {
              type: 'Notification',
              elements: [],
            }
          ],
        },
]"/>

## Advanced playground

<ExecutionOrder :rootActions="[
        {
          type: 'Action',
          elements: [
            {
              type: 'Action',
              elements: [
                {
                  type: 'Notification',
                  elements: [],
                },
                {
                  type: 'Action',
                  elements: [],
                }
              ],
            },
            {
              type: 'Notification',
              elements: [
                {
                  type: 'Action',
                  elements: [
                    {
                      type: 'Action',
                      elements: [],
                    },
                    {
                      type: 'Notification',
                      elements: [],
                    }
                  ],
                },
                {
                  type: 'Notification',
                  elements: [
                    {
                      type: 'Notification',
                      elements: [],
                    },
                    {
                      type: 'Action',
                      elements: [],
                    }
                  ],
                }
              ],
            },
            {
              type: 'Notification',
              elements: [
                {
                  type: 'Action',
                  elements: [],
                },
                {
                  type: 'Notification',
                  elements: [],
                }
              ],
            },
            {
              type: 'Action',
              elements: [
                {
                  type: 'Action',
                  elements: [],
                },
                {
                  type: 'Notification',
                  elements: [],
                }
              ],
            }
          ],
        },
        {
          type: 'Action',
          elements: [
            {
              type: 'Action',
              elements: [],
            },
            {
              type: 'Notification',
              elements: [],
            }
          ],
        },
]"/>
# Getting started with XPR Network 

## What’s XPR Network ?

XPR Network is a fast, reliable, and gas free antelope blockchain. XPR Network enables users to transact directly with each other instantly at no cost.

Compared to other chains, XPR Network stands out by being:

* **Wayyyy much faster**: Most transactions are completed in less than a second (we use the word instant).  
* **Super affordable**: Transaction/gas fees are typically around $0, yes that very cheap.  
* **High availability:** XPR Network has been never halted since the inception block.  
* **Highly decentralized**: XPR Network boasts one of the highest Nakamoto coefficients (a measure of decentralization) among delegated proof-of-stake networks.

On XPR Network, you can dream big and build ANY use case, thanks to the zero gas fees and instant transaction. 

## What do I need to get started ?

No prior experience with blockchain or C++ is required to learn XPR Network\! However, you will need the following:

* A computer running Linux, macOS, or Windows.  
  * For Windows, ensure Windows Terminal is installed.  
* Node.js 20 installed.  
* Basic knowledge of TypeScript programming.  
* Familiarity with using the command line.  
* Basic understanding of Git, whether via the command line or your preferred GUI tool.  

## Grab the code from this documentation

We’ve prepared a github repository that contains all examples you will find across this course. Please take a few minutes to clone this repo to your local computer and explore its content.  
[https://github.com/XPRNetwork/developer-examples](https://github.com/XPRNetwork/developer-examples)

## Just before the big dive

As a developer, you should be aware of some important considerations:

* **You love JS uh, let’s go TS:** Yeah sorry, but the code here is written in typescript … Why ? First because type safety is important while you interact with blockchain, type matching is really important \! Next, because XPRNetwork offers the best SDK to write smart contracts in typescript, you will thank me later when we will start the Smart contract course.    
* **XPRNetwork storage is not a hard drive**: You should always be scarce about how much data you store on-chain. Keep in mind that every operation should be optimized as possible on execution time, and data storage. Computation intensive tasks should be done outside smart contracts (like on a webserver), and stored data should occupy the smallest amount possible of bytes. It may sound lame, but trust me, optimizing is most of the time a fun engineering challenge.  
* **Take time to understand the underlying concept:** You may have a hard time if you don’t fully understand the foundation concepts (like resources or transaction execution order). It's easy to read something and think, "Yeah, I understand," only to realize later that you didn't fully grasp it. Be harsh with yourself as you go through each topic.  Read it carefully.   
* **BUILD DESTROY REPEAT:** Try to start small and iterate. Don’t hesitate to fork some projects available on the XPRNetwork github account and break things\! 

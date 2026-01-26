# A quick note on data types 

Understanding data type is a quite advanced topic, and becomes more important when you dive into smart contracts. At this level just have to know few basic types:

* **Name:** Name is a central piece of XPR Network types, it’s not a string … it’s a string but it’s also a number (wut??).  Yes, it’s a string that could be expressed as a number. To achieve that, names as strings have a rule that is easy to understand: “**Only letters from a to z in lower case, and numbers from 1 to 5**”. Why such a rule ? a to z is 26 chars, 1 to 5 is 4 more characters, total is 32, with 2 bytes per characters, it’s 64 bytes… So smart \! That is why name could be read as number, so the name alice is 1383097247031216128 in number. Name length should always be **within a length of 4 and 12 characters.**  
* **Numbers:** In smart contracts, you will see we have a lot of number types (u8,u32,u64,f32,i32…) fortunately, as keep we looking at the NodeJS side of thing, numbers are coming in two only flavors: the good old number and bigint, that express number above the 32 bits limit and are rendered as string in JSONRpc.    
* For types like asset (token value), symbol (token definition), hash (SHA256), public and private key, they will be output as string.  
* **Complex object:** they will be output as json, where the types cited above follow the same rules.

---

### Let’s continue with the important concepts you need to know
### 1) What is the difference between `var`, `let`, and `const`?

In JavaScript, `var`, `let`, and `const` are used to declare variables, but they behave differently:

#### 🔹 var
- **Scope**: Function-scoped.  
- **Hoisting**: Gets hoisted (moved to the top of its scope) and initialized as `undefined`.  
- **Redeclaration**: Can be redeclared and updated.  
- ⚠️ Can cause unexpected bugs because it's accessible even before it's declared.

```js
var city = "Dhaka";
var city = "Chittagong"; // ✅ Redeclaration allowed
```

### 🔹 let

- **Scope**: Block-scoped (only accessible inside { ... }).
- **Hoisting**: Hoisted but not initialized → ReferenceError if used before declaration.
- **Redeclaration**: ❌ Cannot be redeclared in the same scope, but can be updated.
- ✅ Safer than var.

```js
let age = 17;
age = 18; // ✅ update allowed
// let age = 19; // ❌ redeclaration not allowed
```

### 🔹 const

- **Scope**: Block-scoped.
- **Hoisting**: Hoisted but not initialized (like let).
- **Redeclaration/Update**: ❌ Cannot be redeclared or updated.
- ✅ Best for values that never change.

```js
const pi = 3.1416;
// pi = 3.15; // ❌ not allowed
```

==> ✅ Summary
Keyword	Scope	Redeclaration	Reassignment	Hoisting
var	Function-scoped	✅ Yes	✅ Yes	✅ (initialized as undefined)
let	Block-scoped	❌ No	✅ Yes	⚠️ (not initialized)
const	Block-scoped	❌ No	❌ No	⚠️ (not initialized)

👉 Use let when the value will change, and const when it won’t. Avoid var in modern JavaScript.


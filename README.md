## 1) What is the difference between `var`, `let`, and `const`?

In JavaScript, `var`, `let`, and `const` are used to declare variables, but they behave differently:

### 1. 🔹 var
- **Scope**: Function-scoped.  
- **Hoisting**: Gets hoisted (moved to the top of its scope) and initialized as `undefined`.  
- **Redeclaration**: Can be redeclared and updated.  
- ⚠️ Can cause unexpected bugs because it's accessible even before it's declared.

```js
var city = "Dhaka";
var city = "Chittagong"; // ✅ Redeclaration allowed
```

### 2. 🔹 let

- **Scope**: Block-scoped (only accessible inside { ... }).
- **Hoisting**: Hoisted but not initialized → ReferenceError if used before declaration.
- **Redeclaration**: ❌ Cannot be redeclared in the same scope, but can be updated.
- ✅ Safer than var.

```js
let age = 17;
age = 18; // ✅ update allowed
// let age = 19; // ❌ redeclaration not allowed
```

### 3. 🔹 const

- **Scope**: Block-scoped.
- **Hoisting**: Hoisted but not initialized (like let).
- **Redeclaration/Update**: ❌ Cannot be redeclared or updated.
- ✅ Best for values that never change.

```js
const pi = 3.1416;
// pi = 3.15; // ❌ not allowed
```

👉 Use let when the value will change, and const when it won’t. Avoid var in modern JavaScript.

## ✅ Summary
 - **var** : function-scoped, can be re-declared & re-assigned, hoisted.
 - **let** : block-scoped, can be re-assigned but not re-declared.
 - **const*** : block-scoped, cannot be re-assigned or re-declared.
 
----
## 2) What is the difference between `map()`, `forEach()`, and `filter()`?

These three are array methods in JavaScript, but they serve different purposes:



### 1. 🔹 `forEach()`
- **Purpose**: Executes a function for each element in the array.  
- **Return Value**: ❌ Does not return a new array (always returns `undefined`).  
- **Use Case**: When you just want to loop through items and perform side effects (like logging, updating DOM, etc.). 

```js
const numbers = [1, 2, 3];
numbers.forEach(num => console.log(num * 2));
// Output: 2, 4, 6
// Returns: undefined
```

### 2. 🔹 `map()`
 - **Purpose**: Creates a new array by transforming each element of the original array.
 - **Return Value**: ✅ Returns a new array (same length as original).
 - **Use Case**: When you want to change data into a new form without modifying the original array.

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
console.log(doubled); 
// Output: [2, 4, 6]
```

### 3. 🔹 `filter()`
 - **Purpose**: Creates a new array with elements that pass a certain condition.
 - **Return Value**: ✅ Returns a new array (length may be smaller than the original).
 - **Use Case**: When you want only specific items that match a condition.

```js
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); 
// Output: [2, 4]
```

## ✅ Summary
 - **forEach** : loops through array, does not return a new array.
 - **map** : transforms each element, returns a new array.
 - **filter** : selects elements based on condition, returns a new array.

----
## 3) What are arrow functions in ES6?

Arrow functions are a **shorter and cleaner way** to write functions introduced in **ES6 (ECMAScript 2015)**.  
They use the `=>` syntax instead of the traditional `function` keyword.

### 1. 🔹 Syntax
```js
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;
```

### 2. 🔹 Key Features 
   #### 1. Shorter Syntax -->
   - No need to write the `function` keyword.
   - If the function body has only one return statement, you can omit `return` and curly braces {}.

   #### 2. Implicit Return
   - Single-line arrow functions automatically return the result.
```js
const square = n => n * n;
console.log(square(5)); // Output: 25
```

   #### 3. Lexical this Binding
   - Arrow functions do not have their own this.
   - Instead, they use this from the surrounding context (the parent scope).
```js
const person = {
  name: "John",
  greet: function() {
    setTimeout(() => {
      console.log(`Hello, ${this.name}`);
    }, 1000);
  }
};
person.greet(); // Output: Hello, John
```

  #### 4. Cannot be used as constructors
  - Arrow functions cannot be used with new because they don’t have their own this or prototype.


### 🔹 When to Use
- ✅ For short, simple functions.
- ✅ For callbacks (e.g., array methods like map, filter, forEach).
- ✅ When you want to preserve the surrounding this.
- ❌ Avoid using them when you need function hoisting or object methods that rely on their own this.
  - ✅ Example
  ```js
  const numbers = [1, 2, 3, 4];
  const doubled = numbers.map(num => num * 2);
  console.log(doubled); // Output: [2, 4, 6, 8]
  ```

## ✅ Summary
- Arrow functions = shorter syntax for writing functions.
- They use lexical this binding (don’t create their own this).
- Best for callbacks & simple functions, but cannot be used as constructors.

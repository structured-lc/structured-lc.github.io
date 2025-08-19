### Leetcode 2804 (Easy): Array Prototype ForEach [Practice](https://leetcode.com/problems/array-prototype-foreach)

### Description  
You are to implement a custom `forEach` method for arrays (in JavaScript or TypeScript). This method should apply a given callback function to each element of the array, in order, passing the element, its index, and the array itself to the callback every time. The callback’s context (`this`) should be set to a supplied optional argument, if given.  
This method will be added as a property to the `Array.prototype`, so it should act like a native method.

### Examples  

**Example 1:**  
Input: `arr = [1,2,3]`, callback = `console.log`  
Output: *prints 1 0 [1,2,3]*, *prints 2 1 [1,2,3]*, *prints 3 2 [1,2,3]*  
Explanation:  
The callback is called 3 times, each time with (element, index, array) signature. Each call logs the required arguments.

**Example 2:**  
Input: `arr = []`, callback = `console.log`  
Output: *(prints nothing)*  
Explanation:  
Because the array is empty, the loop is not entered and the callback is never called.

**Example 3:**  
Input: `arr = [9,8]`, callback = function(x, i) { sum += x } (where sum = 0 before)  
Output: After, sum = 17  
Explanation:  
The callback is called twice. First with (9, 0, [9,8]) and then with (8, 1, [9,8]), so both values are added to sum.

### Thought Process (as if you’re the interviewee)  
First, I need to attach a method to `Array.prototype` so that it's available to all arrays. The method should take a callback and an optional context value.  
I’ll use a for loop to visit each valid array index in order. On each iteration, I must call the callback with the value, index, and the array itself. The callback’s `this` value should be set to the optional context (if given), otherwise undefined.  
It mimics the JavaScript `forEach` API, so I’ll match its argument order and use of `call` to set context.  
Edge cases: don’t iterate properties that aren’t array elements (so use standard for loop over indices), and ignore empty arrays.

### Corner cases to consider  
- Empty arrays: callback should not be called at all  
- Arrays with only one element  
- Arrays with non-numeric properties or sparse indices  
- Large arrays to ensure efficiency  
- Callback that mutates the array during iteration (should not affect indices already visited)  
- If context is undefined, `this` remains as undefined  
- Callback throws error: error should propagate  
- Passing additional parameters to callback (should be exactly value, index, array)

### Solution

```python
# Since this is a JavaScript prototype implementation, the Python code demonstrates the logic for reference.
# For actual interviews, you'd write the JS/TS code, but the algorithm is universal.

def forEach(arr, callback, context=None):
    # Loop over each index from 0 to len(arr) - 1
    for i in range(len(arr)):
        # Call the callback with element, index, and the array.
        # Context is passed via 'context', which would be 'this' in JS
        callback(arr[i], i, arr)
```

**JavaScript (interview-style, no extra methods):**
```javascript
Array.prototype.forEach = function(callback, context) {
    for (let i = 0; i < this.length; ++i) {
        // Use call to set up `this` context in callback
        callback.call(context, this[i], i, this);
    }
};
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = array length, since we visit each element once and call the callback on each.
- **Space Complexity:** O(1), ignoring call stack/closure, as no extra significant storage is used besides a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What happens if the array is mutated during iteration?  
  *Hint: In most implementations, the original length is captured and new elements appended during iteration are not processed.*

- How could you make this work recursively instead of iteratively?  
  *Hint: Use a helper function that calls itself incrementing the index until reaching the array's length.*

- What if the callback is asynchronous?  
  *Hint: This original version is synchronous and will not wait for promises.*

### Summary
This problem is a classic prototype extension pattern—adding behavior to a global object. The main coding pattern is **iteration over indices with a loop** and **using call to set context for callbacks**. This logic applies to many array method implementations (e.g., map, filter, reduce), and the approach is fundamental in understanding lower-level JS/TS API design or polyfilling methods in codebases lacking modern features.

### Tags

### Similar Problems

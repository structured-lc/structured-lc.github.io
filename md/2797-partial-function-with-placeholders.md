### Leetcode 2797 (Easy): Partial Function with Placeholders [Practice](https://leetcode.com/problems/partial-function-with-placeholders)

### Description  
Given a function **fn**, an array of arguments **args** (which may include the placeholder "_" for missing values), implement a function that returns a new function.  
When the new function is called with **restArgs**, it fills each "_" in **args** with elements from **restArgs** in order. Any unused **restArgs** are appended to the end. The original function **fn** should then be called with all these values as positional arguments.  

In other words: Write a `partial(fn, args)` such that  
- it returns a function expecting `*restArgs`  
- the returned function fills in each "_" in `args` by consuming from `restArgs`, in order  
- if any `restArgs` remain, they are appended at the end  
- it calls `fn(*newArgs)`  

### Examples  

**Example 1:**  
Input:  
`fn = lambda a, b, c: b + a - c`,  
`args = ["_", 5]`,  
`restArgs = [5, 20]`  
Output: `-10`  
*Explanation: First "_" is replaced with 5, the array becomes [5, 5], then 20 is appended for unused restArgs making [5, 5, 20]. So, fn(5, 5, 20) → 5 + 5 - 20 = -10.*

**Example 2:**  
Input:  
`fn = lambda a, b: a * b`,  
`args = [2, "_"]`,  
`restArgs = [3]`  
Output: `6`  
*Explanation: Second arg "_" is replaced with 3, forming [2, 3]. Call fn(2, 3) → 2 × 3 = 6.*

**Example 3:**  
Input:  
`fn = lambda a, b, c: a + b + c`,  
`args = ["_", "_", "_"]`,  
`restArgs = [1, 2, 3, 4]`  
Output: `6`  
*Explanation: All "_" consumed by 1, 2, 3, in order. One left (4), it's appended: [1, 2, 3, 4] but original fn only uses first 3, so fn(1, 2, 3) → 6.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**:  
  - When the returned function is called with restArgs, go through `args` left to right.  
  - For each "_", pop from restArgs and put it there.  
  - If there are leftover values in restArgs after all "_", append them to the end.  
  - Call the original `fn` with the resulting argument list.

- **Optimize:**  
  - Since args and restArgs are short (per constraints), a simple linear scan is optimal.
  - Avoid copying arrays too many times.
  - Carefully preserve restArgs order.

- **Trade-off:**  
  - Approach is O(n), where n is the length of `args` + length of extra restArgs, negligible by constraints.
  - Fully readable, no unnecessary complexity.

### Corner cases to consider  
- No placeholders in args (should append all restArgs at the end).
- More restArgs than placeholders.
- Fewer restArgs than placeholders (will leave "_" in output, which might not be allowed; assume by constraints restArgs is enough).
- Empty restArgs.
- Args is empty array (needs clarification from description; assume it isn't, from constraints).

### Solution

```python
def partial(fn, args):
    def partialFn(*restArgs):
        # List to build newArgs
        newArgs = []
        # Pointer to the current position in restArgs
        rest_i = 0
        # Fill placeholders with restArgs
        for value in args:
            if value == "_":
                # Use next value from restArgs
                newArgs.append(restArgs[rest_i])
                rest_i += 1
            else:
                newArgs.append(value)
        # Append any extra restArgs
        while rest_i < len(restArgs):
            newArgs.append(restArgs[rest_i])
            rest_i += 1
        # Call fn with expanded arguments
        return fn(*newArgs)
    return partialFn
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n),  
  where m = len(args), n = number of extra restArgs. Need to scan `args` fully and possibly append extra restArgs.
- **Space Complexity:** O(m + n),  
  for building the new argument list; not counting call stack or input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle multiple types of placeholders for more complex binding?
  *Hint: What if "_" stands for positional, and "__" stands for a default or for later binding?*

- Can you design `partial` to allow skipping arguments in the middle?  
  *Hint: How to represent multiple empty spots and fill them correctly?*

- How do you handle keyword arguments (kwargs) with placeholders?
  *Hint: Consider partial application for both args and kwargs.*

### Summary
This problem is an application of the **partial function pattern** using array manipulation—essentially creating your own `functools.partial` with placeholder support.  
It’s a **functional programming pattern** useful for currying, callbacks, and event handler binding.  
Variations appear in languages and frameworks allowing **partial application**, and the concept is foundational in JavaScript and Python FP-style code.
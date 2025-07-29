### Leetcode 2630 (Hard): Memoize II [Practice](https://leetcode.com/problems/memoize-ii)

### Description  
Given a function `fn`, return a *memoized* version of that function. A memoized function is one that, when called multiple times with the same inputs, will only compute and return the result once, caching it for reuse.  
Inputs are considered identical only if they are strictly equal (`===` in JS, e.g., same object reference, same primitive).  
- `fn` can be any function (no constraints on value or type of arguments).

For each invocation, if the parameters have never been seen before, call `fn` and cache the result; otherwise, return the value from the cache without calling `fn` again.

### Examples  

**Example 1:**  
Input:  
getInputs = `() => [[2,2],[2,2],[1,2]]`  
fn = `(a, b) => a + b`  
Output: `[{val:4,calls:1},{val:4,calls:1},{val:3,calls:2}]`  
*Explanation:*
- Call 1: `(2,2)` → 2+2=4, calls=1.
- Call 2: `(2,2)` seen before, return 4, calls=1.
- Call 3: `(1,2)` → 1+2=3, calls=2.

**Example 2:**  
Input:  
getInputs = `() => [["a", {x:1}], ["a", {x:1}], ["a", {x:1}], ["a", {x:2}]]`  
fn = `(str, obj) => str + obj.x`  
Output: `[{val:"a1",calls:1},{val:"a1",calls:2},{val:"a1",calls:3},{val:"a2",calls:4}]`  
*Explanation:*
- Each `{x:1}` is a new object (different reference), so all are treated as distinct.
- All calls except the last compute the result; last input is a new object, so compute again.

**Example 3:**  
Input:  
getInputs = `() => [[{}, {}], [{}, {}]]`  
fn = `(a, b) => a === b`  
Output: `[{val:false,calls:1},{val:false,calls:2}]`  
*Explanation:*  
- Both `{}` are new objects each time, so result is always computed, not fetched from cache.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Use a dictionary where the key is the tuple of arguments.  
  Problem: In Python, `dict` keys require hashable types, but any parameter type can be given (including mutable objects which aren’t hashable), or for languages like JavaScript, objects are compared by reference.
  
- **Better idea:**  
  Since we must distinguish arguments by *reference*, and any number or type, make a “trie” (tree of dictionaries or Maps) where:
    - Each level of the trie corresponds to one argument.
    - At each level, for every unique argument reference or value, make a Map child node.
    - At the final level, store the cached result.
    - Use a dedicated sentinel value (like an object or None) to mark where results are held.
  
- **Why this approach:**  
  - Supports any argument type (objects, functions, numbers, etc).
  - Distinguishes by identity/reference.
  - Efficient for repeated calls; cache lookup/deposit takes O(argument count).
  - Common in advanced memoization problems.

### Corner cases to consider  
- No arguments to function (`fn()`)
- Arguments with same value but different references (e.g., two `{}`)
- Functions with side effects (should only run once per unique input)
- Mutable arguments
- Large number of arguments or zero arguments
- Identical objects (same reference) passed multiple times

### Solution

```python
def memoize(fn):
    # Use a nested dictionary (trie) to store values per sequence of argument references
    # Each node is a dict mapping argument (object reference or value) -> next node
    # Use a dedicated object as the key for the cached result
    result_key = object()
    root = {}

    def memoized(*args):
        node = root
        # Traverse trie; one dict per argument
        for arg in args:
            if arg not in node:
                node[arg] = {}
            node = node[arg]
        # At leaf, store/retrieve result under result_key
        if result_key in node:
            return node[result_key]
        res = fn(*args)
        node[result_key] = res
        return res
    return memoized
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Each call is O(k), where k is the number of arguments (traversing one node per argument).
  - First call for argument combination: O(k) + cost of `fn`.
  - Subsequent calls: O(k) lookup.

- **Space Complexity:**  
  - O(c × k), where c is the number of *unique* argument combinations encountered (worst-case, every call is unique), and k is the argument count.  
  - Each node in the trie is a small dict branch; at depth k, stores the result.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support cache *eviction* or limit the memory usage?
  *Hint: Can you combine memoization with a size-bounded cache (LRU/TTL)?*

- Can you adapt this approach for arguments that are deeply equal (not just identical by reference)?
  *Hint: Can you serialize arguments, or use deep hashing?*

- How does the implementation handle non-hashable or mutable objects as parameters?
  *Hint: Why is reference-based lookup sufficient here, even if hashing isn't possible?*

### Summary
This problem uses the advanced **Trie-based Memoization** pattern, enabling caching for *any* function regardless of argument types (including objects, functions, etc). Unlike standard dictionary-based memoization, this approach structures the cache as nested dicts (per argument, per level) and stores values at leaves, keyed by a sentinel.  
It’s particularly useful for dynamic programming, recursive calls, or expensive pure functions where input variety is high.  
This design applies wherever standard hash/dict-based caches would fail (e.g., arguments are mutable, or equality by reference is required rather than by value).
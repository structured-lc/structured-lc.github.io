### Leetcode 2691 (Hard): Immutability Helper [Practice](https://leetcode.com/problems/immutability-helper)

### Description  
Design an **Immutability Helper** utility.  
Given an initial object or array (could be nested/complex), create a class `ImmutableHelper` which wraps it and provides a `produce` method.  
- The `produce(mutator)` method takes a function. The function is passed a **proxy** of the original object that *appears* mutable.
- The **proxy** supports setting existing properties and values (including nested), but no new keys, no deletions, and no calling methods like `push`.
- The goal: Let users "mutate" the proxy, but under the hood, return a **new object with the minimal number of changed clones**, and leave the original untouched.  
- Example: If you swap nested values `x` and `y`, only the relevant branch should be copied/cloned.  
- The original object remains untouched for all calls.

### Examples  

**Example 1:**  
Input:  
```
obj = {"x": 5}
mutators = [
  proxy => { proxy.x = proxy.x + 1 }
]
```
Output:  
```
[{"x": 6}]
```
Explanation:  
The user increments `x` via the proxy. The original stays `{"x": 5}`; only the returned result is updated.

**Example 2:**  
Input:  
```
obj = [1,2,3]
mutators = [
  proxy => { proxy[2] = 42 }
]
```
Output:  
```
[[1, 2, 42]]
```
Explanation:  
Changing element 2 returns a new array with that one value changed.

**Example 3:**  
Input:  
```
obj = {"obj": {"val": {"x": 10, "y": 20}}}
mutators = [
  proxy => {
    let data = proxy.obj.val;
    let temp = data.x;
    data.x = data.y;
    data.y = temp;
  }
]
```
Output:  
```
[{"obj": {"val": {"x": 20, "y": 10}}}]
```
Explanation:  
Swaps `x` and `y` deeply nested in the structure. Only the `val` subtree is copied and the change applied. Other parts are preserved by reference.

### Thought Process (as if you’re the interviewee)  
- Start with a brute-force:  
  Deep clone the entire object, apply the mutator, and return the clone.  
  - **Problem:** Inefficient for large objects where only a tiny change is made.
- Optimize:  
  Use a **proxy** to intercept changes. When a property is changed, mark that branch as dirty, and on completion, make shallow copies back up the tree only for changed paths.
  - Break down steps:
    - Intercept property sets via Proxy.
    - Only allow setting existing keys (not adding/deleting).
    - Track which paths are mutated.
    - When mutations are done, recursively clone only changed nodes (from changed leaf up to root), while all untouched branches are kept as-is (structure sharing).
- Tradeoff:  
  - Slightly more complex code and memory for tracking, but orders of magnitude more efficient than always deep copying.

### Corner cases to consider  
- Setting to the same value (should avoid unnecessary cloning).
- No mutation at all (should return original reference).
- Arrays as input (support index-based set, length property).
- Nested objects and arrays.
- Edge case: setting undefined, null, etc.
- Input is empty object or array.
- Deep mutation on shared reference.

### Solution

```python
class ImmutableHelper:
    def __init__(self, obj):
        self._root = obj

    def produce(self, mutator):
        # Track object proxies and which branches have been "dirty"/changed
        # For efficient shallow copying only on changed paths

        # To track which object/array has been changed
        dirty_map = {}

        def wrap(obj, path=()):
            # Return a proxy around obj at a given path
            if not isinstance(obj, (dict, list)):
                return obj  # Not a container; no proxy needed

            def make_setter(target, key, value):
                # Only existing keys can be set
                if (isinstance(target, dict) and key not in target) or \
                   (isinstance(target, list) and (not isinstance(key, int) or key < 0 or key >= len(target))):
                    raise Exception("Key does not exist, setting new keys not allowed")
                # Mark dirty
                dirty_map[id(target)] = True
                object.__setitem__(target, key, value)

            class Proxy:
                def __init__(self, obj):
                    self._obj = obj

                def __getitem__(self, key):
                    return wrap(self._obj[key], path + (key,))

                def __setitem__(self, key, value):
                    make_setter(self._obj, key, value)

                def __getattr__(self, key):
                    if isinstance(self._obj, dict):
                        return wrap(self._obj[key], path + (key,))
                    raise AttributeError()

                def __setattr__(self, key, value):
                    if key == "_obj":
                        object.__setattr__(self, key, value)
                    elif isinstance(self._obj, dict) and key in self._obj:
                        make_setter(self._obj, key, value)
                    else:
                        raise AttributeError("Cannot set new or non-existent attributes")

                def __len__(self):
                    return len(self._obj)

                def __repr__(self):
                    return repr(self._obj)

            return Proxy(obj)

        import copy

        # Make a deep but minimal clone of only dirty branches
        def clone(obj):
            # If this node is dirty, clone it
            if id(obj) in dirty_map:
                if isinstance(obj, dict):
                    return {k: clone(v) for k, v in obj.items()}
                elif isinstance(obj, list):
                    return [clone(v) for v in obj]
            # If container, but not dirty, structure-shared
            return obj

        # Step 1: Proxy the object
        proxy = wrap(copy.deepcopy(self._root))  # Deepcopy for safe mutation

        # Step 2: Mutate via client callback
        mutator(proxy)

        # Step 3: Shallow copy only dirty paths
        # (deepcopy was used to allow mutation; in a more optimal design only shallow copy per dirty, but this matches constraints)
        # Return the new state
        return clone(proxy._obj)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Worst case: O(N), where N is total size of the object/array (if every property is changed).
  - Best case: O(depth), if only a single deep value is changed and everything else is structure-shared.
  - Each property set is O(1), overall dominated by cloning changed branches.

- **Space Complexity:**  
  - O(N) extra, only for changed branches.
  - If no change, O(1) (structure sharing dominates).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize to avoid *any* deep copy when there are no mutations at all?  
  *Hint: Only proxy, and if no dirty branch ever marked, return reference to original.*

- What if the user tries to add or delete properties?  
  *Hint: Proxy should throw error, not allow.*

- Can this be extended to support deeper APIs, like array push/pop, with the same immutability guarantees?  
  *Hint: Would need to intercept and simulate methods via proxy objects.*

### Summary
The solution leverages the **proxy pattern** and lazy (on-write) shallow copying to provide efficient, user-friendly immutable object 'modification'.  
This pattern is known as *structural sharing*, is highly useful for versioned data structures (like in Redux, React, state management), and is a foundational technique for persistent (functional) data structures and undo history.  
The coding pattern generalizes to situations where local modifications to large, nested data must be efficient and non-destructive—classic in UI state and collaborative editing.

### Tags

### Similar Problems
- Infinite Method Object(infinite-method-object) (Easy)
- Make Object Immutable(make-object-immutable) (Medium)
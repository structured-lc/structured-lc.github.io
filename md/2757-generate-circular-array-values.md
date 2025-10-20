### Leetcode 2757 (Medium): Generate Circular Array Values [Practice](https://leetcode.com/problems/generate-circular-array-values)

### Description  
Given a **circular** array of integers `arr` and a starting index `startIndex`, implement a generator that yields values from `arr` starting at `startIndex`.  
- On the first call, it yields `arr[startIndex]`.
- On subsequent calls, each call provides an integer `jump`:
    - Move the current index by `jump` positions. Forward if positive, backward if negative.
    - **The array is circular**: moving past the last element wraps to the start, and moving before the first wraps to the end.
    - Yield the value at the new index.

### Examples  

**Example 1:**  
Input: `arr = [1, 2, 3], startIndex = 0`  
Output: `1` → (next(2)) → `3` → (next(1)) → `1`  
*Explanation: First yield arr=1. next(2): (0+2) % 3 = 2 → arr[2]=3. next(1): (2+1) % 3 = 0 → arr=1.*

**Example 2:**  
Input: `arr = [5, 7, 9], startIndex = 2`  
Output: `9` → (next(-1)) → `7` → (next(-2)) → `5`  
*Explanation: First yield arr[2]=9. next(-1): (2-1+3)%3=1 → arr[1]=7. next(-2): (1-2+3)%3=2 → arr[2]=9.*

**Example 3:**  
Input: `arr = [10, 20, 30, 40], startIndex = 1`  
Output: `20` → (next(6)) → `10`  
*Explanation: next(6): (1+6)%4=3 → arr[3]=40, but next must yield arr[ (1+6)%4 ] → arr[3]=40.*

### Thought Process (as if you’re the interviewee)  
- The main challenge is moving the index correctly with wrapping in both directions, especially for negative jumps.
- Brute force: For each jump, repeatedly increment or decrement the index and manually handle boundaries. However, this is unnecessary: modular arithmetic allows constant-time jumps.
- Use `n = len(arr)`, and after any move: `index = (index + jump) % n`. In Python, this handles negative numbers properly — e.g., (-1) % n gives the correct last index.
- The generator must “pause” after each yield, accept the next jump as input, adjust `index`, and yield the next value.
- This is a typical pattern for a generator function with the `.send()` method (or `.next()` passing input).
- Tradeoffs: This approach is O(1) time and space per yield, no extra array storage, only holds `arr`, `n`, and `index`.
- Final choice: Use a generator. Each step uses modulo for circular jumps.

### Corner cases to consider  
- arr has one element (, start=0) — should always return arr no matter the jump.
- Large positive or negative jumps (much larger than len(arr)).
- Jump is zero — should yield the same element again without change.
- Repeated jumps wrap the index multiple times.
- Starting index is not at 0.
- Jump value not provided after the first yield (should handle default jump=0 case precisely).

### Solution

```python
def circular_generator(arr, start_index):
    """
    Generator that yields elements from arr in a circular fashion.
    The first yield returns arr[start_index].
    Each next(jump) call moves 'jump' steps forward (positive) or backward (negative),
    wrapping around the array using modulo.
    """
    n = len(arr)
    index = start_index
    # Yield the first value, no jump applied yet
    jump = 0
    while True:
        # Only apply jump after the first yield
        index = (index + jump) % n
        # Yield arr[index] and wait for value to be sent in (as jump)
        jump = yield arr[index]
        if jump is None:
            jump = 0  # Default to 0 jump if not provided
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) per operation (yield or jump). All mathematical operations and yield are constant time.
- **Space Complexity:** O(1) extra space, as only pointers/index and input array are stored. The function does not use recursion or extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if arr is extremely large (millions of elements) and jump values are also very large?  
  *Hint: Can arithmetic/memory usage be further optimized? Consider modulo properties for large/negative jumps.*

- Could you make this work for two-dimensional circular movement (e.g., on a 2D grid)?  
  *Hint: Think about row and column wrapping, and translate to modular arithmetic in both dimensions.*

- How would this change if the array could be mutated (elements added/removed) while iterating?  
  *Hint: Consider storing length each time, or reacting to changes mid-generator.*

### Summary
This problem is a classic circular array traversal using modular arithmetic.  
The pattern — index wrapping with modulo, generator/yield for lazy evaluation — is powerful for cyclic data structures, periodic queues, or round-robin scheduling.  
This pattern frequently arises in problems involving periodic or infinite-like structures and is a fundamental building block for ring buffers, simulations, and iterator patterns in general.


### Flashcard
Use modular arithmetic (index + jump) % n to handle circular wrapping in both directions for constant-time moves.

### Tags

### Similar Problems

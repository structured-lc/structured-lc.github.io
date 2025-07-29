### Leetcode 975 (Hard): Odd Even Jump [Practice](https://leetcode.com/problems/odd-even-jump)

### Description  
Given an integer array, **arr**, you can start at any index and make jumps to try to reach the end. Jumps alternate between **odd** and **even**, starting with an odd jump.  
- On **odd jumps** (1ˢᵗ, 3ʳᵈ, etc.), you must jump to the smallest index j (j > i) such that arr[j] is the *smallest value* ≥ arr[i]. If there are ties, pick the smallest such j.
- On **even jumps** (2ⁿᵈ, 4ᵗʰ, etc.), you must jump to the smallest index j (j > i) such that arr[j] is the *largest value* ≤ arr[i]. Again, pick the smallest j if there's a tie.

An index is called **good** if, starting from there and following the jump rules, you can reach the end of the array.  
The problem: **Count the number of good starting indices**.

### Examples  

**Example 1:**  
Input: `[10,13,12,14,15]`  
Output: `2`  
*Explanation: Start at index 2 (12): odd jump to 3 (14), even jump to 4 (15). Start at index 3 (14): odd jump to 4 (15).  
Only indices 2 and 3 are good starting points.*

**Example 2:**  
Input: `[2,3,1,1,4]`  
Output: `3`  
*Explanation: Start at 0 (2): odd jump to 1 (3), even jump to 4 (4).  
Start at 1 (3): odd jump to 4 (4).  
Start at 4 (4): already at end (good).*

**Example 3:**  
Input: `[5,1,3,4,2]`  
Output: `3`  
*Explanation: Start at 0 (5): odd jump to 2 (3), even jump to 4 (2).  
Start at 2 (3): odd jump to 3 (4), even jump to 4 (2).  
Start at 3 (4): odd jump to 4 (2).  
Indices 2, 3, 4 are good.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force**:  
  For each index, simulate all possible jumps until you either reach the end or can't jump. This is too slow (O(n²) or worse) because every jump may require scanning the rest of the array.
- **Optimized Approach**:  
  The challenge is to **efficiently find the next possible "odd" or "even" jump** for each index.  
  - For each index, precompute where you'd land for odd/even jumps using sorted data.  
  - Use a **monotonic stack** combined with sorting indices by value (increasing for odd, decreasing for even), so we can fill two arrays: next_higher[i] (for odd jumps) and next_lower[i] (for even jumps).
  - Use **dynamic programming**:  
    - odd[i]: can you reach the end starting with an odd jump from i?  
    - even[i]: can you reach the end starting with an even jump?
    - Both set to True for last index (since already at end).
    - Fill from right to left: For each i, if next_higher[i] exists, odd[i] = even[next_higher[i]]; if next_lower[i] exists, even[i] = odd[next_lower[i]].
  - The answer is the number of indices with odd[i] = True (since our first jump is always odd).

### Corner cases to consider  
- Array of size 1 (trivially good).
- Repeated/equal elements.
- Strictly increasing or strictly decreasing arrays.
- Cases where no jump is possible from a position.
- Ties (multiple indices with the same value). Per rules, must jump to the smallest such index.

### Solution

```python
def oddEvenJumps(arr):
    n = len(arr)
    next_higher = [None] * n
    next_lower = [None] * n

    # Create list of tuples (value, index), sort for odd/even
    indices = list(range(n))

    # For odd jumps (find next higher/equal value), sort by value ascending. Use monotonic stack.
    sorted_idx = sorted(indices, key=lambda i: (arr[i], i))
    stack = []
    for i in sorted_idx:
        while stack and i > stack[-1]:
            prev = stack.pop()
            next_higher[prev] = i
        stack.append(i)

    # For even jumps (find next lower/equal value), sort by value descending.
    sorted_idx = sorted(indices, key=lambda i: (-arr[i], i))
    stack = []
    for i in sorted_idx:
        while stack and i > stack[-1]:
            prev = stack.pop()
            next_lower[prev] = i
        stack.append(i)

    # DP arrays
    odd = [False] * n  # Can reach end with an odd jump from i
    even = [False] * n  # Can reach end with an even jump from i
    odd[-1] = even[-1] = True

    for i in range(n - 2, -1, -1):
        if next_higher[i] is not None:
            odd[i] = even[next_higher[i]]
        if next_lower[i] is not None:
            even[i] = odd[next_lower[i]]

    # The number of good starting indices is the number of odd[i] == True
    return sum(odd)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), because sorting the indices (twice) dominates. All other steps (stack processing and DP) are O(n).
- **Space Complexity:** O(n), for the next_higher, next_lower, odd, even arrays and temporary variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if you needed to print the actual good starting indices?
  *Hint: Add an array to store which indices are good; output their indices.''

- Can you reduce additional space below O(n)?
  *Hint: Consider in-place marking or alternate storage strategies—think about whether DP arrays are strictly necessary for only the count.*

- What if you could jump both forward and backward?
  *Hint: See how jump direction affects the monotonic stack/preprocessing phase.*

### Summary
This problem uses a **dynamic programming with monotonic stack preprocessing** pattern to efficiently answer "next greater or equal" / "next less or equal" queries for each index. This structural pattern is common in range queries and can also be adapted for nearest greater/smaller element problems or competitive programming jump games. The DP step is similar to "can reach the end from this state?" as in classic reachability/jump game kinds of problems.
### Leetcode 2659 (Hard): Make Array Empty [Practice](https://leetcode.com/problems/make-array-empty)

### Description  
Given an array of **distinct** integers, you can perform two operations until the array is empty:
- If the **first element** is the *smallest* in the current array, remove it.
- Otherwise, move the **first element** to the end of the array.

Return the **number of operations** required to make the array empty.

### Examples  

**Example 1:**  
Input: `nums = [3,4,-1]`,  
Output: `5`  
*Explanation:  
Step 1: [3,4,-1] → 3 isn't the smallest (−1 is). Move 3 to end: [4,−1,3]  
Step 2: [4,−1,3] → 4 isn't the smallest. Move 4 to end: [−1,3,4]  
Step 3: [−1,3,4] → −1 is smallest. Remove it: [3,4]  
Step 4: [3,4] → 3 is smallest. Remove it: [4]  
Step 5: [4] → 4 is smallest. Remove it: []*

**Example 2:**  
Input: `nums = [1,2,3]`,  
Output: `3`  
*Explanation:  
Step 1: [1,2,3] → 1 is smallest. Remove it: [2,3]  
Step 2: [2,3] → 2 is smallest. Remove it: [3]  
Step 3: [3] → 3 is smallest. Remove it: []*

**Example 3:**  
Input: `nums = [2,3,1]`,  
Output: `5`  
*Explanation:  
Step 1: [2,3,1] → 2 isn’t the smallest (1 is). Move 2 to end: [3,1,2]  
Step 2: [3,1,2] → 3 isn’t the smallest. Move 3 to end: [1,2,3]  
Step 3: [1,2,3] → 1 is smallest. Remove it: [2,3]  
Step 4: [2,3] → 2 is smallest. Remove it: [3]  
Step 5: [3] → 3 is smallest. Remove it: []*

### Thought Process (as if you’re the interviewee)  

- **Naive Idea:** Simulate the process by checking the first element, rotating if it's not the smallest, and repeat until empty.  
  However, each rotation is O(n), and with up to n² operations, this solution is too slow for larger inputs.

- **Optimized Approach:**  
  Since every time we remove the current minimum, the array "rotates forward," and the challenge is to count how many effective moves (rotations and removals) are needed for each smallest value in increasing order.

  - Since elements are distinct, we can note their indices. 
  - Process the array in the order of increasing element value. For each such minimum, compute the current location (after previous removals), and count the number of steps forward to reach it.
  - As indices shift after each removal, the problem becomes equivalent to counting the number of elements before the current index among elements *not yet removed*. 

  Use a **Binary Indexed Tree (Fenwick Tree)** or a SortedList to maintain removal counts and efficiently compute the operations needed for each minimum.

- Ultimately, for each minimum value in increasing order, we:
  - Compute how many elements are skipped to reach it,
  - Remove it,
  - Sum up all move and remove costs.

  This approach is O(n log n).

### Corner cases to consider  
- Empty array: Should instantly return 0.
- Single element: Only one removal needed.
- Already sorted ascending: Each removal happens with no extra moves.
- Already sorted descending: Each removal needs maximal moves.
- Negative numbers/minimum at various positions.

### Solution

```python
def countOperationsToEmptyArray(nums):
    # Map value to its current index in the array
    index_map = {val: idx for idx, val in enumerate(nums)}
    n = len(nums)
    ans = 0
    # To keep track of elements removed so far, for quick prefix counts
    class BIT:
        def __init__(self, n):
            self.n = n + 2  # 1-based
            self.tree = [0] * (self.n)
        def update(self, idx, val):
            idx += 1
            while idx < self.n:
                self.tree[idx] += val
                idx += idx & -idx
        def query(self, idx):
            idx += 1
            res = 0
            while idx > 0:
                res += self.tree[idx]
                idx -= idx & -idx
            return res

    bit = BIT(n)
    pos = 0  # Current (virtual) front of the array
    # Iterate by increasing num value
    for val in sorted(nums):
        idx = index_map[val]
        # Calculate real position in current array (accounting for removals)
        k = (idx - pos + n) % n
        removed_before = bit.query((idx - 1 + n) % n)
        to_skip = (k - removed_before + n) % n
        ans += to_skip + 1  # moves + remove itself
        bit.update(idx, 1)
        pos = (idx + 1) % n
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)
  - Sorting the array: O(n log n)
  - Each BIT update/query: O(log n), done n times.
- **Space Complexity:** O(n)
  - Extra maps and BIT data structure.

### Potential follow-up questions (as if you’re the interviewer)  

- How does your solution handle arrays with non-distinct elements?
  *Hint: Which parts of the algorithm break if duplicates appear?*

- Can you reduce the space complexity?
  *Hint: Is it necessary to store operations for all possible indices?*

- What if instead of moving first to last, you can move it to any position?
  *Hint: How does this change optimal strategy or data structure used?*

### Summary
This problem utilizes the *Simulation* and *Order Statistics* pattern, commonly involving Fenwick/BIT or balanced BSTs for efficient removal and range count queries. Variants arise in problems requiring k-th removal, permutation operations, or rotation order, useful for understanding order statistics and interval removal strategies.
### Leetcode 2113 (Medium): Elements in Array After Removing and Replacing Elements [Practice](https://leetcode.com/problems/elements-in-array-after-removing-and-replacing-elements)

### Description  
Given an array **nums** of length n, the array undergoes the following infinite process:
- Starting at minute 0, each minute one element is removed from the front (leftmost) until the array is empty after n minutes.
- Then, each subsequent minute, one element (in the same order they were removed) is appended to the end, restoring the array back to its original form after 2n minutes.
- This cycle repeats forever.
Given several queries each as (**time, index**), for each query, return the value at that array index at that specific minute. If index is out of bounds at that minute, return -1.

### Examples  

**Example 1:**  
Input:  
nums = `[1,2,3,4]`, queries = `[[0,1],[1,1],[3,0],[2,1]]`  
Output:  
`[2,3,1,4]`  
Explanation:  
- (0,1): No removal yet. Index 1 is 2.
- (1,1): 1 element removed, array is [2,3,4]. Index 1 is 3.
- (3,0): 3 removed, array is [4]. Index 0 is 4.
- (2,1): 2 removed, array is [3,4]. Index 1 is 4.

**Example 2:**  
Input:  
nums = `[5]`, queries = `[[0,0],[1,0],[2,0],[2,1],[3,0]]`  
Output:  
`[5,-1,5,-1,5]`  
Explanation:  
- (0,0): [5], index 0 is 5.
- (1,0): Array is [], index 0 is out of bounds, return -1.
- (2,0): [5] is being rebuilt, index 0 is 5.
- (2,1): [5], index 1 out of bounds, return -1.
- (3,0): [5] is restored again, index 0 is 5.

**Example 3:**  
Input:  
nums = `[7,8,9]`, queries = `[[4,0],[0,2],[5,1]]`  
Output:  
`[-1,9,8]`  
Explanation:  
- (4,0): Removing phase, after 4 mins: [] (empty), index 0 out -1.
- (0,2): [7,8,9], index 2 is 9.
- (5,1): Re-adding phase, after 5 mins: , index 1 out -1; wait, this could be off-by-one: let's confirm below.


### Thought Process (as if you’re the interviewee)  
First, I recognize the process is *cyclic* with each full cycle lasting 2n minutes (n to remove all, then n to restore all). At any given query time, we can map the time back into its cycle using `time % (2×n)`.

- For time `t` in `[0, n)`: Removing elements, length = n - t. Remaining: `nums[t:]`.
- For time `t` in `[n, 2n)`: Adding phase, length = t - n + 1, array contains first `t-n+1` of `nums` at the back in order of removal.

For a query (`t`, `idx`):
- If in removing phase: idx < n - t ⇒ answer is `nums[t + idx]`, else -1.
- If in adding phase: idx < t - n + 1 ⇒ answer is `nums[idx]`, else -1.

This O(1) per query, no simulation necessary.

Trade-off: No extra storage, uses math to find the state at any time.


### Corner cases to consider  
- Queries at exact removal-restoration boundaries (`t = n-1`, `t = n`, `t = 2n-1`, `t = 2n`)
- Index out of bounds at any key removal moment
- Single-element arrays
- Queries far past the initial cycle (very large times)
- Queries for negative indices (if allowed)


### Solution

```python
def elementInNums(nums, queries):
    # Length of the starting array
    n = len(nums)
    res = []
    for t, idx in queries:
        # Place time in its cycle
        t_mod = t % (2 * n)
        if t_mod < n:
            # Removal phase
            if idx < n - t_mod:
                # The array starts at nums[t_mod], so desired value is nums[t_mod + idx]
                res.append(nums[t_mod + idx])
            else:
                res.append(-1)
        else:
            # Restoration phase
            add_len = t_mod - n + 1
            if idx < add_len:
                # Array is being rebuilt left-to-right, take from nums in order
                res.append(nums[idx])
            else:
                res.append(-1)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(q), where q is the number of queries. Each is answered in O(1) via math and mod.
- **Space Complexity:** O(q) for the output list; no extra auxiliary structures are needed.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle updates to the array during the process?  
  *Hint: Would need to track a “current” state or version; precompute not feasible.*

- Can this be generalized for k removals or variable removal counts each cycle?  
  *Hint: Analyze how the length and index mapping would change if the removal/addition was more complex.*

- What if queries are extremely large in count—can you batch process or parallelize?  
  *Hint: Consider distributing by query blocks, since queries are independent.*

### Summary
This problem uses a **cyclic math/indexing pattern** to avoid brute-force simulation for time-dependent transformations. Recognizing the 2n-period of the cycle and direct mapping of each query lets us handle each in O(1) time, a strategy common in periodic array simulation and ring buffer problems. This can be applied to similar problems involving “state after t steps” in a repetitive process.


### Flashcard
Map query time t to its phase in the 2n cycle; compute the array state and answer based on whether in removal or restoration phase.

### Tags
Array(#array)

### Similar Problems

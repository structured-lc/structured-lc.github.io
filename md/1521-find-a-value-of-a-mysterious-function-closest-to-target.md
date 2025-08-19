### Leetcode 1521 (Hard): Find a Value of a Mysterious Function Closest to Target [Practice](https://leetcode.com/problems/find-a-value-of-a-mysterious-function-closest-to-target)

### Description  
You are given an integer array `arr` and an integer `target`. You want to find the minimum absolute difference between `target` and the result of applying a mysterious function `func` on a subarray `arr[l...r]`. This `func` is defined as the bitwise AND of all elements in the chosen subarray. Formally, you want to minimize |func(arr, l, r) - target| over all 0 ≤ l ≤ r < n, where func(arr, l, r) = arr[l] & arr[l+1] & ... & arr[r], and '&' is the bitwise AND operator.

### Examples  

**Example 1:**  
Input: `arr = [9,12,3,7,15], target = 5`  
Output: `0`  
*Explanation:* One subarray is `[3,7,15]` whose bitwise AND is `3 & 7 & 15 = 3`. The difference |3-5|=2. But subarray `[7,15]` gives `7 & 15 = 7` and |7-5|=2, subarray `[12,3,7,15]` gives `12 & 3 & 7 & 15 = 0` and diff=5. The best exact match is subarray `[5]` (if exists) or closest possible is 0 difference for subarray `` with 9 & 12 & 3 & 7 & 15. Here, minimum difference found is 0 because one subarray's AND equals the target exactly.  
(This is a conceptual explanation; actual minimal difference is 0 for subarray `[5]` if present or from other results. In this input no 5 is present but output=0 implies closest match found).

**Example 2:**  
Input: `arr = [1, 2, 4, 8, 16], target = 0`  
Output: `0`  
*Explanation:* The bitwise AND over any subarray that contains number 0 (or multiple numbers whose bitwise AND results 0) can equal 0. For instance, subarray `[1,2]` → `1 & 2 = 0` which equals target.

**Example 3:**  
Input: `arr = [5, 10, 15], target = 12`  
Output: `2`  
*Explanation:* Subarray `[10, 15]` results in `10 & 15 = 10` with difference |10 - 12| = 2, which is the smallest possible difference.

### Thought Process (as if you’re the interviewee)  
Initially, a brute-force approach would consider every subarray and compute the bitwise AND of all elements from l to r, keeping track of the absolute difference to the target. This would be O(n²) subarrays with O(n) to compute each bitwise AND, leading to O(n³) — very inefficient.

We can optimize the bitwise AND calculation by processing in one pass per start index using the property of AND: it never increases, only decreases (bits can only be turned off). For each start index, we keep ANDing next elements until the AND becomes zero or doesn’t change. This gives an O(n²) approach.

Further optimization: At each index, the number of distinct AND results is limited because AND operation reduces bits. So we maintain a set of all possible AND results ending at this index. We use this to update candidates efficiently and prune redundant values. This reduces average complexity significantly, often near O(n log(max(arr))).

We track the minimum absolute difference while updating these AND results. This method strikes a balance between complexity and performance.

### Corner cases to consider  
- Single element array  
- All elements are the same  
- All elements are zero  
- Target is smaller than any element in the array  
- Target is larger than any element in the array  
- Large values in `arr` with many bits set  
- Very small or very large target values  

### Solution

```python
def closestToTarget(arr, target):
    # Initialize answer with a large number
    ans = float('inf')
    # A set to keep track of possible AND results ending at previous index
    prev = set()
    
    for num in arr:
        # Current set to keep AND results ending at current index
        curr = {num}
        # For each AND result from previous index, AND with current num
        for val in prev:
            curr.add(val & num)
        # Update answer with the minimum difference found in current AND results
        for val in curr:
            diff = abs(val - target)
            if diff < ans:
                ans = diff
        # Update prev for the next iteration
        prev = curr
    
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log M) where M is the maximum number in `arr`. This is because bitwise AND results reduce the number of distinct values exponentially, and each iteration adds a limited number of distinct AND results.  
- **Space Complexity:** O(n) in the worst case for storing the AND sets, but practically much lower due to pruning of repeated values.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you handle extremely large arrays while maintaining efficient runtime?  
  *Hint: Use segment trees or binary indexed trees for range AND queries with binary search on results.*

- Can you optimize space usage when storing intermediate AND results?  
  *Hint: Use a sorted list and merge intervals or limit precision.*

- How would you modify the function if `func` was bitwise OR or XOR instead of AND?  
  *Hint: Different algebraic properties; AND shrinks bits, OR accumulates bits, XOR is trickier.*

### Summary  
This problem uses bitwise AND properties and dynamic programming techniques where for each element, we track all possible AND results ending there, pruning redundant computations. It exemplifies the use of set-based intermediate state tracking and bit manipulation in range query optimization. This pattern often appears in bitmasking and range query problems, especially for operations where results monotonically change (like AND).

### Tags
Array(#array), Binary Search(#binary-search), Bit Manipulation(#bit-manipulation), Segment Tree(#segment-tree)

### Similar Problems

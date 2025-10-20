### Leetcode 2826 (Medium): Sorting Three Groups [Practice](https://leetcode.com/problems/sorting-three-groups/)

### Description  
You are given a 0-indexed array `nums` of length n, where each element is 1, 2, or 3. Each value represents that index’s group. You can change any element’s group (set `nums[i]` to 1, 2, or 3) in one operation.  
Your goal is to make the array **"beautiful"**:  
- If you sort the numbers within each group, then concatenate groups 1, 2, and 3 in order ("group 1", "group 2", then "group 3"), the result must be **non-decreasing**.

Find the minimum number of operations to achieve this.

### Examples  

**Example 1:**  
Input: `nums = [2,1,3,2,1]`  
Output: `3`  
Explanation: Change indices 0 (2→1), 2 (3→1), and 3 (2→1) to group 1. After changes: `[1,1,1,1,1]`, which is non-decreasing.

**Example 2:**  
Input: `nums = [1,3,2,1,3,3]`  
Output: `2`  
Explanation: Remove `nums[1]=3` and `nums[2]=2` (or, equivalently, change their group). The remaining array `[1,1,3,3]` is non-decreasing.

**Example 3:**  
Input: `nums = [2,2,2,2,3,3]`  
Output: `0`  
Explanation: Already non-decreasing, so no operations needed.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try every possible assignment of groups, but there are 3ⁿ possibilities. Too slow.
- **Observation:**  
  - The problem becomes finding the minimum number of changes to arrange nums into three (possibly empty) segments — all 1s, then all 2s, then all 3s.
  - This is equivalent to finding the minimum number of elements to change so that the final array is partitioned as:  
    [segment of 1s][segment of 2s][segment of 3s]  
    and is non-decreasing.
- This is a classic **multi-group partition with minimal changes** problem.
- **Dynamic Programming:**  
  - For each position, decide which group (1/2/3) it should be, ensuring group order is non-decreasing.
  - Define `dp[i][g]` as the min operations to process first i elements, ending with group ≤ g at iᵗʰ position.
  - For each i and for each possible group assigned (1, 2, 3), consider transitions from previous group ≤ current group.
  - Finally, overall answer is `min(dp[n][1], dp[n][2], dp[n][3])`.

### Corner cases to consider  
- Input array length 0 or 1
- All elements already non-decreasing
- All elements in same group
- Long segments of a single group in the middle
- Switching group at the edge (first or last element)
- Examples where one or more groups are empty

### Solution

```python
def minimumOperations(nums):
    n = len(nums)
    # dp[i][g]: min ops to arrange nums[:i] ending with group g (g in {1,2,3})
    # dp[0][*] = 0 (empty prefix needs 0 changes)
    dp = [[float('inf')] * 4 for _ in range(n+1)]
    for g in range(1, 4):
        dp[0][g] = 0

    for i in range(1, n+1): # positions 1..n (so nums[i-1])
        for g in range(1, 4): # end current with group g
            for prev_g in range(1, g+1): # previous group ≤ current for non-decreasing
                cost = 0 if nums[i-1] == g else 1
                dp[i][g] = min(dp[i][g], dp[i-1][prev_g] + cost)

    return min(dp[n][1], dp[n][2], dp[n][3])
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n \* 3^2) = O(n). For each position (n), there are 3 current groups, and for each, try up to 3 previous groups.
- **Space Complexity:** O(n). Extra storage for `dp` array (size (n+1) × 3).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this in O(1) space?
  *Hint: You only need DP for previous iteration to update current.*

- Can you extend this for k groups?
  *Hint: Generalize DP to k.*

- Can you output one possible assignment (not just count)?
  *Hint: Store backtrack pointers in DP.*

### Summary
This problem is a classic **multi-group partition DP**: partition the array into at most 3 groups in order, with minimal changes. The DP approach here (with group tracking) is a common trick for sequence and interval DP — it appears in problems like minimum changes to monotonic arrays, k-partition problems, and is widely useful for interview DP practice.


### Flashcard
DP over partitioning nums into three non-decreasing segments (1s, 2s, 3s); minimum changes = n – longest non-decreasing subsequence using values {1,2,3}.

### Tags
Array(#array), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming)

### Similar Problems

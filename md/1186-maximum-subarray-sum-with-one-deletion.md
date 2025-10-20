### Leetcode 1186 (Medium): Maximum Subarray Sum with One Deletion [Practice](https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion)

### Description  
Given an array of integers, find the maximum sum of any non-empty contiguous subarray, where you may optionally delete at most one element from the subarray. The subarray must remain non-empty after the possible deletion. Your task is to return the highest possible sum achievable in this way.  
Put simply: you’re allowed to remove one (and at most one) element while forming the subarray sum, but can also choose not to delete anything if that’s optimal.

### Examples  

**Example 1:**  
Input: `arr = [1, -2, 0, 3]`  
Output: `4`  
*Explanation: Take the full array, delete -2, which gives `[1, 0, 3]`, sum is 4. This is higher than any subarray sum without deletion.*

**Example 2:**  
Input: `arr = [1, -2, -2, 3]`  
Output: `3`  
*Explanation: No deletion needed, just pick `[3]` for a sum of 3, which is the best possible.*

**Example 3:**  
Input: `arr = [-1, -1, -1, -1]`  
Output: `-1`  
*Explanation: Since all numbers are negative, deleting any won’t help. Picking any single element (e.g., `[-1]`) yields the maximum sum possible.*

### Thought Process (as if you’re the interviewee)  
Brute-force would be to check all subarrays, and for each, try deleting each possible element and track the best sum. This is O(n³), and clearly too slow.

Next, recall Kadane’s algorithm for maximum subarray sum (no deletions). Here, we need to extend this:  
- For each position, we want to track two things:  
  - Maximum sum ending at i **without** any deletion so far.  
  - Maximum sum ending at i **where one deletion has occurred** (i.e., we *skip* this iᵗʰ element).

This allows us to use dynamic programming – for each position, we use the previous bests to either extend or start anew. At each index, we can:
- Not delete at all: continue the previous subarray or start fresh (classic Kadane).
- Have deleted one somewhere: either continue after a previous deletion, or delete the current element (thus, take the best so far without any deletion at i-1).

We keep global maximum across all positions.  
This DP can be done in O(n) time and O(1) extra space if done carefully.

### Corner cases to consider  
- All negative numbers (deletion might not help).
- Single-element array (can’t delete, as result would be empty).
- Arrays with zeros.
- Best sum requires not deleting anything.
- Deletion at the first or last element.
- Duplicate numbers.

### Solution

```python
def maximumSum(arr):
    n = len(arr)
    # Track max sum so far without deletion and with one deletion
    max_end_here = arr[0]      # max sum subarray ending at i (no deletion)
    max_del_end_here = float('-inf')  # max sum ending at i (with one deletion)
    result = arr[0]

    for i in range(1, n):
        # Update max_del_end_here:
        # Option 1: delete current arr[i] => take max_end_here so far (i.e., delete arr[i])
        # Option 2: extend previous "with one deletion" subarray
        max_del_end_here = max(max_end_here, max_del_end_here + arr[i])

        # Update max_end_here (classic Kadane's)
        max_end_here = max(arr[i], max_end_here + arr[i])

        # Track global result
        result = max(result, max_end_here, max_del_end_here)

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  We process each element once, updating two variables per iteration.
- **Space Complexity:** O(1).  
  Only constant extra space is used for the DP variables; we do not use any auxiliary arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you return the actual subarray (with indices) achieving the maximum sum?  
  *Hint: Try to track the starting and ending indices as you update subarray sums, similar to how you extend Kadane’s algorithm to recover the range.*

- What if up to k deletions are allowed?  
  *Hint: Try to generalize your DP to track best sums with k, k-1, ..., 0 deletions at every position.*

- How would you do this if the array is very large (streaming, or doesn't fit in memory)?  
  *Hint: Try to use a sliding window or online approach using only O(1) state.*

### Summary
This problem extends the **Kadane’s maximum subarray** pattern to allow a single element deletion, handled by keeping two DP variables: one for "no deletions yet" and another for "already deleted". This dual-tracking DP is a powerful pattern for variations of the subarray sum problem, and generalizes well for problems involving one or more skips or deletions. Commonly appears as an interview test of “modifying classic DP.”


### Flashcard
Track max subarray sum ending at i with 0 or 1 deletion—extend Kadane’s algorithm with two states.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Maximize Subarray Sum After Removing All Occurrences of One Element(maximize-subarray-sum-after-removing-all-occurrences-of-one-element) (Hard)
- Maximum Unique Subarray Sum After Deletion(maximum-unique-subarray-sum-after-deletion) (Easy)
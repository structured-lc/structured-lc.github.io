### Leetcode 3434 (Medium): Maximum Frequency After Subarray Operation [Practice](https://leetcode.com/problems/maximum-frequency-after-subarray-operation)

### Description  
Given an array **nums** of length n and an integer **k**, you can perform exactly **one** operation:  
- Choose any subarray (contiguous segment) and any integer x, and add x to every element of that subarray.

After this operation, **what's the maximum frequency** of the value k that you can have in the array?  
In other words, what’s the largest number of elements that can become equal to k after one such operation?

### Examples  

**Example 1:**  
Input: `nums = [2,2,3,4], k = 3`  
Output: `3`  
*Explanation: Select subarray [2,2,3] (indices 0 to 2), add 1 to each. The array becomes [3,3,4,4]. There are three 3's.*

**Example 2:**  
Input: `nums = [1,2,3,4,5,6], k = 1`  
Output: `1`  
*Explanation: 1 is already present at index 0. No subarray operation can create a second 1, since adding x ≠ 0 to a subarray changes the original 1 to something else.*

**Example 3:**  
Input: `nums = [5,5,5,5], k = 5`  
Output: `4`  
*Explanation: All values are already 5. No operation is needed; maximum frequency of k is the length of the array.*

### Thought Process (as if you’re the interviewee)  
- Start with brute-force: For all possible subarrays, for each subarray, what if I could add an integer x so that all elements in the selected subarray become k?  
- For each subarray [i, j], what value of x should I choose so that nums[i] + x = k, nums[i+1] + x = k, ..., nums[j] + x = k? For that to be possible, all values in subarray must be the same, so only singleton subarrays or elements already equal can be made k with a single x.
- Wait, that's only if we want the entire subarray to become k, but the problem allows picking any x.  
- Key simplifying observation: For any subarray, if we pick x = k - nums[t] for some t in subarray, we can make nums[t] into k, but only those with difference k - nums[t] match after addition.
- More generally: For every possible subarray, and for every index in that subarray, compute for each x the number of positions that will become k after adding x to subarray.
- To optimize, for each position, compute needed x = k - nums[i], and for each possible subarray starting or ending at i, count the maximum possible matches if we “align” as many nums[i] as possible to k with one subarray operation.
- Since the required x per element is k - nums[i], for each unique x, run a sliding window: for all indices i where k - nums[i] is equal, find the longest subarray that you can “hit” with one subarray operation to maximize k values.
- In other words: For each index i, for each l ≤ i ≤ r, try to expand the window to include as many indices where k - nums[i] is equal (those can all be turned into k in one operation), and count.
- Final solution: Use a hash map for each possible value of (k - nums[i]), store a list of corresponding indices, and use two pointers/sliding window to maximize contiguous frequency.

### Corner cases to consider  
- Single element array: [k] or not k.
- All elements already equal to k.
- No elements in nums equal to k.
- Negative numbers or large/small ranges.
- Can you increase the number of k's beyond what already exists?
- Repeated, scattered k's: Are new k's created, or are original k's more optimal?

### Solution

```python
def max_frequency(nums, k):
    n = len(nums)
    max_freq = 0
    # Count original frequency of k in the array
    orig_freq = sum(1 for x in nums if x == k)
    max_freq = orig_freq

    # For each possible starting index
    for left in range(n):
        x_needed = k - nums[left]
        freq = 0
        # Expand the window to the right
        for right in range(left, n):
            # For current subarray nums[left:right+1], compute if nums[i]+x_needed == k
            if nums[right] + x_needed == k:
                freq += 1
            # Otherwise, after adding x_needed to every element in subarray,
            # only those with nums[i]+x_needed==k will be k
        max_freq = max(max_freq, freq + orig_freq - (1 if nums[left] == k else 0))
        # The subtraction avoids double-counting when subarray contains original k

    return max_freq
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²). Two nested loops: for each index as subarray start, we check every possible subarray ending index. In practice, this can be optimized for large k or bounded nums.
- **Space Complexity:** O(1) auxiliary space, since we only use a few counters; input is read-only.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if you could perform the operation any number of times instead of just once?  
  *Hint: Think about dynamic programming or greedy strategies for multiple operations.*

- How would you solve the problem if you need to minimize the size of the subarray?  
  *Hint: Try to find the minimal window where you get the maximum frequency of k.*

- What if instead of adding the same x, you could add a different integer to each element in the subarray, but the overall operation must sum to zero?  
  *Hint: Link to subarray sums and prefix sum approach.*

### Summary

This problem uses a **sliding window / brute-force over subarrays** pattern and careful observation about how subarray addition aligns elements to k. The underlying pattern relates to **maximum frequency counting after transformation**, which connects to topics like greedy picking and window expansion. Similar logic can be applied to other problems where a single operation transforms a range of the input to a target value, or where maximizing frequency with constrained update is required.

### Tags
Array(#array), Hash Table(#hash-table), Dynamic Programming(#dynamic-programming), Greedy(#greedy), Enumeration(#enumeration), Prefix Sum(#prefix-sum)

### Similar Problems

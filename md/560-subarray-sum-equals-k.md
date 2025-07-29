### Leetcode 560 (Medium): Subarray Sum Equals K [Practice](https://leetcode.com/problems/subarray-sum-equals-k)

### Description  
Given an integer array, **nums**, and an integer **k**, find the total number of **contiguous subarrays** whose sum is exactly **k**.  
A subarray is a *continuous*, non-empty sequence of elements inside the array.  
You need to return the count of such subarrays.

### Examples  

**Example 1:**  
Input: `nums = [1, 1, 1]`, `k = 2`  
Output: `2`  
*Explanation: There are two subarrays that sum to 2: `[1,1]` (the first two), and `[1,1]` (the last two.)*

**Example 2:**  
Input: `nums = [1, 2, 3]`, `k = 3`  
Output: `2`  
*Explanation: Subarrays are `[1,2]` and `[3]`.*

**Example 3:**  
Input: `nums = [1, 0, 1, 2, 1, 0, 4, 1, 3]`, `k = 4`  
Output: `8`  
*Explanation: There are eight subarrays with sum 4, e.g., `[1,0,1,2]`, `[2,1,0,1]`, `[4]`, etc.*

### Thought Process (as if you’re the interviewee)  

Start with the **brute-force** approach:  
- For every starting index, try every possible ending index and compute the sum of the subarray.
- Count whenever sum equals k.
- This approach checks all possible subarrays, so time complexity is O(n²), where n = len(nums).  
- Not efficient for large arrays, but easy to write.

To **optimize**, notice that recalculating sums is wasteful.  
Let’s use **prefix sums**. For each `j`, the sum of the subarray `nums[i...j]` is `prefix[j+1] - prefix[i]`. But keeping a full prefix array and searching through it is still O(n²).  
We want O(n) time.

Let’s think in terms of running sum and a **hashmap**.  
- As we traverse the array, we keep a running sum (call it `current_sum`).
- At each index, we want to find how many times `current_sum - k` has occurred *so far*.
- If `current_sum - k` was previously seen, there exist those many subarrays ending at the current index that sum up to k.
- We use a dict (hashmap) to keep track of all previously seen prefix sums and their counts.

Initialize the hashmap with `{0: 1}` to handle the subarray that starts at index 0.

**Why use this approach?**  
- Hashmap lookup is O(1).
- We only do one pass through the array (O(n)).
- Proven, efficient for large arrays.

### Corner cases to consider  
- Empty array: `nums=[]`
- Array with all zeros, and k=0
- Negative numbers in nums
- nums has only one element (equal to k / not equal to k)
- Multiple overlapping subarrays with sum = k
- Large positive and negative values
- Subarray starts at index 0

### Solution

```python
def subarraySum(nums, k):
    # Dictionary to store the count of prefix sums
    prefix_count = {0: 1}
    current_sum = 0
    result = 0
    
    # Loop over each element
    for num in nums:
        current_sum += num
        
        # If there exists a prefix_sum where current_sum - prefix_sum == k
        if current_sum - k in prefix_count:
            result += prefix_count[current_sum - k]
        
        # Update the count of current_sum in the dictionary
        if current_sum in prefix_count:
            prefix_count[current_sum] += 1
        else:
            prefix_count[current_sum] = 1
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each element is processed once, and all dict operations (lookup, insert) are O(1) on average.

- **Space Complexity:** O(n)  
  In the worst case, the prefix_count dictionary could store a new prefix sum for every element (e.g., strictly increasing array).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array contains only positive numbers?  
  *Hint: Can we optimize with two pointers since integers are always positive?*

- Can we extend this to a 2D matrix to count submatrices that sum to k?  
  *Hint: Adapt the 1D prefix sum idea across rows or columns.*

- What if we need to return the actual subarrays, not just the count?  
  *Hint: You may need to store start indices along with the prefix sums.*

### Summary
This problem uses the **Prefix Sum + Hashmap** sliding window pattern to count subarrays with a specific sum in O(n) time. It's a very standard, highly reusable pattern, especially when dealing with subarrays and required sums.  
Similar techniques are broadly used in: finding longest/shortest subarray with target sum, zero sum subarrays, and even for multidimensional matrix problems.
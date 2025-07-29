### Leetcode 2044 (Medium): Count Number of Maximum Bitwise-OR Subsets [Practice](https://leetcode.com/problems/count-number-of-maximum-bitwise-or-subsets)

### Description  
Given an integer array nums, find the maximum value achievable by any non-empty subset using the bitwise OR operation. Then, count how many non-empty subsets produce this maximum value. Each subset is defined by indices picked from nums; subsets using different indices are considered distinct, even if the values are the same.

### Examples  

**Example 1:**  
Input: `nums = [3,1]`  
Output: `2`  
*Explanation: The possible non-empty subsets are [3], [1], and [3,1]. Their bitwise ORs are 3, 1, and 3, respectively. The maximum OR is 3, achieved by [3] and [3,1], so the answer is 2.*

**Example 2:**  
Input: `nums = [2,2,2]`  
Output: `7`  
*Explanation: All non-empty subsets of three 2s have an OR of 2. There are 2³ - 1 = 7 non-empty subsets, all with the maximum OR of 2, so the answer is 7.*

**Example 3:**  
Input: `nums = [3,2,1,5]`  
Output: `6`  
*Explanation: The maximum OR is 7 (3|2|1|5). There are 6 subsets resulting in an OR of 7: [3,2,1,5], [3,2,5], [3,1,5], [2,1,5], [3,5], and [2,5].*


### Thought Process (as if you’re the interviewee)  
I need to find all non-empty subsets of nums, calculate the bitwise OR for each, and count how many reach the maximum possible OR.  
- **Brute-force:** Since nums can have up to 16 elements, there are 2ⁿ possible subsets (at most 65536), so brute-force is acceptable.  
  - For each subset (using a bitmask), compute the bitwise OR.
  - Track the maximum OR found and count how many subsets achieve it.

- Is there a shortcut?  
  - The global maximum OR is simply OR-ing all elements together.  
  - Subsets that don't include critical elements may not reach maximum; I still need to enumerate all subsets to check for which ones do.

- Complexity is manageable due to n ≤ 16.  
  - I will use a simple backtracking/DFS or bitmasking loop over all subsets.

Trade-offs:
- DFS/backtracking is simple and intuitive; bitmasking is usually faster for this fixed n.
- Both approaches work; I will proceed with bitmask enumeration for code clarity and speed.

### Corner cases to consider  
- Single element array, e.g., , expect 1 subset.
- All elements the same, e.g., [5,5,5].
- Elements with significant overlap, e.g., [1,2,3].
- Minimum (n=1) and maximum (n=16) input sizes.
- Large values near 10⁵.

### Solution

```python
def countMaxOrSubsets(nums):
    n = len(nums)
    max_or = 0

    # Compute the maximum possible bitwise OR
    for num in nums:
        max_or |= num

    count = 0

    # Enumerate all non-empty subsets using bitmasking
    for mask in range(1, 1 << n):  # 1 to 2^n - 1 (skip empty subset)
        subset_or = 0
        for i in range(n):
            if (mask >> i) & 1:
                subset_or |= nums[i]
        if subset_or == max_or:
            count += 1

    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ × n), since we consider every non-empty subset (2ⁿ-1 masks), and for each subset, we potentially check each of the n elements to compute the OR.
- **Space Complexity:** O(1) extra, apart from the input, as we just track numbers and simple counters (no recursion/storage).

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if n was up to 20 or 25?
  *Hint: Is there a way to prune unhelpful branches or use memoization to speed up repeated OR computations?*

- If the elements can be negative or zero, does it affect the result?
  *Hint: Investigate how bitwise OR behaves with negative or zero inputs.*

- Instead of counting subsets, can you return the list of indices for each maximum OR subset?
  *Hint: Modify your loop to store masks or lists, not just count.*

### Summary
This problem is a classic **subsets enumeration + bit manipulation** task.  
Since n is small, bitmasking is a simple and efficient way to try every subset.  
This approach and pattern frequently appear in combinatorial search/interview problems—counting or optimizing subsets, testing with masks, and performing quick stateful computations.  
Common applications: subset sum/counting problems, finding subset properties, combinatorial search.
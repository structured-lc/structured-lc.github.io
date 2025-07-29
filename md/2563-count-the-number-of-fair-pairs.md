### Leetcode 2563 (Medium): Count the Number of Fair Pairs [Practice](https://leetcode.com/problems/count-the-number-of-fair-pairs)

### Description  
Given an integer array `nums` and two integers `lower` and `upper`, count the number of "fair pairs" in the array.  
A fair pair is defined as a pair of indices (i, j) such that:
- 0 ≤ i < j < n (they are distinct indices, ordered)
- lower ≤ nums[i] + nums[j] ≤ upper (their sum falls within the provided range, inclusive)

Return the total number of such pairs in the array.

### Examples  

**Example 1:**  
Input: `nums = [0,1,7,4,4,5]`, `lower = 3`, `upper = 6`  
Output: `6`  
*Explanation: The six fair pairs by index are (0,3):0+4=4, (0,4):0+4=4, (0,5):0+5=5, (1,3):1+4=5, (1,4):1+4=5, (3,4):4+4=8 (not in range), (3,5):4+5=9 (not in range), (4,5):4+5=9 (not in range). So only pairs ending at index 5 with sum ≤ 6 are valid.*

**Example 2:**  
Input: `nums = [2,3,1,0]`, `lower = 3`, `upper = 4`  
Output: `2`  
*Explanation: Fair pairs are (0,2):2+1=3 and (1,3):3+0=3.*

**Example 3:**  
Input: `nums = [5,5,5,5]`, `lower = 10`, `upper = 10`  
Output: `6`  
*Explanation: Every pair of different indices will sum to 10 (since 5+5=10), so total pairs C(4,2)=6.*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach checks all 0 ≤ i < j < n and counts if the sum lies in [lower, upper]. This is O(n²), which will not scale for larger n.
- To optimize, notice that for each nums[i], we want to count j > i where lower - nums[i] ≤ nums[j] ≤ upper - nums[i].
- By sorting the array, and for each index, using binary search to quickly find the leftmost and rightmost possible valid js, this can be improved.
- The optimal approach:
  - Sort nums.
  - For each index i (from 0 to n-2), fix nums[i]. Use two binary searches (or bisect) to find how many elements in nums[i+1:] fall in the valid range.
  - Sum up valid j counts for each i.
- This reduces time complexity to O(n log n).

### Corner cases to consider  
- Empty array (n = 0)
- Array of length 1 (no pairs possible)
- All elements equal
- lower > upper (no possible pairs)
- All pairs are above, or below, the given range
- Duplicates in the array
- Negative numbers

### Solution

```python
def countFairPairs(nums, lower, upper):
    # Sort for binary search and two-pointer logic
    nums.sort()
    n = len(nums)
    res = 0

    def count_pairs_leq(target):
        # Counts number of pairs with sum ≤ target
        count = 0
        left, right = 0, n - 1
        while left < right:
            # If current sum is ≤ target, all pairs (left, left+1 .. right) are valid
            if nums[left] + nums[right] <= target:
                count += (right - left)
                left += 1
            else:
                right -= 1
        return count

    # Number of pairs with sum ≤ upper minus number with sum < lower
    # This gives pairs with sum in [lower, upper]
    res = count_pairs_leq(upper) - count_pairs_leq(lower - 1)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n). Sorting the array is O(n log n). Each call to the count_pairs_leq function scans all pairs in O(n), and it's called twice.
- **Space Complexity:** O(1) extra space beyond the input (if sort is in-place). No additional arrays or recursion used.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where updates (modifications) are allowed on the nums array, and queries arrive online?
  *Hint: Can you use a balanced BST or a segment tree structure?*

- How does the solution change if you must return all the fair pairs (indices), rather than just their count?
  *Hint: You may need to use hash maps or explicit indexing after sort; note original indices!*

- What if the input array is extremely large and can't fit in memory? How can you efficiently process fair pair counts in distributed fashion?
  *Hint: Consider data streaming or divide-and-conquer counting strategies.*

### Summary
This problem uses the sorted-two-pointer pattern, often applied in pair sum/range count problems for arrays. It transforms an O(n²) search into an O(n log n) method by leveraging array sorting and efficient counting of pair sums within a window. The approach is common in subarray/pair-sum and windowed counting problems, and is a building block for more advanced questions involving offline queries or data structure integration.
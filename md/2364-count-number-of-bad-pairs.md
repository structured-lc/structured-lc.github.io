### Leetcode 2364 (Medium): Count Number of Bad Pairs [Practice](https://leetcode.com/problems/count-number-of-bad-pairs)

### Description  
Given an integer array nums (indexed from 0), find the total number of bad pairs.  
A pair of indices (i, j) is called a **bad pair** if the following conditions hold:
- 0 ≤ i < j < n (where n = len(nums))
- j - i ≠ nums[j] - nums[i]

That is, the distance between the indices is **not** equal to the difference between their corresponding values.  
Return the total number of such bad pairs in the array.

### Examples  

**Example 1:**  
Input: `nums = [4,1,3,3]`  
Output: `5`  
*Explanation:  
All pairs (0,1), (0,2), (0,3), (1,2), (1,3), (2,3) are possible.  
For each, check j - i ≠ nums[j] - nums[i]:  
- (0,1): 1-0 ≠ 1-4 → 1 ≠ -3 ✔ bad  
- (0,2): 2-0 ≠ 3-4 → 2 ≠ -1 ✔ bad  
- (0,3): 3-0 ≠ 3-4 → 3 ≠ -1 ✔ bad  
- (1,2): 2-1 ≠ 3-1 → 1 ≠ 2 ✔ bad  
- (1,3): 3-1 ≠ 3-1 → 2 ≠ 2 ✖ good  
- (2,3): 3-2 ≠ 3-3 → 1 ≠ 0 ✔ bad  
So, 5 bad pairs.*

**Example 2:**  
Input: `nums = [1,2,3,4,5]`  
Output: `0`  
*Explanation:  
Every consecutive increase by 1, so  
For any i < j, j - i = nums[j] - nums[i].  
No bad pairs.*

**Example 3:**  
Input: `nums = [3,2,1,0]`  
Output: `0`  
*Explanation:  
The decrease by 1 consecutively, so  
For any i < j, j - i = nums[j] - nums[i].  
No bad pairs.*

### Thought Process (as if you’re the interviewee)  

My first step is always brute force:  
- For every possible pair (i, j) with i < j, check if j - i ≠ nums[j] - nums[i].  
- This would require two loops: O(n²) time -- not scalable for large n.

However, the critical insight is to observe that:
- The “good pair” occurs when j - i = nums[j] - nums[i], that is,  
  j - nums[j] = i - nums[i]
- So, for a good pair, the value (index - value) needs to be the same for both i and j.

A better approach:
- For each index, calculate key = index - nums[index].
- Count how many times each key appears in the array (via a hash map).
- For each frequency f of a key, the number of good pairs with that key is f × (f-1)/2.

Now, total number of pairs is n × (n-1)/2, and  
# of bad pairs = total pairs - number of good pairs.

This gets us to O(n) time and O(n) space.

### Corner cases to consider  
- Empty array: Output=0 (no pairs)
- One element: Output=0 (no pairs)
- All elements are the same
- nums forms a strict arithmetic progression (no bad pairs)
- nums with all unique values
- nums with large or negative values

### Solution

```python
def count_bad_pairs(nums):
    # Hash map to count freq of (index - value)
    from collections import defaultdict
    freq = defaultdict(int)
    n = len(nums)
    total_pairs = n * (n - 1) // 2

    good_pairs = 0
    for i, num in enumerate(nums):
        key = i - num
        good_pairs += freq[key]  # All previous indices with same key form good pairs
        freq[key] += 1

    return total_pairs - good_pairs
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(nums).  
  One pass through array and hash map insertions are O(1) amortized.  
  Calculating the total number of pairs is O(1) math.
- **Space Complexity:** O(n), for storing up to n distinct key values in the hash map.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is static and you get multiple queries for different subarrays?
  *Hint: Can you preprocess prefix sums or build segment trees?*

- Can this be solved in O(1) space for certain input patterns?
  *Hint: What if nums is strictly increasing or strictly decreasing?*

- How do you modify the solution for a stream of data or sliding window?
  *Hint: Maintain running counts efficiently; evict old keys when they leave the window.*

### Summary
This problem is a classic example of **counting pairs with a key transformation** (index - value), which converts a seemingly complex relationship into a frequency counting problem. The approach uses a hash map and combinatorial math to count “good pairs” and deduce “bad pairs.” Variants of this pattern show up in prefix sum-subarray counting, two-sum logic, and problems involving unique-value pairing. The solution is efficient and typical for interview problems on pairwise relationships.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Counting(#counting)

### Similar Problems
- K-diff Pairs in an Array(k-diff-pairs-in-an-array) (Medium)
- Subarray Sums Divisible by K(subarray-sums-divisible-by-k) (Medium)
- Count Nice Pairs in an Array(count-nice-pairs-in-an-array) (Medium)
- Count Number of Pairs With Absolute Difference K(count-number-of-pairs-with-absolute-difference-k) (Easy)
- Count Equal and Divisible Pairs in an Array(count-equal-and-divisible-pairs-in-an-array) (Easy)
- Number of Pairs Satisfying Inequality(number-of-pairs-satisfying-inequality) (Hard)
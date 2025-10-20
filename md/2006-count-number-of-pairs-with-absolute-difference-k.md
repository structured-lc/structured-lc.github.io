### Leetcode 2006 (Easy): Count Number of Pairs With Absolute Difference K [Practice](https://leetcode.com/problems/count-number-of-pairs-with-absolute-difference-k)

### Description  
You are given an array of integers `nums` and an integer `k`. Your task is to count the number of pairs (i, j) such that 0 ≤ i < j < n and the absolute difference between nums[i] and nums[j] is exactly k, i.e., |nums[i] - nums[j]| = k.

### Examples  

**Example 1:**  
Input: `nums = [1,2,2,1], k = 1`  
Output: `4`  
*Explanation: Pairs with absolute difference 1 are: (0,1), (0,2), (1,3), (2,3).*

**Example 2:**  
Input: `nums = [1,3], k = 3`  
Output: `0`  
*Explanation: No pair has absolute difference of 3.*

**Example 3:**  
Input: `nums = [3,2,1,5,4], k = 2`  
Output: `3`  
*Explanation: Pairs: (0,2), (1,3), (2,4) have differences of exactly 2.*

### Thought Process (as if you’re the interviewee)  
First, brute-force: try every possible pair (i, j), where i < j, and count if |nums[i] - nums[j]| == k. This works because the max possible n is only 200, so n² is fine, but we can do better.

Optimal approach:  
- For each number as we iterate, we can check how many times `num - k` and `num + k` have appeared before—since both can form pairs with absolute difference k with the current num.
- Use a frequency array or hash map for counts so far.
- This reduces nested loops to O(n), as counts can be checked instantly for each num.

Why this approach?
- One pass, constant-time lookup per item.
- Works because input numbers are in a small range.

### Corner cases to consider  
- Empty array (should return 0)
- k = 0 (needs double-count handling, though in this problem k ≥ 1 by constraints)
- All elements the same (should return 0)
- No valid pairs at all
- Large k relative to array values

### Solution

```python
def countKDifference(nums, k):
    # Array since nums[i] is 1 to 100; index = num value
    counts = [0] * 110
    pairs = 0
    
    # For each number, check how many nums seen so far (leftside) could form a valid pair
    for num in nums:
        # Check if num - k has appeared before
        if num - k >= 1:
            pairs += counts[num - k]
        # Check if num + k has appeared before
        if num + k <= 100:
            pairs += counts[num + k]
        # Increment the count for current num for future pairs
        counts[num] += 1
    return pairs
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each element is processed once, and all checks/increments are O(1).
- **Space Complexity:** O(1) — Constant extra space for the count array (since nums[i] is always ≤ 100), regardless of n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums contains negative numbers or much larger values?
  *Hint: The counting array would need to become a hashmap.*

- How would you modify the logic if pairs (i, j) and (j, i) should both be counted?
  *Hint: Count unordered pairs and double the count unless i == j.*

- What if you also want to print out all the actual pairs instead of just counting?
  *Hint: Store the indices/values as you iterate.*

### Summary
This problem is a classic example of counting with a hash (or array) map to optimize pairwise difference checks. The core idea is using the pattern "previous occurrences can form a pair with the current value" whenever a fixed difference is desired. This is a frequent pattern in array difference/counting problems (like Two Sum, or finding subarrays with a given sum) and can be generalized with hashmaps for larger input ranges.


### Flashcard
Count pairs with an absolute difference of `k` by using a hash map to track the frequency of numbers as you iterate through the array.

### Tags
Array(#array), Hash Table(#hash-table), Counting(#counting)

### Similar Problems
- Two Sum(two-sum) (Easy)
- K-diff Pairs in an Array(k-diff-pairs-in-an-array) (Medium)
- Finding Pairs With a Certain Sum(finding-pairs-with-a-certain-sum) (Medium)
- Count Equal and Divisible Pairs in an Array(count-equal-and-divisible-pairs-in-an-array) (Easy)
- Count Number of Bad Pairs(count-number-of-bad-pairs) (Medium)
- Count the Number of Fair Pairs(count-the-number-of-fair-pairs) (Medium)
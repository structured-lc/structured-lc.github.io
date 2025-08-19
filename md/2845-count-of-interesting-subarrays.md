### Leetcode 2845 (Medium): Count of Interesting Subarrays [Practice](https://leetcode.com/problems/count-of-interesting-subarrays)

### Description  
Given an integer array **nums**, and two integers **modulo** and **k**, count the number of contiguous subarrays (non-empty) that are “interesting”.  
A subarray **nums[l..r]** is called interesting if, among its elements, the number of indices **i** such that **nums[i] % modulo == k** is itself congruent to **k** modulo **modulo** (i.e., the count % modulo == k). Return the count of such subarrays.

### Examples  

**Example 1:**  
Input: `nums = [3,2,4], modulo = 2, k = 1`  
Output: `3`  
*Explanation:*
- Subarrays [3], [3,2], [3,2,4]:
    - [3]: 3%2=1 ⇒ count=1, 1%2=1 ⇒ interesting
    - [3,2]: 3%2=1, 2%2=0 ⇒ count=1, 1%2=1 ⇒ interesting
    - [3,2,4]: 3%2=1, others 0 ⇒ count=1, 1%2=1 ⇒ interesting

**Example 2:**  
Input: `nums = [1,2,3,4], modulo = 2, k = 1`  
Output: `6`  
*Explanation:*
Subarrays with count of elements ≡ k (modulo):
- [1]: 1%2=1, count=1
- [1,2]: 1%2=1, count=1
- [1,2,3]: 1%2=1, 3%2=1, count=2 (2%2=0≠1) ⇒ not interesting
- [2,3]: 3%2=1, count=1
- [3]: 3%2=1, count=1
- [3,4]: 3%2=1, count=1
So, 6 interesting subarrays.

**Example 3:**  
Input: `nums = [2,2,4], modulo = 2, k = 1`  
Output: `0`  
*Explanation:*
No element gives remainder 1 when divided by 2, so all subarrays have count=0. 0%2=0≠1.

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  For every possible subarray, count how many elements in it ≡ k (modulo). If this count % modulo == k, increment result.  
  Time: O(n²).

- **Optimization:**  
  Let’s observe:  
  - For each position, mark if `nums[i] % modulo == k` (value 1), else 0.  
  - Build prefix sum of these “interesting” flags.  
  - For subarray [i,j], count = prefix[j+1] - prefix[i]. We want (count % modulo == k).
  - Rearranged: For prefix sum value s at j, look for earlier prefix sums s' such that (s - s') % modulo == k.

  To count efficiently:  
    - Use a hashmap to track counts of prefix sums modulo modulo seen so far.
    - For each prefix sum s, result += count of prefix sums x where (s - x) % modulo == k,
      equivalently, x ≡ (s - k + modulo) % modulo.

  **Why this works:**  
  For a subarray ending at j, to have the right count, the number of "interesting" elements between positions i and j is congruent to k (modulo).

  This brings time to O(n).

### Corner cases to consider  
- Empty array: No subarrays.
- All elements give the same (or never give) remainder k.
- k=0, special remainder handling.
- modulo > max(nums).
- Negative numbers in nums (remember Python % always returns non-negative).

### Solution

```python
def countInterestingSubarrays(nums, modulo, k):
    # Convert nums to an array of 1s (if nums[i] % modulo == k) and 0s.
    n = len(nums)
    arr = [1 if num % modulo == k else 0 for num in nums]

    # We'll use a prefix sum and a hashmap to store counts of each prefix sum modulo value.
    prefix = 0
    count = {0: 1}  # counts how often each prefix % modulo value has occurred
    result = 0

    for x in arr:
        prefix += x
        # Find how many times we've seen prefix-sums where (curr_prefix - k) % modulo happened before
        need = (prefix - k + modulo) % modulo
        result += count.get(need, 0)
        # Record this prefix sum modulo value for future
        count[prefix % modulo] = count.get(prefix % modulo, 0) + 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because each element is processed in constant time, and all hashmap operations are O(1) amortized.
- **Space Complexity:** O(modulo), as the hashmap stores at most 'modulo' different prefix mod values.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is very large and you cannot use extra space proportional to modulo?
  *Hint: Is it possible to process in-place or with a fixed-size array?*

- Can you generalize to handle multiple different k's efficiently at once?
  *Hint: Consider using arrays or counters for all possible remainders.*

- How would you modify this for streaming input?
  *Hint: Only prefix sums and counts need storing, which can be updated incrementally.*

### Summary
This problem showcases a **prefix sum, frequency counting** coding pattern—common for subarray count or sum problems with constraints on the subarray statistics (parity, divisibility, etc).  
The efficient solution leverages **prefix sums with modular arithmetic** and a hashmap, a technique that recurs in many similar subarray count problems (subarrays with sum divisible by K, subarrays with even/odd counts, etc).

### Tags
Array(#array), Hash Table(#hash-table), Prefix Sum(#prefix-sum)

### Similar Problems
- Subarray Sums Divisible by K(subarray-sums-divisible-by-k) (Medium)
- Count Number of Nice Subarrays(count-number-of-nice-subarrays) (Medium)
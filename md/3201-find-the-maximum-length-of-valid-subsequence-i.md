### Leetcode 3201 (Medium): Find the Maximum Length of Valid Subsequence I [Practice](https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-i)

### Description  
Given an integer array **nums**, find the **maximum length of a valid subsequence**.  
A subsequence is called **valid** if the sum of any two adjacent elements in the subsequence has the **same parity** (i.e., both sums are always even or always odd) in every sliding window of size 2.  
In simpler terms: Pick a subsequence where, for every adjacent pair, the sum is **always even** or **always odd** — but you can freely choose which parity (even or odd), and you want the longest possible subsequence.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3, 4]`  
Output: `4`  
*Explanation: The whole array `[1, 2, 3, 4]` itself is valid. Every adjacent pair's sum is odd (1+2=3, 2+3=5, 3+4=7), so the sum parity is always odd.*

**Example 2:**  
Input: `nums = [1, 2, 1, 1, 2, 1, 2]`  
Output: `6`  
*Explanation: A valid subsequence is `[1, 2, 1, 2, 1, 2]`, where every adjacent sum is odd (1+2=3, 2+1=3, ...).*

**Example 3:**  
Input: `nums = [1, 3]`  
Output: `2`  
*Explanation: Both elements are odd. 1+3=4 (even), so adjacent sum is always even. The whole array is valid.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach**: Generate all possible subsequences and check, for each, if all adjacent sums have the same parity. This takes exponential time (2ⁿ subsequences) — not efficient.
- **Observation**: For a pair of numbers, sum parity depends on their parities:
  - odd + odd = even
  - even + even = even
  - odd + even = odd
- So, if we choose all numbers with the same parity (all even or all odd), all adjacent sums are even. If we alternate odd and even, all adjacent sums are odd.
- Therefore, there are two optimal ways:
  1. Take the subsequence with all numbers of the same parity (max(all_even, all_odd))
  2. Take the longest subsequence that alternates between odd and even (can start with either)
- A **greedy approach**: For alternating, scan the list and alternate parity. For the same parity, just count max #odd or #even.

This hints at an **O(n)** solution using a simple scan, tracking max possible for both cases:
- Maximum length for all-even or all-odd subsequence.
- Maximum length for longest alternating sequence.

### Corner cases to consider  
- Empty array (`nums = []`), should return 0.
- All elements the same parity (`[2,2,2]` or `[1,1,1]`), answer is length of array.
- Array already alternating in parity: should be able to take whole array.
- Arrays with single element: should return 1.
- Very large array to confirm linear runtime.

### Solution

```python
def maximumLength(nums):
    # Track the length if we always pick the same parity
    even_cnt = 0
    odd_cnt = 0
    for x in nums:
        if x % 2 == 0:
            even_cnt += 1
        else:
            odd_cnt += 1

    # Find the max possible length for longest alternating parity subsequence
    # Try both possible starts: even/odd
    alt1 = 1 if nums else 0  # start with the first element
    alt2 = 1 if nums else 0  # start with the first element (other parity)
    n = len(nums)
    # alt1: starting with nums[0] and alternating
    for i in range(1, n):
        if nums[i] % 2 != nums[i-1] % 2:
            alt1 += 1
        else:
            # restart (alternative start), but since it's a subsequence,
            # we can skip instead of restart, so increment only when alternation
            pass  # so alt1 just counts the max possible by always skipping to the next alternate

    # To maximize, we can greedily skip elements:
    # Let's try both possible starting parities
    max_alt = 0
    # Try starting from each position and greedily take the next opposite parity
    for start_parity in [0, 1]:
        cnt = 0
        parity = start_parity
        for x in nums:
            if x % 2 == parity:
                cnt += 1
                parity ^= 1  # flip parity for alternation
        max_alt = max(max_alt, cnt)

    # The answer is the best of only same parity and the best alternating
    return max(even_cnt, odd_cnt, max_alt)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we make simple passes over the array and do not use nested loops or create all subsequences.
- **Space Complexity:** O(1), uses a constant number of counters regardless of input size (no extra arrays or recursion).

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of two parities (even, odd), you had *k* types, and a valid subsequence must have all adjacent sums equivalent mod k?  
  *Hint: Generalize the parity tracking to modulus k groups and use an array instead of two counters.*

- How would you reconstruct the actual subsequence (not just the max length)?  
  *Hint: Track indices or build from the DP/greedy scan the actual sequence.*

- Can you answer this in a streaming setting (infinite numbers arriving)?  
  *Hint: Maintain rolling counters and update on arrival, only needing constant space for max-so-far.*

### Summary
This problem is a variant of the **Longest Valid Subsequence** pattern, leveraging **parity analysis**.  
It can be efficiently solved in O(n) by noting that you either pick elements all of one parity, or alternate parities for a longer sequence.  
The greedy two-pointer/scan approach is robust and common in problems involving monotonic/alternate patterns in arrays, frequently appearing in problems on subsequence selection, longest alternating subsequence, or grouping by congruence classes.  
The underlying technique generalizes to other similar array and sequence problems where adjacency relations can be described by simple group properties.


### Flashcard
All numbers with the same parity (all even or all odd) form a valid subsequence; also try alternating odd-even patterns; return the longest valid subsequence found.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Longest Increasing Subsequence(longest-increasing-subsequence) (Medium)
- Length of the Longest Subsequence That Sums to Target(length-of-the-longest-subsequence-that-sums-to-target) (Medium)
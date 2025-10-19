### Leetcode 3718 (Easy): Smallest Missing Multiple of K [Practice](https://leetcode.com/problems/smallest-missing-multiple-of-k)

### Description  
Given an array **nums** and an integer **k**, return the **smallest positive multiple of k** that is **not** present in **nums**.  
In other words, among all numbers of the form k, 2×k, 3×k, ..., find the smallest such number that is missing from the array.

### Examples  

**Example 1:**  
Input: `nums = [2,4,6,8], k = 2`  
Output: `10`  
Explanation: Multiples of 2 are 2, 4, 6, 8, 10, ...  
First missing multiple is 10.

**Example 2:**  
Input: `nums = [5,10,15], k = 5`  
Output: `20`  
Explanation: Multiples of 5 are 5, 10, 15, 20, ...  
First missing multiple is 20.

**Example 3:**  
Input: `nums = [7,14,28,35], k = 7`  
Output: `21`  
Explanation: Multiples of 7 are 7, 14, 21, 28, 35, ...  
21 is missing, so answer is 21.

### Thought Process (as if you’re the interviewee)  
The brute-force way is to keep generating multiples of k: k, 2×k, 3×k, ... and for each, check if it exists in nums.  
- For each multiple, checking if it’s in nums takes O(n) time, which is inefficient if nums is large.

To optimize,  
- Create a set of all elements in nums for O(1) lookup.
- Then, start from m = 1, check if m×k is in the set.  
- The first m×k not in the set is the answer.

This reduces checking each multiple from O(n) to O(1).

### Corner cases to consider  
- nums is empty: should quickly return k.
- nums contains non-multiples of k, ignore them.
- nums contains duplicates.
- k not present in nums: should return k.

### Solution

```python
def smallest_missing_multiple(nums, k):
    # Store all elements in a set for fast lookup
    num_set = set(nums)
    m = 1  # Start from the first positive integer
    while True:
        candidate = m * k
        if candidate not in num_set:
            return candidate
        m += 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = len(nums), m is the smallest missing multiple's index (often much smaller than n).  
  - O(n) to build the set  
  - O(m) to check each new multiple  
- **Space Complexity:** O(n), for the set of nums.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums is extremely large and doesn’t fit in memory?  
  *Hint: Streaming algorithms or external memory techniques.*

- What if nums is already sorted?  
  *Hint: Consider two-pointer scan versus set lookup.*

- Can you solve this problem if you're only allowed one pass over nums (streaming)?  
  *Hint: Use hash sets with streaming constraints.*

### Summary
This is a straightforward application of the hash set lookup pattern for fast existence checking.  
The problem is a variant of "First Missing Positive" or "First Missing Multiple", commonly tested for set/hash usage and simple array scan.  
This coding pattern is widely used for presence/absence questions and can also appear in integer sequence or modulo-based problems.

### Tags


### Similar Problems

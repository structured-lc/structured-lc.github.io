### Leetcode 2784 (Easy): Check if Array is Good [Practice](https://leetcode.com/problems/check-if-array-is-good)

### Description  
Given an integer array `nums` of length n + 1, you are asked if it is a permutation of the array `[1, 2, ..., n-1, n, n]`. In other words, does `nums` contain each integer from 1 to n-1 **exactly once** and the integer n **exactly twice**, possibly in any order? If so, the array is considered "good". Return True if `nums` is "good", else False.

### Examples  

**Example 1:**  
Input: `nums = [2, 1, 3, 3]`  
Output: `True`  
*Explanation: The array represents base[3] = [1, 2, 3, 3], in some order. Each of 1 and 2 appears once, and 3 appears twice.*

**Example 2:**  
Input: `nums = [1, 3, 3, 2, 4, 4]`  
Output: `True`  
*Explanation: The array represents base[4] = [1, 2, 3, 4, 4]. 1, 2, and 3 appear once; 4 appears twice.*

**Example 3:**  
Input: `nums = [1, 1]`  
Output: `False`  
*Explanation: We expect base[1] = [1, 1], but the only valid base array should start from 1...n-1 (which is empty in this case), and n twice (1 twice), so allowed. But according to the problem constraints (n ≥ 2), this input is not 'good'. So, output is False.*

### Thought Process (as if you’re the interviewee)  
First, try to understand the problem by explicitly constructing what a "good" array is:  
- For input of length n + 1, valid good array should:
  - Contain all numbers from 1 to n-1 exactly once
  - Contain n exactly twice
  - No extra/missing numbers, no duplicates except n

Brute-force approach:
- Count occurrences of each number
- For all k in 1 to n-1: count[k] == 1
- For n: count[n] == 2
- No other numbers outside this range

Optimization:
- Use a simple frequency map (array or dict) to count occurrences as we iterate once through nums.

Why not sorting?
- Sorting takes O(n log n), but counting is O(n). So we'll use counting.

Trade-offs:
- O(n) time and O(n) space—both optimal for this problem, given requiring to inspect every element.

### Corner cases to consider  
- All numbers present but one with wrong count (n appears only once instead of twice)
- An extra number outside expected range
- dups in 1 to n-1
- nums is too short or too long (should be size n+1)
- n < 2, edge behavior
- All numbers are the same
- Random order: array is not sorted

### Solution

```python
def isGood(nums):
    n = len(nums) - 1  # Expected n, so check counts 1..n-1 and n
    # Initialize count array (n + 2 for 1-based indexing and n)
    count = [0] * (n + 2)
    for num in nums:
        if num < 1 or num > n:
            return False  # Invalid number
        count[num] += 1
    # Check that 1..n-1 all appear exactly once
    for i in range(1, n):
        if count[i] != 1:
            return False
    # Check that n appears exactly twice
    if count[n] != 2:
        return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of input `nums` (since we scan the array once and count frequencies in simple loops).
- **Space Complexity:** O(n), for the frequency counter array (of size n+2).

### Potential follow-up questions (as if you’re the interviewer)  

- What if n is very large and you want to save space?
  *Hint: Can you use a hash map instead of an array to count? Is it possible to get away with less than O(n) space?*

- What if numbers can be up to 10⁹, and you can't allocate a counter array?
  *Hint: Use a dictionary instead, and check the frequency, but still need to scan all of nums.*

- Can the array contain negative numbers or zeros?
  *Hint: Clarify the constraints; if allowed, you must check and handle such cases properly.*

### Summary
This problem is a classic frequency counting and validation task. The coding pattern used is "Counting and Validation", which is commonly applicable to problems involving permutations, missing/duplicate elements, or set membership. No clever math or advanced data structures are needed, just a careful walk through the expected values and systematic validation with a counter.


### Flashcard
Count frequency of each number; array is good if 1..n-1 appear once, n appears twice, and no other numbers are present.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting)

### Similar Problems

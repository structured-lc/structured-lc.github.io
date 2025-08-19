### Leetcode 2357 (Easy): Make Array Zero by Subtracting Equal Amounts [Practice](https://leetcode.com/problems/make-array-zero-by-subtracting-equal-amounts)

### Description  
You’re given an array of non-negative integers. In each operation, you can choose a positive integer x, where x ≤ the smallest non-zero element in the array, and subtract x from every positive number in the array. The goal is to determine the minimum number of such operations needed to make all elements zero.

### Examples  

**Example 1:**  
Input: `nums = [1,5,0,3,5]`  
Output: `3`  
*Explanation:*
- Operation 1: Pick x = 1. Subtract 1 from all positive entries → [0,4,0,2,4].
- Operation 2: Pick x = 2. Subtract 2 from all positive entries → [0,2,0,0,2].
- Operation 3: Pick x = 2. Subtract 2 from all positive entries → [0,0,0,0,0].

**Example 2:**  
Input: `nums = `  
Output: `0`  
*Explanation:*
Every element is already zero, so no operations are needed.

**Example 3:**  
Input: `nums = [2,2,2]`  
Output: `1`  
*Explanation:*
All elements are the same non-zero value, so one subtraction of x = 2 makes every element zero immediately.

### Thought Process (as if you’re the interviewee)  
First, let's consider a brute-force approach:  
- Repeatedly find the smallest non-zero number x and subtract it from each positive element, counting the operations, until all are zero.  
- But this quickly becomes inefficient, especially if elements are large or the array is large.

If I look for a pattern: Every unique positive value in the array eventually needs its own subtraction step, because you cannot reach zero without, at some point, subtracting that unique minimum value. Duplicates don’t matter—removing them in the same step is "free." So, the problem boils down to counting the number of distinct positive integers in the array.

Thus, the final optimized solution is:  
- Count the number of unique positive elements in nums (ignore zeros).  
- Answer = number of unique positive entries.

This reduces the problem to O(n) time with an extra O(n) space set for uniqueness tracking. Trading a little space for speed is acceptable for inputs of 100 elements.

### Corner cases to consider  
- Array already contains only zeros (output should be 0).
- All elements are the same nonzero value (output should be 1).
- Array has a mix of zeros and positive numbers.
- Array has single non-zero element (output should be 1).
- Duplicates: [3,3,3,3,3] (counted only once).
- Large array with all values different.

### Solution

```python
def minimumOperations(nums):
    # Use a set to track unique positive elements
    unique_positives = set()
    for num in nums:
        if num > 0:
            unique_positives.add(num)
    # Each unique positive needs its own subtracting step
    return len(unique_positives)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we iterate through the array once, adding each positive (up to n) to a set.
- **Space Complexity:** O(n), where n is the size of the input array, because in the worst case (all values are positive and unique) the set could store up to n elements.

### Potential follow-up questions (as if you’re the interviewer)  

- What if elements could be negative?  
  *Hint: Do you need to handle negative values differently, or should the operation definition change?*

- Can you solve this without extra space?  
  *Hint: Is there a way to avoid a set? (Maybe by sorting and counting transitions.)*

- If the array can have up to 10⁶ elements, how would your solution change?  
  *Hint: Think about set or hash map constraints and possibly preprocessing for duplicates.*

### Summary
The core idea is the **"count the number of unique positive values"** pattern. This problem is a classic use of greedy reasoning: reducing work to the simplest possible case by identifying that only unique positive entries require individual subtraction operations. It’s useful for problems where operations are "absorbed" or "consolidated" by duplicates—such as in set covering, minimum unique operations patterns, or deduplication-based logic.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Simulation(#simulation)

### Similar Problems
- Contains Duplicate(contains-duplicate) (Easy)
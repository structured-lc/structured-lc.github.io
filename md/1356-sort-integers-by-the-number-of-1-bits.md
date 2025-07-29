### Leetcode 1356 (Easy): Sort Integers by The Number of 1 Bits [Practice](https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits)

### Description  
Given an array of integers, sort it by the number of 1 bits (set bits) in their binary representation. If two numbers have the same number of set bits, those numbers should be sorted by their value in ascending order. 

### Examples  

**Example 1:**  
Input: `[0,1,2,3,4,5,6,7,8]`  
Output: `[0,1,2,4,8,3,5,6,7]`  
*Explanation: Number of set bits: 0→0; 1→1; 2→1; 3→2; 4→1; 5→2; 6→2; 7→3; 8→1. Group and sort: , [1,2,4,8], [3,5,6], .*  

**Example 2:**  
Input: `[1,2,3,4,5,6,7,8,9]`  
Output: `[1,2,4,8,3,5,6,9,7]`  
*Explanation: Number of set bits for each: [1,1,2,1,2,2,3,1,2]. Sorted by bits, tie-break by value.*

**Example 3:**  
Input: `[1024,512,256,128,64,32,16,8,4,2,1]`  
Output: `[1,2,4,8,16,32,64,128,256,512,1024]`  
*Explanation: All numbers are powers of two → all have 1 set bit, so sorted by value.

### Thought Process (as if you’re the interviewee)  
- Brute-force: For each number, count the number of 1 bits, then sort using a custom comparator that first looks at the bit count and then the value.
- Optimized: Python makes this easy with sorted and key functions. Using `bin(x).count('1')` for set bit count, sort with a tuple (bit count, value).
- Trade-offs: Counting bits per number is O(log(max(arr))) per number, overall sorting is O(n log n). Sorting by set bits first, then value, reduces error and ensures correct grouping.

### Corner cases to consider  
- Array has duplicate numbers
- Numbers with the same number of set bits
- Empty array (should return empty array)
- All numbers are the same
- Numbers with zero set bits (e.g., 0)

### Solution

```python
# Sort by bits, then by value.
def sortByBits(arr):
    # The key is a tuple: (number of 1s in binary, number itself)
    return sorted(arr, key=lambda x: (bin(x).count('1'), x))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n × k), where n is the length of arr and k is the number of bits (since key calculation is O(k)).
- **Space Complexity:** O(n), due to internal Python sort usage and possibly the output array.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if you could not use the built-in sort?
  *Hint: Implement your own comparator or stable sort based on tuples.*

- What if you needed to sort by number of 0s instead of 1s?
  *Hint: Flip how you count.*

- Can you optimize counting set bits for very large numbers?
  *Hint: Use Brian Kernighan’s algorithm.*

### Summary
This is a classic sorting problem using custom keys based on secondary criteria. The solution follows the "sort by mapped value" pattern, seen in problems needing custom, multi-stage sort logic.
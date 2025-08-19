### Leetcode 3595 (Medium): Once Twice [Practice](https://leetcode.com/problems/once-twice)

### Description  
Given an integer array nums, where every element appears either **once** or **twice**, return a sorted array containing exactly the elements that appear **once**.

In other words, each number will appear at most twice, and you should return all numbers that appear *exactly once*, in sorted order.

### Examples  

**Example 1:**  
Input: `nums = [4,3,2,7,8,2,3,1]`  
Output: `[1,4,7,8]`  
*Explanation: 1, 4, 7, and 8 appear once. 2 and 3 appear twice.*

**Example 2:**  
Input: `nums = [1,1,2,2,3,4,5,5]`  
Output: `[3,4]`  
*Explanation: 3 and 4 each appear once. 1, 2, and 5 appear twice.*

**Example 3:**  
Input: `nums = [9,9,7]`  
Output: ``  
*Explanation: 7 appears once, 9 appears twice.*

### Thought Process (as if you’re the interviewee)  

Brute-force approach:  
- For each number, count its occurrences by iterating through the array (O(n²)).  
- If it occurs once, add it to the output array.

Optimized approach:  
- Use a hash map (dictionary) to count occurrences of each number in one pass (O(n) time, O(n) space).
- After building the frequency map, collect all keys with value 1, and return the sorted result.

Further optimization/space saving:  
- If constraints allow for O(1) extra space and in-place modification, consider using the array itself as a marker (only if elements are within 1 to n and other problem-specific constraints).  
- However, for arbitrary numbers, the hash map is optimal for clarity, correctness, and performance.

I choose the hash map count approach for clarity and O(n) time.

### Corner cases to consider  
- Empty array → should return `[]`.
- All elements appear twice → should return `[]`.
- All elements appear once → return sorted copy of input.
- Only one element in array.
- Very large or negative numbers.

### Solution

```python
def once_twice(nums):
    # Count the frequency of each number
    freq = {}
    for num in nums:
        if num in freq:
            freq[num] += 1
        else:
            freq[num] = 1

    # Collect elements that appear once
    result = []
    for num, count in freq.items():
        if count == 1:
            result.append(num)
    
    # Return the sorted result
    return sorted(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log k), where n = len(nums) and k = number of numbers that appear once. We traverse nums in O(n), and sort up to O(n) distinct elements: O(k log k).
- **Space Complexity:** O(n) for the frequency dictionary (worst case: every number is unique).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it if a number can appear up to three times, and you want singletons?
  *Hint: Generalize the count. What if there are numbers that can appear 1, 2, or 3 times?*

- How would you solve this if the array is immutable and memory is very constrained?
  *Hint: Is there a way to do this in-place or with bitwise tricks if elements are limited to a range?*

- Could you return the result without sorting? If so, what would change in your algorithm?
  *Hint: What is the time/space trade-off if it does not need to be sorted?*

### Summary
The problem is a classic use case for a hash map (dictionary) counting pattern, often called "frequency count." This pattern is common in problems involving elements that appear a specified number of times. Variants apply to finding single or duplicate numbers, or filtering by frequency. Understanding hash maps and simple scans is critical for high performance with such constraints.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation)

### Similar Problems

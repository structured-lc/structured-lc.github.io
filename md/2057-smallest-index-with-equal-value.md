### Leetcode 2057 (Easy): Smallest Index With Equal Value [Practice](https://leetcode.com/problems/smallest-index-with-equal-value)  

### Description  
Given a 0-indexed integer array `nums`, return the **smallest index** `i` such that **i mod 10 = nums[i]**.  
If there is no such index, return -1.  
Here, `i mod 10` means the remainder when `i` is divided by 10.  
For each index, check if its value is the same as its index modulo 10. Return the first such index.

### Examples  

**Example 1:**  
Input: `nums = [0,1,2]`  
Output: `0`  
*Explanation:*
- i=0: 0 mod 10 = 0, nums=0, so 0 == 0
- i=1: 1 mod 10 = 1, nums[1]=1, 1 == 1
- i=2: 2 mod 10 = 2, nums[2]=2, 2 == 2  
All indices work, but 0 is the smallest.

**Example 2:**  
Input: `nums = [4,3,2,1]`  
Output: `2`  
*Explanation:*
- i=0: 0 mod 10 = 0, nums=4, 0 ≠ 4
- i=1: 1 mod 10 = 1, nums[1]=3, 1 ≠ 3
- i=2: 2 mod 10 = 2, nums[2]=2, 2 == 2 → smallest matching index is 2
- i=3: 3 mod 10 = 3, nums[3]=1, 3 ≠ 1

**Example 3:**  
Input: `nums = [1,2,3,4,5,6,7,8,9,0]`  
Output: `-1`  
*Explanation:*
- i from 0 to 9: i mod 10 = i, nums[i] ≠ i in every case.
- No index matches, so return -1.

### Thought Process (as if you’re the interviewee)  

- First, I interpret the problem as: for each index i in nums, check if i % 10 == nums[i]. Return the smallest such i, or -1 if none exists.
- **Brute-force:**  
  Iterate over `nums` from index 0. For each i, check if i % 10 == nums[i].  
  Stop and return i when I find a match.
- **Optimality:**  
  Since the check is O(1) and we do it for each element, this is O(n) time and O(1) extra space, which is already optimal for a single scan array problem.
- **Alternate approaches:**  
  There is no need to sort, use extra space, or optimize further as we already must check each index once.
- This pattern is straight linear search with an early exit when a condition is found.

### Corner cases to consider  
- Array with one element (matching or non-matching)
- All elements 0
- All elements not matching their index % 10
- Large input size, but within constraints (n ≤ 100)
- Elements within and outside the 0–9 range (but constraints say all nums[i] are 0–9, so no out-of-range)
- Negative array length or invalid input: Not possible per constraints.

### Solution

```python
def smallestEqual(nums):
    # Iterate through all indices and values in nums
    for i in range(len(nums)):
        # Check if current index mod 10 equals current value
        if i % 10 == nums[i]:
            return i  # Found the smallest such index
    # If no index matched the requirement, return -1
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We scan each element of nums once and do an O(1) check per element.

- **Space Complexity:** O(1)  
  No extra data structures used; only loop variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums could contain negative numbers?  
  *Hint: Would i % 10 ever be negative? What about negative values in nums?*

- What if you had to return **all** indices satisfying i % 10 == nums[i]?  
  *Hint: Would you need to store all such i in a list and return it?*

- What if n was up to 10⁶ instead of 100?  
  *Hint: Is your time complexity still acceptable? How about space?*

### Summary
This problem is a classic single-pass linear search pattern — find the earliest index matching a property in an array.  
It uses an early return loop and demonstrates how to compare an index property (`i % 10`) to corresponding values.  
The same pattern applies to any situation where you need to find the smallest or first index that satisfies a value–index-based constraint.

### Tags
Array(#array)

### Similar Problems

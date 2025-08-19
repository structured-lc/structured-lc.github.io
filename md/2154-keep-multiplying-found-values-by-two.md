### Leetcode 2154 (Easy): Keep Multiplying Found Values by Two [Practice](https://leetcode.com/problems/keep-multiplying-found-values-by-two)

### Description  
Given an integer array **nums** and an integer **original**, repeatedly do the following:
- If **original** exists in **nums**, multiply it by 2 (original = original × 2), and repeat.
- If **original** does not exist in **nums**, stop and return it.

The process continues as long as the current value exists in **nums**. Return the final value of **original** when you stop.

### Examples  

**Example 1:**  
Input: `nums = [5,3,6,1,12]`, `original = 3`  
Output: `24`  
*Explanation: 3 is in nums → 3 × 2 = 6. 6 is in nums → 6 × 2 = 12. 12 is in nums → 12 × 2 = 24. 24 is not in nums, so return 24.*

**Example 2:**  
Input: `nums = [2,7,9]`, `original = 4`  
Output: `4`  
*Explanation: 4 is not in nums, so return 4 immediately.*

**Example 3:**  
Input: `nums = [1,2,4,8,16]`, `original = 1`  
Output: `32`  
*Explanation: 1 in nums → 2; 2 in nums → 4; 4 in nums → 8; 8 in nums → 16; 16 in nums → 32; 32 not in nums, return 32.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each value of original, linearly scan through nums to check if it exists. If found, double it and repeat. This process would take O(n × k), where k is the number of doublings.
- **Optimize with Set:** Since lookups in a set are O(1), convert nums into a set at the beginning. Then, while original is in the set, double its value. Stop when not found.  
- **Why this approach:** Building the set takes O(n), and the while loop will run at most O(log₂(max_value)) times. This is the most efficient way given the constraints and avoids unnecessary repeated scans.

### Corner cases to consider  
- **Empty array:** Input array is empty.
- **original not in nums at the start:** Returns immediately.
- **All numbers are powers of two, starting from original.**
- **Duplicates in nums:** Should not affect the solution.
- **nums has max constraint values:** Check for performance.
- **original greater than all nums:** Returns immediately.
- **nums includes very large numbers, but starting original is small.**

### Solution

```python
def findFinalValue(nums, original):
    # Insert all numbers into a set for O(1) lookups
    nums_set = set(nums)
    
    # While original is present in nums_set, double it
    while original in nums_set:
        original *= 2
        
    # Return the first number not found in nums_set
    return original
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of nums.  
  - Building the set is O(n).
  - The while loop runs O(log₂(max(nums))) times, which is negligible compared to O(n) for these constraints.
- **Space Complexity:** O(n), for the hash set holding all the values in nums.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array nums is **sorted**?  
  *Hint: Can you leverage binary search for quicker lookups instead of a set?*

- How would you solve it if **nums** is huge and doesn’t fit in memory?  
  *Hint: Think about data streaming, hash or frequency counting, or probabilistic structures.*

- Can you return the **entire series of numbers** seen during this process, not just the final one?  
  *Hint: Track each original value before updating.*

### Summary
This is a classic **hash set value existence**/lookup pattern, commonly used to trade O(n) memory for O(1) search speed. This coding pattern frequently appears in problems requiring repeated element existence checks or transformations: e.g., finding missing/duplicate numbers, repeated operations, or value propagation in a sequence. The approach is efficient, avoids unnecessary work, and cleanly separates data preparation from the actual search step.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting), Simulation(#simulation)

### Similar Problems
- Largest Number At Least Twice of Others(largest-number-at-least-twice-of-others) (Easy)
- Check If N and Its Double Exist(check-if-n-and-its-double-exist) (Easy)
### Leetcode 961 (Easy): N-Repeated Element in Size 2N Array [Practice](https://leetcode.com/problems/n-repeated-element-in-size-2n-array)

### Description  
Given an array of integers `nums` with the following properties:
- The length is exactly 2×n.
- There are n+1 unique elements in the array.
- Exactly one element appears n times, while all the rest are unique.

Your task is to find and return the element that is repeated n times.  
Think of it as: In an array that's twice as large as the number of unique elements, one element dominates exactly half the array.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,3]`  
Output: `3`  
*Explanation: There are 4 elements (2×2). Out of 3 unique elements, 3 is repeated twice.*

**Example 2:**  
Input: `nums = [2,1,2,5,3,2]`  
Output: `2`  
*Explanation: There are 6 elements (2×3). Out of 4 unique values, 2 is repeated 3 times.*

**Example 3:**  
Input: `nums = [5,1,5,2,5,3,5,4]`  
Output: `5`  
*Explanation: 8 elements (2×4). 5 is the only value repeated 4 times (others appear once).*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Count the frequency for each number using a hashmap/dictionary. Return the first number whose count reaches n.  
- **Optimization:** Since one element is repeated many times, we can use a set. Iterate through nums and check if the element has been seen before; if yes, return it. This works because all others only appear once, so the first repeat found must be the answer.
- **Trade-offs:**  
  - Hashmap: Easy, but more space than needed.  
  - Set: Simple, efficient, O(n) time, O(n) space, returns the answer as soon as the duplicate is found.
- **Alternative (Constant Space):** Since only one number repeats, we could check all pairs with a sliding window of size 2 or 3, but using a set is more readable and easy to implement.

### Corner cases to consider  
- Very small arrays, e.g., nums = [2,2]
- The repeated number occurs at the beginning, middle, or end
- All numbers are positive, or some are 0
- Repeated number is the minimum or maximum in the array

### Solution

```python
def repeatedNTimes(nums):
    seen = set()                # Keep track of numbers we've seen
    for num in nums:
        if num in seen:         # Found the repeating element
            return num
        seen.add(num)           # Add unseen number to the set
    return -1                   # This should never be hit due to constraints
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - We scan the array once, checking set membership and insertion in constant time for each element.
- **Space Complexity:** O(n)
  - In the worst case, we store n+1 unique elements in the set if the repeated element is the last n entries.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want a solution using O(1) space?  
  *Hint: Think about pairwise comparisons or mathematical formulas using the sum of the array.*

- How would the solution change if the repeated element appeared m times, where m ≠ n?  
  *Hint: Would the set-based approach still work?*

- Could you solve it if numbers can be negative, or if repeated numbers can appear in consecutive positions?  
  *Hint: The current approach doesn't depend on order, only counts.*

### Summary
The set-based approach is a classic **hashing duplicate check** pattern, efficient for finding the first repeated element.  
It's similar to solving "find the duplicate number" type questions and works due to the clear constraints of this problem.  
This coding pattern is widely applicable for problems where you need to detect repeats or non-uniques quickly within a collection.


### Flashcard
Iterate through nums, return the first element seen twice using a set for O(1) lookup.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems

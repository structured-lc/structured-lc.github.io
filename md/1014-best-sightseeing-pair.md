### Leetcode 1014 (Medium): Best Sightseeing Pair [Practice](https://leetcode.com/problems/best-sightseeing-pair)

### Description  
You are given an array where each element represents the score of a sightseeing spot. The score for a pair of spots at indices i and j (\(i < j\)) is calculated as:  
score = values[i] + values[j] + i − j.  
Find the maximum score among all possible sightseeing pairs.

### Examples  

**Example 1:**  
Input: `values = [8,1,5,2,6]`  
Output: `11`  
*Explanation: The best pair is (i=0, j=2): 8 + 5 + 0 − 2 = 11.*

**Example 2:**  
Input: `values = [1,2]`  
Output: `2`  
*Explanation: Only one pair (0,1) possible: 1 + 2 + 0 − 1 = 2.*

**Example 3:**  
Input: `values = [1,2,3,4,5]`  
Output: `7`  
*Explanation: The best pair is (i=3, j=4): 4 + 5 + 3 − 4 = 8;  
but (i=2, j=4): 3 + 5 + 2 − 4 = 6  
Highest is with (i=3, j=4): 8.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try every pair (i, j), compute score each time. Has O(n²) time complexity, which is too slow for large inputs.
- **Optimization:**  
  - Rearranging the formula:  
    score = values[i] + i + values[j] − j  
    For every position j, the best i < j is the one with the highest values[i] + i seen so far.
  - So, as we move through the array, keep the running maximum of values[i] + i (call it `max_prev`).  
  - For each j from 1 onward, compute:  
    score = max_prev + values[j] − j  
    Then update max_prev if values[j] + j is higher.
  - Single pass, O(n).

### Corner cases to consider  
- Array with only two elements: One pair exists  
- All elements are the same  
- The largest score at the start or end  
- Decreasing or increasing arrays  
- Empty array or only one element (invalid per constraints)

### Solution

```python
def maxScoreSightseeingPair(values):
    # Initialize result and the best prior values[i] + i
    max_score = 0
    max_left = values[0]  # values[0] + 0
    
    # Iterate through array, starting from index 1
    for j in range(1, len(values)):
        # For each j, compute the score with best prior i
        max_score = max(max_score, max_left + values[j] - j)
        # Update max_left as the best values[i] + i seen so far
        max_left = max(max_left, values[j] + j)
    return max_score
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as we do a single pass over the input array.
- **Space Complexity:** O(1), since we use only a few variables for tracking state.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the formula changes to values[i] − i + values[j] − j?
  *Hint: Try to rearrange the formula for a similar pattern.*
- How would you return the actual indices of the best pair, not just the score?
  *Hint: Track the index where max_left is updated.*
- How would you handle the problem if negative values are allowed in the array?
  *Hint: Evaluate if negative values affect tracking max_left and computation.*

### Summary
This problem uses a **prefix max** pattern: at each step, you use a running optimum from the left combined with the current value on the right. This is common in array problems involving pair-based scoring with an index relationship, and is especially useful for maximizing or minimizing formulas of the format arr[i] + arr[j] + f(i, j).
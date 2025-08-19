### Leetcode 1007 (Medium): Minimum Domino Rotations For Equal Row [Practice](https://leetcode.com/problems/minimum-domino-rotations-for-equal-row)

### Description  
Given two integer arrays **tops** and **bottoms** of the same length, representing the top and bottom numbers of dominoes in a row, you can rotate any domino: swap its top and bottom numbers.

Your goal is to compute the **minimum number of rotations** needed to make all values in either the top row or the bottom row **the same**. If it's not possible, return -1.

You do **not** need to make both rows the same—just one.  
At each move, you may rotate any domino (swap A[i] and B[i]).

### Examples  

**Example 1:**  
Input: `tops = [2,1,2,4,2,2]`, `bottoms = [5,2,6,2,3,2]`  
Output: `2`  
*Explanation: Make all values in the top row equal to 2 (rotate indices 1 and 3).*

**Example 2:**  
Input: `tops = [3,5,1,2,3]`, `bottoms = [3,6,3,3,4]`  
Output: `-1`  
*Explanation: It is not possible to have all values in either row the same.*

**Example 3:**  
Input: `tops = [1,2,1,1,1,2,2,2]`, `bottoms = [2,1,2,2,2,2,2,2]`  
Output: `1`  
*Explanation: Make all values in the bottom row equal to 2 (rotate index 0).*

### Thought Process (as if you’re the interviewee)  
Start with the observation:  
- To solve the task for a number x (from 1 to 6), we need every domino to have x in either top or bottom position.
- Since only two numbers are possible: tops and bottoms, we can attempt to align the row to either of those numbers (call them candidates).
- For each candidate:
    - Check if it's feasible—if at any position, neither top nor bottom has the candidate, it's impossible.
    - Otherwise, count how many rotations are needed to make the entire top row or entire bottom row that number.

Brute-force: Check all possible numbers 1-6 to see if it's possible to make the tops or bottoms all equal to that value (but each value might not even appear in every domino, so most will be eliminated).

Optimized: Only check the numbers at tops and bottoms since, to have a row fully uniform, each domino must be able to pick that number at least once.  
For each candidate, count:
- the number of dominoes where the top already has the candidate (no rotation needed),
- the number of dominoes where the bottom already has the candidate (no rotation if we’re matching the bottom),
- otherwise, we need to rotate (if possible).

Our answer is the minimum number of rotations over all valid candidates and both directions.

### Corner cases to consider  
- Input arrays are empty → return 0 or -1 as per constraints.
- Only one domino → always need 0 rotations.
- All the values are already equal → need 0 rotations.
- It’s not possible to align because for some domino, neither top nor bottom has the target.
- Both tops and bottoms are viable starting points.

### Solution

```python
def minDominoRotations(tops, bottoms):
    # Helper function to count rotations needed to make all values the target
    def check(target):
        rotations_a = rotations_b = 0
        for i in range(len(tops)):
            # If neither top nor bottom has the target, cannot align
            if tops[i] != target and bottoms[i] != target:
                return float('inf')
            # Count rotations needed for tops or bottoms
            elif tops[i] != target:
                rotations_a += 1
            elif bottoms[i] != target:
                rotations_b += 1
        return min(rotations_a, rotations_b)
    
    # Only possible candidates: tops[0] and bottoms[0]
    candidates = {tops[0], bottoms[0]}
    min_rotations = float('inf')
    for x in candidates:
        min_rotations = min(min_rotations, check(x))
    return -1 if min_rotations == float('inf') else min_rotations
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
    - We check two possible targets (tops and bottoms).
    - For each, scan both arrays once: O(n) time.
- **Space Complexity:** O(1)
    - Only uses counters and a small number for candidates, no extra space based on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if values are not limited to 1-6?  
  *Hint: Brute-force for all candidates would be inefficient. Can you preprocess to find only feasible targets?*

- How would the approach change if you needed both rows (top and bottom) to be equal?  
  *Hint: The feasibility check and candidate search would be stricter, need to match both sides.*

- What if you can rotate dominoes any number of times, not just once per domino?  
  *Hint: No effect—the current solution assumes you can rotate any domino any number, so it still works.*

### Summary
This problem uses the **counting and simulation** pattern, focusing on candidate analysis and greedy choice. The solution reduces brute-force by recognizing structural constraints about dominoes. A similar pattern (check feasibility, count minimal adjustments) can be applied to problems where you need to align two arrays/lists by allowed swaps or flips, especially when constraints limit possible targets.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems

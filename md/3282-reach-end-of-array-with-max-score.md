### Leetcode 3282 (Medium): Reach End of Array With Max Score [Practice](https://leetcode.com/problems/reach-end-of-array-with-max-score)

### Description  
Given an integer array **nums** of length **n**, you start at index 0 and want to reach the last index (n−1).  
On each move, you can only jump forward to an index **j > i**.  
The score for a jump from index **i** to **j** is calculated as (**j − i**) × nums[i].  
Your goal is to maximize the **total score** collected by the time you reach the last index.  
Return the maximum possible total score you can achieve.


### Examples  

**Example 1:**  
Input: `nums = [1,3,1,5]`  
Output: `7`  
*Explanation: Jump from 0 → 1 (score: 1×1 = 1), then from 1 → 3 (score: 2×3 = 6). Total = 1 + 6 = 7. (Any other sequence gives less.)*

**Example 2:**  
Input: `nums = [4,3,1,3,2]`  
Output: `16`  
*Explanation: Best move is to jump directly from 0 → 4 (score: 4×4 = 16).*

**Example 3:**  
Input: `nums = [2,2,2,2]`  
Output: `6`  
*Explanation: Multiple optimal jump sequences; for example, 0→1 (1×2=2), 1→3 (2×2=4), total=6.*


### Thought Process (as if you’re the interviewee)  
- **Brute Force**: Try all possible jump sequences from 0 to n-1, keeping track of the total score. This results in exponential time due to decision branching at each step; infeasible for large n.
- **Greedy Observation**: At each index, the score for a jump from **i** to **j** is (j−i)×nums[i]. If we maximize nums[i] and the jump distance together, we get the best score.
- **Optimization**:  
  - Look at the problem backward: For each position, what is the best score we can get starting from there? Or, forward: as we traverse, track the maximum nums value we could have used for a longer jump.
  - **Greedy Traversal**:  
    - Track the maximum nums value seen so far (**mx**).
    - For each step, add mx to the answer, then update mx = max(mx, nums[i]).
    - This works because to maximize score for large jumps, you should use the highest nums[i] value possible.
    - Only the first element's value is used for direct first jump, but updating mx ensures that if you encounter a larger value, you wait for it for a bigger future jump.
- **Trade-offs**: Greedy reduces problem to O(n), with O(1) space, and is provably optimal because every jump after the first optimally uses the largest-possible value.

### Corner cases to consider  
- Empty array or n = 0: undefined/problem constraint says n ≥ 1.
- Only one element: no jumps are possible, score is 0.
- All values equal: multiple optimal jump sequences lead to the same result.
- Large last value: prefer direct longest jump.
- Large value at the start vs. larger later: optimal strategy is to go as far as possible after encountering the largest value.
- [1] input: should return 0.


### Solution

```python
def maxScore(nums):
    # Score accumulator
    total = 0
    # max_num tracks the largest nums[i] seen so far
    max_num = 0
    n = len(nums)
    for i in range(n):
        # Add the max so far to running total (skip first index)
        if i > 0:
            total += max_num
        # Update the current max_num
        max_num = max(max_num, nums[i])
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). We iterate through the array once, updating variables; no nested loops.
- **Space Complexity:** O(1). Only a few integer variables are used for bookkeeping; no extra data structures proportional to input size.


### Potential follow-up questions (as if you’re the interviewer)  

- What if you can also jump backwards?  
  *Hint: Think about dynamic programming or graph traversal.*

- Can you return the sequence of indices for the optimal path, not just the maximal score?  
  *Hint: Store previous jump information as you traverse.*

- If some indices are forbidden (cannot land on them), how would you modify the solution?  
  *Hint: Skip forbidden indices, or use DP to handle obstacles robustly.*


### Summary
This problem uses a **greedy array pattern**—tracking and re-using the largest value seen so far for maximizing cumulative sums across jumps.  
Such greedy scoring approaches are common in jump/score maximization on arrays, where the optimal substructure allows a simple O(n) scan.  
Recognizing the form (greedy optimality, score accumulation with max-so-far) is also helpful in similar jump array problems and interval score questions.
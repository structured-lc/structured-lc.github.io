### Leetcode 2106 (Hard): Maximum Fruits Harvested After at Most K Steps [Practice](https://leetcode.com/problems/maximum-fruits-harvested-after-at-most-k-steps)

### Description  
Given an array of fruits, where each fruit is at a certain position on the x-axis (fruits are of the form `[position, amount]` sorted by position), you're standing at `startPos`, and you can take at most `k` steps (one unit per step, left or right). From each position you visit (including start), you collect all available fruits (then disappear). You must determine the maximum total number of fruits you can harvest after at most `k` steps.  

You may revisit positions (but fruits do not respawn), and you're allowed to move in both directions, but each move costs 1 step.

### Examples  

**Example 1:**  
Input: `fruits = [[2,8],[6,3],[8,6]], startPos = 5, k = 4`  
Output: `9`  
Explanation: Move right to position 6 (3 fruits), then right to 8 (6 fruits). In total, you move 3 steps: 3 + 6 = 9 fruits.

**Example 2:**  
Input: `fruits = [[0,9],[4,1],[5,7],[6,2],[7,4],[10,9]], startPos = 5, k = 4`  
Output: `14`  
Explanation:  
- Harvest 7 fruits at 5 (start)
- Move left to 4 (+1 fruit, 1 step)
- Move right to 6 (+2 fruits, 2 steps)
- Move right to 7 (+4 fruits, 1 step)
Total steps = 1 (left) + 3 (right) = 4 steps. Total fruits: 7 + 1 + 2 + 4 = 14.

**Example 3:**  
Input: `fruits = [[0,3],[3,5],[7,10],[9,2]], startPos = 4, k = 4`  
Output: `5`  
Explanation: Harvest 5 fruits by moving left to position 3 (1 step away).

### Thought Process (as if you’re the interviewee)  
- Brute force: For every possible set of steps (left/right), check all reachable fruits and sum. But there are too many combinations; not efficient for large inputs.
- Instead, observe: You can model the range of positions you can visit in at most `k` steps. For each possible interval `[l, r]`:
  - The minimal steps required: to reach l, go to l, then to r and return (if you go out and come back), or vice versa.
- Use prefix sums to calculate the total fruits in any segment quickly.
- Scan all possible positions you could reach to the left and right, considering the step budget, and maximize the fruits possible.
- Tradeoffs: Prefix sums turn the interval sum query to O(1), but the main logic needs careful two-pointer or sliding window approach.

### Corner cases to consider  
- All fruits are out of reach (solution = 0).
- Fruits at only one position, possibly the start position.
- Large gaps between fruit positions.
- k = 0 (can only harvest at startPos, if any).
- startPos is outside given fruit positions.
- Multiple positions with zero fruits.
- All positions are to only one side of startPos.
- Fruits at negative positions (if allowed by constraints).

### Solution

```python
def maxTotalFruits(fruits, startPos, k):
    # Find max rightmost position that matters
    maxRight = max(startPos, fruits[-1][0])
    # Allocate amounts at each possible position in the segment
    amounts = [0] * (maxRight + 1)
    for pos, amt in fruits:
        amounts[pos] = amt

    # Prefix sum: prefix[i] is total fruits up to pos i-1
    prefix = [0] * (maxRight + 2)
    for i in range(1, maxRight + 2):
        prefix[i] = prefix[i - 1] + amounts[i - 1]

    def harvest(leftSteps, rightSteps):
        l = max(0, startPos - leftSteps)
        r = min(maxRight, startPos + rightSteps)
        return prefix[r + 1] - prefix[l]

    ans = 0
    # Case 1: go right first (and maybe turn left afterwards)
    for rightSteps in range(0, min(maxRight - startPos, k) + 1):
        leftSteps = max(0, k - 2 * rightSteps)
        ans = max(ans, harvest(leftSteps, rightSteps))

    # Case 2: go left first (and maybe turn right afterwards)
    for leftSteps in range(0, min(startPos, k) + 1):
        rightSteps = max(0, k - 2 * leftSteps)
        ans = max(ans, harvest(leftSteps, rightSteps))

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(M + K), where M is the largest relevant position up to max(startPos, rightmost fruit). Each loop runs at most O(K) iterations, but usually much smaller. O(N) for initial fruit list, O(M) for prefix sum.
- **Space Complexity:** O(M), for the amounts and prefix arrays up to the farthest position.

### Potential follow-up questions (as if you’re the interviewer)  

- What if fruits are very sparse and positions can be up to 10⁹?  
  *Hint: Use a hash map instead of allocating arrays indexed by position.*

- Can you process queries for different start positions or step budgets efficiently?  
  *Hint: Store prefix sums and preprocess as much as possible for range queries.*

- Suppose the number of steps k is much larger than the range of fruit positions?  
  *Hint: Early exit; all reachable fruits can be harvested.*

### Summary
This problem uses the **prefix sum** and **sliding window**/two-pointer patterns to optimize interval sum queries. The key is translating a path with limited steps into a range query, and using prefix sums to compute those efficiently.  
This pattern applies to problems involving interval maximums, subarrays with movement constraints, or resource pickup with step limits.

### Tags
Array(#array), Binary Search(#binary-search), Sliding Window(#sliding-window), Prefix Sum(#prefix-sum)

### Similar Problems
- Maximum Performance of a Team(maximum-performance-of-a-team) (Hard)
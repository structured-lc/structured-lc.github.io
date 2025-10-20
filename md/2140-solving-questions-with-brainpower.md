### Leetcode 2140 (Medium): Solving Questions With Brainpower [Practice](https://leetcode.com/problems/solving-questions-with-brainpower)

### Description  
You are given a 0-indexed 2D integer array `questions`, where each `questions[i]` = [pointsᵢ, brainpowerᵢ]. For each question i:
- If you **solve** it, you earn pointsᵢ, but must **skip the next brainpowerᵢ questions**.
- If you **skip** it, you can make a decision normally at i+1.
Your task is to select questions to solve/skip in order to **maximize the total points** earned by the end of the list.

### Examples  

**Example 1:**  
Input: `questions = [[3,2],[4,3],[4,4],[2,5]]`  
Output: `5`  
*Explanation: Solve question 0 (earn 3, skip 1 and 2), then solve question 3 (earn 2). Total = 3 + 2 = 5.*

**Example 2:**  
Input: `questions = [[1,1],[2,2],[3,3],[4,4],[5,5]]`  
Output: `7`  
*Explanation:  
- Solve 0 (get 1, must skip 1), next possible is 2. 
- Solve 2 (get 3, must skip 3), next would be after 2+3=5 (>n-1). 
- Total = 1 + 3 = 4,  
OR  
- Skip 0, solve 1 (get 2, skip to 1+2+1=4), then solve 4 (get 5). Total = 2 + 5 = 7 (max).*

**Example 3:**  
Input: `questions = [[2,1],[2,1],[2,1],[2,1]]`  
Output: `4`  
*Explanation: Solve 0 (get 2, skip 1), solve 2 (get 2), total = 2 + 2 = 4.*

### Thought Process (as if you’re the interviewee)  
First, brute-force: at each i, try both solving and skipping the question, recursively finding which leads to a higher score.  
However, with n up to 10⁵, this approach results in exponential time.  

Recognizing overlapping subproblems, we optimize with **DP**:
- Let dp[i] = max points collectible starting at i.
- At i, two options:
  - **Solve:** take pointsᵢ, then continue at i+brainpowerᵢ+1
  - **Skip:** continue at i+1
- Recurrence: dp[i] = max(pointsᵢ + dp[i+brainpowerᵢ+1], dp[i+1])
- We'll fill dp[] from the end to the start (bottom-up), or use memoized recursion (top-down).

Bottom-up is more space efficient if we only keep a 1D dp array of n+1 size.

### Corner cases to consider  
- Empty `questions` array (`questions = []`)
- Single question, e.g., [[x, y]]
- All brainpowerᵢ = 0 (can solve all)
- All brainpowerᵢ large (solve at most one)
- All pointsᵢ = 0 (maximize by skipping every question)
- Skipping always yields more than solving
- Cases where optimal path is not greedy (local best is not global best)

### Solution

```python
def mostPoints(questions):
    n = len(questions)
    dp = [0] * (n + 1)  # dp[i]: max points from i onwards
    
    for i in range(n - 1, -1, -1):
        points, brainpower = questions[i]
        # If solving this question: earn points, skip the next brainpower questions
        next_index = i + brainpower + 1
        solve = points + (dp[next_index] if next_index < n else 0)
        # Or skip this question: just move to the next
        skip = dp[i + 1]
        dp[i] = max(solve, skip)
    
    return dp[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we process each question exactly once in the bottom-up DP traversal.
- **Space Complexity:** O(n), for the dp array of size n+1.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve the problem if the input list is **streaming** and too large to hold dp for all positions?
  *Hint: Can we reduce the state you really need, maybe sliding window or only limited lookahead?*

- Can you optimize **space complexity** further, if you only care about the result and not the recovery of the selected questions?
  *Hint: Notice dp[i] only uses dp[i+1] and sometimes dp[j > i+1]; is in-place possible?*

- What if you also need to **recover the optimal sequence** of questions taken?
  *Hint: Store choice information at each index during DP, then retrace the path at the end.*

### Summary
This problem is an application of **DP on an array**, similar to the "House Robber" pattern: for each index, decide to "take" or "skip" based on maximizing a local choice plus what's optimal for the rest. Recognizing overlapping subproblems and the fact that future optimal solutions only depend on later indices makes DP natural and efficient. This coding pattern is common in problems such as "Maximum Non-Adjacent Sum", "House Robber", and problems involving sequential exclusion-worth decisions.


### Flashcard
DP from end to start: dp[i] = max(solve question i and skip brainpower[i] positions, or skip to i+1).

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- House Robber(house-robber) (Medium)
- Frog Jump(frog-jump) (Hard)
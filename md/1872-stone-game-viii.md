### Leetcode 1872 (Hard): Stone Game VIII [Practice](https://leetcode.com/problems/stone-game-viii)

### Description  
Given an array representing the values of stones in a row, two players (Alice and Bob) play a turn-based game. Starting with Alice, on each turn the player must choose to remove the leftmost \( x \) stones (for some \( x > 1 \)), sum their values (which gets added to their score), and place a new stone (with this sum as its value) on the far left. The sequence shrinks, repeating this process until only one stone remains. Find the maximum score difference (Alice's score minus Bob's score), assuming both play optimally.

### Examples  

**Example 1:**  
Input: `stones = [-1,2,-3,4,-5]`  
Output: `5`  
*Explanation: Alice can pick all 5 stones at once, sum = -1+2-3+4-5 = -3, but that's not optimal.
Optimal:  
- Alice picks `-1,2` (sum=1), stones: `[1,-3,4,-5]`  
- Bob picks `1,-3` (sum=-2), stones: `[-2,4,-5]`  
- Alice picks `-2,4` (sum=2), stones: `[2,-5]`  
- Bob must take all stones, final sum = 2 + (-5) = -3

At the end, following optimal choices, Alice's score minus Bob's is 5.

**Example 2:**  
Input: `stones = [7,-6,5,10,5,-2,-6]`  
Output: `13`  
*Explanation:  
Alice removes all the stones in one move, sum is 7 + (-6) + 5 + 10 + 5 + (-2) + (-6) = 13.  
Bob gets nothing. Final diff is 13.

**Example 3:**  
Input: `stones = [-10,-12]`  
Output: `-22`  
*Explanation:  
Alice must take both stones (since x > 1), sum = -10 + (-12) = -22.  
Bob cannot move. Final diff is -22.

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach**:  
Try every valid move for both players recursively, simulating all possible game states, keeping track of Alice's and Bob's respective scores and picking the optimal at each turn.  
This is too slow (exponential), as the number of possible game states grows rapidly with n.

- **Optimization**:  
Notice the new stone placement always sums prefix, so use prefix sums. The main state is where, after several operations, the remaining array always contains a new prefix-sum as its first element. Let’s build a prefix sum array s[], where s[i] = sum of the first i+1 stones.

- At each move (except the last two, since x > 1), player can choose to "merge" the leftmost k stones (for k in 2...n), and the outcome depends only on the prefix sum.
- Define dp[i] as the max score difference possible when there are stones[i:] left. The transition is dp[i] = max(dp[i+1], s[i] - dp[i+1]).
- Reverse-iterate, updating the maximum in a variable as you go.

- **Optimal approach**:  
We only need to consider the suffixes--since as the game progresses, the only choices are to stop (keep previous diff) or take more stones. Thus, by going backwards and using prefix sums, time complexity is O(n).

### Corner cases to consider  
- Only two stones: must take both in one move  
- All stones have negative values  
- All stones have positive values  
- Mixed signs, with optimal moves not always being the largest upfront take  
- Large stone arrays (test time/space efficiency)

### Solution

```python
from itertools import accumulate

def stoneGameVIII(stones):
    # Compute prefix sums, s[i] = sum of stones[0]...stones[i]
    prefix = list(accumulate(stones))
    n = len(stones)
    
    # Start dp from the end: At last possible take, only option is prefix[n-1]
    ans = prefix[-1]
    # Work backwards from n-2 down to 1 (x > 1, so must take at least first 2 stones)
    for i in range(n-2, 0, -1):
        # Simulate: either keep skipping (ans), or take prefix[i] now (prefix[i] - ans)
        ans = max(ans, prefix[i] - ans)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of stones (just building prefix sums and looping through them).
- **Space Complexity:** O(n) for prefix sums. (Can be reduced to O(1) with some clever iteration and math, but O(n) is clear and efficient here.)

### Potential follow-up questions (as if you’re the interviewer)  

- What if Alice is allowed to pick any number of stones (not necessarily from the front)?  
  *Hint: Consider implications for DP state structure.*

- How would you change your approach if you needed to output the sequence of moves?  
  *Hint: Track actual chosen indices or decisions during your DP.*

- How would strategy change if both players maximized their *absolute* score instead of difference?  
  *Hint: Model both players’ options; may require a two-variable DP.*

### Summary
This problem is a **game theory + dynamic programming** pattern, common in two-player “take-away” or “merge” games. The main leap is recognizing that by using the prefix sums and only considering cumulative take-or-skip decisions, we can reduce the state space to O(n). Similar strategies are frequently used in stone and coin game variants or interval DP problems.


### Flashcard
Utilize prefix sums to optimize the stone game by focusing on remaining array states.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Prefix Sum(#prefix-sum), Game Theory(#game-theory)

### Similar Problems
- Stone Game(stone-game) (Medium)
- Stone Game II(stone-game-ii) (Medium)
- Stone Game III(stone-game-iii) (Hard)
- Stone Game IV(stone-game-iv) (Hard)
- Stone Game V(stone-game-v) (Hard)
- Stone Game VI(stone-game-vi) (Medium)
- Stone Game VII(stone-game-vii) (Medium)
- Stone Game VIII(stone-game-viii) (Hard)
- Stone Game IX(stone-game-ix) (Medium)
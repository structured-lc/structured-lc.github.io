### Leetcode 948 (Medium): Bag of Tokens [Practice](https://leetcode.com/problems/bag-of-tokens)

### Description  
You are given an integer array representing tokens and a starting integer power.  
- You can play a token in one of two ways:
  - **Face up:** Spend tokens[i] amount of power to gain 1 score (only if you have enough power).
  - **Face down:** Lose 1 score to gain tokens[j] amount of power (only if you have at least 1 score).
Your goal: **Find the maximum score you can achieve** by playing tokens any number of times (in any order).

### Examples  

**Example 1:**  
Input: `tokens = , power = 50`  
Output: `0`  
*Explanation: You don’t have enough power to play any tokens face up. The score remains 0.*

**Example 2:**  
Input: `tokens = [100, 200], power = 150`  
Output: `1`  
*Explanation: Play token 100 face up (power: 150→50, score: 0→1). Now, you don’t have enough power for 200, and you can’t play any token face down as your score is just 1. So the result is 1.*

**Example 3:**  
Input: `tokens = [100, 200, 300, 400], power = 200`  
Output: `2`  
*Explanation:*
- Play 100 face up (power: 200→100, score: 0→1)
- Play 200 face up (power: 100→-100 not enough, so stop here)
- Play 400 face down is not possible yet (not enough score)
- But, you could:
  1. Play 100 face up (power: 200→100, score: 0→1)
  2. Play 400 face down (score: 1→0, power: 100→500)
  3. Play 200 face up (power: 500→300, score: 0→1)
  4. Play 300 face up (power: 300→0, score: 1→2)
  Result: Highest possible score is 2.

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Try all permutations to maximize score. This is infeasible—O(n!) due to all combinations of up/down plays.
- **Optimization**: Since “face up” gives you score but costs the least power for the smallest tokens, and “face down” gives you back the most power for the biggest tokens, try a *greedy* two-pointer technique.
- **Approach**:
  - **Sort tokens**: smallest to largest.
  - Use two pointers: left (`l`) at smallest token and right (`r`) at largest token.
  - While possible:
    - If enough power, play left-most (smallest) “face up” and move `l` right (++score).
    - Else, if you have at least 1 score, play right-most (largest) “face down” and move `r` left (--score), regaining power.
    - Track the max score seen.
  - Stop when neither move is possible.
- **Trade-offs**: Guarantees the maximum score because playing cheaper tokens face up allows you to gain score more efficiently, while “selling” your lowest-value scores to gain the most power if stuck.

### Corner cases to consider  
- tokens is empty: Output is always 0.
- tokens with all values > power: Can’t play any cards.
- Only one token: Either can or can’t play, edge conditions.
- tokens with duplicate values.
- Large power at start, can play all tokens face up.
- Power = 0 at start.
- All tokens cost the same.

### Solution

```python
def bagOfTokensScore(tokens, power):
    tokens.sort()  # Sort to access cheapest/largest tokens easily
    l, r = 0, len(tokens) - 1
    score = max_score = 0
    
    while l <= r:
        if power >= tokens[l]:
            # Play tokens[l] face up: gain score, lose power
            power -= tokens[l]
            score += 1
            l += 1
            max_score = max(max_score, score)
        elif score > 0:
            # Play tokens[r] face down: lose score, gain power
            power += tokens[r]
            score -= 1
            r -= 1
        else:
            break  # Can't do any more moves
    
    return max_score
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) for sorting the tokens. The two-pointer process is O(n).
- **Space Complexity:** O(1) extra space (in-place sorting if allowed, otherwise O(n) if sorting not in-place), and a constant number of variables.

### Potential follow-up questions (as if you’re the interviewer)  

- If tokens or power are very large (close to 10⁹), what issues might arise?
  *Hint: Integer overflow or memory issues.*
- Can you reconstruct the sequence of moves for the optimal score?
  *Hint: Track actions at each step in another list.*
- If “face down” is only allowed once, how would you change the approach?
  *Hint: Only allow one use of the right pointer.*

### Summary
This problem uses the **greedy + two-pointer** technique. Sorting allows greedy selection of smallest tokens for “face up” moves and largest for “face down” moves, maximizing score opportunities. This pattern is *common* when both spending and gaining resources are allowed in limited moves (e.g., maximizing score/money/energy with transactions). The same pattern applies to problems like maximizing profit in stock trading with buy/sell limits.


### Flashcard
Sort tokens; use two pointers—spend smallest for score, regain power with largest if needed, maximizing score.

### Tags
Array(#array), Two Pointers(#two-pointers), Greedy(#greedy), Sorting(#sorting)

### Similar Problems

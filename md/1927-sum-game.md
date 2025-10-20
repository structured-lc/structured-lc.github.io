### Leetcode 1927 (Medium): Sum Game [Practice](https://leetcode.com/problems/sum-game)

### Description  
Given a string of even length containing digits and the '?' character, Alice and Bob take turns replacing any '?' with a digit '0'-'9' (Alice moves first). Once there are no '?' left, if the sum of the first half of the digits equals that of the second half, Bob wins; otherwise, Alice wins. Determine if Alice can guarantee a win, assuming optimal moves from both players.

### Examples  

**Example 1:**  
Input: `num = "5023"`  
Output: `false`  
*Explanation: There are no '?'. The first half is "50" → sum is 5+0=5. The second half is "23" → sum is 2+3=5. Since the sums are equal, Bob wins (return false).*

**Example 2:**  
Input: `num = "25??"`  
Output: `true`  
*Explanation: First half "25" → sum is 2+5=7. Second half "??". Alice can force impossible balance: e.g. fill with "00" → sum 0, or "99" → sum 18, or anything else. It's impossible to make both halves sum to 7 regardless of Bob's move. So Alice wins.*

**Example 3:**  
Input: `num = "?3295???0"`  
Output: `true`  
*Explanation: Let's split: n=8, first half "?329" (1 '?'), second half "5???0" (3 '?'), current left sum 3+2+9=14, right sum 5+0=5. Since '?' are unequally distributed, Alice can always unbalance by her first turn regardless of what Bob does.*

### Thought Process (as if you’re the interviewee)  
First, I note that both players want to minimize/maximize the difference in sums between the halves, but Bob only wins if both halves sum exactly equal. We should count known digit sums and count of '?' in both halves.  
- If the total number of '?' is odd, Alice wins: she always has the last move; therefore, she can force asymmetry.
- If total question marks is even, and Alice and Bob both play optimally, the only way Bob can win is if Alice cannot enforce a difference in the final sum. The optimal way for Bob is to mirror whatever Alice does, but if Alice can deviate the sums more than Bob can balance, Alice wins.
- Compute the sum difference and the '?' difference between the two halves. Let left_sum and right_sum be the current sums, and l_q, r_q be the numbers of '?'. If the final potential difference via optimal fills can't be balanced, Alice can force a win.

### Corner cases to consider  
- No '?': straight sum comparison.
- All '?', especially odd vs even counts.
- Imbalanced '?' in the two halves.
- Very short (length=2) or very long strings.
- '?'s only in one half.

### Solution

```python
def sumGame(num: str) -> bool:
    n = len(num)
    half = n // 2

    left_sum = 0
    right_sum = 0
    left_q = 0
    right_q = 0

    for i in range(half):
        if num[i] == '?':
            left_q += 1
        else:
            left_sum += int(num[i])
    for i in range(half, n):
        if num[i] == '?':
            right_q += 1
        else:
            right_sum += int(num[i])

    # If total '?' is odd, Alice always wins since she has the last move.
    if (left_q + right_q) % 2 != 0:
        return True

    # Each '?' can be any digit 0-9.
    # The max possible difference each player can create is 9 × #moves
    # Alice's possible contribution is (left_q - right_q) × 9 // 2
    # Difference in sum:
    diff = left_sum - right_sum
    qd = left_q - right_q

    # If by both filling optimally, the halves can't balance, Alice wins
    return diff != (-qd * 9) // 2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as we iterate through the string once to calculate sums and question mark counts.
- **Space Complexity:** O(1), as only a constant number of variables are used for calculation

### Potential follow-up questions (as if you’re the interviewer)  

- What if '?' can only be replaced by digits in a restricted set (like only even numbers)?
  *Hint: Adjust optimal delta per move and check whether parity matters.*

- What if the string has odd length?
  *Hint: Can the halves ever be equal? How do you split mid digit?*

- Can you return the minimum number of moves that guarantee Alice a win?
  *Hint: Quantify at what move parity unavoidable imbalance occurs.*

### Summary
This problem taps into game theory and parity analysis: evaluating how "unknown" spots (question marks) distribute, and analyzing if a player can force an imbalance based on their position (first or second) and count of moves. The core pattern is turning the question into a deterministic sum-difference analysis, given any optimal choices left to both players — often seen in two-player, turn-based strategy games.


### Flashcard
If total '?' is odd, Alice wins; if even, compare known sums and question mark counts for possible tie.

### Tags
Math(#math), String(#string), Greedy(#greedy), Game Theory(#game-theory)

### Similar Problems

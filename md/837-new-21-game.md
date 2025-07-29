### Leetcode 837 (Medium): New 21 Game [Practice](https://leetcode.com/problems/new-21-game)

### Description  
Alice starts with 0 points and draws numbers from 1 to `maxPts` (inclusive), each draw uniformly at random. After each draw, the total score is updated with the value of the drawn number. Once Alice’s score is at least `k`, she stops drawing. Given integers `n`, `k`, and `maxPts`, compute the probability that Alice’s final score is less than or equal to `n` when the game ends.

### Examples  

**Example 1:**  
Input: `n=10, k=1, maxPts=10`  
Output: `1.0`  
*Explanation: Alice needs at least 1 to stop drawing. Since she starts with 0, her first (and only) draw guarantees ending with a score between 1 and 10, always ≤ n.*

**Example 2:**  
Input: `n=6, k=1, maxPts=10`  
Output: `0.6`  
*Explanation: Alice can only draw once, getting a score from 1 to 10. The outcomes 1–6 are valid, so the probability is 6/10 = 0.6.*

**Example 3:**  
Input: `n=21, k=17, maxPts=10`  
Output: `0.73278`  
*Explanation: Alice draws numbers one by one, stopping when her total is ≥ 17. There are several ways to reach a final score up to 21, but not above. The result is the computed probability to finish between 17 and 21 (inclusive).*

### Thought Process (as if you’re the interviewee)  
- The problem is about **calculating probability** using a random process where at each step, there are `maxPts` options.
- The naive approach simulates all possible draws recursively, but this explodes combinatorially.
- Observing that the **probability of reaching a certain score only depends on previous states**, we spot an opportunity for **dynamic programming**.

Brute-force:
- Recursively try every possible draw, summing probabilities for each path that ends ≤ n.
- Too slow for larger constraints (exponential complexity).

DP approach:
- Define `dp[x]` as the probability of being at score `x`.
- For `x < k`, Alice can draw; for `x ≥ k`, the game ends.
- If Alice has at least `k` points, she can't draw and her score is final; for `k ≤ x ≤ n`, these are the successful end states.
- To compute `dp[x]`, sum probabilities of last step for each possible draw. Efficiently maintain a sliding sum to avoid recomputing overlapping subproblems.

Choose final approach:
- Dynamic programming with a sliding window for range sums is efficient. The state only depends on next `maxPts` states. The computation is O(n) rather than O(n × maxPts).

### Corner cases to consider  
- `k = 0`: Alice never draws. She’s already at or above k, so the probability her score is ≤ n is 1 if n ≥ 0, 0 otherwise.
- `n < k`: Alice can’t reach k, so she never draws; probability is 0.
- `maxPts = 1`: Only one possible draw each time.
- Large values: Test for time/memory limits and precision.
- Very small or large `n`, `k`, and `maxPts`.

### Solution

```python
def new21Game(n, k, maxPts):
    # dp[x]: probability of reaching sum x
    dp = [0.0] * (n + 1)
    dp[0] = 1.0  # Start at score 0

    window_sum = 1.0  # Running sum of last maxPts probabilities
    result = 0.0

    for x in range(1, n + 1):
        dp[x] = window_sum / maxPts
        if x < k:
            window_sum += dp[x]   # Alice may draw again if score < k
        else:
            result += dp[x]       # Alice stops if score ≥ k
        # Remove dp[x - maxPts] from the window if window shifted beyond that point
        if x - maxPts >= 0:
            window_sum -= dp[x - maxPts]

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each score 1..n is evaluated once in the loop, all operations inside the loop are constant time due to sliding window.
- **Space Complexity:** O(n) — We keep a DP array of size n+1.

### Potential follow-up questions (as if you’re the interviewer)  

- What if Alice draws with a different probability for each score instead of uniform?
  *Hint: The recurrence changes; can you handle a weighted sum efficiently?*
- Can you reduce the space to O(k) or O(maxPts)?
  *Hint: Only the sliding window needs to be kept in memory, not the whole DP table.*
- Is it possible to compute the result in O(1) time for some cases?
  *Hint: For k=0 or other trivial cases, a formula applies.*

### Summary
This problem uses **dynamic programming with a sliding window** (a common optimization for DP transitions over ranges). It is a classic example of **probabilistic DP**, often used for games or random walks. The approach avoids explicit enumeration of all paths by capturing the recurrence efficiently. This pattern is applicable to problems involving sums over ranges, e.g., dice roll simulations, and Markov chains.
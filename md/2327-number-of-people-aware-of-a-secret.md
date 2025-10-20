### Leetcode 2327 (Medium): Number of People Aware of a Secret [Practice](https://leetcode.com/problems/number-of-people-aware-of-a-secret)

### Description  
Suppose on day 1, one person discovers a secret. From that day, each person who learns the secret will:
- Wait a minimum of **delay** days before they start sharing the secret with exactly one new person per day.
- Each person will forget the secret exactly **forget** days after learning it and will never share after forgetting.

Given integers `n` (number of days), `delay` (days before sharing), and `forget` (days before forgetting), find how many people know the secret (haven't forgotten) after `n` days. Return the result modulo 10⁹+7 (since the answer can be large).

### Examples  

**Example 1:**  
Input: `n=6, delay=2, forget=4`  
Output: `5`  
*Explanation:*
- Day 1: 1 person learns (only 1 knows).
- Day 2: Can't share yet.
- Day 3: Starts sharing; 1 new person knows (2 total).
- Day 4: Both can now share, 2 new people know (now 4).
- Day 5: One person forgets, 2 more learn (5 know).
- People who know the secret at day 6: 5.

**Example 2:**  
Input: `n=4, delay=1, forget=3`  
Output: `6`  
*Explanation:*
- Day 1: 1 person learns (1 knows)
- Day 2: Can share right away; 1 new person (2 know)
- Day 3: Both share; 2 more (4 know, nobody has forgotten yet)
- Day 4: All share; 4 more learn (8 know, one will forget at end)
- After day 4, lost the first one, so 8-2=6 know.

**Example 3:**  
Input: `n=10, delay=3, forget=6`  
Output: `17`  
*Explanation:*
- Keep a count for each day, track when new people start sharing and when people forget.
- At the end of day 10, total number who haven't forgotten = 17.


### Thought Process (as if you’re the interviewee)

- **Brute-force idea:**  
  - Simulate each person, day by day. For everyone who knows the secret, after delay days they start sharing, and after forget days they forget.
  - Challenging, because number of people can grow exponentially—won't fit time bounds for large `n`.

- **DP/Prefix Sum approach:**  
  - Since sharing and forgetting are *interval* events, we can use prefix sums or difference arrays.
  - Track, for each day, how many new people learn the secret (call this `d[i]`); for each such person, increment number of sharers starting on day `i+delay`, decrement on day `i+forget`.  
  - At every day, sum those who haven't forgotten yet. Result is total people who discovered between day `n - forget + 1` and day `n`.

- **Why choose this approach?**  
  - Time: O(n), Space: O(n), works well because events are all additive, and memory per-day suffices.
  - Common pattern: *sweep line* or *difference array* (like range update in arrays).

### Corner cases to consider  
- `n < delay`: nobody gets to share, only the first person knows.
- `forget == delay`: people forget exactly as they would start sharing, so only direct shares.
- `forget` very large: nobody forgets before `n`, so all people accumulate.
- `delay` == 1: sharing starts next day.
- Input at constraint extrema: test n, delay, forget at their minimum and maximum limits.

### Solution

```python
def peopleAwareOfSecret(n, delay, forget):
    MOD = 10 ** 9 + 7
    # d[i]: number of people who learn the secret on day i
    d = [0] * (n + forget + 2)
    d[1] = 1  # Day 1: one person knows the secret
    for day in range(1, n + 1):
        if d[day] == 0:
            continue
        # This group of d[day] people will start sharing from (day + delay) to (day + forget - 1)
        share_start = day + delay
        share_end = day + forget
        if share_start <= n:
            d[share_start] = (d[share_start] + d[day]) % MOD
        if share_end <= n:
            d[share_end] = (d[share_end] - d[day]) % MOD

        # Accumulate sharing effect for next day
        d[day + 1] = (d[day + 1] + d[day]) % MOD
    # Collect those who learned within range [n - forget + 1, n]
    result = 0
    for i in range(n - forget + 1, n + 1):
        result = (result + d[i]) % MOD
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Iterate per day and apply difference updates, all within the range of n.

- **Space Complexity:** O(n).  
  Uses an array proportional to n for per-day accounting; no recursion or per-person allocations.


### Potential follow-up questions (as if you’re the interviewer)  

- What if each person can share with *k* new people per day?
  *Hint: What changes in the recurrence and sharing intervals if sharing is with multiple instead of one.*

- How would you answer for intervals [L, R]—how many know at any specific range of days?
  *Hint: Maintain prefix sums, or use more efficient range queries.*

- Can you optimize space usage if n is very large but delay/forget are much smaller?
  *Hint: Circular or sliding window arrays suffice as only last `forget` days are active.*


### Summary

This problem uses the *difference array / sweep line* technique and a cumulative counting mechanism for events unfolding over days, making it a classic "scheduled state change" problem seen often in range query, propagation, and DP scenarios. The space and time approach generalizes well to similar problems involving contagious processes, cascade scheduling, or interval DP.


### Flashcard
Use a difference array or prefix sum to track how many people learn, share, and forget the secret each day; update counts efficiently to avoid simulating every person.

### Tags
Dynamic Programming(#dynamic-programming), Queue(#queue), Simulation(#simulation)

### Similar Problems

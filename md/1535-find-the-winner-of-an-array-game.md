### Leetcode 1535 (Medium): Find the Winner of an Array Game [Practice](https://leetcode.com/problems/find-the-winner-of-an-array-game)

### Description  
Given an integer array, imagine a game: in each round, compare the first two elements. The larger stays at the front, the smaller goes to the end. The first element that wins k consecutive rounds wins the game. If no number wins k rounds before reaching the end, the maximum number will inevitably win, since nothing can beat it further.

### Examples  

**Example 1:**  
Input: `arr = [2,1,3,5,4,6,7], k = 2`  
Output: `3`  
*Explanation: 2 vs 1 → 2 wins (cnt=1), 2 vs 3 → 3 wins (cnt=1), 3 vs 5 → 5 wins (cnt=1), keep going until one number wins for k=2 consecutive rounds. 3 wins two consecutive rounds first.*

**Example 2:**  
Input: `arr = [3,2,1], k = 10`  
Output: `3`  
*Explanation: Since k > n, the max value (3) will eventually win as it can't be beaten. It is returned by default if no earlier k-consecutive win reached.*

**Example 3:**  
Input: `arr = [1,25,35,42,68,70], k = 1`  
Output: `25`  
*Explanation: 1 vs 25 → 25 wins, that is already 1 consecutive win, so stop.*


### Thought Process (as if you’re the interviewee)  
- Brute-force: Simulate the game literally, compare front two numbers each time, move the loser to the end, track consecutive wins. But we need to stop when a number wins k times.
- Optimization: Notice that as soon as the max appears at front, it can never lose. If k larger than n, max will win. Iterate through array, keep current winner and its win streak. If someone beats the current winner, reset count; otherwise, increment count. Stop at count == k.

### Corner cases to consider  
- k = 1: Fast win, just compare first two numbers.
- k ≥ n: Maximum number guaranteed to win.
- Array contains all identical elements.
- Array of size 1 (not possible per constraints but worth mentioning for robustness).

### Solution

```python
from typing import List

def getWinner(arr: List[int], k: int) -> int:
    max_elem = arr[0]
    cnt = 0
    for x in arr[1:]:
        if x > max_elem:
            max_elem = x
            cnt = 1
        else:
            cnt += 1
        if cnt == k:
            return max_elem
    return max_elem
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) – We scan the array once, at most n iterations.
- **Space Complexity:** O(1) – Only a constant amount of extra space for variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is extremely large and cannot fit in memory?
  *Hint: Can you use streams or process in chunks, maintaining only current winner and streak?*

- If there are multiple winners with the same value, who should be returned?
  *Hint: The first to reach k wins, per simulation order.*

- How would you design this if players could "tie"?
  *Hint: Would need extra tie-breaking rules, logic would change.*

### Summary
This problem exemplifies the sliding window & simulation pattern, using counters to keep track of a local game's state. The insight that the global maximum eventually wins if k is large avoids unnecessary simulation, providing an efficient solution. This type of direct simulation + early termination applies to many array/competition style problems.
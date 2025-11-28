### Leetcode 3096 (Medium): Minimum Levels to Gain More Points [Practice](https://leetcode.com/problems/minimum-levels-to-gain-more-points)

### Description  
You are given a binary array `possible` representing the outcomes of n consecutive game levels. Alice and Bob play these levels in order:  
- Alice starts from level 0 and can choose to stop after any level i (playing at least 1 level; 1 ≤ i < n).
- Bob plays the remaining levels (at least 1 level).
- If `possible[j] == 1`, a cleared level gives +1 point. If `possible[j] == 0`, the player earns -1 point.  
Return the minimum number of levels Alice must play to guarantee she gets more points than Bob, assuming both play optimally. If impossible, return -1.

### Examples  

**Example 1:**  
Input: `possible = [1,0,1,0]`  
Output: `1`  
*Explanation: If Alice plays only the first level ([1]), her score is +1. Bob plays [0,1,0], earning -1 +1 -1 = -1. Alice wins with minimal levels.*

**Example 2:**  
Input: `possible = [1,1,1,1,1]`  
Output: `3`  
*Explanation:  
Alice's total if she stops after:  
- level 0: 1; Bob: 4.  
- level 1: 2; Bob: 3.  
- level 2: 3; Bob: 2  ← Alice’s score is finally more than Bob’s after 3 levels.  
Thus, output = 3.*

**Example 3:**  
Input: `possible = [0,0,1,0]`  
Output: `2`  
*Explanation:  
- After 1 level: Alice: -1; Bob: 0,1,0 → -1+1-1= -1.  
- After 2 levels: Alice: -1 -1 = -2; Bob: 1,0 → 1-1 = 0.  
But Alice never gets more than Bob. Output is -1.*

### Thought Process (as if you’re the interviewee)  
First, both Alice and Bob must play at least one level each.  
The main trick is that Alice can only choose a *prefix* of the array. For any prefix, Bob takes the suffix.  
Score for Alice: sum of first k elements (let’s say, `prefixSum[k-1]`), Bob: sum of remaining (from k to end: `totalSum - prefixSum[k-1]`)  
We’re looking for the smallest k such that Alice's score > Bob's.  
So:  
prefixSum[k-1] > totalSum - prefixSum[k-1]  
2 \* prefixSum[k-1] > totalSum  
So, the answer is the smallest k (1 ≤ k < n) such that 2 × prefixSum[k-1] > totalSum, else -1.  
Brute force: Try all splits.  
Optimized: Single pass, compute prefix sum as you go.

### Corner cases to consider  
- All zeros: result will always be negative, so expect -1 output  
- Only one level: invalid, as both need to play at least one  
- Negative and positive sum cancels out, but never becomes Alice > Bob: return -1  
- First level itself enough: return 1

### Solution

```python
def minimum_levels(possible):
    n = len(possible)
    total = 0
    # Precompute total score: +1 for 1, -1 for 0
    arr = [1 if x == 1 else -1 for x in possible]
    total = sum(arr)
    prefix = 0
    # Try all possible splits: Alice plays first k (k from 1 to n-1)
    for k in range(1, n):
        prefix += arr[k-1]
        if 2 * prefix > total:
            return k
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We process the array once to compute prefix sums in a single pass.
- **Space Complexity:** O(1)  
  Extra storage: only a few variables. Input is not modified; only prefix, total, and a loop counter.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the scores for cleared and failed levels were not +1 and -1 but arbitrary values (e.g., possible[i] could be +a or -b)?  
  *Hint: How would your prefix sum logic change with arbitrary values?*

- What if both players could choose their own segments instead of only a prefix and suffix split?  
  *Hint: This could turn into subarray maximum-minimum segment gaming.*

- What if you needed to return all split positions where Alice could win, not just the minimum number?  
  *Hint: Track all valid k where the condition is met.*

### Summary
This problem is a classic prefix sum array split scenario, looking for a greedy optimal cut. It's similar to two-part partition problems, and the coding pattern (single-pass prefix-suffix comparison) is common in interview questions dealing with contiguous splits, array sum dominance, or team selection scenarios.


### Flashcard
Alice picks a prefix, Bob takes the suffix; find smallest k where prefixSum[k-1] > totalSum - prefixSum[k-1], i.e., 2 × prefixSum[k-1] > totalSum.

### Tags
Array(#array), Prefix Sum(#prefix-sum)

### Similar Problems
- Minimum Rounds to Complete All Tasks(minimum-rounds-to-complete-all-tasks) (Medium)
### Leetcode 3177 (Hard): Find the Maximum Length of a Good Subsequence II [Practice](https://leetcode.com/problems/find-the-maximum-length-of-a-good-subsequence-ii)

### Description  
Given an integer array **nums** and a non-negative integer **k**, return the length of the longest **good** subsequence of **nums**.  
A subsequence is **good** if there are **at most k** indices **i** (where 0 ≤ i < seq.length - 1) such that **seq[i] ≠ seq[i+1]** (i.e., adjacent values change at most k times).  
You must choose any subsequence (order preserved). Adjacent elements in your chosen subsequence may change value at most **k** times.

---

### Examples  

**Example 1:**  
Input: `nums = [1,2,1,1,3]`, `k = 2`  
Output: `4`  
Explanation:  
We can pick `[1,2,1,1]` (value changes occur at indices 0→1 (`1→2`) and 1→2 (`2→1`), exactly 2 changes).

**Example 2:**  
Input: `nums = [1,2,3,4,5,1]`, `k = 0`  
Output: `2`  
Explanation:  
We must pick a subsequence with no adjacent value changes. The best is `[1,1]` (using the first and last elements, count=2).

**Example 3:**  
Input: `nums = [1,3,2,3,4,3]`, `k = 1`  
Output: `2`  
Explanation:  
With k=1, we can only pick at most one value change. Example `[3,3]`, `[1,1]`, `[2,2]`, etc.

---

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  I could generate all possible subsequences, count adjacent changes for each, and filter those with at most k. Take the maximum length. This approach is exponential (O(2ⁿ)), infeasible for n up to 10⁵.

- **Dynamic Programming:**  
  Let's try to build from smaller subproblems:
  
    - For each index i, and for each possible count of changes h (0 ≤ h ≤ k), keep track of max length subsequence **ending at nums[i]** with **h** changes.
    - Transitions: if I extend the subsequence by picking nums[i], the "change count" increases if the previous value is different; otherwise, it stays the same.
    - Since we don’t care about the full sequence but just value and change count, we can memoize on (value, h):  
      dp[value][h] = max subsequence length ending with 'value' using h changes.

- For each num in nums, for each possible allowed h (0..k):
    - If we don’t change value, extend from dp[num][h]: just add 1 to max so far.
    - If we change value, for each previous value ≠ num, extend from dp[prev_val][h-1].

- Optimize: Instead of considering all values, store the best dp for each (value, h).

- **Tradeoff:**  
  O(n × k) time and space.

---

### Corner cases to consider  
- nums has only one element.
- k = 0 (no adjacent value changes allowed).
- All values in nums are the same.
- nums has entirely unique elements.
- nums is very large.

---

### Solution

```python
def maximumLength(nums, k):
    # dp: key = (num, h), value = max length of a "good" subsequence
    from collections import defaultdict

    dp = defaultdict(int)
    result = 0
    
    for num in nums:
        # Next DP state after adding 'num'
        next_dp = dp.copy()
        
        # Always possible to start new subsequence with just [num], 0 changes
        next_dp[(num, 0)] = max(next_dp.get((num, 0), 0), 1)
        
        for (last_num, h), length in dp.items():
            # If num == last_num: extending without increasing change count  
            if num == last_num:
                next_dp[(num, h)] = max(next_dp.get((num, h), 0), length + 1)
            # If num != last_num: can we increase number of changes?
            elif h + 1 <= k:
                next_dp[(num, h + 1)] = max(next_dp.get((num, h + 1), 0), length + 1)
        
        dp = next_dp
        # Update result: best of all dp entries seen
        for length in dp.values():
            result = max(result, length)
    
    return result
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k).  
  Each element is processed once, and for every state (value, h) we may transition to up to k entries.

- **Space Complexity:** O(n × k) in the worst case (if all numbers and change levels are unique).

---

### Potential follow-up questions (as if you’re the interviewer)  

- Can you output the actual subsequence, not just its length?  
  *Hint: Add parent pointers or paths into your DP state.*

- How would you handle k much larger than n (e.g., k > n)?  
  *Hint: For k ≥ n-1, answer is the length of nums (pick all)*

- If the array is very large but the number of unique values is small, can you optimize the memory further?  
  *Hint: Prune DP states that can't possibly improve future results.*

---

### Summary
This problem is a variation of the classic subsequence DP pattern, but instead of requiring strictly increasing, it controls the number of allowed transitions in value.  
The core insight is to use dynamic programming, indexed on (current value, allowed changes), to propagate maximal subsequence length as the array is traversed.  
Such a DP approach is common for advanced variants of longest increasing/decreasing subsequence and other sequence selection under constraints.
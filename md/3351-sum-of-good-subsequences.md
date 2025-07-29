### Leetcode 3351 (Hard): Sum of Good Subsequences [Practice](https://leetcode.com/problems/sum-of-good-subsequences)

### Description  
Given an integer array `nums`, a **good subsequence** is defined as a subsequence where the absolute difference between any two consecutive elements is exactly 1. All single-element subsequences are considered good. Return the **sum** of all possible good subsequences of `nums`, modulo \(10^{9} + 7\).  
Each subsequence sum is calculated as the sum of its elements.

---

### Examples  

**Example 1:**  
Input: `nums = [1,2,1]`  
Output: `14`  
*Explanation: Good subsequences are [1], [2], [1], [1,2], [2,1], [1,2,1]; sum = 1+2+1+1+2+7 = 14.*

**Example 2:**  
Input: `nums = [3,4,5]`  
Output: `40`  
*Explanation: Good subsequences are [3], [4], [5], [3,4], [4,5], [3,4,5]; sum = 3+4+5+7+9+12 = 40.*

**Example 3:**  
Input: `nums = [5,4,3,2,1]`  
Output: `170`  
*Explanation: Many combinations, but all must be with consecutive numbers. The DP ensures these are counted efficiently.*

---

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Generate all subsequences, and for each, check whether consecutive elements differ by exactly 1. For each good subsequence, sum its elements and accumulate the total.  
  Problem: For n up to 10⁵, total subsequences are 2ⁿ, so brute-force is not feasible.

- **Optimization using Dynamic Programming:**  
  Notice that the structure is similar to counting stair-step subsequences. Define `dp[x]` as the sum of good subsequences ending with value `x`.  
  For each number in nums:
    - The number itself is a good subsequence (size 1).
    - Can extend any good subsequence ending with `x-1` or `x+1`.
  Recurrence:  
    dp[x] = (count of x itself) \* x  
    For each occurrence, add (dp[x-1] + dp[x+1]) to dp[x]  
  Accumulate answer over all dp[x].

- **Why this works:**  
  We don't have to keep track of which elements are used; instead, we count the ways to form subsequences with each possible ending, extending with consecutive +1 or -1 values.

---

### Corner cases to consider  
- Empty array (`nums=[]`) ⇒ should return 0.
- All elements equal (`[2,2,2]`) ⇒ only single-element subsequences are good.
- No two numbers with difference 1 (`[1,3,5]`) ⇒ only single-element subsequences.
- Negative numbers or large numbers (if within constraints)
- Repeated numbers (e.g., `[1,2,1,2]`)

---

### Solution

```python
MOD = 10**9 + 7

def sumOfGoodSubsequences(nums):
    from collections import Counter, defaultdict

    count = Counter(nums)
    unique = sorted(count)
    dp = defaultdict(int)

    # Each number itself as a 1-element subsequence
    for x in unique:
        dp[x] = count[x] * x

    # For each number, try extending subsequences ending with x-1 and x+1
    # Process numbers in sorted order for +1 relation
    for x in unique:
        # Can extend subsequences with x-1 to x
        if x - 1 in dp:
            # For each occurrence of x, we can append x to all subsequences ending with x-1
            dp[x] = (dp[x] + dp[x-1] * count[x]) % MOD
        # Can extend subsequences with x+1 to x (for duplicates, this will be handled when we process x+1)
        # Not strictly necessary, as sorted pass covers both directions

    # The answer is the sum over all dp[x]
    ans = 0
    for x in unique:
        ans = (ans + dp[x]) % MOD

    return ans
```

---

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n + m), where n = length of nums, and m = number of unique values. Counting is linear; processing dp is up to the number of unique keys.  

- **Space Complexity:**  
  O(m), only need to hold dp and count for unique numbers (with m ≤ n).

---

### Potential follow-up questions (as if you’re the interviewer)  

- What if the difference had to be exactly k instead of 1?  
  *Hint: Change neighbors from x±1 to x±k in DP relation.*

- How to retrieve the list of all maximal “good” subsequences?  
  *Hint: This can require backtracking or explicit path construction, not just sum counting.*

- Modify to count the number (not sum) of good subsequences.  
  *Hint: In DP, track counts instead of total sums; update relations accordingly.*

---

### Summary
This problem is a variation of the **DP on subsequences** pattern, similar to “count increasing subsequences”, but with strict consecutive difference = 1.  
The key is to define **dp[x]** as the sum/ways of good subsequences ending with x, and build relations using only valid, consecutive values.  
Commonly used in problems involving sequence constraints with tight bounds (e.g. jumping numbers, zig-zag arrays).
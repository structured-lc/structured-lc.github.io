### Leetcode 3119 (Medium): Maximum Number of Potholes That Can Be Fixed [Practice](https://leetcode.com/problems/maximum-number-of-potholes-that-can-be-fixed)

### Description  
Given a string `road` consisting of `'1'` (pothole) and `'0'` (normal), and an integer `budget`, each operation can fix a continuous segment of `k` potholes at a cost of `k+1` per segment. After fixing, you cannot fix overlapping segments.  
Return the **maximum number of potholes** that can be fixed, given the budget constraint.

### Examples  

**Example 1:**  
Input: `road = "1100111"`, `budget = 6`  
Output: `4`  
*Explanation: There are two segments of potholes: "11" and "111".  
- Fix "111" (length 3) for cost 4, budget left = 2, potholes fixed = 3.  
- Fix "11" (length 2) for cost 3 (exceeds left budget), so can’t fix it.  
- Fix just one "1" in the beginning (length 1) for cost 2, potholes fixed = 1 more, total = 4.*

**Example 2:**  
Input: `road = "10101"`, `budget = 4`  
Output: `2`  
*Explanation: There are three single potholes.  
- Each can be fixed for cost 2 (1+1). Budget can only cover 2 such fixes. So max potholes fixed = 2.*

**Example 3:**  
Input: `road = "0000"`, `budget = 1`  
Output: `0`  
*Explanation: No pothole present to fix. So, output is 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  I could try all possible combinations of fixing pothole segments, but with a long string, this is far too slow.

- **Observations:**  
  - Longer continuous pothole segments are more "efficient" to fix (fix more potholes per operation).
  - Each continuous segment of length `k` can be fixed entirely for cost `k+1`.
  - Fixing all biggest segments first uses budget best.

- **Optimized Approach (Greedy, Counting):**  
  - Count all contiguous pothole segment lengths.
  - Start from the longest segments. For each, fix as many as budget allows.
  - After fixing all segments of length `k` that we can afford, for remainder that we cannot, treat each as `k-1` segment in the next pass (simulate "leftovers" becoming smaller).
  - Continue until budget spent.

- **Why Greedy works:**  
  Fixing larger segments first gives best pothole per-cost ratio. Greedily using the budget this way is optimal for maximizing fixed potholes.

### Corner cases to consider  
- Empty road string.
- No potholes in the string.
- Budget is 0.
- All potholes are isolated singles.
- Budget is large enough to fix everything.
- Multiple adjacent segments.
- Very long segment versus many small ones.

### Solution

```python
def maxPotholes(road: str, budget: int) -> int:
    # 1. Count lengths of all contiguous '1' segments (potholes)
    n = len(road)
    cnt = {}  # cnt[k]: number of pothole segments of length k
    i = 0
    while i < n:
        if road[i] == '1':
            start = i
            while i < n and road[i] == '1':
                i += 1
            length = i - start
            cnt[length] = cnt.get(length, 0) + 1
        else:
            i += 1

    # 2. Process from longest to shortest segments
    max_len = max(cnt) if cnt else 0
    ans = 0
    # We need to simulate "merging" leftover segments into smaller size
    cur_cnt = cnt
    while budget > 0 and max_len > 0:
        if max_len in cur_cnt and cur_cnt[max_len]:
            segments = cur_cnt[max_len]
            # Max we can fix: determined by budget and available segments
            take = min(budget // (max_len + 1), segments)
            ans += take * max_len
            budget -= take * (max_len + 1)
            
            leftover = segments - take
            # Remaining unfixed segments "become" segments of size one less
            if leftover > 0:
                cur_cnt[max_len - 1] = cur_cnt.get(max_len - 1, 0) + leftover
        max_len -= 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of the road string. Each character processed once for segment counting, and total segment processing is O(n) in worst case.
- **Space Complexity:** O(n), for counting all possible segment lengths in a map.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we could also merge adjacent segments after some fixings?  
  *Hint: Think about how fixing segments "opens up" new contiguous stretches.*

- How would you change your solution if the cost of fixing a segment was proportional to k (instead of k+1)?  
  *Hint: Recalculate the cost formula, but the greedy idea may still hold.*

- How to handle if multiple workers can fix pothole segments simultaneously with their own budgets?  
  *Hint: Think about partitioning work, and balancing segment picks.*

### Summary
This problem is a classic example of **Greedy + Counting + Simulation**. We prioritize the largest fixes for best cost-effectiveness, counting all options and reducing the problem by simulating "splitting" leftover segments. This pattern—greedily processing segments by size for budget/cost constrained max benefit—arises in interval scheduling, knapsack, or resource allocation problems.


### Flashcard
Identify all contiguous pothole segments. Greedily fix longest segments first (each segment of length k costs k+1 operations). Sort by length descending and fix until budget exhausted.

### Tags
String(#string), Greedy(#greedy), Sorting(#sorting)

### Similar Problems

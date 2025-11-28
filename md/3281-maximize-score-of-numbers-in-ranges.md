### Leetcode 3281 (Medium): Maximize Score of Numbers in Ranges [Practice](https://leetcode.com/problems/maximize-score-of-numbers-in-ranges)

### Description  
You are given an array **start** and integer **d**. There are **n** intervals:  
Each interval is **[start[i], start[i] + d]**.  
You must pick **one integer** from each interval (iᵗʰ integer from iᵗʰ interval).  
Your **score** is the minimum absolute difference between any two chosen integers.  
Return the **maximum possible score**.

### Examples  

**Example 1:**  
Input: `start = [6,0,3], d = 2`  
Output: `4`  
*Explanation: Intervals: [6,8], [0,2], [3,5]. Pick: 8 (from [6,8]), 0 (from [0,2]), 4 (from [3,5]). The pairwise differences: |8-0|=8, |8-4|=4, |0-4|=4. Minimum difference = 4.*

**Example 2:**  
Input: `start = [2,6,13,13], d = 5`  
Output: `5`  
*Explanation: Intervals: [2,7], [6,11], [13,18], [13,18]. Pick: 2 (from [2,7]), 7 (from [6,11]), 13 (from [13,18]), 18 (from [13,18]). Differences: |2-7|=5, |2-13|=11, |2-18|=16, |7-13|=6, |7-18|=11, |13-18|=5. Minimum difference = 5.*

**Example 3:**  
Input: `start = [1,10], d = 1`  
Output: `9`  
*Explanation: Intervals: [1,2], [10,11]. Pick: 1 (from [1,2]), 10 (from [10,11]). Only possible differences: |1-10|=9, |1-11|=10, |2-10|=8, |2-11|=9. Two possible sets exist: (1,10) giving 9, (2,11) also 9. So maximum possible score is 9.*

### Thought Process (as if you’re the interviewee)  
Let's reason out a brute-force approach first:

- For each interval \([start[i], start[i]+d]\), we need to pick a number.
- Brute-force: Try all possible combinations (all choices for n intervals).
- For each choice, calculate all pairwise differences, take the minimum, then maximize over all possible ways.
- But this is exponential in n and d (time complexity is (d+1)ⁿ, which is huge for n=10, d=10⁹).

We need a smarter approach!

**Key Observations:**
- The "score" is the minimum absolute difference between any two picked numbers.
- Instead of picking numbers directly, work backwards:
  - *For a given score k,* can we pick numbers so that all pairwise distances ≥ k?
    - For instance, can every pick be at least k apart?
- That suggests **Binary Search**: Try different values for k, check if possible.

**Optimized Plan:**
- **Sort** the intervals by their *start*.
- **Binary search** over possible score k (from 0 up to maximally possible range, e.g. diff between min start and max start+d).
- For each k (guess), try to greedily pick numbers:
  - Pick the smallest possible number from the first interval.
  - For each next interval, pick the smallest number ≥ (previous pick + k) that fits inside current interval.
  - If you can't find such a number in an interval, k is too big ("not feasible").
- If feasible for k, try a higher k; otherwise, try lower.
- Upper bound is (max(start) + d) - min(start).
- This reduces the search from exponential to O(n log(range)).

### Corner cases to consider  
- All intervals overlap fully (so the only possible differences are 0).
- All start[i] are equal.
- d = 0 (intervals are single points).
- Two intervals but far apart.
- n = 2 (1 pair only).
- Large d with non-overlapping intervals.
- Intervals not in order or have gaps.


### Solution

```python
def maximizeScore(start, d):
    # n intervals, each [start[i], start[i]+d]
    n = len(start)
    start = sorted(start)
    
    def can_achieve(k):
        # Try to greedily select numbers with at least distance k
        prev_pick = start[0]
        for i in range(1, n):
            # In [start[i], start[i]+d], pick the smallest number ≥ prev_pick + k
            next_pick = max(prev_pick + k, start[i])
            if next_pick > start[i] + d:
                return False  # Cannot pick within interval
            prev_pick = next_pick
        return True
    
    left, right = 0, (max(start) + d) - min(start) + 1  # +1 because bisect high is exclusive

    while left < right:
        mid = (left + right) // 2
        if can_achieve(mid):
            left = mid + 1  # Try for bigger minimal difference
        else:
            right = mid
    return left - 1  # Because left is always pushed 1 beyond feasible max
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log M), where n is the number of intervals, M ≈ (max(start) + d) - min(start). Each binary search call takes O(n) to check feasibility.
- **Space Complexity:** O(1) extra, aside from input storage and sorting (sort is O(n)).


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle larger n or massive ranges?
  *Hint: Is greedy the only way? Would a segment tree or priority queue help speed up feasibility check?*

- What if intervals could be in any order and overlap in arbitrary ways?
  *Hint: Think about sorting and whether greedy still works if intervals overlap irregularly.*

- Can you output which actual numbers to pick (not just the score)?
  *Hint: Store the picks as you go in your greedy assignment.*


### Summary
We applied a **binary search on the result (score)** approach, using greedy checking to verify if a given minimal difference is feasible by picking left-to-right. This pattern is common in *placement*, *distance maximization*, and *load balancing* problems, like **aggressive cows**, **placing routers**, or any scenario where you want to maximize the minimal gap in a selection.


### Flashcard
Use DP or greedy observation: the score is minimized by the smallest pairwise difference; binary search on the answer and check if a valid selection exists for each candidate score.

### Tags
Array(#array), Binary Search(#binary-search), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Find K-th Smallest Pair Distance(find-k-th-smallest-pair-distance) (Hard)